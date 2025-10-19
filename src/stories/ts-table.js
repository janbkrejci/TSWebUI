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
        this.predefinedFilters = {};
        
        // UI visibility flags
        this.showColumnSelector = true;
        this.showImportButton = true;
        this.showExportButton = true;
        this.showCreateButton = true;
        
        // Feature flags
        this.enableSorting = true;
        this.enableFiltering = true;
        this.enableColumnResizing = true;
        this.enableColumnReordering = true;
        this.enableSelection = true;
        this.enableRowMenu = true;
        this.enableClickableRows = true;
        this.enablePagination = true;
        
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
                    margin-bottom: 1rem;
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
    
    static get observedAttributes() {
        return [
            'table-data',
            'column-definitions',
            'show-create-button',
            'show-import-button',
            'show-export-button',
            'show-column-selector',
            'enable-sorting',
            'enable-filtering',
            'enable-column-resizing',
            'enable-column-reordering',
            'enable-selection',
            'enable-row-menu',
            'enable-clickable-rows',
            'enable-clickable-columns',
            'enable-pagination',
            'single-item-actions',
            'multiple-items-actions',
            'preselected-columns',
            'unhideable-columns',
            'unshowable-columns',
            'items-per-page',
            'items-per-page-options',
            'predefined-filters'
        ];
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;
        
        // Parse boolean attributes
        const boolValue = newValue !== 'false' && newValue !== null;
        
        switch(name) {
            case 'table-data':
                if (newValue) {
                    try {
                        const data = JSON.parse(newValue);
                        this.setData(data);
                    } catch (e) {
                        console.error('Failed to parse table-data attribute:', e);
                    }
                }
                break;
            case 'column-definitions':
                if (newValue) {
                    try {
                        const columns = JSON.parse(newValue);
                        this.setColumnDefinitions(columns);
                    } catch (e) {
                        console.error('Failed to parse column-definitions attribute:', e);
                    }
                }
                break;
            case 'show-create-button':
                this.showCreateButton = boolValue;
                if (this.toolbar) {
                    this.toolbar.setShowCreateButton(this.showCreateButton);
                }
                break;
            case 'show-import-button':
                this.showImportButton = boolValue;
                if (this.toolbar) {
                    this.toolbar.setShowImportButton(this.showImportButton);
                }
                break;
            case 'show-export-button':
                this.showExportButton = boolValue;
                if (this.toolbar) {
                    this.toolbar.setShowExportButton(this.showExportButton);
                }
                break;
            case 'show-column-selector':
                this.showColumnSelector = boolValue;
                if (this.toolbar) {
                    this.toolbar.setShowColumnSelector(this.showColumnSelector);
                }
                break;
            case 'enable-sorting':
                this.enableSorting = boolValue;
                if (this.datatable) {
                    this.datatable.setEnableSorting(this.enableSorting);
                }
                break;
            case 'enable-filtering':
                this.enableFiltering = boolValue;
                if (this.datatable) {
                    this.datatable.setEnableFiltering(this.enableFiltering);
                }
                break;
            case 'enable-column-resizing':
                this.enableColumnResizing = boolValue;
                if (this.datatable) {
                    this.datatable.setEnableColumnResizing(this.enableColumnResizing);
                }
                break;
            case 'enable-column-reordering':
                this.enableColumnReordering = boolValue;
                if (this.datatable) {
                    this.datatable.setEnableColumnReordering(this.enableColumnReordering);
                }
                break;
            case 'enable-selection':
                this.enableSelection = boolValue;
                if (this.datatable) {
                    this.datatable.setEnableSelection(this.enableSelection);
                }
                break;
            case 'enable-row-menu':
                this.enableRowMenu = boolValue;
                if (this.datatable) {
                    this.datatable.setEnableRowMenu(this.enableRowMenu);
                }
                break;
            case 'enable-clickable-rows':
                this.enableClickableRows = boolValue;
                if (this.datatable) {
                    this.datatable.setEnableClickableRows(this.enableClickableRows);
                }
                break;
            case 'enable-clickable-columns':
                this.enableClickableColumns = boolValue;
                if (this.datatable) {
                    this.datatable.setEnableClickableColumns(this.enableClickableColumns);
                }
                break;
            case 'enable-pagination':
                this.enablePagination = boolValue;
                if (this.datatable) {
                    this.datatable.setEnablePagination(this.enablePagination);
                }
                if (this.pager) {
                    this.pager.style.display = this.enablePagination ? '' : 'none';
                }
                break;
            case 'single-item-actions':
                if (newValue) {
                    this.setSingleItemActions(newValue);
                }
                break;
            case 'multiple-items-actions':
                if (newValue) {
                    this.setMultipleItemsActions(newValue);
                }
                break;
            case 'preselected-columns':
                if (newValue) {
                    // Parse comma-separated list or JSON array
                    try {
                        const cols = newValue.startsWith('[') ? JSON.parse(newValue) : newValue.split(',').map(s => s.trim());
                        this.setPreselectedColumns(cols);
                    } catch (e) {
                        console.error('Failed to parse preselected-columns attribute:', e);
                    }
                }
                break;
            case 'unhideable-columns':
                if (newValue) {
                    try {
                        const cols = newValue.startsWith('[') ? JSON.parse(newValue) : newValue.split(',').map(s => s.trim());
                        this.setUnhideableColumns(cols);
                    } catch (e) {
                        console.error('Failed to parse unhideable-columns attribute:', e);
                    }
                }
                break;
            case 'unshowable-columns':
                if (newValue) {
                    try {
                        const cols = newValue.startsWith('[') ? JSON.parse(newValue) : newValue.split(',').map(s => s.trim());
                        this.setUnshowableColumns(cols);
                    } catch (e) {
                        console.error('Failed to parse unshowable-columns attribute:', e);
                    }
                }
                break;
            case 'items-per-page':
                if (newValue) {
                    const num = parseInt(newValue, 10);
                    if (!isNaN(num)) {
                        this.setItemsPerPage(num);
                    }
                }
                break;
            case 'items-per-page-options':
                if (newValue) {
                    try {
                        const opts = newValue.startsWith('[') ? JSON.parse(newValue) : newValue.split(',').map(s => {
                            const n = parseInt(s.trim(), 10);
                            return isNaN(n) ? -1 : n;
                        });
                        this.setItemsPerPageOptions(opts);
                    } catch (e) {
                        console.error('Failed to parse items-per-page-options attribute:', e);
                    }
                }
                break;
            case 'predefined-filters':
                if (newValue) {
                    try {
                        const filters = JSON.parse(newValue);
                        this.setPredefinedFilters(filters);
                    } catch (e) {
                        console.error('Failed to parse predefined-filters attribute:', e);
                    }
                }
                break;
        }
    }
    
    connectedCallback() {
        // Get component references
        this.datatable = this.querySelector('#datatable');
        this.toolbar = this.querySelector('#toolbar');
        this.pager = this.querySelector('#pager');
        
        // Apply initial attribute values
        this.applyInitialAttributes();
        
        // Setup event listeners
        this.setupEventListeners();
    }
    
    applyInitialAttributes() {
        // Apply all attributes that were set in HTML
        const attrs = this.constructor.observedAttributes;
        attrs.forEach(attr => {
            if (this.hasAttribute(attr)) {
                const value = this.getAttribute(attr);
                this.attributeChangedCallback(attr, null, value);
            }
        });
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
            
            this.datatable.setSelectedRows(selectedRows);
            this.datatable.setSelectionCount(selectedCount);
            
            if (selectedCount > 0) {
                this.datatable.showSelectionMenu();
            } else {
                this.datatable.hideSelectionMenu();
            }
        });
        
        this.datatable.addEventListener('filters-changed', (event) => {
            const { columnFilters, hasActiveFilters } = event.detail;
            this.toolbar.setColumnFilters(columnFilters);
        });
        
        this.datatable.addEventListener('column-order-changed', (event) => {
            const { columnDefinitions } = event.detail;
            // Update column definitions in toolbar (which will refresh column selector)
            this.toolbar.setColumnDefinitions(columnDefinitions);
        });
        
        // Public events bubble naturally from child components:
        // - create-new-record (from create-record-button)
        // - selection-action-activated (from selection-menu and datatable)
        // - row-clicked (from datatable)
        // - do-import (from import-button)
        
        // Internal events - catch and stop propagation
        this.addEventListener('unselect-all-rows', (event) => {
            event.stopPropagation();
            this.datatable.unselectAllRows();
        });
        
        this.addEventListener('column-visibility-changed', (event) => {
            event.stopPropagation();
            const { columnKey, visible } = event.detail;
            this.datatable.updateColumnVisibility(columnKey, visible);
        });
        
        this.addEventListener('clear-filters', (event) => {
            event.stopPropagation();
            this.datatable.clearFilters();
        });
        
        this.addEventListener('select-all-columns', (event) => {
            event.stopPropagation();
            this.columnDefinitions.forEach(col => {
                if (!this.unshowableColumns.includes(col.key)) {
                    this.datatable.updateColumnVisibility(col.key, true);
                }
            });
            this.toolbar.refreshColumnMenu();
        });
        
        this.addEventListener('clear-all-columns', (event) => {
            event.stopPropagation();
            this.columnDefinitions.forEach(col => {
                if (!this.unhideableColumns.includes(col.key)) {
                    this.datatable.updateColumnVisibility(col.key, false);
                }
            });
            this.toolbar.refreshColumnMenu();
        });
        
        // Pager events
        this.addEventListener('page-changed', (event) => {
            event.stopPropagation();
            const { page } = event.detail;
            this.datatable.goToPage(page);
        });
        
        this.addEventListener('page-size-changed', (event) => {
            event.stopPropagation();
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
    
    setPredefinedFilters(filters) {
        this.predefinedFilters = filters;
        if (this.datatable) {
            this.datatable.setPredefinedFilters(filters);
        }
    }
    
    setShowColumnSelector(show) {
        this.showColumnSelector = show !== false;
        if (this.toolbar) {
            this.toolbar.setShowColumnSelector(this.showColumnSelector);
            this.updateToolbarVisibility();
        }
    }
    
    setShowImportButton(show) {
        this.showImportButton = show !== false;
        if (this.toolbar) {
            this.toolbar.setShowImportButton(this.showImportButton);
            this.updateToolbarVisibility();
        }
    }
    
    setShowExportButton(show) {
        this.showExportButton = show !== false;
        if (this.toolbar) {
            this.toolbar.setShowExportButton(this.showExportButton);
            this.updateToolbarVisibility();
        }
    }
    
    setShowCreateButton(show) {
        this.showCreateButton = show !== false;
        if (this.toolbar) {
            this.toolbar.setShowCreateButton(this.showCreateButton);
            this.updateToolbarVisibility();
        }
    }
    
    updateToolbarVisibility() {
        if (!this.toolbar) return;
        
        // Check if all toolbar items are disabled
        const allDisabled = !this.showColumnSelector && 
                           !this.showImportButton && 
                           !this.showExportButton && 
                           !this.showCreateButton;
        
        // Hide toolbar if all items are disabled
        if (allDisabled) {
            this.toolbar.style.display = 'none';
        } else {
            this.toolbar.style.display = '';
        }
    }
    
    setEnableSorting(enable) {
        this.enableSorting = enable !== false;
        if (this.datatable) {
            this.datatable.setEnableSorting(this.enableSorting);
        }
    }
    
    setEnableFiltering(enable) {
        this.enableFiltering = enable !== false;
        if (this.datatable) {
            this.datatable.setEnableFiltering(this.enableFiltering);
        }
    }
    
    setEnableColumnResizing(enable) {
        this.enableColumnResizing = enable !== false;
        if (this.datatable) {
            this.datatable.setEnableColumnResizing(this.enableColumnResizing);
        }
    }
    
    setEnableColumnReordering(enable) {
        this.enableColumnReordering = enable !== false;
        if (this.datatable) {
            this.datatable.setEnableColumnReordering(this.enableColumnReordering);
        }
    }
    
    setEnableSelection(enable) {
        this.enableSelection = enable !== false;
        if (this.datatable) {
            this.datatable.setEnableSelection(this.enableSelection);
        }
    }
    
    setEnableRowMenu(enable) {
        this.enableRowMenu = enable !== false;
        if (this.datatable) {
            this.datatable.setEnableRowMenu(this.enableRowMenu);
        }
    }
    
    setEnableClickableRows(enable) {
        this.enableClickableRows = enable !== false;
        if (this.datatable) {
            this.datatable.setEnableClickableRows(this.enableClickableRows);
        }
    }
    
    setEnableClickableColumns(enable) {
        this.enableClickableColumns = enable !== false;
        if (this.datatable) {
            this.datatable.setEnableClickableColumns(this.enableClickableColumns);
        }
    }
    
    setEnablePagination(enable) {
        this.enablePagination = enable !== false;
        if (this.datatable) {
            this.datatable.setEnablePagination(this.enablePagination);
        }
        if (this.pager) {
            this.pager.style.display = this.enablePagination ? '' : 'none';
        }
    }
    
    setSingleItemActions(actions) {
        this.singleItemActions = actions;
        if (this.datatable) {
            // Set row menu actions
            this.datatable.setMenuActions(actions);
            
            // Set selection menu actions
            const selectionMenu = this.datatable.getSelectionMenu();
            if (selectionMenu) {
                selectionMenu.setAttribute('single-item-actions', actions);
            }
        }
    }

    setMultipleItemsActions(actions) {
        this.multipleItemsActions = actions;
        if (this.datatable) {
            const selectionMenu = this.datatable.getSelectionMenu();
            if (selectionMenu) {
                selectionMenu.setAttribute('multiple-items-actions', actions);
            }
        }
    }
    
    showImportResults(results) {
        if (this.toolbar) {
            this.toolbar.showImportResults(results);
        }
    }
    
    // Public methods for import processing (delegate to datatable)
    getAllRows() {
        return this.datatable ? this.datatable.getAllRows() : [];
    }
    
    updateExistingRow(id, data) {
        if (this.datatable) {
            this.datatable.updateExistingRow(id, data);
        }
    }
    
    addImportedRow(data) {
        if (this.datatable) {
            this.datatable.addImportedRow(data);
        }
    }
    
    run() {
        if (!this.datatable || !this.toolbar) return;
        
        // Set predefined filters before initializing
        if (Object.keys(this.predefinedFilters).length > 0) {
            this.datatable.setPredefinedFilters(this.predefinedFilters);
        }
        
        // Initialize datatable
        this.datatable.initialize();
        
        // Set selection menu actions after datatable is initialized
        if (this.singleItemActions) {
            this.setSingleItemActions(this.singleItemActions);
        }
        if (this.multipleItemsActions) {
            this.setMultipleItemsActions(this.multipleItemsActions);
        }
        
        // Configure toolbar
        this.toolbar.setColumnFilters({});
        
        // Set toolbar visibility options
        this.toolbar.setShowColumnSelector(this.showColumnSelector);
        this.toolbar.setShowImportButton(this.showImportButton);
        this.toolbar.setShowExportButton(this.showExportButton);
        this.toolbar.setShowCreateButton(this.showCreateButton);
        
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
