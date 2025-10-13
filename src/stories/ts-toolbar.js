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
                    padding: 0.5rem 0;
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
            </style>
            <div class="toolbar">
                <div class="toolbar-left">
                    <ts-create-record-button id="create-record-btn"></ts-create-record-button>
                </div>
                <div class="toolbar-center">
                    <ts-selection-menu id="selection-menu"></ts-selection-menu>
                    <ts-import-button id="import-btn"></ts-import-button>
                    <ts-export-button id="export-btn"></ts-export-button>
                </div>
                <div class="toolbar-right">
                    <ts-column-selector id="column-selector"></ts-column-selector>
                </div>
            </div>
        `;
    }

    static get observedAttributes() {
        return [
            'single-item-actions',
            'multiple-items-actions'
        ];
    }

    connectedCallback() {
        this.setupEventForwarding();
        this.updateChildAttributes();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.updateChildAttributes();
        }
    }

    updateChildAttributes() {
        // Forward attributes to selection menu
        const selectionMenu = this.querySelector('#selection-menu');
        if (selectionMenu) {
            const singleItemActions = this.getAttribute('single-item-actions');
            const multipleItemsActions = this.getAttribute('multiple-items-actions');
            
            if (singleItemActions) {
                selectionMenu.setAttribute('single-item-actions', singleItemActions);
            }
            if (multipleItemsActions) {
                selectionMenu.setAttribute('multiple-items-actions', multipleItemsActions);
            }
        }
    }

    setupEventForwarding() {
        // create-new-record and selection-action-activated already bubble naturally
        
        // Forward events from selection-menu
        const selectionMenu = this.querySelector('#selection-menu');
        if (selectionMenu) {
            selectionMenu.addEventListener('unselect-all-rows', (event) => {
                this.dispatchEvent(new CustomEvent('unselect-all-rows', { 
                    detail: event.detail
                    // Internal event, no bubbles
                }));
            });
        }

        // Note: do-import event from import-button bubbles naturally, no need to forward

        // Forward events from column-selector (internal events)
        const columnSelector = this.querySelector('#column-selector');
        if (columnSelector) {
            columnSelector.addEventListener('column-visibility-changed', (event) => {
                this.dispatchEvent(new CustomEvent('column-visibility-changed', { 
                    detail: event.detail
                    // Internal event, no bubbles
                }));
            });

            columnSelector.addEventListener('clear-filters', (event) => {
                this.dispatchEvent(new CustomEvent('clear-filters', { 
                    detail: event.detail
                    // Internal event, no bubbles
                }));
            });

            columnSelector.addEventListener('select-all-columns', (event) => {
                this.dispatchEvent(new CustomEvent('select-all-columns', { 
                    detail: event.detail
                    // Internal event, no bubbles
                }));
            });

            columnSelector.addEventListener('clear-all-columns', (event) => {
                this.dispatchEvent(new CustomEvent('clear-all-columns', { 
                    detail: event.detail
                    // Internal event, no bubbles
                }));
            });
        }
    }

    // Proxy methods to access child components

    // Selection Menu methods
    getSelectionMenu() {
        return this.querySelector('#selection-menu');
    }

    showSelectionMenu() {
        const selectionMenu = this.getSelectionMenu();
        if (selectionMenu && typeof selectionMenu.show === 'function') {
            selectionMenu.show();
        }
    }

    hideSelectionMenu() {
        const selectionMenu = this.getSelectionMenu();
        if (selectionMenu && typeof selectionMenu.hide === 'function') {
            selectionMenu.hide();
        }
    }

    setSelectedRows(selectedRows) {
        const selectionMenu = this.getSelectionMenu();
        if (selectionMenu && typeof selectionMenu.setSelectedRows === 'function') {
            selectionMenu.setSelectedRows(selectedRows);
        }
    }

    setSelectionCount(count) {
        const selectionMenu = this.getSelectionMenu();
        if (selectionMenu && typeof selectionMenu.setSelectionCount === 'function') {
            selectionMenu.setSelectionCount(count);
        }
    }

    setSingleItemActions(actions) {
        this.setAttribute('single-item-actions', actions);
    }

    setMultipleItemsActions(actions) {
        this.setAttribute('multiple-items-actions', actions);
    }

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

    // Create Record Button methods
    getCreateRecordButton() {
        return this.querySelector('#create-record-btn');
    }
}

customElements.define('ts-toolbar', TSToolbar);

export { TSToolbar };
