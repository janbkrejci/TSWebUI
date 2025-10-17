class TSSelectionMenu extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <style>
                .selection-menu-container {
                    display: inline-block;
                }
                
                .selection-menu-container-hidden {
                    display: none;
                }
                
                .selection-menu {
                    min-width: 200px;
                }
                
                .selection-count-item {
                    font-weight: bold;
                    pointer-events: none;
                    opacity: 0.8;
                }
            </style>
            <div class="selection-menu-container selection-menu-container-hidden">
                <sl-dropdown hoist>
                    <sl-button slot="trigger" size="small" variant="text" circle>
                        <sl-icon name="three-dots-vertical"></sl-icon>
                    </sl-button>
                    <sl-menu class="selection-menu">
                        <!-- Menu items will be populated based on attributes -->
                    </sl-menu>
                </sl-dropdown>
            </div>
        `;
    }

    static get observedAttributes() {
        return ['single-item-actions', 'multiple-items-actions'];
    }

    connectedCallback() {
        this._selectionCount = 0;
        this.selectedRows = [];
        this.setupEventListeners();
        this.updateMenuItems(0);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'single-item-actions' || name === 'multiple-items-actions') {
            this.updateMenuItems();
        }
    }

    setupEventListeners() {
        const menu = this.querySelector('.selection-menu');
        if (menu) {
            menu.addEventListener('sl-select', (event) => {
                const action = event.detail.item?.getAttribute('data-action');
                if (action) {
                    if (action === 'unselect-all') {
                        // Special event for unselecting all rows
                        this.dispatchEvent(new CustomEvent('unselect-all-rows', {
                            bubbles: true,
                            composed: true
                        }));
                    } else {
                        // Regular selection action
                        this.dispatchEvent(new CustomEvent('selection-action-activated', { 
                            detail: { action: action, rows: this.selectedRows },
                            bubbles: true,
                            composed: true
                        }));
                    }
                }
            });
        }
    }

    updateMenuItems(selectionCount = 0) {
        const menu = this.querySelector('.selection-menu');
        if (!menu) return;

        // Clear existing items
        menu.innerHTML = '';

        // Add selection count as first non-interactive item
        const countItem = document.createElement('sl-menu-item');
        countItem.className = 'selection-count-item';
        countItem.textContent = `Vybráno: ${selectionCount}`;
        menu.appendChild(countItem);

        // Add divider
        const divider1 = document.createElement('sl-divider');
        menu.appendChild(divider1);

        // Always add unselect-all action after count
        const unselectItem = document.createElement('sl-menu-item');
        unselectItem.setAttribute('data-action', 'unselect-all');
        unselectItem.textContent = 'Zrušit výběr všech řádků';
        menu.appendChild(unselectItem);

        // Parse actions from attributes (format: "action1/label1,action2/label2")
        const singleActions = this.parseActionsAttribute('single-item-actions');
        const multipleActions = this.parseActionsAttribute('multiple-items-actions');

        // Determine which actions to show based on selection count
        let actionsToShow = [];
        if (selectionCount === 1) {
            actionsToShow = singleActions;
        } else if (selectionCount > 1) {
            actionsToShow = multipleActions;
        }

        // Add divider before actions if there are any
        if (actionsToShow.length > 0) {
            const divider2 = document.createElement('sl-divider');
            menu.appendChild(divider2);
        }

        // Add the appropriate actions
        actionsToShow.forEach(actionData => {
            const item = document.createElement('sl-menu-item');
            item.setAttribute('data-action', actionData.action);
            item.textContent = actionData.label;
            menu.appendChild(item);
        });
    }

    parseActionsAttribute(attributeName) {
        const attrValue = this.getAttribute(attributeName);
        if (!attrValue) return [];
        
        return attrValue.split(',').map(s => {
            const trimmed = s.trim();
            const parts = trimmed.split('/');
            if (parts.length === 2) {
                return {
                    action: parts[0].trim(),
                    label: parts[1].trim()
                };
            }
            // Fallback if no label provided, use action as label
            return {
                action: trimmed,
                label: trimmed
            };
        }).filter(item => item.action);
    }

    show() {
        const container = this.querySelector('.selection-menu-container');
        if (container) {
            container.classList.remove('selection-menu-container-hidden');
        }
    }

    hide() {
        const container = this.querySelector('.selection-menu-container');
        if (container) {
            container.classList.add('selection-menu-container-hidden');
        }
    }

    setSelectedRows(selectedRows) {
        this.selectedRows = selectedRows || [];
    }

    setSelectionCount(count) {
        this._selectionCount = count;
        this.updateMenuItems(count);
    }
}

customElements.define('ts-selection-menu', TSSelectionMenu);

export { TSSelectionMenu };