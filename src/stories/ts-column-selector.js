class TSColumnSelector extends HTMLElement {
    constructor() {
        super();
        // Don't create content yet - wait for column definitions to be set
    }

    createContent() {
        if (this.innerHTML) return; // Already created
        
        this.innerHTML = `
            <style>
                .column-selector {
                    display: inline-block;
                }
                
                .columns-menu {
                    min-width: 250px;
                    max-height: 400px;
                    overflow-y: auto;
                }
                
                .search-input {
                    margin: 0.5rem;
                    width: calc(100% - 1rem);
                }
                
                .column-filter-hidden {
                    display: none !important;
                }
                
                .filter-icon {
                    margin-left: 0.5rem;
                    fill: currentColor;
                }
            </style>
            <div class="column-selector">
                <sl-tooltip content="Výběr sloupců">
                    <sl-dropdown>
                        <sl-button slot="trigger" caret>
                            <sl-icon name="gear"></sl-icon>
                        </sl-button>
                        <sl-menu class="columns-menu">
                            <!-- Menu items will be populated dynamically -->
                        </sl-menu>
                    </sl-dropdown>
                </sl-tooltip>
            </div>
        `;
        
        this.setupEventListeners();
    }

    connectedCallback() {
        // Content will be created when column definitions are set
        // Event listeners will be set up in createContent()
    }

    setColumnDefinitions(columnDefinitions) {
        this.columnDefinitions = columnDefinitions;
        
        // Wait for Shoelace components to be defined before creating content
        Promise.all([
            customElements.whenDefined('sl-tooltip'),
            customElements.whenDefined('sl-dropdown'),
            customElements.whenDefined('sl-button'),
            customElements.whenDefined('sl-menu'),
            customElements.whenDefined('sl-input')
        ]).then(() => {
            this.createContent();
            this.createColumnsMenu();
        }).catch(() => {
            // Fallback - create content anyway if waiting fails
            this.createContent();
            this.createColumnsMenu();
        });
    }

    setColumnFilters(columnFilters) {
        this.columnFilters = columnFilters;
        this.createColumnsMenu();
    }

    setUnshowableColumns(unshowableColumns) {
        this.unshowableColumns = unshowableColumns;
        this.createColumnsMenu();
    }

    setUnhideableColumns(unhideableColumns) {
        this.unhideableColumns = unhideableColumns;
        this.createColumnsMenu();
    }

    setupEventListeners() {
        const dropdown = this.querySelector('sl-dropdown');
        const menu = this.querySelector('.columns-menu');

        // Focus search input when dropdown opens
        if (dropdown) {
            dropdown.addEventListener('sl-show', () => {
                setTimeout(() => {
                    const searchInput = this.querySelector('.columns-menu #column-search');
                    if (searchInput) {
                        searchInput.focus();
                    }
                }, 50);
            });
        }

        // Handle menu selection
        if (menu) {
            menu.addEventListener('sl-select', (event) => {
                const selectedItem = event.detail.item;
                const action = selectedItem?.getAttribute('data-action');
                const columnKey = selectedItem?.getAttribute('data-column-key');

                // Clear the column filter whenever any menu item is selected
                this.clearColumnFilter();

                // Handle special actions
                if (action === 'clear-filters') {
                    this.dispatchEvent(new CustomEvent('clear-filters', {
                        bubbles: true,
                        composed: true
                    }));
                    return;
                } else if (action === 'select-all') {
                    this.dispatchEvent(new CustomEvent('select-all-columns', {
                        bubbles: true,
                        composed: true
                    }));
                    return;
                } else if (action === 'clear-all') {
                    this.dispatchEvent(new CustomEvent('clear-all-columns', {
                        bubbles: true,
                        composed: true
                    }));
                    return;
                }

                if (columnKey) {
                    // Find the column definition
                    const columnDef = this.columnDefinitions?.find(col => col.key === columnKey);

                    if (columnDef) {
                        // Skip processing if item is disabled (unhideable columns)
                        if (selectedItem.disabled) {
                            event.preventDefault();
                            return;
                        }

                        // Check if an unhideable column is being unselected (backup protection)
                        if (selectedItem.hasAttribute('data-unhideable') && this.unhideableColumns?.includes(columnKey)) {
                            // Prevent unselecting unhideable columns
                            if (!selectedItem.checked) {
                                selectedItem.checked = true;
                                event.preventDefault();
                                return;
                            }
                        }

                        // Update the column visibility in definition
                        columnDef.visible = selectedItem.checked;
                        
                        // Dispatch event
                        this.dispatchEvent(new CustomEvent('column-visibility-changed', { 
                            detail: { columnKey, visible: selectedItem.checked },
                            bubbles: true,
                            composed: true
                        }));
                    }
                }
            });
        }
    }

    createColumnsMenu() {
        const columnsMenu = this.querySelector('.columns-menu');
        if (!columnsMenu || !this.columnDefinitions) return false;

        // Clear existing menu items
        columnsMenu.innerHTML = '';

        // Add filter management section only if filters are active
        const hasActiveFilters = this.columnFilters && Object.keys(this.columnFilters).length > 0;
        if (hasActiveFilters) {
            const clearFilters = document.createElement('sl-menu-item');
            clearFilters.textContent = 'Vymazat všechny filtry';
            clearFilters.setAttribute('data-action', 'clear-filters');
            columnsMenu.appendChild(clearFilters);

            const filterDivider = document.createElement('sl-divider');
            columnsMenu.appendChild(filterDivider);
        }

        // Add standard column menu items
        const selectAll = document.createElement('sl-menu-item');
        selectAll.textContent = 'Vybrat vše';
        selectAll.setAttribute('data-action', 'select-all');
        columnsMenu.appendChild(selectAll);

        const clearAll = document.createElement('sl-menu-item');
        clearAll.textContent = 'Zrušit výběr';
        clearAll.setAttribute('data-action', 'clear-all');
        columnsMenu.appendChild(clearAll);

        const divider = document.createElement('sl-divider');
        columnsMenu.appendChild(divider);

        const searchInput = document.createElement('sl-input');
        searchInput.autofocus = true;
        searchInput.placeholder = 'Hledat sloupce...';
        searchInput.className = 'search-input';
        searchInput.setAttribute('id', 'column-search');
        searchInput.setAttribute('autocomplete', 'off');
        columnsMenu.appendChild(searchInput);

        // Add column items from definitions (excluding unshowable columns), sorted by order
        const sortedColumns = this.columnDefinitions
            .filter(col => !this.unshowableColumns?.includes(col.key))
            .sort((a, b) => a.order - b.order);

        sortedColumns.forEach(col => {
            const menuItem = document.createElement('sl-menu-item');
            menuItem.type = 'checkbox';

            // Create column text with filter icon if filtered
            const hasFilter = this.columnFilters?.[col.key] && this.columnFilters[col.key].trim() !== '';
            const filterIcon = hasFilter ? `
                <svg width="12" height="12" viewBox="0 0 16 16" class="filter-icon">
                    <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"/>
                </svg>
            ` : '';
            menuItem.innerHTML = `${col.title}${filterIcon}`;

            menuItem.setAttribute('data-column-key', col.key);
            // Set checkbox state based on column visibility
            menuItem.checked = col.visible;
            // Mark unhideable columns as disabled
            if (this.unhideableColumns?.includes(col.key)) {
                menuItem.setAttribute('data-unhideable', 'true');
                menuItem.disabled = true;
            }
            columnsMenu.appendChild(menuItem);
        });

        // Add search functionality
        const searchElement = columnsMenu.querySelector('#column-search');
        if (searchElement) {
            ['input', 'sl-input', 'keyup', 'change'].forEach(eventType => {
                searchElement.addEventListener(eventType, (event) => {
                    const value = event.target.value || '';
                    // Small delay to ensure DOM is ready
                    setTimeout(() => this.filterColumnMenu(value), 10);
                });
            });

            // Add escape key handler for column search
            searchElement.addEventListener('keydown', (event) => {
                if (event.key === 'Escape') {
                    event.preventDefault();
                    event.stopPropagation();
                    event.stopImmediatePropagation();
                    event.target.value = '';
                    this.filterColumnMenu('');
                }
            });
        }

        return true;
    }

    filterColumnMenu(searchTerm) {
        const columnsMenu = this.querySelector('.columns-menu');
        if (!columnsMenu) return;

        const menuItems = columnsMenu.querySelectorAll('sl-menu-item[role="menuitemcheckbox"]');
        const lowerSearchTerm = searchTerm.toLowerCase();
        menuItems.forEach(item => {
            const columnTitle = item.textContent.toLowerCase();
            if (columnTitle.includes(lowerSearchTerm)) {
                item.classList.remove('column-filter-hidden');
            } else {
                item.classList.add('column-filter-hidden');
            }
        });
    }

    refreshMenu() {
        if (this.columnDefinitions) {
            this.createColumnsMenu();
        }
    }

    clearColumnFilter() {
        const searchInput = this.querySelector('.columns-menu #column-search');
        if (searchInput) {
            searchInput.value = '';
            this.filterColumnMenu('');
        }
    }
}

customElements.define('ts-column-selector', TSColumnSelector);

export { TSColumnSelector };