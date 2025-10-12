class TSTablePager extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <style>
                #page-number {
                    max-width: 4em;
                    display: inline-block;
                }

                #page-number::part(input) {
                    text-align: right;
                }

                #page-info,
                #item-count,
                #items-per-page {
                    font-size: var(--sl-font-size-small);
                    color: var(--sl-color-neutral-700);
                    font-weight: var(--sl-font-weight-light);
                    white-space: nowrap;
                }

                #items-per-page {
                    display: flex;
                    align-items: center;
                    gap: 0.5em;
                    flex-wrap: nowrap;
                }

                #pager {
                    display: flex;
                    align-items: center;
                    gap: 0.5em;
                    align-self: center;
                    flex-wrap: nowrap;
                    white-space: nowrap;
                }

                /* Footer styles */
                .footer {
                    display: grid;
                    grid-template-columns: 1fr auto 1fr;
                    align-items: center;
                    margin-top: 1em;
                    padding: 0.5em 0;
                    max-width: 100%;
                    margin-left: 0;
                    margin-right: 0;
                    min-width: 0;
                    box-sizing: border-box;
                }

                .footer > :first-child {
                    justify-self: start;
                }

                .footer > :nth-child(2) {
                    justify-self: center;
                }

                .footer > :nth-child(3) {
                    justify-self: end;
                }

                .items-per-page {
                    display: flex;
                    align-items: center;
                    gap: 0.5em;
                    font-size: var(--sl-font-size-small);
                    color: var(--sl-color-neutral-700);
                    font-weight: var(--sl-font-weight-light);
                    white-space: nowrap;
                }

                .pager {
                    display: flex;
                    align-items: center;
                    gap: 0.5em;
                }

                .chevron-icon {
                    margin-left: 0.5em;
                }
            </style>
            <div class="footer">
                <div id="item-count">Zobrazeno 1-5 z 25</div>
                <div class="items-per-page">
                    Zobrazit
                    <sl-dropdown>
                        <sl-button slot="trigger">
                            5
                            <sl-icon name="chevron-down" class="chevron-icon"></sl-icon>
                        </sl-button>
                        <sl-menu>
                            <sl-menu-item>5</sl-menu-item>
                            <sl-menu-item>10</sl-menu-item>
                            <sl-menu-item>20</sl-menu-item>
                            <sl-menu-item>50</sl-menu-item>
                            <sl-menu-item>100</sl-menu-item>
                        </sl-menu>
                    </sl-dropdown>
                    na stránku
                </div>
                <!-- PAGER -->
                <div class="pager">
                    <sl-button-group>
                        <sl-button disabled>
                            <sl-icon name="chevron-bar-left"></sl-icon>
                        </sl-button>
                        <sl-button disabled>
                            <sl-icon name="chevron-left"></sl-icon>
                        </sl-button>
                    </sl-button-group>
                    <div id="page-info" variant="none">
                        Stránka
                        <sl-input id="page-number" size="small" value="1"></sl-input>
                        / 5
                    </div>
                    <sl-button-group>
                        <sl-button>
                            <sl-icon name="chevron-right"></sl-icon>
                        </sl-button>
                        <sl-button>
                            <sl-icon name="chevron-bar-right"></sl-icon>
                        </sl-button>
                    </sl-button-group>
                </div>
            </div>
        `;
    }

    static get observedAttributes() {
        return ['totalrecordscount', 'filteredrecordscount', 'pagesize', 'pagesizes', 'currentpage'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.updateUI();
        }
    }

    connectedCallback() {
        this.setupEventListeners();
        this.updateUI();
    }

    updateUI() {
        const totalRecordsCount = parseInt(this.getAttribute('totalrecordscount')) || 0;
        const filteredRecordsCount = parseInt(this.getAttribute('filteredrecordscount')) || 0;
        const pageSize = parseInt(this.getAttribute('pagesize')) || 5;
        const pageSizes = JSON.parse(this.getAttribute('pagesizes') || '[5,10,20,50,100]');
        const currentPage = parseInt(this.getAttribute('currentpage')) || 1;

        const totalPages = Math.ceil(filteredRecordsCount / pageSize);

        // Update item count
        const itemCountEl = this.querySelector('#item-count');
        if (itemCountEl) {
            const startItem = filteredRecordsCount > 0 ? (currentPage - 1) * pageSize + 1 : 0;
            const endItem = Math.min(currentPage * pageSize, filteredRecordsCount);
            const filterText = filteredRecordsCount !== totalRecordsCount ? ` (filtrováno z ${totalRecordsCount})` : '';
            itemCountEl.textContent = `Zobrazeno ${startItem}-${endItem} z ${filteredRecordsCount}${filterText}`;
        }

        // Update items per page dropdown
        const itemsPerPageButton = this.querySelector('.items-per-page sl-button');
        if (itemsPerPageButton) {
            itemsPerPageButton.innerHTML = `${pageSize}<sl-icon name="chevron-down" class="chevron-icon"></sl-icon>`;
        }

        // Update page sizes menu
        const menu = this.querySelector('.items-per-page sl-menu');
        if (menu) {
            menu.innerHTML = '';
            pageSizes.forEach(size => {
                const item = document.createElement('sl-menu-item');
                item.textContent = size;
                menu.appendChild(item);
            });
        }

        // Update page number input
        const pageInput = this.querySelector('#page-number');
        if (pageInput) {
            pageInput.value = currentPage;
        }

        // Update page info
        const pageInfo = this.querySelector('#page-info');
        if (pageInfo) {
            pageInfo.querySelector('sl-input').nextSibling.textContent = ` / ${totalPages}`;
        }

        // Update navigation buttons
        const pagerButtons = this.querySelectorAll('.pager sl-button');
        if (pagerButtons.length >= 4) {
            // First page and previous page buttons
            pagerButtons[0].disabled = currentPage <= 1;
            pagerButtons[1].disabled = currentPage <= 1;

            // Next page and last page buttons
            pagerButtons[2].disabled = currentPage >= totalPages;
            pagerButtons[3].disabled = currentPage >= totalPages;
        }
    }

    setupEventListeners() {
        // Utility functions for page number input
        const pageNumberClick = (event) => {
            event.target.select();
            event.preventDefault();
        };

        const pageNumberKeyDown = (event) => {
            if (!/[0-9]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Delete' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
                event.preventDefault();
            }
            if (event.key === 'Enter') {
                event.target.blur();
            }
        };

        const pageNumberBlur = (event) => {
            const value = parseInt(event.target.value);
            const filteredRecordsCount = parseInt(this.getAttribute('filteredrecordscount')) || 0;
            const pageSize = parseInt(this.getAttribute('pagesize')) || 5;
            const totalPages = Math.ceil(filteredRecordsCount / pageSize);
            let correctedValue = value;
            if (isNaN(value) || value < 1) {
                correctedValue = 1;
            } else if (value > totalPages) {
                correctedValue = totalPages;
            }
            event.target.value = correctedValue;
            if (correctedValue !== parseInt(this.getAttribute('currentpage'))) {
                this.dispatchEvent(new CustomEvent('page-changed', { detail: { page: correctedValue } }));
            }
        };

        // Items per page dropdown
        const itemsPerPageMenu = this.querySelector('.items-per-page sl-menu');
        if (itemsPerPageMenu) {
            itemsPerPageMenu.addEventListener('sl-select', (event) => {
                const selectedValue = parseInt(event.detail.item.textContent);
                this.dispatchEvent(new CustomEvent('page-size-changed', { detail: { pageSize: selectedValue } }));
            });
        }

        // Page navigation buttons
        const pagerButtons = this.querySelectorAll('.pager sl-button');
        if (pagerButtons.length >= 4) {
            // First page button (index 0)
            pagerButtons[0].addEventListener('click', () => this.dispatchEvent(new CustomEvent('page-changed', { detail: { page: 1 } })));

            // Previous page button (index 1)
            pagerButtons[1].addEventListener('click', () => this.dispatchEvent(new CustomEvent('page-changed', { detail: { page: parseInt(this.getAttribute('currentpage')) - 1 } })));

            // Next page button (index 2)
            pagerButtons[2].addEventListener('click', () => this.dispatchEvent(new CustomEvent('page-changed', { detail: { page: parseInt(this.getAttribute('currentpage')) + 1 } })));

            // Last page button (index 3)
            pagerButtons[3].addEventListener('click', () => {
                const filteredRecordsCount = parseInt(this.getAttribute('filteredrecordscount')) || 0;
                const pageSize = parseInt(this.getAttribute('pagesize')) || 5;
                const totalPages = Math.ceil(filteredRecordsCount / pageSize);
                this.dispatchEvent(new CustomEvent('page-changed', { detail: { page: totalPages } }));
            });
        }

        // Page number input events
        const pageInput = this.querySelector('#page-number');
        if (pageInput) {
            pageInput.addEventListener('click', pageNumberClick);
            pageInput.addEventListener('keydown', pageNumberKeyDown);
            pageInput.addEventListener('blur', pageNumberBlur);
        }
    }
}

customElements.define('ts-table-pager', TSTablePager);

class TSCreateRecordButton extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <style>
                .create-record-btn {
                    display: inline-block;
                }
            </style>
            <sl-tooltip content="Nový záznam">
                <sl-button class="create-record-btn">
                    <sl-icon name="plus-lg"></sl-icon>
                </sl-button>
            </sl-tooltip>
        `;
    }

    connectedCallback() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        const button = this.querySelector('.create-record-btn');
        if (button) {
            button.addEventListener('click', () => {
                this.dispatchEvent(new CustomEvent('new-record', { detail: {} }));
            });
        }
    }
}

