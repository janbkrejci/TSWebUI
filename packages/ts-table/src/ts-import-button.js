class TSImportButton extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <style>
                .import-btn {
                    display: inline-block;
                    margin-bottom: 0.5em;
                }
                .import-file-input-hidden {
                    display: none;
                }
            </style>
            <sl-tooltip content="Importovat z Excelu">
                <sl-button class="import-btn">
                    <sl-icon name="upload"></sl-icon>
                </sl-button>
            </sl-tooltip>
            <!-- Hidden file input for importing Excel -->
            <input type="file" id="import-file-input" accept=".xlsx" class="import-file-input-hidden" />
        `;
    }

    static get observedAttributes() {
        return [];
    }

    connectedCallback() {
        this.columnsRequiredForImport = [];
        this.setupEventListeners();
    }

    setImportData(dataProvider) {
        this.dataProvider = dataProvider;
    }

    setColumnsRequiredForImport(columns) {
        this.columnsRequiredForImport = columns || [];
    }

    getDialog(dialogId) {
        // Dialogy jsou nyní v ts-table, musíme je najít v rodičovském stromu
        let parent = this.parentElement;
        while (parent) {
            const dialog = parent.querySelector(`#${dialogId}`);
            if (dialog) return dialog;
            parent = parent.parentElement;
        }
        return null;
    }

    setupEventListeners() {
        const button = this.querySelector('.import-btn');
        const importInput = this.querySelector('#import-file-input');
        if (button && importInput) {
            button.addEventListener('click', () => {
                importInput.value = '';
                importInput.click();
            });
            importInput.addEventListener('change', (event) => {
                this.onImportFileSelected(event);
            });
        }

        // Dialog event listeners - dialogy jsou v ts-table, musíme použít setTimeout pro případné zpoždění
        setTimeout(() => {
            const errorCloseBtn = this.getDialog('import-error-dialog')?.querySelector('sl-button[slot="footer"][variant="default"]');
            const summaryCloseBtn = this.getDialog('import-summary-dialog')?.querySelector('#import-summary-close-btn');
            const saveBtn = this.getDialog('import-summary-dialog')?.querySelector('#import-rejected-save-btn');

            if (errorCloseBtn) {
                errorCloseBtn.addEventListener('click', () => {
                    const dialog = this.getDialog('import-error-dialog');
                    if (dialog) dialog.hide();
                });
            }

            if (summaryCloseBtn) {
                summaryCloseBtn.addEventListener('click', () => {
                    const dialog = this.getDialog('import-summary-dialog');
                    if (dialog) dialog.hide();
                });
            }

            if (saveBtn) {
                saveBtn.addEventListener('click', () => {
                    this.saveRejectedRows();
                });
            }
        }, 0);
    }

 
    showImportResults(results) {
        const { added, updated, rejected, skipped, rejectedRowsData } = results;
        
        // Store rejected data for saving
        this.rejectedRowsData = rejectedRowsData || [];

        // Show summary dialog
        const sumDlg = this.getDialog('import-summary-dialog');
        const addedCount = sumDlg?.querySelector('#import-added-count');
        const updatedCount = sumDlg?.querySelector('#import-updated-count');
        const rejectedCount = sumDlg?.querySelector('#import-rejected-count');
        const skippedCount = sumDlg?.querySelector('#import-skipped-count');
        const saveBtn = sumDlg?.querySelector('#import-rejected-save-btn');
        const placeholder = sumDlg?.querySelector('#import-footer-placeholder');

        // Update individual counters
        if (addedCount) addedCount.textContent = added || 0;
        if (updatedCount) updatedCount.textContent = updated || 0;
        if (rejectedCount) rejectedCount.textContent = rejected || 0;
        if (skippedCount) skippedCount.textContent = skipped || 0;

        // Show/hide export button and placeholder based on rejected rows
        if ((rejected || 0) > 0) {
            if (saveBtn) saveBtn.style.display = '';
            if (placeholder) placeholder.style.display = 'none';
        } else {
            if (saveBtn) saveBtn.style.display = 'none';
            if (placeholder) placeholder.style.display = '';
        }

        if (sumDlg) sumDlg.show();
    }

    formatRejectedFilename() {
        const d = new Date();
        const pad = n => String(n).padStart(2, '0');
        const y = d.getFullYear();
        const m = pad(d.getMonth() + 1);
        const day = pad(d.getDate());
        return `${y}-${m}-${day} Zamítnuté řádky.xlsx`;
    }

    async ensureSheetJS() {
        if (window.XLSX) return window.XLSX;
        await new Promise((resolve, reject) => {
            const s = document.createElement('script');
            s.src = 'https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js';
            s.onload = resolve;
            s.onerror = reject;
            document.head.appendChild(s);
        });
        return window.XLSX;
    }

    async saveRejectedRows() {
        try {
            const { columnDefinitions } = this.dataProvider();
            const XLSX = await this.ensureSheetJS();

            // Ensure ID is included first if present
            const idCol = columnDefinitions.find(c => c.key === 'id');
            const colsSet = new Set();
            const cols = [];
            if (idCol) { cols.push(idCol); colsSet.add('id'); }
            columnDefinitions.forEach(c => { if (!colsSet.has(c.key)) { cols.push(c); colsSet.add(c.key); } });

            const headers = cols.map(c => c.key);
            const rejectedData = this.rejectedRowsData || [];
            const aoa = [headers, ...rejectedData.map(obj => cols.map(c => obj[c.key] ?? ''))];
            const ws = XLSX.utils.aoa_to_sheet(aoa);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Zamítnuté');
            XLSX.writeFile(wb, this.formatRejectedFilename());
        } catch (error) {
            console.error('Error saving rejected rows:', error);
            alert('Chyba při ukládání zamítnutých řádků: ' + error.message);
        }
    }

    async onImportFileSelected(event) {
        const file = event.target.files && event.target.files[0];
        if (!file) return;

        try {
            const { columnDefinitions } = this.dataProvider();
            const XLSX = await this.ensureSheetJS();
            const data = await file.arrayBuffer();
            const wb = XLSX.read(data, { type: 'array' });
            const sheetName = wb.SheetNames[0];
            const ws = wb.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(ws, { defval: '' });

            // Check if file has any data rows (not just headers)
            if (json.length === 0) {
                // File has only headers, no data - show empty import result directly
                this.showImportResults({
                    added: 0,
                    updated: 0,
                    rejected: 0,
                    skipped: 0,
                    rejectedRowsData: []
                });
                return;
            }

            // Validate columns: require all exportable columns to be present by header KEY
            const headersInFile = Object.keys(json[0] || {});
            const missing = [];
            
            // Determine which columns to validate
            const columnsToValidate = this.columnsRequiredForImport && this.columnsRequiredForImport.length > 0
                ? columnDefinitions.filter(col => this.columnsRequiredForImport.includes(col.key))
                : columnDefinitions;
            
            for (const col of columnsToValidate) {
                if (!headersInFile.includes(col.key)) missing.push(col.key);
            }
            if (missing.length > 0) {
                const errDlg = this.getDialog('import-error-dialog');
                const list = errDlg?.querySelector('#import-missing-columns');
                const requiredLabel = this.columnsRequiredForImport && this.columnsRequiredForImport.length > 0
                    ? 'Chybějící povinné sloupce: '
                    : 'Chybějící sloupce: ';
                if (list) list.textContent = requiredLabel + missing.join(', ');
                if (errDlg) errDlg.show();
                return;
            }

            // Map rows: copy only known keys from columnDefinitions (includes hidden 'id')
            const knownKeys = new Set(columnDefinitions.map(c => c.key));
            const mapped = json.map((row, idx) => {
                const obj = {};
                for (const [key, val] of Object.entries(row)) {
                    if (knownKeys.has(key)) obj[key] = val;
                }
                return obj; // +2 for header + 1-index
                // return { __index: idx + 2, data: obj }; // +2 for header + 1-index
            });

            // Dispatch do-import event with parsed data for parent to handle
            this.dispatchEvent(new CustomEvent('do-import', { 
                detail: { 
                    data: mapped
                },
                bubbles: true,
                composed: true
            }));

        } catch (e) {
            console.error('Import failed', e);
            const errDlg = this.getDialog('import-error-dialog');
            const list = errDlg?.querySelector('#import-missing-columns');
            if (list) list.textContent = 'Chyba při čtení souboru.';
            if (errDlg) errDlg.show();
        }
    }
}

customElements.define('ts-import-button', TSImportButton);

export { TSImportButton };