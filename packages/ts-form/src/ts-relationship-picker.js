export class TSRelationshipPicker extends HTMLElement {
    constructor() {
        super();
        this.selectedItems = [];
        this.availableItems = []; // Mock data source
        this.mode = 'single'; // 'single' or 'multiple'
        this.targetEntity = '';
        this.displayFields = [];
        this.chipDisplayFields = []; // Fields to show in selected chips
        this.valueField = 'id';
        this.label = '';
    }

    static get observedAttributes() {
        return ['mode', 'target-entity', 'display-fields', 'chip-display-fields', 'value-field', 'value', 'label', 'options'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;

        if (name === 'mode') this.mode = newValue;
        if (name === 'target-entity') this.targetEntity = newValue;
        if (name === 'display-fields') {
            try {
                this.displayFields = JSON.parse(newValue);
            } catch (e) {
                this.displayFields = [newValue];
            }
        }
        if (name === 'chip-display-fields') {
            try {
                this.chipDisplayFields = JSON.parse(newValue);
            } catch (e) {
                this.chipDisplayFields = [newValue];
            }
        }
        if (name === 'value-field') this.valueField = newValue;
        if (name === 'label') {
            this.label = newValue;
            this.render(); // Re-render to show label
        }
        if (name === 'options') {
            try {
                this.availableItems = JSON.parse(newValue);
                // Re-evaluate value if options loaded after value
                this.updateSelectedFromValue();
            } catch (e) {
                console.error('Failed to parse options for relationship picker:', e);
                this.availableItems = [];
            }
        }
        if (name === 'value') {
            this.updateSelectedFromValue();
        }
    }

    updateSelectedFromValue() {
        const valAttr = this.getAttribute('value');
        if (!valAttr) return;

        let val;
        try {
            val = JSON.parse(valAttr);
        } catch (e) {
            val = valAttr;
        }

        if (this.mode === 'single') {
            const item = this.availableItems.find(i => i[this.valueField] == val);
            if (item) {
                this.selectedItems = [item];
            }
        } else {
            if (Array.isArray(val)) {
                this.selectedItems = this.availableItems.filter(i => val.includes(i[this.valueField]));
            }
        }
        this.renderSelectedItems();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = '';
        const style = document.createElement('style');
        style.textContent = `
            :host {
                display: block;
                font-family: var(--sl-font-sans);
            }
            .picker-container {
                display: flex;
                flex-direction: column;
                gap: var(--sl-spacing-2x-small); /* Gap between label and input */
            }
            .label {
                font-size: var(--sl-input-label-font-size-medium);
                font-weight: var(--sl-font-weight-semibold);
                color: var(--sl-input-label-color);
            }
            .selected-items {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                min-height: var(--sl-input-height-medium);
                padding: 0.3rem 0.5rem;
                border: 1px solid var(--sl-input-border-color);
                border-radius: var(--sl-input-border-radius-medium);
                background: var(--sl-input-background-color);
                align-items: center;
                cursor: pointer; /* Make it look clickable */
                transition: var(--sl-transition-fast) border-color, var(--sl-transition-fast) box-shadow;
            }
            .selected-items:hover {
                border-color: var(--sl-input-border-color-hover);
            }
            .selected-items:focus-within {
                border-color: var(--sl-color-primary-500);
                box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-input-focus-ring-color);
            }
            .selected-items.empty {
                color: var(--sl-input-placeholder-color);
                font-size: var(--sl-font-size-medium);
            }
            /* Add a caret icon to indicate dropdown behavior */
            .selected-items::after {
                content: '';
                margin-left: auto;
                display: inline-block;
                width: 1em;
                height: 1em;
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23777'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E");
                background-repeat: no-repeat;
                background-position: center;
            }
            .actions {
                display: none; /* Hide actions container as we don't need the button anymore */
            }
            .item-tag {
                display: inline-flex;
                align-items: center;
                gap: 0.25rem;
            }
            .search-results {
                margin-top: 1rem;
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
                max-height: 300px;
                overflow-y: auto;
            }
            .results-table {
                width: 100%;
                border-collapse: collapse;
                font-size: var(--sl-font-size-small);
            }
            .results-table tr {
                border-bottom: 1px solid var(--sl-color-neutral-200);
                cursor: pointer;
                transition: background-color 0.1s;
            }
            .results-table tr:last-child {
                border-bottom: none;
            }
            .results-table tr:hover {
                background-color: var(--sl-color-primary-50);
            }
            .results-table tr.selected {
                background-color: var(--sl-color-primary-100);
            }
            .results-table td {
                padding: 0.5rem;
                text-align: left;
            }
            .results-table td.icon-cell {
                width: 2rem;
                text-align: center;
            }
        `;
        this.appendChild(style);

        const container = document.createElement('div');
        container.className = 'picker-container';

        if (this.label) {
            const labelEl = document.createElement('label');
            labelEl.className = 'label';
            labelEl.textContent = this.label;
            container.appendChild(labelEl);
        }

        const selectedContainer = document.createElement('div');
        selectedContainer.className = 'selected-items';
        // Add click listener to the container
        selectedContainer.addEventListener('click', (e) => {
            // Prevent opening if clicking on a remove button of a tag
            if (e.target.closest('sl-tag')) return;
            this.openDialog();
        });

        this.selectedContainer = selectedContainer;
        this.renderSelectedItems();

        container.appendChild(selectedContainer);
        this.appendChild(container);
    }

    renderSelectedItems() {
        if (this.selectedItems.length === 0) {
            this.selectedContainer.innerHTML = 'Žádné položky nevybrány';
            this.selectedContainer.classList.add('empty');
            return;
        }

        this.selectedContainer.innerHTML = '';
        this.selectedContainer.classList.remove('empty');

        this.selectedItems.forEach(item => {
            const tag = document.createElement('sl-tag');
            tag.variant = 'primary';
            tag.removable = true;
            tag.size = 'medium';

            // Use chipDisplayFields if available, otherwise fallback to displayFields
            const fieldsToShow = (this.chipDisplayFields && this.chipDisplayFields.length > 0)
                ? this.chipDisplayFields
                : this.displayFields;

            const label = fieldsToShow.map(field => item[field]).join(' - ');
            tag.textContent = label;

            tag.addEventListener('sl-remove', () => {
                this.removeItem(item);
            });

            this.selectedContainer.appendChild(tag);
        });
    }

    removeItem(item) {
        this.selectedItems = this.selectedItems.filter(i => i[this.valueField] !== item[this.valueField]);
        this.renderSelectedItems();
        this.dispatchChange();
    }

    addItem(item) {
        if (this.mode === 'single') {
            this.selectedItems = [item];
        } else {
            if (!this.selectedItems.find(i => i[this.valueField] === item[this.valueField])) {
                this.selectedItems.push(item);
            }
        }
        this.renderSelectedItems();
        this.dispatchChange();
    }

    dispatchChange() {
        const value = this.mode === 'single'
            ? (this.selectedItems[0] ? this.selectedItems[0][this.valueField] : null)
            : this.selectedItems.map(i => i[this.valueField]);

        this.dispatchEvent(new CustomEvent('sl-change', {
            detail: {
                value: value,
                items: this.selectedItems
            },
            bubbles: true,
            composed: true
        }));
    }

    openDialog() {
        const dialog = document.createElement('sl-dialog');
        dialog.label = `Vybrat ${this.targetEntity}`;
        dialog.style.setProperty('--width', '600px');

        const content = document.createElement('div');

        const searchInput = document.createElement('sl-input');
        searchInput.placeholder = 'Hledat...';
        searchInput.clearable = true;
        searchInput.addEventListener('sl-input', (e) => this.filterResults(e.target.value, resultsContainer, dialog));

        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'search-results';

        content.appendChild(searchInput);
        content.appendChild(resultsContainer);

        dialog.appendChild(content);

        const footer = document.createElement('div');
        footer.slot = 'footer';

        const closeBtn = document.createElement('sl-button');
        closeBtn.textContent = 'Zavřít';
        closeBtn.addEventListener('click', () => dialog.hide());

        footer.appendChild(closeBtn);
        dialog.appendChild(footer);

        document.body.appendChild(dialog);

        // Initial render of results
        this.filterResults('', resultsContainer, dialog);

        // Use requestAnimationFrame to ensure element is in DOM before opening
        requestAnimationFrame(() => {
            dialog.open = true;
        });

        dialog.addEventListener('sl-after-hide', () => dialog.remove());
    }

    filterResults(query, container, dialog) {
        container.innerHTML = '';
        const lowerQuery = query.toLowerCase();

        const filtered = this.availableItems.filter(item => {
            return this.displayFields.some(field =>
                String(item[field]).toLowerCase().includes(lowerQuery)
            );
        });

        if (filtered.length === 0) {
            container.innerHTML = '<div style="text-align: center; color: var(--sl-color-neutral-500); padding: 1rem;">Žádné výsledky</div>';
            return;
        }

        const table = document.createElement('table');
        table.className = 'results-table';

        filtered.forEach(item => {
            const row = document.createElement('tr');

            const isSelected = this.selectedItems.some(i => i[this.valueField] === item[this.valueField]);
            if (isSelected) row.classList.add('selected');

            // Render each display field as a cell
            this.displayFields.forEach((field, index) => {
                const cell = document.createElement('td');
                cell.textContent = item[field];

                // Apply compact styling to all but the last data column
                if (index < this.displayFields.length - 1) {
                    cell.style.width = '1%';
                    cell.style.whiteSpace = 'nowrap';
                }

                row.appendChild(cell);
            });

            // Icon cell
            const iconCell = document.createElement('td');
            iconCell.className = 'icon-cell';
            const actionIcon = document.createElement('sl-icon');
            actionIcon.name = isSelected ? 'check-circle-fill' : 'circle';
            actionIcon.style.color = isSelected ? 'var(--sl-color-success-500)' : 'var(--sl-color-neutral-400)';
            iconCell.appendChild(actionIcon);
            row.appendChild(iconCell);

            row.addEventListener('click', () => {
                if (this.mode === 'single') {
                    this.addItem(item);
                    if (dialog) dialog.hide();
                } else {
                    if (isSelected) {
                        this.removeItem(item);
                        row.classList.remove('selected');
                        actionIcon.name = 'circle';
                        actionIcon.style.color = 'var(--sl-color-neutral-400)';
                    } else {
                        this.addItem(item);
                        row.classList.add('selected');
                        actionIcon.name = 'check-circle-fill';
                        actionIcon.style.color = 'var(--sl-color-success-500)';
                    }
                }
            });

            table.appendChild(row);
        });

        container.appendChild(table);
    }
}

customElements.define('ts-relationship-picker', TSRelationshipPicker);