customElements.define('ts-create-record-button', TSCreateRecordButton);

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
                }
                .export-section {
                    border: 1px solid var(--sl-color-neutral-200);
                    border-radius: var(--sl-border-radius-medium);
                    padding: 1rem;
                    background: var(--sl-color-neutral-50);
                }
                .export-section-title {
                    font-weight: var(--sl-font-weight-semibold);
                    margin-bottom: 0.5rem;
                    color: var(--sl-color-neutral-700);
                }
                .export-section sl-radio-group,
                .export-section #export-rows-group {
                    margin-top: 1rem;
                }
                sl-dialog::part(footer) {
                    display: flex;
                    justify-content: space-between;
                }
            </style>
            <sl-tooltip content="Exportovat do Excelu">
                <sl-button class="export-btn">
                    <sl-icon name="download"></sl-icon>
                </sl-button>
            </sl-tooltip>
            <!-- Export dialog -->
            <sl-dialog id="export-dialog" label="Export do Excelu" hidden>
                <div class="export-options">
                    <div id="export-rows-section" class="export-section export-rows-section">
                        <div class="export-section-title">Řádky</div>
                        <div id="export-rows-group"></div>
                    </div>
                    <div id="export-columns-section" class="export-section">
                        <div class="export-section-title">Sloupce</div>
                        <sl-radio-group id="export-columns-group"></sl-radio-group>
                    </div>
                </div>
                <sl-button slot="footer" variant="default" id="export-cancel-btn">Zrušit</sl-button>
                <sl-button slot="footer" variant="primary" id="export-confirm-btn">Exportovat</sl-button>
            </sl-dialog>
        `;
    }

    static get observedAttributes() {
        return [];
    }

    connectedCallback() {
        this.selectedRowOptions = new Set();
        this.setupEventListeners();
    }

    setExportData(dataProvider) {
        this.dataProvider = dataProvider;
    }

    updateRowCounts() {
        const rowsGroup = this.querySelector('#export-rows-group');
        const colsGroup = this.querySelector('#export-columns-group');
        const rowsTitle = this.querySelector('#export-rows-section .export-section-title');
        const colsTitle = this.querySelector('#export-columns-section .export-section-title');

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
    }

    setupEventListeners() {
        const button = this.querySelector('.export-btn');
        if (button) {
            button.addEventListener('click', () => {
                this.onExportClick();
            });
        }

        // Dialog event listeners
        const cancelBtn = this.querySelector('#export-cancel-btn');
        const confirmBtn = this.querySelector('#export-confirm-btn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                const dialog = this.querySelector('#export-dialog');
                if (dialog) dialog.hide();
            });
        }
        if (confirmBtn) {
            confirmBtn.addEventListener('click', () => {
                this.onExportConfirm();
            });
        }
    }

    // Export helpers
    getExportableRows(option) {
        const { tableData, selectedRowIds, getSortedActiveData } = this.dataProvider();
        // option: 'all' | 'filtered' | 'selected' | 'filtered-selected'
        if (option === 'selected') {
            const selected = tableData.filter(r => selectedRowIds.has(r.id));
            return selected;
        }
        if (option === 'filtered') {
            return getSortedActiveData();
        }
        if (option === 'filtered-selected') {
            // Selected rows from sorted filtered data
            const sortedFilteredData = getSortedActiveData();
            return sortedFilteredData.filter(r => selectedRowIds.has(r.id));
        }
        return tableData;
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
        const dlg = this.querySelector('#export-dialog');
        const rowsGroup = this.querySelector('#export-rows-group');
        const colsGroup = this.querySelector('#export-columns-group');
        const rowsSection = this.querySelector('#export-rows-section');
        const colsSection = this.querySelector('#export-columns-section');
        const rowsTitle = this.querySelector('#export-rows-section .export-section-title');
        const colsTitle = this.querySelector('#export-columns-section .export-section-title');
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
                container.style.marginBottom = '0.5rem';
                
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
        const dlg = this.querySelector('#export-dialog');
        const rowsGroup = this.querySelector('#export-rows-group');
        const colsGroup = this.querySelector('#export-columns-group');

        // Get selected checkboxes for rows
        const checkedBoxes = rowsGroup.querySelectorAll('sl-checkbox[checked]');
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

    // Import helpers
    processImport(obj) {
        console.log('processImport:', obj);
        // Dispatch custom event for parent to handle
        this.dispatchEvent(new CustomEvent('import-row', { detail: { row: obj } }));
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
                } 
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