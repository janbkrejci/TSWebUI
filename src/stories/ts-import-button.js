class TSImportButton extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <style>
                .import-btn {
                    display: inline-block;
                }
                .large-icon {
                    font-size: 32px;
                }
                .import-missing-columns {
                    margin-top: 8px;
                    font-size: var(--sl-font-size-small);
                }
                .import-file-input-hidden {
                    display: none;
                }
                .import-results {
                    padding: 1rem 0;
                }
                .import-stats {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    gap: 1rem;
                    margin-bottom: 1rem;
                }
                .stat-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 1rem;
                    background: var(--sl-color-neutral-50);
                    border-radius: var(--sl-border-radius-medium);
                    border: 1px solid var(--sl-color-neutral-200);
                }
                .stat-label {
                    font-size: var(--sl-font-size-small);
                    color: var(--sl-color-neutral-600);
                    margin-bottom: 0.5rem;
                    font-weight: var(--sl-font-weight-medium);
                }
                .stat-value {
                    font-size: var(--sl-font-size-2x-large);
                    font-weight: var(--sl-font-weight-bold);
                    color: var(--sl-color-neutral-900);
                }
            </style>
            <sl-tooltip content="Importovat z Excelu">
                <sl-button class="import-btn">
                    <sl-icon name="upload"></sl-icon>
                </sl-button>
            </sl-tooltip>
            <!-- Hidden file input for importing Excel -->
            <input type="file" id="import-file-input" accept=".xlsx" class="import-file-input-hidden" />
            <!-- Import error dialog -->
            <sl-dialog id="import-error-dialog" label="Import nelze provést" hidden>
                <sl-alert open variant="danger">
                    <sl-icon slot="icon" name="exclamation-octagon" class="large-icon"></sl-icon>
                    Struktura souboru neodpovídá. Import nebude proveden.
                    <div id="import-missing-columns" class="import-missing-columns"></div>
                </sl-alert>
                <div slot="footer"></div>
                <sl-button slot="footer" variant="default" id="import-error-close-btn">Zavřít</sl-button>
            </sl-dialog>
            <!-- Import summary dialog -->
            <sl-dialog id="import-summary-dialog" label="Výsledek importu" hidden>
                <div class="import-results">
                    <div class="import-stats">
                        <div class="stat-item">
                            <span class="stat-label">Přidáno:</span>
                            <span class="stat-value" id="import-added-count">0</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Upraveno:</span>
                            <span class="stat-value" id="import-updated-count">0</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Přeskočeno:</span>
                            <span class="stat-value" id="import-skipped-count">0</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Zamítnuto:</span>
                            <span class="stat-value" id="import-rejected-count">0</span>
                        </div>
                    </div>
                </div>
                <div id="import-footer-placeholder" slot="footer" style="display: none;"></div>
                <sl-button slot="footer" variant="default" id="import-rejected-save-btn">Exportovat zamítnuté řádky</sl-button>
                <sl-button slot="footer" variant="primary" id="import-summary-close-btn">OK</sl-button>
            </sl-dialog>
        `;
    }

    static get observedAttributes() {
        return [];
    }

    connectedCallback() {
        this.setupEventListeners();
    }

    setImportData(dataProvider) {
        this.dataProvider = dataProvider;
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

        // Dialog event listeners
        const errorCloseBtn = this.querySelector('#import-error-close-btn');
        const summaryCloseBtn = this.querySelector('#import-summary-close-btn');
        const saveBtn = this.querySelector('#import-rejected-save-btn');

        if (errorCloseBtn) {
            errorCloseBtn.addEventListener('click', () => {
                const dialog = this.querySelector('#import-error-dialog');
                if (dialog) dialog.hide();
            });
        }

        if (summaryCloseBtn) {
            summaryCloseBtn.addEventListener('click', () => {
                const dialog = this.querySelector('#import-summary-dialog');
                if (dialog) dialog.hide();
            });
        }

        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                this.saveRejectedRows();
            });
        }
    }

 
    showImportResults(results) {
        const { added, updated, rejected, skipped, rejectedRowsData } = results;
        
        // Store rejected data for saving
        this.rejectedRowsData = rejectedRowsData || [];

        // Show summary dialog
        const sumDlg = this.querySelector('#import-summary-dialog');
        const addedCount = this.querySelector('#import-added-count');
        const updatedCount = this.querySelector('#import-updated-count');
        const rejectedCount = this.querySelector('#import-rejected-count');
        const skippedCount = this.querySelector('#import-skipped-count');
        const saveBtn = this.querySelector('#import-rejected-save-btn');
        const placeholder = this.querySelector('#import-footer-placeholder');

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
            for (const col of columnDefinitions) {
                if (!headersInFile.includes(col.key)) missing.push(col.key);
            }
            if (missing.length > 0) {
                const errDlg = this.querySelector('#import-error-dialog');
                const list = this.querySelector('#import-missing-columns');
                if (list) list.textContent = 'Chybějící sloupce: ' + missing.join(', ');
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
                return { __index: idx + 2, data: obj }; // +2 for header + 1-index
            });

            // Dispatch do-import event with parsed data for parent to handle
            this.dispatchEvent(new CustomEvent('do-import', { 
                detail: { 
                    importData: mapped,
                    file: file 
                },
                bubbles: true,
                composed: true
            }));

        } catch (e) {
            console.error('Import failed', e);
            const errDlg = this.querySelector('#import-error-dialog');
            const list = this.querySelector('#import-missing-columns');
            if (list) list.textContent = 'Chyba při čtení souboru.';
            if (errDlg) errDlg.show();
        }
    }
}

customElements.define('ts-import-button', TSImportButton);

export { TSImportButton };