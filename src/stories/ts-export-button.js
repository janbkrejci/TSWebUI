class TSExportButton extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <style>
                .export-btn {
                    display: inline-block;
                }
                .export-options {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    font-family: var(--sl-font-sans);
                }
                .export-section {
                    border: 1px solid var(--sl-color-neutral-200);
                    border-radius: var(--sl-border-radius-medium);
                    padding: 1rem;
                    background: var(--sl-color-neutral-50);
                    font-family: var(--sl-font-sans);
                }
                .export-section-title {
                    font-weight: var(--sl-font-weight-semibold);
                    margin-bottom: 0.5rem;
                    color: var(--sl-color-neutral-700);
                    font-family: var(--sl-font-sans);
                }
                .export-section sl-radio-group {
                    margin-top: 0.5rem;
                }
                .export-section sl-radio-group::part(form-control) {
                    display: flex;
                    flex-direction: column;
                    gap: 0.625rem;
                }
                .export-section sl-radio {
                    margin: 0;
                    margin-bottom: 0.625rem;
                }
                .export-section sl-radio:last-child {
                    margin-bottom: 0;
                }
                .export-section #export-rows-group {
                    margin-top: 0.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 0.625rem;
                }
                .export-option-item {
                    margin: 0;
                }
                sl-dialog::part(title) {
                    font-family: var(--sl-font-sans);
                    flex-shrink: 0;
                }
                sl-dialog::part(body) {
                    font-family: var(--sl-font-sans);
                    overflow-y: auto;
                    overflow-x: hidden;
                    flex: 1 1 auto;
                    min-height: 0;
                }
                sl-dialog::part(panel) {
                    max-height: 90vh;
                    max-width: 90vw;
                    display: flex;
                    flex-direction: column;
                }
                sl-dialog::part(footer) {
                    display: flex;
                    justify-content: space-between;
                    flex-shrink: 0;
                }
            </style>
            <sl-tooltip hoist content="Exportovat do Excelu">
                <sl-button class="export-btn">
                    <sl-icon name="download"></sl-icon>
                </sl-button>
            </sl-tooltip>
        `;
    }

    static get observedAttributes() {
        return [];
    }

    connectedCallback() {
        this.selectedRowOptions = new Set();
        this.setupEventListeners();
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

    setExportData(dataProvider) {
        this.dataProvider = dataProvider;
    }

    updateRowCounts() {
        const dlg = this.getDialog('export-dialog');
        const rowsGroup = dlg?.querySelector('#export-rows-group');
        const colsGroup = dlg?.querySelector('#export-columns-group');
        const rowsTitle = dlg?.querySelector('#export-rows-section .export-section-title');
        const colsTitle = dlg?.querySelector('#export-columns-section .export-section-title');
        const confirmBtn = dlg?.querySelector('#export-confirm-btn');

        if (!rowsGroup || !colsGroup) return;

        // Get currently checked checkboxes
        const checkedBoxes = rowsGroup.querySelectorAll('sl-checkbox[checked]');
        const selectedOptions = Array.from(checkedBoxes).map(cb => cb.getAttribute('value'));

        // Calculate rows count
        let rowsCount = 0;
        if (selectedOptions.includes('filtered') && selectedOptions.includes('selected')) {
            rowsCount = this.getExportableRows('filtered-selected').length;
        } else if (selectedOptions.includes('filtered')) {
            rowsCount = this.getExportableRows('filtered').length;
        } else if (selectedOptions.includes('selected')) {
            rowsCount = this.getExportableRows('selected').length;
        } else {
            rowsCount = this.getExportableRows('all').length;
        }

        // Calculate columns count
        const colsValue = colsGroup.value || 'visible';
        const colsCount = this.getExportableColumns(colsValue).length;

        // Update titles
        if (rowsTitle) {
            rowsTitle.textContent = `Řádky (${rowsCount})`;
        }
        if (colsTitle) {
            colsTitle.textContent = `Sloupce (${colsCount})`;
        }

        // Disable confirm button if no rows to export
        if (confirmBtn) {
            confirmBtn.disabled = rowsCount === 0;
        }
    }

    setupEventListeners() {
        const button = this.querySelector('.export-btn');
        if (button) {
            button.addEventListener('click', () => {
                this.onExportClick();
            });
        }

        // Dialog event listeners - dialogy jsou v ts-table, musíme použít setTimeout pro případné zpoždění
        setTimeout(() => {
            const dlg = this.getDialog('export-dialog');
            const cancelBtn = dlg?.querySelector('#export-cancel-btn');
            const confirmBtn = dlg?.querySelector('#export-confirm-btn');
            if (cancelBtn) {
                cancelBtn.addEventListener('click', () => {
                    const dialog = this.getDialog('export-dialog');
                    if (dialog) dialog.hide();
                });
            }
            if (confirmBtn) {
                confirmBtn.addEventListener('click', () => {
                    this.onExportConfirm();
                });
            }
        }, 0);
    }

    // Export helpers
    getExportableRows(option) {
        const { selectedRowIds, getSortedActiveData, getAllSortedRows } = this.dataProvider();
        // option: 'all' | 'filtered' | 'selected' | 'filtered-selected'
        if (option === 'selected') {
            // Get all sorted data, then filter for selected
            const sortedData = getAllSortedRows();
            const selected = sortedData.filter(r => selectedRowIds.has(String(r.id)));
            return selected;
        }
        if (option === 'filtered') {
            return getSortedActiveData();
        }
        if (option === 'filtered-selected') {
            // Selected rows from sorted filtered data
            const sortedFilteredData = getSortedActiveData();
            return sortedFilteredData.filter(r => selectedRowIds.has(String(r.id)));
        }
        // For 'all', return all data sorted
        return getAllSortedRows();
    }

    getExportableColumns(option) {
        const { columnDefinitions, getVisibleColumns } = this.dataProvider();
        // option: 'all' | 'visible'
        if (option === 'visible') {
            return getVisibleColumns();
        }
        // all columns except unshowable? For export we'll include all definitions that exist
        return columnDefinitions.slice().sort((a, b) => a.order - b.order);
    }

    buildExportDataset(rows, cols) {
        const headers = cols.map(c => c.key);
        const data = rows.map(r => cols.map(c => r[c.key]));
        return { headers, data };
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

    formatExportFilename() {
        const d = new Date();
        const pad = n => String(n).padStart(2, '0');
        const y = d.getFullYear();
        const m = pad(d.getMonth() + 1);
        const day = pad(d.getDate());
        return `${y}-${m}-${day} Export.xlsx`;
    }

    async performExport(rowsOption, colsOption) {
        const rows = this.getExportableRows(rowsOption);
        const cols = this.getExportableColumns(colsOption);
        const { headers, data } = this.buildExportDataset(rows, cols);

        const XLSX = await this.ensureSheetJS();
        const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Export');
        XLSX.writeFile(wb, this.formatExportFilename());
    }

    onExportClick() {
        const { columnFilters, selectedRowIds, columnDefinitions, getVisibleColumns } = this.dataProvider();

        // Check if dialog is needed
        const anyFilter = Object.keys(columnFilters).length > 0;
        const anySelected = selectedRowIds.size > 0;
        const allVisible = getVisibleColumns().length === columnDefinitions.filter(c => !this.unshowableColumns?.includes(c.key)).length;

        // Decide if dialog is needed
        const needRowsChoice = anyFilter || anySelected; // otherwise always all
        const needColsChoice = !allVisible; // otherwise all columns visible == all

        // If no choices needed, export immediately with defaults
        if (!needRowsChoice && !needColsChoice) {
            this.performExport('all', 'visible');
            return;
        }

        // Build dialog options dynamically
        const dlg = this.getDialog('export-dialog');
        const rowsGroup = dlg?.querySelector('#export-rows-group');
        const colsGroup = dlg?.querySelector('#export-columns-group');
        const rowsSection = dlg?.querySelector('#export-rows-section');
        const colsSection = dlg?.querySelector('#export-columns-section');
        const rowsTitle = dlg?.querySelector('#export-rows-section .export-section-title');
        const colsTitle = dlg?.querySelector('#export-columns-section .export-section-title');
        if (!dlg || !rowsGroup || !colsGroup || !rowsSection || !colsSection) return;

        // Track selected row options
        this.selectedRowOptions.clear(); // Reset for new dialog

        // Function to update counts in titles
        const updateCounts = () => {
            this.updateRowCounts();
        };

        // Rows options - using checkboxes for multiple selection
        rowsGroup.innerHTML = '';
        if (needRowsChoice) {
            const addCheckbox = (value, label, disabled = false, checked = false) => {
                const container = document.createElement('div');
                container.className = 'export-option-item';
                
                const checkbox = document.createElement('sl-checkbox');
                checkbox.setAttribute('value', value);
                checkbox.textContent = label;
                if (disabled) checkbox.disabled = true;
                if (checked) checkbox.checked = true;
                
                // Add change listener to update counts
                checkbox.addEventListener('sl-change', () => {
                    // Use setTimeout to ensure DOM is updated
                    setTimeout(() => {
                        this.updateRowCounts();
                    }, 0);
                });
                
                container.appendChild(checkbox);
                rowsGroup.appendChild(container);
            };
            if (anyFilter) {
                addCheckbox('filtered', 'Pouze filtrované řádky', false, false);
            }
            if (anySelected) {
                addCheckbox('selected', 'Pouze vybrané řádky', false, false);
            }
            rowsSection.style.display = '';
        } else {
            rowsSection.style.display = 'none';
            rowsGroup.innerHTML = '';
        }

        // Columns options
        colsGroup.value = '';
        colsGroup.innerHTML = '';
        if (needColsChoice) {
            const addRadio = (value, label) => {
                const r = document.createElement('sl-radio');
                r.setAttribute('value', value);
                r.textContent = label;
                colsGroup.appendChild(r);
            };
            addRadio('all', 'Všechny sloupce');
            addRadio('visible', 'Jen viditelné sloupce');
            colsGroup.value = 'all'; // Preselect "all columns"
            
            // Add change listener to update counts
            colsGroup.addEventListener('sl-change', updateCounts);
            
            colsSection.style.display = '';
        } else {
            colsSection.style.display = 'none';
            // keep group empty; defaults will be applied on confirm
            colsGroup.innerHTML = '';
        }

        // Initial count update
        updateCounts();

        dlg.show();
    }

    onExportConfirm() {
        const dlg = this.getDialog('export-dialog');
        const rowsGroup = dlg?.querySelector('#export-rows-group');
        const colsGroup = dlg?.querySelector('#export-columns-group');

        // Get selected checkboxes for rows
        const checkedBoxes = rowsGroup?.querySelectorAll('sl-checkbox[checked]');
        const selectedRowOptions = Array.from(checkedBoxes).map(cb => cb.getAttribute('value'));

        // Determine rows option based on selected checkboxes
        let rowsValue = 'all';
        if (selectedRowOptions.includes('filtered') && selectedRowOptions.includes('selected')) {
            rowsValue = 'filtered-selected';
        } else if (selectedRowOptions.includes('filtered')) {
            rowsValue = 'filtered';
        } else if (selectedRowOptions.includes('selected')) {
            rowsValue = 'selected';
        }

        // Get columns option from radio group
        let colsValue = colsGroup.value || colsGroup.querySelector('sl-radio[checked]')?.getAttribute('value');
        if (!colsValue) colsValue = 'visible';

        dlg.hide();
        this.performExport(rowsValue, colsValue);
    }
}

customElements.define('ts-export-button', TSExportButton);

export { TSExportButton };