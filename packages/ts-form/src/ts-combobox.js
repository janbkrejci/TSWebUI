import { html, render } from 'lit-html';

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
            this.render();
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

        this.render();

        // Keep focus on input
        requestAnimationFrame(() => {
            const input = this.querySelector('sl-input');
            if (input) input.focus();
        });
    }

    handleSelect(value) {
        this._value = value;
        this.isOpen = false;

        this.dispatchEvent(new CustomEvent('sl-change', {
            detail: { value: this._value },
            bubbles: true,
            composed: true
        }));

        this.render();
    }

    handleFocus() {
        this.isOpen = true;

        // Select all text on focus
        const input = this.querySelector('sl-input');
        if (input) {
            // Use setTimeout to ensure selection happens after focus event processing
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
        this.render();
    }

    render() {
        const label = this.getAttribute('label');
        const disabled = this.hasAttribute('disabled');
        const placeholder = this.getAttribute('placeholder') || '';
        const required = this.hasAttribute('required');
        const error = this.getAttribute('error');

        // Styles for the dropdown
        const dropdownStyle = `
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
            display: ${this.isOpen && this.filteredOptions.length > 0 ? 'block' : 'none'};
            margin-top: 4px;
        `;

        const itemStyle = `
            padding: var(--sl-spacing-small) var(--sl-spacing-medium);
            cursor: pointer;
            transition: background-color 0.1s;
            color: var(--sl-color-neutral-700);
            font-family: var(--sl-font-sans);
            font-size: var(--sl-font-size-medium);
        `;

        const itemHoverStyle = `
            background-color: var(--sl-color-primary-50);
            color: var(--sl-color-primary-700);
        `;

        const template = html`
            <div style="position: relative; width: 100%;">
                <sl-input
                    .label=${label}
                    .value=${this._value}
                    .disabled=${disabled}
                    .placeholder=${placeholder}
                    .required=${required}
                    class=${error ? 'input-invalid' : ''}
                    @sl-input=${this.handleInput.bind(this)}
                    @sl-focus=${this.handleFocus.bind(this)}
                    autocomplete="off"
                >
                    <sl-icon slot="suffix" name="chevron-down"></sl-icon>
                </sl-input>
                
                <div style=${dropdownStyle}>
                    ${this.filteredOptions.map(opt => {
            const val = opt.value || opt;
            const lbl = opt.label || val;
            return html`
                            <div 
                                style=${itemStyle}
                                @click=${() => this.handleSelect(val)}
                                @mouseover=${(e) => {
                    e.target.style.backgroundColor = 'var(--sl-color-primary-50)';
                    e.target.style.color = 'var(--sl-color-primary-700)';
                }}
                                @mouseout=${(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = 'var(--sl-color-neutral-700)';
                }}
                            >
                                ${lbl}
                            </div>
                        `;
        })}
                </div>
            </div>
        `;

        render(template, this);
    }
}

customElements.define('ts-combobox', TSCombobox);
