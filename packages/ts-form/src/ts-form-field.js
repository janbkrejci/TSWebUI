import './ts-file-upload.js';
import './ts-relationship-picker.js';

export class TSFormField extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['field-name', 'config', 'value', 'error'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = '';
        const fieldName = this.getAttribute('field-name');
        const configStr = this.getAttribute('config');
        const value = this.getAttribute('value');
        const error = this.getAttribute('error');

        if (!fieldName || !configStr) return;

        let config;
        try {
            config = JSON.parse(configStr);
        } catch (e) {
            console.error('Invalid config for field', fieldName, e);
            return;
        }

        let parsedValue = value;
        try {
            if (value && (value.startsWith('[') || value.startsWith('{') || value === 'true' || value === 'false')) {
                parsedValue = JSON.parse(value);
            }
        } catch (e) {
            // Keep as string if parse fails
        }

        const field = this.createField(fieldName, config, parsedValue);
        this.appendChild(field);

        // Special handling for select to ensure value is picked up after connection
        if (config.type === 'select') {
            Promise.all([
                customElements.whenDefined('sl-select'),
                customElements.whenDefined('sl-option')
            ]).then(() => {
                // Wait for next frame to ensure options are slotted and upgraded
                requestAnimationFrame(() => {
                    if (config.multiple && Array.isArray(parsedValue)) {
                        console.log(`Setting select multiple value for ${fieldName} (delayed):`, parsedValue);
                        field.value = parsedValue;
                    } else {
                        console.log(`Setting select value for ${fieldName} (delayed):`, parsedValue);
                        field.value = parsedValue || '';
                    }
                });
            });
        }

        if (error) {
            field.classList.add('input-invalid');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = error;
            this.appendChild(errorDiv);
        }
    }

    createField(fieldName, config, value) {
        let field;
        switch (config.type) {
            case 'textarea':
                field = document.createElement('sl-textarea');
                field.value = value || '';
                break;
            case 'password':
                field = document.createElement('sl-input');
                field.type = 'password';
                field.passwordToggle = true;
                field.value = value || '';
                break;
            case 'checkbox':
                field = document.createElement('sl-checkbox');
                field.textContent = config.label;
                field.checked = value === true;
                break;
            case 'switch':
                const switchContainer = document.createElement('div');
                switchContainer.style.display = 'flex';
                switchContainer.style.alignItems = 'center';
                field = document.createElement('sl-switch');
                const switchLabel = document.createElement('label');
                switchLabel.textContent = config.label;
                if (config.labelPosition === 'left') {
                    switchLabel.style.marginRight = '0.5rem';
                    switchContainer.appendChild(switchLabel);
                    switchContainer.appendChild(field);
                } else {
                    switchLabel.style.marginLeft = '0.5rem';
                    switchContainer.appendChild(field);
                    switchContainer.appendChild(switchLabel);
                }

                field.name = fieldName;
                field.checked = value === true;
                field.addEventListener('sl-change', (e) => this.handleFieldChange(e, fieldName));

                return switchContainer;

            case 'slider':
                field = document.createElement('sl-range');
                if (config.min) field.min = config.min;
                if (config.max) field.max = config.max;
                if (config.step) field.step = config.step;
                field.value = value || config.min || 0;
                break;
            case 'combobox':
                field = document.createElement('sl-input');
                field.setAttribute('list', `datalist-${fieldName}`);
                field.value = value || '';
                const datalist = document.createElement('datalist');
                datalist.id = `datalist-${fieldName}`;
                if (config.options) {
                    config.options.forEach(opt => {
                        const option = document.createElement('option');
                        option.value = opt.value;
                        datalist.appendChild(option);
                    });
                }
                field.appendChild(datalist);
                break;
            case 'file':
            case 'image':
                field = document.createElement('ts-file-upload');
                field.setAttribute('label', config.label || 'Upload file');
                if (config.multiple) {
                    field.setAttribute('multiple', 'true');
                }
                if (config.type === 'image') {
                    field.setAttribute('accept', 'image/*');
                } else if (config.accept) {
                    field.setAttribute('accept', config.accept);
                }
                // File input cannot set value programmatically for security reasons
                break;
            case 'button':
                field = document.createElement('sl-button');
                field.variant = config.variant || 'primary';
                field.textContent = config.label || 'Button';
                field.addEventListener('click', () => {
                    this.dispatchEvent(new CustomEvent('form-field-action', {
                        detail: {
                            field: fieldName,
                            action: config.action || 'click'
                        },
                        bubbles: true,
                        composed: true
                    }));
                });
                return field;
            case 'button-group':
                const slButtonGroup = document.createElement('sl-button-group');
                slButtonGroup.style.display = 'flex';
                slButtonGroup.style.gap = '0.5rem';
                if (config.options) {
                    config.options.forEach(btnStr => {
                        const [val, enabled = 'true', variant = 'default', label = ''] = btnStr.split('/');
                        const b = document.createElement('sl-button');
                        b.dataset.value = val;
                        b.variant = (value === val) ? (variant || 'primary') : (variant || 'default');
                        b.textContent = label || val;
                        b.disabled = enabled === 'false';
                        b.addEventListener('click', () => {
                            this.dispatchEvent(new CustomEvent('field-change', {
                                detail: {
                                    field: fieldName,
                                    value: val
                                },
                                bubbles: true,
                                composed: true
                            }));
                        });
                        slButtonGroup.appendChild(b);
                    });
                }
                return slButtonGroup;
            case 'radio':
                field = document.createElement('sl-radio-group');
                field.label = config.label;
                if (config.options) {
                    config.options.forEach(opt => {
                        const radio = document.createElement('sl-radio');
                        radio.value = opt.value;
                        radio.textContent = opt.label;
                        field.appendChild(radio);
                    });
                }
                setTimeout(() => {
                    field.value = value || '';
                }, 0);
                break;
            case 'date':
                field = document.createElement('sl-input');
                field.type = 'date';
                field.value = value || '';
                break;
            case 'datetime':
                field = document.createElement('sl-input');
                field.type = 'datetime-local';
                field.value = value || '';
                break;
            case 'select':
                field = document.createElement('sl-select');
                field.label = config.label;
                if (config.multiple) {
                    field.multiple = true;
                    field.clearable = true;
                }
                if (config.options) {
                    config.options.forEach(opt => {
                        const option = document.createElement('sl-option');
                        option.value = opt.value;
                        option.textContent = opt.label;
                        field.appendChild(option);
                    });
                }
                // Value setting moved to after connection to ensure options are ready
                break;
            case 'relationship':
                field = document.createElement('ts-relationship-picker');
                field.setAttribute('target-entity', config.targetEntity || '');
                field.setAttribute('mode', config.mode || 'single');
                if (config.label) {
                    field.setAttribute('label', config.label);
                }
                if (config.displayFields) {
                    field.setAttribute('display-fields', JSON.stringify(config.displayFields));
                }
                if (config.chipDisplayFields) {
                    field.setAttribute('chip-display-fields', JSON.stringify(config.chipDisplayFields));
                }
                if (config.valueField) {
                    field.setAttribute('value-field', config.valueField);
                }
                if (config.options) {
                    field.setAttribute('options', JSON.stringify(config.options));
                }
                if (value) {
                    field.setAttribute('value', JSON.stringify(value));
                }
                break;

            default:
                field = document.createElement('sl-input');
                field.type = config.type || 'text';
                field.value = value || '';
        }

        field.name = fieldName;

        if (config.type !== 'checkbox' && config.type !== 'radio' && config.type !== 'switch' && config.type !== 'file' && config.type !== 'image') {
            field.label = config.label;
        }

        if (config.required) {
            field.required = true;
        }



        field.addEventListener('sl-change', (e) => this.handleFieldChange(e, fieldName));
        return field;
    }

    handleFieldChange(event, fieldName) {
        const field = event.target;
        let newValue;

        if (field.tagName === 'SL-CHECKBOX' || field.tagName === 'SL-SWITCH') {
            newValue = field.checked;
        } else if (field.tagName === 'TS-FILE-UPLOAD') {
            newValue = event.detail.files;
        } else if (field.tagName === 'TS-RELATIONSHIP-PICKER') {
            newValue = event.detail.value;
        } else if (field.type === 'file') {
            newValue = field.files;
        } else {
            newValue = field.value;
        }

        this.dispatchEvent(new CustomEvent('field-change', {
            detail: {
                field: fieldName,
                value: newValue
            },
            bubbles: true,
            composed: true
        }));
    }
}

customElements.define('ts-form-field', TSFormField);
