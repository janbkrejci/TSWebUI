export class TSCombobox extends HTMLElement {
    constructor() {
        super();
        this.options = [];
        this._value = '';
        this.isOpen = false;
        this.filteredOptions = [];
    }

    static get observedAttributes() {
        return ['label', 'value', 'options', 'disabled', 'placeholder', 'required', 'error'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            if (name === 'options') {
                try {
                    this.options = JSON.parse(newValue);
                    this.filteredOptions = [...this.options];
                } catch (e) {
                    this.options = [];
                    this.filteredOptions = [];
                }
            } else if (name === 'value') {
                this._value = newValue;
            }
            this.render();
        }
    }

    connectedCallback() {
        this.render();
        document.addEventListener('click', this.handleDocumentClick.bind(this));
    }

    disconnectedCallback() {
        document.removeEventListener('click', this.handleDocumentClick.bind(this));
    }

    handleDocumentClick(e) {
        if (!this.contains(e.target)) {
            this.isOpen = false;
            this.renderDropdown(); // Only re-render dropdown state
        }
    }

    handleInput(e) {
        const value = e.target.value;
        this._value = value;
        this.isOpen = true;

        if (!value) {
            this.filteredOptions = [...this.options];
        } else {
            const lowerValue = value.toLowerCase();
            this.filteredOptions = this.options.filter(opt => {
                const label = opt.label || opt.value || opt;
                return String(label).toLowerCase().includes(lowerValue);
            });
        }

        this.dispatchEvent(new CustomEvent('sl-change', {
            detail: { value: this._value },
            bubbles: true,
            composed: true
        }));

        this.renderDropdown();
    }

    handleSelect(value) {
        this._value = value;
        this.isOpen = false;

        this.dispatchEvent(new CustomEvent('sl-change', {
            detail: { value: this._value },
            bubbles: true,
            composed: true
        }));

        // Update input value
        const input = this.querySelector('sl-input');
        if (input) {
            input.value = value;
        }
        this.renderDropdown();
    }

    handleFocus() {
        this.isOpen = true;

        // Select all text on focus
        const input = this.querySelector('sl-input');
        if (input) {
            setTimeout(() => input.select(), 0);
        }

        if (this._value) {
            const lowerValue = this._value.toLowerCase();
            this.filteredOptions = this.options.filter(opt => {
                const label = opt.label || opt.value || opt;
                return String(label).toLowerCase().includes(lowerValue);
            });
        } else {
            this.filteredOptions = [...this.options];
        }
        this.renderDropdown();
    }

    render() {
        this.innerHTML = '';
        const label = this.getAttribute('label');
        const disabled = this.hasAttribute('disabled');
        const placeholder = this.getAttribute('placeholder') || '';
        const required = this.hasAttribute('required');
        const error = this.getAttribute('error');

        const container = document.createElement('div');
        container.style.position = 'relative';
        container.style.width = '100%';

        const input = document.createElement('sl-input');
        if (label) input.label = label;
        input.value = this._value || '';
        input.disabled = disabled;
        input.placeholder = placeholder;
        input.required = required;
        if (error) input.classList.add('input-invalid');
        input.setAttribute('autocomplete', 'off');

        const icon = document.createElement('sl-icon');
        icon.slot = 'suffix';
        icon.name = 'chevron-down';
        input.appendChild(icon);

        input.addEventListener('sl-input', this.handleInput.bind(this));
        input.addEventListener('sl-focus', this.handleFocus.bind(this));

        container.appendChild(input);

        const dropdown = document.createElement('div');
        dropdown.className = 'ts-combobox-dropdown';
        // Styles will be applied via inline styles in renderDropdown or a style block

        container.appendChild(dropdown);
        this.appendChild(container);

        // Add styles once
        if (!this.querySelector('style')) {
            const style = document.createElement('style');
            style.textContent = `
                .ts-combobox-dropdown {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    width: 100%;
                    max-height: 200px;
                    overflow-y: auto;
                    background: var(--sl-color-neutral-0);
                    border: 1px solid var(--sl-color-neutral-200);
                    border-radius: var(--sl-border-radius-medium);
                    box-shadow: var(--sl-shadow-medium);
                    z-index: 1000;
                    margin-top: 4px;
                    display: none;
                }
                .ts-combobox-item {
                    padding: var(--sl-spacing-small) var(--sl-spacing-medium);
                    cursor: pointer;
                    transition: background-color 0.1s;
                    color: var(--sl-color-neutral-700);
                    font-family: var(--sl-font-sans);
                    font-size: var(--sl-font-size-medium);
                }
                .ts-combobox-item:hover {
                    background-color: var(--sl-color-primary-50);
                    color: var(--sl-color-primary-700);
                }
            `;
            this.appendChild(style);
        }

        this.renderDropdown();
    }

    renderDropdown() {
        const dropdown = this.querySelector('.ts-combobox-dropdown');
        if (!dropdown) return;

        if (this.isOpen && this.filteredOptions.length > 0) {
            dropdown.style.display = 'block';
            dropdown.innerHTML = '';

            this.filteredOptions.forEach(opt => {
                const val = opt.value || opt;
                const lbl = opt.label || val;

                const item = document.createElement('div');
                item.className = 'ts-combobox-item';
                item.textContent = lbl;
                item.addEventListener('click', () => this.handleSelect(val));

                dropdown.appendChild(item);
            });
        } else {
            dropdown.style.display = 'none';
        }
    }
}

customElements.define('ts-combobox', TSCombobox);
