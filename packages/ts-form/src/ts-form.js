
class TSForm extends HTMLElement {
    constructor() {
        super();
        this.formData = {};
        this.validationErrors = {};
    }

    static get observedAttributes() {
        return ['layout', 'fields', 'errors'];
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
    this.innerHTML = ''; // Clear previous content
        const layout = this.getAttribute('layout');
        const fields = this.getAttribute('fields');
        const errors = this.getAttribute('errors');

        if (!layout || !fields) {
            return;
        }

        try {
            const layoutConfig = JSON.parse(layout);
            const fieldsConfig = JSON.parse(fields);
            this.validationErrors = errors ? JSON.parse(errors) : {};

            const style = document.createElement('style');
            style.textContent = `
                .form-row {
                    display: grid;
                    gap: 1rem;
                    margin-bottom: 1rem;
                }
                .form-actions {
                    margin-top: 1.5rem;
                }
                .error-message {
                    color: var(--sl-color-danger-500);
                    font-size: var(--sl-font-size-small);
                    margin-top: 0.25rem;
                }
            `;
                this.appendChild(style);

            const form = document.createElement('form');
            form.noValidate = true;

            if (layoutConfig.tabs) {
                const tabGroup = document.createElement('sl-tab-group');
                layoutConfig.tabs.forEach((tab, index) => {
                    const slTab = document.createElement('sl-tab');
                    slTab.slot = 'nav';
                    slTab.panel = `tab-${index}`;
                    slTab.textContent = tab.label;
                    if (index === 0) slTab.active = true;
                    tabGroup.appendChild(slTab);

                    const tabPanel = document.createElement('sl-tab-panel');
                    tabPanel.name = `tab-${index}`;
                    if (index === 0) tabPanel.active = true;

                    this.renderRows(tab.rows, fieldsConfig, tabPanel);
                    tabGroup.appendChild(tabPanel);
                });
                form.appendChild(tabGroup);
            } else if (layoutConfig.rows) {
                this.renderRows(layoutConfig.rows, fieldsConfig, form);
            }

            const actions = document.createElement('div');
            actions.className = 'form-actions';
            const submitButton = document.createElement('sl-button');
            submitButton.variant = 'primary';
            submitButton.textContent = 'Submit';
            submitButton.type = 'submit';
            actions.appendChild(submitButton);
            form.appendChild(actions);

            form.addEventListener('submit', this.handleSubmit.bind(this));
                this.appendChild(form);

        } catch (e) {
            console.error('Failed to parse form configuration:', e);
            this.innerHTML = '<p>Error: Invalid form configuration.</p>';
        }
    }

    renderRows(rows, fieldsConfig, parent) {
        rows.forEach(row => {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'form-row';
            rowDiv.style.gridTemplateColumns = row.map(col => col.width || '1fr').join(' ');

            row.forEach(col => {
                const fieldConfig = fieldsConfig[col.field];
                if (fieldConfig) {
                    const fieldContainer = document.createElement('div');
                    const field = this.createField(col.field, fieldConfig);
                    fieldContainer.appendChild(field);

                    const error = this.validationErrors[col.field];
                    if(error) {
                        const errorDiv = document.createElement('div');
                        errorDiv.className = 'error-message';
                        errorDiv.textContent = error;
                        fieldContainer.appendChild(errorDiv);
                    }
                    rowDiv.appendChild(fieldContainer);
                }
            });
            parent.appendChild(rowDiv);
        });
    }

    createField(fieldName, config) {
        let field;
        switch (config.type) {
            case 'textarea':
                field = document.createElement('sl-textarea');
                break;
            case 'checkbox':
                field = document.createElement('sl-checkbox');
                field.textContent = config.label;
                break;
            case 'radio':
                field = document.createElement('sl-radio-group');
                field.label = config.label;
                config.options.forEach(opt => {
                    const radio = document.createElement('sl-radio');
                    radio.value = opt.value;
                    radio.textContent = opt.label;
                    field.appendChild(radio);
                });
                break;
            case 'select':
                field = document.createElement('sl-select');
                field.label = config.label;
                config.options.forEach(opt => {
                    const option = document.createElement('sl-option');
                    option.value = opt.value;
                    option.textContent = opt.label;
                    field.appendChild(option);
                });
                break;
            default:
                field = document.createElement('sl-input');
                field.type = config.type || 'text';
        }
        field.name = fieldName;
        if (config.type !== 'checkbox' && config.type !== 'radio') {
            field.label = config.label;
        }
        if (config.required) {
            field.required = true;
        }
        field.addEventListener('sl-change', this.handleFieldChange.bind(this));
        return field;
    }

    handleFieldChange(event) {
        const field = event.target;
        this.formData[field.name] = field.type === 'checkbox' ? field.checked : field.value;
        this.dispatchEvent(new CustomEvent('form-changed', {
            detail: {
                field: field.name,
                value: this.formData[field.name],
                formData: this.formData
            },
            bubbles: true,
            composed: true
        }));
    }

    handleSubmit(event) {
        event.preventDefault();
        this.dispatchEvent(new CustomEvent('form-submit', {
            detail: {
                formData: this.formData
            },
            bubbles: true,
            composed: true
        }));
    }
}

customElements.define('ts-form', TSForm);
