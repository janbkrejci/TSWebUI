class TSToolbar extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                }
                
                .toolbar {
                    display: grid;
                    grid-template-columns: 1fr auto 1fr;
                    align-items: center;
                    padding: 0;
                    gap: 0.5rem;
                    width: 100%;
                    box-sizing: border-box;
                }
                
                .toolbar-left {
                    justify-self: start;
                }
                
                .toolbar-center {
                    justify-self: center;
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                }
                
                .toolbar-right {
                    justify-self: end;
                }
                
                .toolbar-right-placeholder {
                    justify-self: end;
                }
                
                .hidden {
                    display: none;
                }
            </style>
            <div class="toolbar">
                <div class="toolbar-left">
                    <ts-create-record-button id="create-record-btn"></ts-create-record-button>
                </div>
                <div class="toolbar-center">
                    <ts-import-button id="import-btn"></ts-import-button>
                    <ts-export-button id="export-btn"></ts-export-button>
                </div>
                <div class="toolbar-right" id="toolbar-right">
                    <ts-column-selector id="column-selector"></ts-column-selector>
                </div>
                <div class="toolbar-right-placeholder hidden" id="toolbar-right-placeholder"></div>
            </div>
        `;
    }

    connectedCallback() {
    }

    // Proxy methods to access child components

    // Import Button methods
    getImportButton() {
        return this.querySelector('#import-btn');
    }

    setImportData(dataProvider) {
        const importBtn = this.getImportButton();
        if (importBtn && typeof importBtn.setImportData === 'function') {
            importBtn.setImportData(dataProvider);
        }
    }

    showImportResults(results) {
        const importBtn = this.getImportButton();
        if (importBtn && typeof importBtn.showImportResults === 'function') {
            importBtn.showImportResults(results);
        }
    }

    setColumnsRequiredForImport(columns) {
        const importBtn = this.getImportButton();
        if (importBtn && typeof importBtn.setColumnsRequiredForImport === 'function') {
            importBtn.setColumnsRequiredForImport(columns);
        }
    }

    // Export Button methods
    getExportButton() {
        return this.querySelector('#export-btn');
    }

    setExportData(dataProvider) {
        const exportBtn = this.getExportButton();
        if (exportBtn && typeof exportBtn.setExportData === 'function') {
            exportBtn.setExportData(dataProvider);
        }
    }

    // Column Selector methods
    getColumnSelector() {
        return this.querySelector('#column-selector');
    }

    setColumnDefinitions(columnDefinitions) {
        const columnSelector = this.getColumnSelector();
        if (columnSelector && typeof columnSelector.setColumnDefinitions === 'function') {
            columnSelector.setColumnDefinitions(columnDefinitions);
        }
    }

    setColumnFilters(columnFilters) {
        const columnSelector = this.getColumnSelector();
        if (columnSelector && typeof columnSelector.setColumnFilters === 'function') {
            columnSelector.setColumnFilters(columnFilters);
        }
    }

    setUnshowableColumns(unshowableColumns) {
        const columnSelector = this.getColumnSelector();
        if (columnSelector && typeof columnSelector.setUnshowableColumns === 'function') {
            columnSelector.setUnshowableColumns(unshowableColumns);
        }
    }

    setUnhideableColumns(unhideableColumns) {
        const columnSelector = this.getColumnSelector();
        if (columnSelector && typeof columnSelector.setUnhideableColumns === 'function') {
            columnSelector.setUnhideableColumns(unhideableColumns);
        }
    }

    refreshColumnMenu() {
        const columnSelector = this.getColumnSelector();
        if (columnSelector && typeof columnSelector.refreshMenu === 'function') {
            columnSelector.refreshMenu();
        }
    }
    
    setShowColumnSelector(show) {
        const toolbarRight = this.querySelector('#toolbar-right');
        const placeholder = this.querySelector('#toolbar-right-placeholder');
        
        if (show) {
            if (toolbarRight) toolbarRight.classList.remove('hidden');
            if (placeholder) placeholder.classList.add('hidden');
        } else {
            if (toolbarRight) toolbarRight.classList.add('hidden');
            if (placeholder) placeholder.classList.remove('hidden');
        }
    }
    
    setShowImportButton(show) {
        const importBtn = this.querySelector('#import-btn');
        if (importBtn) {
            if (show) {
                importBtn.classList.remove('hidden');
            } else {
                importBtn.classList.add('hidden');
            }
        }
    }
    
    setShowExportButton(show) {
        const exportBtn = this.querySelector('#export-btn');
        if (exportBtn) {
            if (show) {
                exportBtn.classList.remove('hidden');
            } else {
                exportBtn.classList.add('hidden');
            }
        }
    }
    
    setShowCreateButton(show) {
        const createBtn = this.querySelector('#create-record-btn');
        if (createBtn) {
            if (show) {
                createBtn.classList.remove('hidden');
            } else {
                createBtn.classList.add('hidden');
            }
        }
    }

    // Create Record Button methods
    getCreateRecordButton() {
        return this.querySelector('#create-record-btn');
    }
}

customElements.define('ts-toolbar', TSToolbar);

export { TSToolbar };
