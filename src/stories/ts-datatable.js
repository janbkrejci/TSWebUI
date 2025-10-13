class TSDataTable extends HTMLElement {
    constructor() {
        super();
        
        // State
        this.tableData = [];
        this.columnDefinitions = [];
        this.currentPage = 1;
        this.itemsPerPage = 5;
        this.availablePageSizes = [5, 10, 20, 50, 100];
        this.columnFilters = {};
        this.filteredData = [];
        this.filterTimeout = null;
        this.FILTER_DEBOUNCE_DELAY = 500;
        this.selectedRowIds = new Set();
        this.selectionViewMode = 'all';
        this.menuActions = [];
        this.preselectedColumns = [];
        this.unhideableColumns = [];
        this.unshowableColumns = [];
        
        // Resize state
        this.isResizing = false;
        this.resizeColKey = null;
        this.startX = 0;
        this.startWidth = 0;
        this.lastResizeEnd = 0;
        
        // Dropdown state
        this.currentOpenDropdown = null;
        
        // Create basic structure
        this.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                }
                
                /* Utility classes */
                .invisible {
                    visibility: hidden !important;
                }
                
                .hidden {
                    display: none !important;
                }
                
                #table-container {
                    position: relative;
                    width: 100%;
                    user-select: none;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                }
                
                /* Table base styles */
                #data-table {
                    table-layout: fixed;
                    width: max-content;
                    border-collapse: separate;
                    border-spacing: 0;
                    background: var(--sl-color-neutral-0);
                    color: var(--sl-color-neutral-1000);
                    font-family: var(--sl-font-sans);
                    border-radius: var(--sl-border-radius-large);
                    overflow: hidden;
                }
                
                thead {
                    background: var(--sl-color-neutral-100);
                }
                
                th:not(.checkbox-column):not(.menu-column), 
                td:not(.checkbox-column):not(.menu-column) {
                    padding: 0.75em 1.25em;
                    border-bottom: 1px solid var(--sl-color-neutral-200);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    width: 200px;
                    max-width: 200px;
                }
                
                /* Ensure all cells have border */
                th, td {
                    border-bottom: 1px solid var(--sl-color-neutral-200);
                }
                
                th {
                    font-weight: var(--sl-font-weight-semibold);
                    color: var(--sl-color-neutral-900);
                    background: var(--sl-color-neutral-100);
                    text-align: left;
                    position: relative;
                    user-select: none;
                    overflow: visible;
                    padding-left: 8px;
                    padding-right: 24px;
                }
                
                tbody tr {
                    cursor: pointer;
                }
                
                tr:hover td {
                    background: var(--sl-color-primary-50);
                }
                
                /* Checkbox column */
                .checkbox-column {
                    width: 44px;
                    min-width: 44px;
                    max-width: 44px;
                    text-align: center;
                    padding: 0.75em 0.5em !important;
                }
                
                th.checkbox-column,
                td.checkbox-column {
                    width: 44px !important;
                    min-width: 44px !important;
                    max-width: 44px !important;
                    padding: 0 !important;
                }
                
                .checkbox-column .header-cell-content {
                    justify-content: center;
                    padding: 0.25em 0;
                }
                
                .checkbox-column sl-checkbox {
                    margin: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 24px;
                    min-width: 24px;
                }
                
                /* Menu column */
                .menu-column {
                    width: 44px;
                    min-width: 44px;
                    max-width: 44px;
                    text-align: center;
                    padding: 0.5em 0.25em !important;
                }
                
                th.menu-column,
                td.menu-column {
                    width: 44px !important;
                    min-width: 44px !important;
                    max-width: 44px !important;
                    padding: 0 !important;
                }
                
                /* Col elements for fixed columns */
                col[data-fixed="checkbox"],
                col[data-fixed="menu"] {
                    width: 44px;
                }
                
                /* Header cell content */
                .header-cell-content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0;
                    min-height: 24px;
                }
                
                .column-header-content {
                    display: flex;
                    align-items: center;
                    gap: 0.5em;
                    flex: 1;
                    min-width: 0;
                }
                
                /* Column ordering controls */
                .column-ordering-controls {
                    display: flex !important;
                    gap: 2px !important;
                    opacity: 0 !important;
                    transition: opacity 0.2s ease !important;
                    margin-left: auto !important;
                    position: static !important;
                    top: auto !important;
                    right: auto !important;
                    transform: none !important;
                    pointer-events: auto !important;
                    z-index: auto !important;
                }
                
                th:hover .column-ordering-controls {
                    opacity: 1 !important;
                }
                
                /* Filter row specific */
                .filter-row .checkbox-column {
                    padding: 0.5em 0.5em !important;
                }
                
                .checkbox-column .filter-cell-content {
                    text-align: center;
                    padding: 0.25em 0;
                }
                
                .checkbox-column .filter-cell-content sl-checkbox {
                    margin: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                
                /* Filter cell content */
                .filter-cell-content {
                    padding: 0;
                    padding-top: 4px;
                }
                
                .filter-cell-content sl-input,
                .filter-cell-content sl-dropdown {
                    width: 100%;
                }
                
                /* Sort indicator */
                .sort-indicator {
                    display: inline-block;
                    vertical-align: middle;
                    margin-left: 0.25em;
                    position: relative;
                    top: -2px;
                }
                
                .sort-svg {
                    vertical-align: middle;
                }
                
                /* Column resizer */
                .col-resizer {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 20px;
                    height: 100%;
                    cursor: col-resize;
                    user-select: none;
                    touch-action: none;
                    z-index: 2;
                }
                
                .col-resizer::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    right: 6px;
                    width: 3px;
                    background: var(--sl-color-neutral-200);
                    opacity: 0.6;
                }
                
                th:last-child .col-resizer::after {
                    right: 0;
                }
                
                .col-resizer:hover::after,
                th:hover .col-resizer::after {
                    background: var(--sl-color-neutral-400);
                    opacity: 1;
                }
                
                /* Selection view toggle */
                .selection-view-toggle {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 24px;
                    min-width: 24px;
                    margin-left: -7px;
                }
                
                .selection-view-toggle-btn-wrapper {
                    position: relative;
                    display: inline-block;
                }
                
                .selection-view-badge {
                    line-height: 1;
                    position: absolute;
                    right: -2px;
                    bottom: -2px;
                    font-size: 12px;
                }
                
                .selection-view-badge-hidden {
                    display: none;
                }
                
                /* Loading overlay */
                .table-loading-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: var(--sl-color-neutral-0);
                    opacity: 0.8;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    backdrop-filter: blur(1px);
                    pointer-events: none;
                }
                
                .table-loading-overlay.hidden {
                    display: none;
                }
                
                /* No data row */
                .no-data-row td {
                    text-align: center;
                    color: var(--sl-color-neutral-500);
                    font-style: italic;
                    padding: 0.75em 1.25em;
                }
            </style>
            </style>
            <div id="table-container">
                <table id="data-table">
                    <thead></thead>
                    <tbody></tbody>
                </table>
                <div id="table-loading-overlay" class="table-loading-overlay hidden"></div>
            </div>
        `;
    }
    
    // Lifecycle methods
    connectedCallback() {
        // Will be initialized via setData method
        this.setupBodyEvents();
        
        // Setup global listeners for resize
        window.addEventListener('resize', () => {
            if (this.isResizing) {
                this.stopResize({ type: 'mouseup', clientX: this.startX });
            }
        });
    }
    
    disconnectedCallback() {
        if (this.boundOnResize) {
            document.removeEventListener('mousemove', this.boundOnResize);
            document.removeEventListener('touchmove', this.boundOnResize);
        }
        if (this.boundStopResize) {
            document.removeEventListener('mouseup', this.boundStopResize);
            document.removeEventListener('touchend', this.boundStopResize);
        }
    }
    
    // Public API - Configuration
    setData(tableData) {
        this.tableData = tableData || [];
        this.filteredData = this.tableData.slice();
        this.render();
    }
    
    setColumnDefinitions(columnDefinitions) {
        this.columnDefinitions = columnDefinitions || [];
        this.render();
    }
    
    setMenuActions(actions) {
        if (typeof actions === 'string') {
            // Parse string format: 'action1/Label 1,action2/Label 2'
            this.menuActions = actions.split(',').map(item => {
                const [actionName, label] = item.split('/');
                return { actionName: actionName.trim(), label: label.trim() };
            });
        } else {
            this.menuActions = actions || [];
        }
    }
    
    setPreselectedColumns(columns) {
        this.preselectedColumns = columns || [];
    }
    
    setUnhideableColumns(columns) {
        this.unhideableColumns = columns || [];
    }
    
    setUnshowableColumns(columns) {
        this.unshowableColumns = columns || [];
    }
    
    initialize() {
        // Set column visibility based on preselected columns
        this.columnDefinitions.forEach(col => {
            if (this.unshowableColumns.includes(col.key)) {
                col.visible = false;
            } else if (this.preselectedColumns.includes(col.key) || this.unhideableColumns.includes(col.key)) {
                col.visible = true;
            } else {
                col.visible = false;
            }
        });
        
        // Normalize sort state
        const activeSorts = this.columnDefinitions.filter(c => c.sortable && c.sortDirection && c.sortDirection !== 'none');
        if (activeSorts.length > 1) {
            const firstVisible = this.columnDefinitions
                .filter(c => c.visible && c.sortable && c.sortDirection && c.sortDirection !== 'none')
                .sort((a, b) => a.order - b.order)[0];
            const keepKey = (firstVisible || activeSorts[0]).key;
            this.clearOtherSorts(keepKey);
        }
        
        this.filteredData = this.tableData.slice();
        this.render();
        this.updateSelectionUI();
    }
    
    // Rendering methods
    render() {
        if (!this.columnDefinitions.length) {
            return;
        }
        
        this.rebuildColgroup();
        this.createTableHeaders();
        this.populateTableRows();
        this.updatePaginationUI();
    }
    
    // Helper methods (to be implemented)
    getVisibleColumns() {
        return this.columnDefinitions
            .filter(col => col.visible)
            .sort((a, b) => a.order - b.order);
    }
    
    clearOtherSorts(exceptKey) {
        this.columnDefinitions.forEach(c => {
            if (c.key !== exceptKey) c.sortDirection = 'none';
        });
    }
    
    rebuildColgroup() {
        const table = this.querySelector('#data-table');
        if (!table) return;
        
        let colgroup = table.querySelector('colgroup');
        if (!colgroup) {
            colgroup = document.createElement('colgroup');
            table.insertBefore(colgroup, table.firstChild);
        }
        colgroup.innerHTML = '';
        
        // Fixed columns: checkbox + menu
        const colCheckbox = document.createElement('col');
        colCheckbox.setAttribute('data-fixed', 'checkbox');
        colCheckbox.style.width = '44px';
        colgroup.appendChild(colCheckbox);
        
        const colMenu = document.createElement('col');
        colMenu.setAttribute('data-fixed', 'menu');
        colMenu.style.width = '44px';
        colgroup.appendChild(colMenu);
        
        const visibleColumns = this.getVisibleColumns();
        visibleColumns.forEach(col => {
            const c = document.createElement('col');
            c.setAttribute('data-column-key', col.key);
            if (col.width) {
                c.style.width = typeof col.width === 'number' ? `${col.width}px` : String(col.width);
            } else {
                c.style.width = '200px';
            }
            colgroup.appendChild(c);
        });
    }
    
    createTableHeaders() {
        const table = this.querySelector('#data-table');
        if (!table) return false;
        
        const thead = table.querySelector('thead');
        if (!thead) return false;
        
        thead.innerHTML = '';
        const headerRow = document.createElement('tr');
        
        // Checkbox column
        const checkboxHeader = document.createElement('th');
        checkboxHeader.className = 'checkbox-column';
        checkboxHeader.innerHTML = `
            <div class="header-cell-content">
                <div id="selection-view-toggle" class="selection-view-toggle invisible">
                    <sl-tooltip hoist content="">
                        <div class="selection-view-toggle-btn-wrapper">
                            <sl-icon-button id="selection-view-toggle-btn" name="funnel" size="small" title=""></sl-icon-button>
                            <sl-icon id="selection-view-badge" class="selection-view-badge selection-view-badge-hidden" name=""></sl-icon>
                        </div>
                    </sl-tooltip>
                </div>
            </div>
            <div>
                <sl-checkbox id="header-select-all"></sl-checkbox>
            </div>
        `;
        headerRow.appendChild(checkboxHeader);
        
        // Menu column
        const menuHeader = document.createElement('th');
        menuHeader.className = 'menu-column';
        headerRow.appendChild(menuHeader);
        
        // Data columns
        const visibleColumns = this.getVisibleColumns();
        visibleColumns.forEach((col, index) => {
            const th = document.createElement('th');
            if (col.className) th.className = col.className;
            th.style.textAlign = 'left';
            if (col.type === 'boolean') th.style.minWidth = '140px';
            th.setAttribute('data-column-key', col.key);
            
            // Header content
            const sortIndicator = this.createSortIndicator(col.sortable, col.sortDirection);
            th.innerHTML = `
                <div class="header-cell-content">
                    <div class="column-header-content">
                        ${col.title}
                        ${sortIndicator}
                    </div>
                    <div class="column-ordering-controls">
                        ${index > 0 ? `<sl-icon-button name="arrow-left" size="small" class="move-column-left" data-column-key="${col.key}" title="Move left"></sl-icon-button>` : ''}
                        ${index < visibleColumns.length - 1 ? `<sl-icon-button name="arrow-right" size="small" class="move-column-right" data-column-key="${col.key}" title="Move right"></sl-icon-button>` : ''}
                    </div>
                </div>
                <div class="filter-cell-content">
                    ${col.filterable ? this.createFilterInput(col) : ''}
                </div>
                <span class="col-resizer" data-column-key="${col.key}"></span>
            `;
            
            headerRow.appendChild(th);
        });
        
        thead.appendChild(headerRow);
        this.setupHeaderEvents(headerRow);
        
        return true;
    }
    
    createSortIndicator(sortable = false, direction = 'none') {
        if (!sortable) return '';
        
        const upColor = direction === 'asc' ? 'var(--sl-color-neutral-500)' : 'var(--sl-color-neutral-300)';
        const downColor = direction === 'desc' ? 'var(--sl-color-neutral-500)' : 'var(--sl-color-neutral-300)';
        
        return `
            <span class="sort-indicator">
                <svg width="10" height="16" viewBox="0 0 10 16" class="sort-svg">
                    <polygon points="5,3 1,7 9,7" fill="${upColor}" />
                    <polygon points="5,13 1,9 9,9" fill="${downColor}" />
                </svg>
            </span>
        `;
    }
    
    createFilterInput(col) {
        const inputId = `filter-${col.key}`;
        if (col.type === 'boolean') {
            return `
                <sl-dropdown hoist placement="bottom" style="width: 100%;">
                    <sl-button slot="trigger" size="small" variant="default" id="${inputId}" data-column-key="${col.key}" style="width: 100%; justify-content: space-between;">
                        Všechny<sl-icon name="chevron-down" slot="suffix"></sl-icon>
                    </sl-button>
                    <sl-menu>
                        <sl-menu-item data-value="">Všechny</sl-menu-item>
                        <sl-menu-item data-value="true">Ano</sl-menu-item>
                        <sl-menu-item data-value="false">Ne</sl-menu-item>
                    </sl-menu>
                </sl-dropdown>
            `;
        } else {
            return `
                <sl-input id="${inputId}" size="small" placeholder="${col.filterPlaceholder || ''}" autocomplete="off" data-column-key="${col.key}" style="width: 100%;"></sl-input>
            `;
        }
    }
    
    setupHeaderEvents(headerRow) {
        // Header select-all checkbox
        const headerCheckbox = headerRow.querySelector('#header-select-all');
        if (headerCheckbox) {
            headerCheckbox.addEventListener('sl-change', () => this.handleHeaderCheckboxChange());
        }
        
        // Selection view toggle
        const viewToggle = headerRow.querySelector('#selection-view-toggle-btn');
        if (viewToggle) {
            viewToggle.addEventListener('click', () => this.toggleSelectionView());
        }
        
        // Sorting - click on header
        headerRow.querySelectorAll('th[data-column-key]').forEach(th => {
            th.addEventListener('click', (e) => {
                if (!e.target.closest('.col-resizer') && 
                    !e.target.closest('.filter-cell-content') &&
                    !e.target.closest('.column-ordering-controls')) {
                    const colKey = th.getAttribute('data-column-key');
                    this.toggleSort(colKey);
                }
            });
        });
        
        // Column reordering buttons
        headerRow.querySelectorAll('.move-column-left, .move-column-right').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const colKey = btn.getAttribute('data-column-key');
                const isLeft = btn.classList.contains('move-column-left');
                this.moveColumn(colKey, isLeft ? 'left' : 'right');
            });
        });
        
        // Column resizing
        headerRow.querySelectorAll('.col-resizer').forEach(resizer => {
            resizer.addEventListener('mousedown', (e) => this.startResize(e));
            resizer.addEventListener('touchstart', (e) => this.startResize(e), { passive: false });
        });
        
        // Filters - debounced input
        headerRow.querySelectorAll('sl-input[data-column-key]').forEach(input => {
            input.addEventListener('sl-input', () => {
                clearTimeout(this.filterTimeout);
                this.filterTimeout = setTimeout(() => {
                    const colKey = input.getAttribute('data-column-key');
                    this.columnFilters[colKey] = input.value.trim();
                    this.applyFilters();
                }, this.FILTER_DEBOUNCE_DELAY);
            });
            
            // Handle escape key to clear filter
            input.addEventListener('keydown', (event) => {
                if (event.key === 'Escape') {
                    event.target.value = '';
                    const colKey = input.getAttribute('data-column-key');
                    delete this.columnFilters[colKey];
                    this.applyFilters();
                }
            });
            
            // Handle focus to select all text
            input.addEventListener('focus', (event) => {
                setTimeout(() => {
                    event.target.select();
                }, 0);
            });
        });
        
        // Boolean filters - dropdown
        headerRow.querySelectorAll('sl-dropdown[hoist]').forEach(dropdown => {
            const menu = dropdown.querySelector('sl-menu');
            if (!menu) return;
            menu.addEventListener('sl-select', (e) => {
                const selectedItem = e.detail.item;
                const value = selectedItem.getAttribute('data-value');
                const button = dropdown.querySelector('sl-button');
                const colKey = button.getAttribute('data-column-key');
                
                button.textContent = selectedItem.textContent;
                
                if (value === '') {
                    delete this.columnFilters[colKey];
                } else {
                    this.columnFilters[colKey] = value;
                }
                
                this.applyFilters();
            });
        });
    }
    
    setupBodyEvents() {
        const tbody = this.querySelector('tbody');
        if (!tbody) return;
        
        // Row checkboxes
        tbody.addEventListener('sl-change', (e) => {
            const rowCheckbox = e.target;
            if (rowCheckbox && rowCheckbox.classList.contains('row-select')) {
                const tr = rowCheckbox.closest('tr');
                const rowId = String(tr.getAttribute('data-row-id'));
                this.handleRowCheckboxChange(rowId, rowCheckbox.checked);
            }
        });
        
        // Row menu actions
        tbody.addEventListener('sl-select', (e) => {
            const menuItem = e.detail?.item; // Shoelace provides the selected item in detail
            if (menuItem && menuItem.tagName === 'SL-MENU-ITEM') {
                const dropdown = menuItem.closest('sl-dropdown');
                if (dropdown && dropdown.id.startsWith('row-menu-')) {
                    const rowId = String(dropdown.id.replace('row-menu-', ''));
                    const actionName = menuItem.getAttribute('data-action');
                    const row = this.tableData.find(r => String(r.id) === rowId);
                    
                    this.dispatchEvent(new CustomEvent('selection-action-activated', {
                        detail: { action: actionName, rows: [row] },
                        bubbles: true,
                        composed: true
                    }));
                }
            }
        });
        
        // Row click events (for entire row except checkbox and menu)
        tbody.addEventListener('click', (e) => {
            // Ignore clicks on checkboxes, menu dropdowns, and their children
            if (e.target.closest('.checkbox-column') || e.target.closest('.menu-column')) {
                return;
            }
            
            const tr = e.target.closest('tr');
            if (tr && tr.hasAttribute('data-row-id')) {
                const rowId = String(tr.getAttribute('data-row-id'));
                const row = this.tableData.find(r => String(r.id) === rowId);
                
                if (row) {
                    this.dispatchEvent(new CustomEvent('row-clicked', {
                        detail: { row },
                        bubbles: true,
                        composed: true
                    }));
                }
            }
        });
    }
    
    // Event handlers
    handleHeaderCheckboxChange(event) {
        const headerCheckbox = this.querySelector('#header-select-all');
        if (!headerCheckbox) return;
        
        const checked = headerCheckbox.checked;
        const activeData = this.getActiveData();
        
        if (checked) {
            // Select all active rows
            activeData.forEach(row => {
                this.selectedRowIds.add(String(row.id));
            });
        } else {
            // Deselect all active rows
            activeData.forEach(row => {
                this.selectedRowIds.delete(String(row.id));
            });
        }
        
        // Emit selection change first (updates toolbar menu)
        this.emitSelectionChange();
        
        // Re-render current page checkboxes to reflect new state
        this.populateTableRows();
        
        // Update pagination UI
        this.updatePaginationUI();
        
        // Update selection view toggle
        this.updateSelectionUI();
    }
    
    handleRowCheckboxChange(rowId, isChecked) {
        if (isChecked) {
            this.selectedRowIds.add(rowId);
        } else {
            this.selectedRowIds.delete(rowId);
        }
        
        // Update header checkbox state (tri-state)
        this.updateHeaderCheckbox();
        
        // If we are in a filtered-by-selection mode, re-render rows so that the row disappears/appears immediately
        if (this.selectionViewMode !== 'all') {
            this.populateTableRows();
            this.updatePaginationUI();
        }
        
        // Update selection UI and emit change
        this.emitSelectionChange();
        this.updateSelectionUI();
    }
    
    toggleSort(colKey) {
        const col = this.columnDefinitions.find(c => c.key === colKey);
        if (!col || !col.sortable) return;
        
        const currentDir = col.sortDirection || 'none';
        const newDir = currentDir === 'none' ? 'asc' : (currentDir === 'asc' ? 'desc' : 'none');
        
        this.clearOtherSorts(colKey);
        col.sortDirection = newDir;
        
        this.createTableHeaders();
        this.populateTableRows();
        this.updatePaginationUI();
    }
    
    moveColumn(colKey, direction) {
        const visibleCols = this.getVisibleColumns();
        const currentIndex = visibleCols.findIndex(c => c.key === colKey);
        if (currentIndex === -1) return;
        
        const targetIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1;
        if (targetIndex < 0 || targetIndex >= visibleCols.length) return;
        
        const currentOrder = visibleCols[currentIndex].order;
        const targetOrder = visibleCols[targetIndex].order;
        
        visibleCols[currentIndex].order = targetOrder;
        visibleCols[targetIndex].order = currentOrder;
        
        this.render();
    }
    
    toggleSelectionView() {
        // Cycle modes only if at least one row is selected
        if (this.selectedRowIds.size === 0) return;
        
        const modes = ['all', 'selected', 'unselected'];
        const currentIndex = modes.indexOf(this.selectionViewMode);
        const nextIndex = (currentIndex + 1) % modes.length;
        this.selectionViewMode = modes[nextIndex];
        
        this.currentPage = 1;
        this.populateTableRows();
        this.updatePaginationUI();
        this.updateSelectionViewUI();
    }
    
    startResize(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const now = Date.now();
        if (now - this.lastResizeEnd < 50) return;
        
        this.isResizing = true;
        this.resizeColKey = e.target.getAttribute('data-column-key');
        this.startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
        
        const col = this.columnDefinitions.find(c => c.key === this.resizeColKey);
        const table = this.querySelector('#data-table');
        const colElement = table.querySelector(`col[data-column-key="${this.resizeColKey}"]`);
        
        if (colElement && colElement.style.width) {
            this.startWidth = parseFloat(colElement.style.width);
        } else if (col && col.width) {
            this.startWidth = typeof col.width === 'number' ? col.width : parseFloat(col.width);
        } else {
            this.startWidth = 200;
        }
        
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
        
        this.boundOnResize = (e) => this.onResize(e);
        this.boundStopResize = (e) => this.stopResize(e);
        
        document.addEventListener('mousemove', this.boundOnResize);
        document.addEventListener('mouseup', this.boundStopResize);
        document.addEventListener('touchmove', this.boundOnResize, { passive: false });
        document.addEventListener('touchend', this.boundStopResize);
    }
    
    onResize(e) {
        if (!this.isResizing) return;
        e.preventDefault();
        
        const currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        const delta = currentX - this.startX;
        const newWidth = Math.max(50, this.startWidth + delta);
        
        const table = this.querySelector('#data-table');
        const colElement = table.querySelector(`col[data-column-key="${this.resizeColKey}"]`);
        if (colElement) {
            colElement.style.width = `${newWidth}px`;
        }
    }
    
    stopResize(e) {
        if (!this.isResizing) return;
        
        document.removeEventListener('mousemove', this.boundOnResize);
        document.removeEventListener('mouseup', this.boundStopResize);
        document.removeEventListener('touchmove', this.boundOnResize);
        document.removeEventListener('touchend', this.boundStopResize);
        
        const currentX = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
        const delta = currentX - this.startX;
        const finalWidth = Math.max(50, this.startWidth + delta);
        
        const col = this.columnDefinitions.find(c => c.key === this.resizeColKey);
        if (col) {
            col.width = finalWidth;
        }
        
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
        
        this.isResizing = false;
        this.lastResizeEnd = Date.now();
    }
    
    populateTableRows() {
        const table = this.querySelector('#data-table');
        if (!table) return false;
        
        const tbody = table.querySelector('tbody');
        if (!tbody) return false;
        
        tbody.innerHTML = '';
        
        const visibleColumns = this.getVisibleColumns();
        const currentPageData = this.getCurrentPageData();
        
        if (currentPageData.length === 0) {
            const tr = document.createElement('tr');
            tr.className = 'no-data-row';
            const td = document.createElement('td');
            td.colSpan = visibleColumns.length + 2;
            td.textContent = 'Nenalezeny žádné záznamy';
            td.className = 'no-data-row';
            tr.appendChild(td);
            tbody.appendChild(tr);
        } else {
            currentPageData.forEach(row => {
                const tr = this.createTableRow(row, visibleColumns);
                tbody.appendChild(tr);
            });
        }
        
        // After rows are rendered, update header tri-state and selection UI
        this.updateHeaderCheckbox();
        this.updateSelectionUI();
        
        return true;
    }
    
    createTableRow(row, visibleColumns) {
        const tr = document.createElement('tr');
        tr.setAttribute('data-row-id', row.id);
        
        // Checkbox cell
        const checkboxCell = document.createElement('td');
        checkboxCell.className = 'checkbox-column';
        checkboxCell.innerHTML = '<sl-checkbox class="row-select"></sl-checkbox>';
        const rowCheckbox = checkboxCell.querySelector('sl-checkbox');
        rowCheckbox.checked = this.selectedRowIds.has(String(row.id));
        tr.appendChild(checkboxCell);
        
        // Menu cell
        const menuCell = document.createElement('td');
        menuCell.className = 'menu-column';
        const menuItems = this.menuActions.map(action =>
            `<sl-menu-item data-action="${action.actionName}">${action.label}</sl-menu-item>`
        ).join('');
        menuCell.innerHTML = `
            <sl-dropdown hoist id="row-menu-${row.id}">
                <sl-button slot="trigger" size="small" variant="text" circle>
                    <sl-icon name="three-dots-vertical"></sl-icon>
                </sl-button>
                <sl-menu>${menuItems}</sl-menu>
            </sl-dropdown>
        `;
        tr.appendChild(menuCell);
        
        // Data cells
        visibleColumns.forEach(col => {
            const td = document.createElement('td');
            if (col.align) td.style.textAlign = col.align;
            if (col.type === 'boolean') td.style.minWidth = '140px';
            
            // Format cell content
            if (col.key === 'turnover') {
                td.innerHTML = `<sl-format-number value="${row[col.key]}" type="decimal" minimum-fraction-digits="2" maximum-fraction-digits="2"></sl-format-number>`;
            } else if (col.key === 'contractDate') {
                td.innerHTML = `<sl-format-date date="${row[col.key]}"></sl-format-date>`;
            } else if (col.key === 'approved') {
                const checkedAttr = row[col.key] ? 'checked' : '';
                td.innerHTML = `<sl-switch ${checkedAttr} disabled></sl-switch>`;
            } else {
                td.textContent = row[col.key];
            }
            
            tr.appendChild(td);
        });
        
        return tr;
    }
    
    // Pagination helpers
    getActiveData() {
        const base = Object.keys(this.columnFilters).length > 0 ? this.filteredData : this.tableData;
        if (this.selectionViewMode === 'selected') {
            return base.filter(r => this.selectedRowIds.has(String(r.id)));
        }
        if (this.selectionViewMode === 'unselected') {
            return base.filter(r => !this.selectedRowIds.has(String(r.id)));
        }
        return base;
    }
    
    getCurrentPageData() {
        const activeData = this.getActiveData();
        const sorted = this.getSortedData(activeData);
        
        // If itemsPerPage is -1, return all data (no pagination)
        if (this.itemsPerPage === -1) {
            return sorted;
        }
        
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return sorted.slice(startIndex, endIndex);
    }
    
    getSortedData(data) {
        const activeCol = this.getActiveSortColumn();
        if (!activeCol || activeCol.sortDirection === 'none') return data;
        
        const key = activeCol.key;
        const dir = activeCol.sortDirection;
        const sorted = data.slice().sort((a, b) => {
            const cmp = this.compareValues(a[key], b[key]);
            return dir === 'asc' ? cmp : -cmp;
        });
        return sorted;
    }
    
    getActiveSortColumn() {
        const visibleActive = this.columnDefinitions
            .filter(c => c.visible && c.sortable && c.sortDirection && c.sortDirection !== 'none')
            .sort((a, b) => a.order - b.order);
        if (visibleActive.length > 0) return visibleActive[0];
        
        const anyActive = this.columnDefinitions.find(c => c.sortable && c.sortDirection && c.sortDirection !== 'none');
        return anyActive || null;
    }
    
    compareValues(aVal, bVal) {
        const aNull = aVal === null || aVal === undefined;
        const bNull = bVal === null || bVal === undefined;
        if (aNull && bNull) return 0;
        if (aNull) return 1;
        if (bNull) return -1;
        
        if (typeof aVal === 'number' && typeof bVal === 'number') {
            return aVal - bVal;
        }
        
        return String(aVal).localeCompare(String(bVal), undefined, { numeric: true, sensitivity: 'base' });
    }
    
    updatePaginationUI() {
        // Will emit event for external pager component
        const activeData = this.getActiveData();
        this.dispatchEvent(new CustomEvent('pagination-changed', {
            detail: {
                totalRecordsCount: this.tableData.length,
                filteredRecordsCount: activeData.length,
                pageSize: this.itemsPerPage,
                currentPage: this.currentPage,
                pageSizes: this.availablePageSizes
            },
            bubbles: true,
            composed: true
        }));
    }
    
    // Selection UI helpers
    updateHeaderCheckbox() {
        const headerCheckbox = this.querySelector('#header-select-all');
        if (!headerCheckbox) return;
        
        const activeData = this.getActiveData();
        const total = activeData.length;
        
        if (total === 0) {
            headerCheckbox.checked = false;
            headerCheckbox.indeterminate = false;
            return;
        }
        
        let selectedCount = 0;
        for (const row of activeData) {
            if (this.selectedRowIds.has(String(row.id))) selectedCount++;
        }
        
        if (selectedCount === 0) {
            headerCheckbox.checked = false;
            headerCheckbox.indeterminate = false;
        } else if (selectedCount === total) {
            headerCheckbox.checked = true;
            headerCheckbox.indeterminate = false;
        } else {
            headerCheckbox.checked = false;
            headerCheckbox.indeterminate = true;
        }
    }
    
    updateRowCheckboxes() {
        const tbody = this.querySelector('tbody');
        if (!tbody) return;
        
        tbody.querySelectorAll('tr[data-row-id]').forEach(tr => {
            const rowId = tr.getAttribute('data-row-id');
            const checkbox = tr.querySelector('.row-select');
            if (checkbox) {
                checkbox.checked = this.selectedRowIds.has(rowId);
            }
        });
    }
    
    updateSelectionUI() {
        const toggle = this.querySelector('#selection-view-toggle');
        if (!toggle) return;
        
        const selectedCount = this.selectedRowIds.size;
        
        if (selectedCount === 0) {
            // Reset mode to all when nothing is selected and hide control
            if (this.selectionViewMode !== 'all') {
                this.selectionViewMode = 'all';
                // Rows may need to be repopulated if we were previously filtered
                this.populateTableRows();
                this.updatePaginationUI();
            }
            toggle.classList.add('invisible');
            const badge = this.querySelector('#selection-view-badge');
            if (badge) badge.classList.add('selection-view-badge-hidden');
            return;
        }
        
        // Show control
        toggle.classList.remove('invisible');
        
        this.updateSelectionViewUI();
    }
    
    updateSelectionViewUI() {
        const badge = this.querySelector('#selection-view-badge');
        const toggleBtn = this.querySelector('#selection-view-toggle-btn');
        const container = this.querySelector('#selection-view-toggle');
        const tooltip = container ? container.querySelector('sl-tooltip') : null;
        
        if (!badge || !toggleBtn || !tooltip) return;
        
        let label = '';
        if (this.selectionViewMode === 'all') {
            label = 'Režim zobrazení: všechny řádky';
            badge.classList.add('selection-view-badge-hidden');
        } else if (this.selectionViewMode === 'selected') {
            label = 'Režim zobrazení: jen vybrané řádky';
            badge.classList.remove('selection-view-badge-hidden');
            badge.setAttribute('name', 'check');
            badge.style.color = 'var(--sl-color-success-600)';
        } else {
            label = 'Režim zobrazení: jen nevybrané řádky';
            badge.classList.remove('selection-view-badge-hidden');
            badge.setAttribute('name', 'x');
            badge.style.color = 'var(--sl-color-danger-600)';
        }
        
        toggleBtn.setAttribute('title', label);
        tooltip.setAttribute('content', label);
    }
    
    emitSelectionChange() {
        this.dispatchEvent(new CustomEvent('selection-changed', {
            detail: {
                selectedRowIds: Array.from(this.selectedRowIds),
                selectedCount: this.selectedRowIds.size
            },
            bubbles: true,
            composed: true
        }));
    }
    
    // Filtering methods
    applyFilters() {
        this.filteredData = this.tableData.filter(row => {
            return Object.keys(this.columnFilters).every(colKey => {
                const filterValue = this.columnFilters[colKey];
                if (!filterValue) return true;
                
                const col = this.columnDefinitions.find(c => c.key === colKey);
                if (!col) return true;
                
                const cellValue = row[colKey];
                
                // Boolean column
                if (col.type === 'boolean') {
                    return String(cellValue) === filterValue;
                }
                
                // Date column
                if (col.type === 'date') {
                    return this.matchDateFilter(cellValue, filterValue);
                }
                
                // Number column
                if (col.type === 'number') {
                    return this.matchNumberFilter(cellValue, filterValue);
                }
                
                // Text column
                return this.matchTextPattern(String(cellValue), filterValue);
            });
        });
        
        this.currentPage = 1;
        this.populateTableRows();
        this.updatePaginationUI();
        
        // Emit filter change event for toolbar
        this.emitFilterChange();
    }
    
    matchDateFilter(cellValue, filterValue) {
        if (!cellValue) return false;
        
        const cellDate = new Date(cellValue);
        if (isNaN(cellDate.getTime())) return false;
        
        // Parse date range
        const range = this.parseDateRange(filterValue);
        
        if (range.min && range.max) {
            return cellDate >= range.min && cellDate <= range.max;
        } else if (range.min) {
            return cellDate >= range.min;
        } else if (range.max) {
            return cellDate <= range.max;
        }
        
        // Fallback to text matching on formatted date
        const formatted = new Intl.DateTimeFormat('cs-CZ').format(cellDate);
        return this.matchTextPattern(formatted, filterValue);
    }
    
    matchNumberFilter(cellValue, filterValue) {
        const num = Number(cellValue);
        if (isNaN(num)) return false;
        
        const range = this.parseNumberRange(filterValue);
        
        if (range.min !== null && range.max !== null) {
            return num >= range.min && num <= range.max;
        } else if (range.min !== null) {
            return num >= range.min;
        } else if (range.max !== null) {
            return num <= range.max;
        }
        
        // Fallback to text matching
        return this.matchTextPattern(String(cellValue), filterValue);
    }
    
    matchTextPattern(text, pattern) {
        if (!pattern) return true;
        if (!text) return false;
        
        const lowerText = text.toLowerCase();
        const lowerPattern = pattern.toLowerCase();
        
        // Exact wildcards
        if (lowerPattern.includes('*') || lowerPattern.includes('?')) {
            const regexPattern = lowerPattern
                .replace(/[.+^${}()|[\]\\]/g, '\\$&')
                .replace(/\*/g, '.*')
                .replace(/\?/g, '.');
            const regex = new RegExp(`^${regexPattern}$`, 'i');
            return regex.test(lowerText);
        }
        
        // Simple substring
        return lowerText.includes(lowerPattern);
    }
    
    parseDateRange(rangeStr) {
        const trimmed = rangeStr.trim();
        if (!trimmed) return { min: null, max: null };
        
        // Check for ".." separator
        if (trimmed.includes('..')) {
            const parts = trimmed.split('..').map(s => s.trim());
            const minStr = parts[0];
            const maxStr = parts[1];
            
            let min = null;
            let max = null;
            
            if (minStr) {
                const parsedMin = this.parseFlexibleDate(minStr);
                if (parsedMin) min = parsedMin;
            }
            
            if (maxStr) {
                const parsedMax = this.parseFlexibleDate(maxStr);
                if (parsedMax) max = this.setEndOfDay(parsedMax);
            }
            
            return { min, max };
        }
        
        // Single date
        const parsed = this.parseFlexibleDate(trimmed);
        if (parsed) {
            return { min: parsed, max: this.setEndOfDay(new Date(parsed)) };
        }
        
        return { min: null, max: null };
    }
    
    parseFlexibleDate(dateStr) {
        if (!dateStr) return null;
        
        // Try ISO format first
        let d = new Date(dateStr);
        if (!isNaN(d.getTime())) return d;
        
        // Try DD.MM.YYYY
        const match1 = dateStr.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
        if (match1) {
            const [, day, month, year] = match1;
            d = new Date(Number(year), Number(month) - 1, Number(day));
            if (!isNaN(d.getTime())) return d;
        }
        
        // Try DD.MM.YY
        const match2 = dateStr.match(/^(\d{1,2})\.(\d{1,2})\.(\d{2})$/);
        if (match2) {
            let [, day, month, year] = match2;
            year = Number(year);
            const fullYear = year < 50 ? 2000 + year : 1900 + year;
            d = new Date(fullYear, Number(month) - 1, Number(day));
            if (!isNaN(d.getTime())) return d;
        }
        
        return null;
    }
    
    setEndOfDay(date) {
        const d = new Date(date);
        d.setHours(23, 59, 59, 999);
        return d;
    }
    
    parseNumberRange(rangeStr) {
        const trimmed = rangeStr.trim();
        if (!trimmed) return { min: null, max: null };
        
        // Check for ".." separator
        if (trimmed.includes('..')) {
            const parts = trimmed.split('..').map(s => s.trim());
            const minStr = parts[0];
            const maxStr = parts[1];
            
            let min = null;
            let max = null;
            
            if (minStr) {
                const parsed = parseFloat(minStr);
                if (!isNaN(parsed)) min = parsed;
            }
            
            if (maxStr) {
                const parsed = parseFloat(maxStr);
                if (!isNaN(parsed)) max = parsed;
            }
            
            return { min, max };
        }
        
        // Single number - exact match
        const parsed = parseFloat(trimmed);
        if (!isNaN(parsed)) {
            return { min: parsed, max: parsed };
        }
        
        return { min: null, max: null };
    }
    
    emitFilterChange() {
        this.dispatchEvent(new CustomEvent('filters-changed', {
            detail: {
                columnFilters: { ...this.columnFilters },
                hasActiveFilters: Object.keys(this.columnFilters).length > 0
            },
            bubbles: true,
            composed: true
        }));
    }
    
    // Public methods for external control
    goToPage(page) {
        // If itemsPerPage is -1 (show all), no need to change pages
        if (this.itemsPerPage === -1) return;
        
        const totalPages = Math.ceil(this.getActiveData().length / this.itemsPerPage);
        if (page >= 1 && page <= totalPages && page !== this.currentPage) {
            this.currentPage = page;
            this.populateTableRows();
            this.updatePaginationUI();
        }
    }
    
    changePageSize(newSize) {
        if (this.itemsPerPage === newSize) return;
        this.itemsPerPage = newSize;
        this.currentPage = 1;
        this.populateTableRows();
        this.updatePaginationUI();
    }
    
    // Public methods for toolbar integration
    clearFilters() {
        this.columnFilters = {};
        
        // Clear all filter inputs
        const thead = this.querySelector('thead');
        if (thead) {
            thead.querySelectorAll('sl-input[data-column-key]').forEach(input => {
                input.value = '';
            });
            
            thead.querySelectorAll('sl-dropdown[hoist]').forEach(dropdown => {
                const button = dropdown.querySelector('sl-button');
                if (button) {
                    button.textContent = 'Všechny';
                }
            });
        }
        
        this.applyFilters();
    }
    
    unselectAllRows() {
        this.selectedRowIds.clear();
        this.updateHeaderCheckbox();
        this.updateRowCheckboxes();
        this.updateSelectionUI();
        this.emitSelectionChange();
    }
    
    getSelectedRows() {
        return this.tableData.filter(row => this.selectedRowIds.has(String(row.id)));
    }
    
    getAllRows() {
        return this.tableData.slice();
    }
    
    getFilteredRows() {
        // Return filtered data sorted by current sort order
        return this.getSortedData(this.getActiveData());
    }
    
    getAllSortedRows() {
        // Return all table data sorted by current sort order
        return this.getSortedData(this.tableData);
    }
    
    clearAllSelectedRecords() {
        this.selectedRowIds.clear();
        this.selectionViewMode = 'all';
        this.populateTableRows();
        this.updatePaginationUI();
        this.updateSelectionUI();
        this.emitSelectionChange();
    }
    
    // Import methods
    addImportedRow(rowData) {
        // Find max ID
        const maxId = this.tableData.length > 0 
            ? Math.max(...this.tableData.map(r => Number(r.id) || 0))
            : 0;
        
        const newRow = {
            ...rowData,
            id: String(maxId + 1)
        };
        
        this.tableData.push(newRow);
        this.applyFilters();
    }
    
    updateExistingRow(rowId, rowData) {
        const index = this.tableData.findIndex(r => String(r.id) === String(rowId));
        if (index !== -1) {
            this.tableData[index] = {
                ...this.tableData[index],
                ...rowData
            };
            this.applyFilters();
        }
    }
    
    // Column visibility management
    updateColumnVisibility(columnKey, isVisible) {
        const col = this.columnDefinitions.find(c => c.key === columnKey);
        if (col) {
            col.visible = isVisible;
            this.render();
        }
    }
    
    getColumnDefinitions() {
        return this.columnDefinitions.slice();
    }
    
    getColumnFilters() {
        return { ...this.columnFilters };
    }
    
    // Loading state
    showLoadingOverlay() {
        const overlay = this.querySelector('#table-loading-overlay');
        if (overlay) {
            overlay.classList.remove('hidden');
        }
    }
    
    hideLoadingOverlay() {
        const overlay = this.querySelector('#table-loading-overlay');
        if (overlay) {
            overlay.classList.add('hidden');
        }
    }
    
    // Refresh entire table
    refresh() {
        this.applyFilters();
    }
}

customElements.define('ts-datatable', TSDataTable);

export { TSDataTable };
