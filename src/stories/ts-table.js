// Import all web components
import './ts-table-pager.js';
import './ts-toolbar.js';
import './ts-datatable.js';
import './ts-create-record-button.js';
import './ts-export-button.js';
import './ts-import-button.js';
import './ts-selection-menu.js';
import './ts-column-selector.js';

class TSTable extends HTMLElement {
    constructor() {
        super();
        
        // Internal data
        this.tableData = [];
        this.columnDefinitions = [];
        this.preselectedColumns = [];
        this.unhideableColumns = [];
        this.unshowableColumns = [];
        this.singleItemActions = '';
        this.multipleItemsActions = '';
        this.itemsPerPage = 5;
        this.itemsPerPageOptions = [5, 10, 20, 50, 100];
        
        // Component references
        this.datatable = null;
        this.toolbar = null;
        this.pager = null;
        
        // Create structure
        this.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                }
                
                .ts-table-container {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    gap: 0;
                }
                
                #toolbar {
                    width: 100%;
                    flex-shrink: 0;
                }
                
                .datatable-wrapper {
                    width: 100%;
                    overflow-x: auto;
                    flex-shrink: 0;
                }
                
                #datatable {
                    min-width: 100%;
                }
                
                #pager {
                    width: 100%;
                    flex-shrink: 0;
                }
            </style>
            <div class="ts-table-container">
                <ts-toolbar id="toolbar"></ts-toolbar>
                <div class="datatable-wrapper">
                    <ts-datatable id="datatable"></ts-datatable>
                </div>
                <ts-table-pager id="pager"></ts-table-pager>
            </div>
        `;
    }
    
    connectedCallback() {
        // Get component references
        this.datatable = this.querySelector('#datatable');
        this.toolbar = this.querySelector('#toolbar');
        this.pager = this.querySelector('#pager');
        
        // Setup event listeners
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        if (!this.datatable || !this.toolbar || !this.pager) return;
        
        // Datatable events
        this.datatable.addEventListener('pagination-changed', (event) => {
            const { totalRecordsCount, filteredRecordsCount, pageSize, currentPage, pageSizes } = event.detail;
            this.pager.setAttribute('totalrecordscount', totalRecordsCount);
            this.pager.setAttribute('filteredrecordscount', filteredRecordsCount);
            this.pager.setAttribute('pagesize', pageSize);
            this.pager.setAttribute('currentpage', currentPage);
            this.pager.setAttribute('pagesizes', JSON.stringify(pageSizes));
        });
        
        this.datatable.addEventListener('selection-changed', (event) => {
            const { selectedRowIds, selectedCount } = event.detail;
            
            // Convert IDs to row objects
            const selectedRows = selectedRowIds
                .map(id => this.datatable.tableData.find(r => String(r.id) === String(id)))
                .filter(r => r !== undefined);
            
            this.toolbar.setSelectedRows(selectedRows);
            this.toolbar.setSelectionCount(selectedCount);
            
            if (selectedCount > 0) {
                this.toolbar.showSelectionMenu();
            } else {
                this.toolbar.hideSelectionMenu();
            }
        });
        
        this.datatable.addEventListener('filters-changed', (event) => {
            const { columnFilters, hasActiveFilters } = event.detail;
            this.toolbar.setColumnFilters(columnFilters);
        });
        
        // Forward row-action event as selection-action-activated with rows array
        this.datatable.addEventListener('row-action', (event) => {
            const { action, row } = event.detail;
            this.dispatchEvent(new CustomEvent('selection-action-activated', {
                detail: { action, rows: [row] },
                bubbles: true,
                composed: true
            }));
        });
        
        // Toolbar events
        this.toolbar.addEventListener('new-record', () => {
            this.dispatchEvent(new CustomEvent('create-new-record', {
                bubbles: true,
                composed: true
            }));
        });
        
        this.toolbar.addEventListener('selection-action-activated', (event) => {
            event.stopPropagation(); // Stop forwarded event from bubbling further
            const { action, selectedRows } = event.detail;
            this.dispatchEvent(new CustomEvent('selection-action-activated', {
                detail: { action, rows: selectedRows || [] },
                bubbles: true,
                composed: true
            }));
        });
        
        this.toolbar.addEventListener('unselect-all-rows', () => {
            this.datatable.unselectAllRows();
        });
        
        // Note: do-import event from toolbar bubbles naturally, no need to forward
        
        this.toolbar.addEventListener('column-visibility-changed', (event) => {
            const { columnKey, visible } = event.detail;
            this.datatable.updateColumnVisibility(columnKey, visible);
        });
        
        this.toolbar.addEventListener('clear-filters', () => {
            this.datatable.clearFilters();
        });
        
        this.toolbar.addEventListener('select-all-columns', () => {
            this.columnDefinitions.forEach(col => {
                if (!this.unshowableColumns.includes(col.key)) {
                    this.datatable.updateColumnVisibility(col.key, true);
                }
            });
            this.toolbar.refreshColumnMenu();
        });
        
        this.toolbar.addEventListener('clear-all-columns', () => {
            this.columnDefinitions.forEach(col => {
                if (!this.unhideableColumns.includes(col.key)) {
                    this.datatable.updateColumnVisibility(col.key, false);
                }
            });
            this.toolbar.refreshColumnMenu();
        });
        
        // Pager events
        this.pager.addEventListener('page-changed', (event) => {
            const { page } = event.detail;
            this.datatable.goToPage(page);
        });
        
        this.pager.addEventListener('page-size-changed', (event) => {
            const { pageSize } = event.detail;
            this.datatable.changePageSize(pageSize);
        });
    }
    
    // Public API methods
    setData(data) {
        this.tableData = data;
        if (this.datatable) {
            this.datatable.setData(data);
        }
    }
    
    setColumnDefinitions(definitions) {
        this.columnDefinitions = definitions;
        if (this.datatable) {
            this.datatable.setColumnDefinitions(definitions);
        }
        if (this.toolbar) {
            this.toolbar.setColumnDefinitions(definitions);
        }
    }
    
    setPreselectedColumns(columns) {
        this.preselectedColumns = columns;
        if (this.datatable) {
            this.datatable.setPreselectedColumns(columns);
        }
    }
    
    setUnhideableColumns(columns) {
        this.unhideableColumns = columns;
        if (this.datatable) {
            this.datatable.setUnhideableColumns(columns);
        }
        if (this.toolbar) {
            this.toolbar.setUnhideableColumns(columns);
        }
    }
    
    setUnshowableColumns(columns) {
        this.unshowableColumns = columns;
        if (this.datatable) {
            this.datatable.setUnshowableColumns(columns);
        }
        if (this.toolbar) {
            this.toolbar.setUnshowableColumns(columns);
        }
    }
    
    setSingleItemActions(actions) {
        this.singleItemActions = actions;
        if (this.datatable) {
            this.datatable.setMenuActions(actions);
        }
        if (this.toolbar) {
            this.toolbar.setSingleItemActions(actions);
        }
    }
    
    setMultipleItemsActions(actions) {
        this.multipleItemsActions = actions;
        if (this.toolbar) {
            this.toolbar.setMultipleItemsActions(actions);
        }
    }
    
    setItemsPerPage(count) {
        this.itemsPerPage = count;
        if (this.datatable) {
            this.datatable.itemsPerPage = count;
        }
    }
    
    setItemsPerPageOptions(options) {
        this.itemsPerPageOptions = options;
        if (this.datatable) {
            this.datatable.availablePageSizes = options;
        }
    }
    
    initialize() {
        if (!this.datatable || !this.toolbar) return;
        
        // Initialize datatable
        this.datatable.initialize();
        
        // Configure toolbar
        this.toolbar.setColumnFilters({});
        
        // Configure toolbar export data provider
        this.toolbar.setExportData(() => ({
            tableData: this.datatable.getAllRows(),
            columnDefinitions: this.datatable.getColumnDefinitions(),
            selectedRowIds: this.datatable.selectedRowIds, // Keep as Set, don't convert to Array
            columnFilters: this.datatable.getColumnFilters(),
            getVisibleColumns: () => this.datatable.getVisibleColumns(),
            filteredData: this.datatable.getFilteredRows(),
            getSortedActiveData: () => this.datatable.getFilteredRows(),
            getAllSortedRows: () => this.datatable.getAllSortedRows() // All data sorted
        }));
        
        // Configure toolbar import data provider
        this.toolbar.setImportData(() => ({
            columnDefinitions: this.datatable.getColumnDefinitions()
        }));
    }
}

customElements.define('ts-table', TSTable);

// Export all web components for external use
export { TSTable };
export { TSTablePager } from './ts-table-pager.js';
export { TSToolbar } from './ts-toolbar.js';
export { TSDataTable } from './ts-datatable.js';
export { TSCreateRecordButton } from './ts-create-record-button.js';
export { TSExportButton } from './ts-export-button.js';
export { TSImportButton } from './ts-import-button.js';
export { TSSelectionMenu } from './ts-selection-menu.js';
export { TSColumnSelector } from './ts-column-selector.js';
