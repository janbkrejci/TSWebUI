
class TSForm extends HTMLElement {
    constructor() {
        super();
        this.formData = {};
        this.validationErrors = {};
        this.lastAction = null;
        this.buttons = {};
    }

    static get observedAttributes() {
        return ['layout', 'fields', 'errors', 'buttons'];
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
        this.buttons = {}; // Reset button references
        const layout = this.getAttribute('layout');
        const fields = this.getAttribute('fields');
        const errors = this.getAttribute('errors');
        const buttons = this.getAttribute('buttons');

        if (!layout || !fields) {
            return;
        }

        try {
            const layoutConfig = JSON.parse(layout);
            const fieldsConfig = JSON.parse(fields);
            this.validationErrors = errors ? JSON.parse(errors) : {};

            // Inicializace formData pro všechna pole
            this.formData = {};
            Object.keys(fieldsConfig).forEach(fieldName => {
                const config = fieldsConfig[fieldName];
                if (config.type === 'checkbox') {
                    this.formData[fieldName] = false;
                } else {
                    this.formData[fieldName] = '';
                }
            });

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
                /* invalid styles */
                .input-invalid {
                    --sl-input-border-color: var(--sl-color-danger-600);
                    --sl-input-border-color-hover: var(--sl-color-danger-600);
                    --sl-input-border-color-focus: var(--sl-color-danger-600);
                }

                .input-invalid:focus-within {
                    --sl-input-border-color: var(--sl-color-danger-600);
                    --sl-input-focus-ring-color: var(--sl-color-danger-300);
                }

                .input-invalid sl-radio::part(label) {
                    color: var(--sl-color-danger-700);
                }

                .input-invalid::part(form-control-label),
                .input-invalid::part(form-control-help-text),
                .input-invalid::part(label) {
                    color: var(--sl-color-danger-700);
                }

                .input-invalid sl-checkbox::part(control) {
                    outline: none;
                }

                sl-tab.invalid::part(base) {
                    color: var(--sl-color-danger-700);
                }

                sl-tab.invalid[active]::part(base) {
                    color: var(--sl-color-danger-700);
                }

                sl-tab-group::part(nav) {
                    position: sticky;
                    top: 0;
                    background: white;
                    z-index: 1;
                }
            `;
            this.appendChild(style);

            const form = document.createElement('form');
            form.noValidate = true;
            form.style.display = 'flex';
            form.style.flexDirection = 'column';
            form.style.height = '100%';

            if (layoutConfig.tabs) {
                const tabGroup = document.createElement('sl-tab-group');
                let hasAnyInvalidTab = false;
                layoutConfig.tabs.forEach((tab, index) => {
                    const slTab = document.createElement('sl-tab');
                    slTab.slot = 'nav';
                    slTab.panel = `tab-${index}`;
                    slTab.textContent = tab.label;
                    if (index === 0) slTab.active = true;

                    // Check if tab has any errors
                    const hasErrors = tab.rows.some(row => row.some(col => this.validationErrors[col.field]));
                    if (hasErrors) {
                        slTab.classList.add('invalid');
                        hasAnyInvalidTab = true;
                    }

                    tabGroup.appendChild(slTab);

                    const tabPanel = document.createElement('sl-tab-panel');
                    tabPanel.name = `tab-${index}`;
                    if (index === 0) tabPanel.active = true;

                    this.renderRows(tab.rows, fieldsConfig, tabPanel);
                    tabGroup.appendChild(tabPanel);
                });
                if (hasAnyInvalidTab) {
                    tabGroup.classList.add('invalid');
                    // Dynamically set indicator color based on active tab
                    const updateIndicator = () => {
                        const activeTab = tabGroup.querySelector('sl-tab[active]');
                        if (activeTab && activeTab.classList.contains('invalid')) {
                            tabGroup.style.setProperty('--indicator-color', 'var(--sl-color-danger-600)');
                        } else {
                            tabGroup.style.setProperty('--indicator-color', 'var(--sl-color-primary-600)');
                        }
                    };
                    tabGroup.addEventListener('sl-tab-show', () => setTimeout(updateIndicator, 0));
                    // Initial check after DOM is ready
                    setTimeout(updateIndicator, 0);
                }
                tabGroup.style.flex = '1';
                tabGroup.style.overflow = 'auto';
                form.appendChild(tabGroup);
            } else if (layoutConfig.rows) {
                this.renderRows(layoutConfig.rows, fieldsConfig, form);
            }

            const actions = document.createElement('div');
            actions.className = 'form-actions';
            actions.style.position = 'sticky';
            actions.style.bottom = '0';
            actions.style.background = 'white';
            actions.style.padding = '1rem';
            actions.style.borderTop = '1px solid var(--sl-color-neutral-200)';
            actions.style.display = 'flex';
            actions.style.justifyContent = 'space-between';
            actions.style.alignItems = 'center';

            const leftDiv = document.createElement('div');
            leftDiv.style.display = 'flex';
            leftDiv.style.gap = '0.5rem';
            const centerDiv = document.createElement('div');
            centerDiv.style.display = 'flex';
            centerDiv.style.gap = '0.5rem';
            const rightDiv = document.createElement('div');
            rightDiv.style.display = 'flex';
            rightDiv.style.gap = '0.5rem';

            actions.appendChild(leftDiv);
            actions.appendChild(centerDiv);
            actions.appendChild(rightDiv);

            if (buttons) {
                const buttonsConfig = JSON.parse(buttons);
                buttonsConfig.forEach(btn => {
                    const button = document.createElement('sl-button');
                    button.variant = btn.variant || 'primary';
                    button.textContent = btn.label || btn.action;
                    button.type = 'button'; // Prevent default submit
                    if (btn.disabled) {
                        button.disabled = true;
                    }
                    if (btn.hidden) {
                        button.hidden = true;
                    }
                    button.addEventListener('click', () => {
                        this.lastAction = btn.action;
                        this.dispatchEvent(new CustomEvent('form-submit', {
                            detail: {
                                formData: this.formData,
                                action: btn.action
                            },
                            bubbles: true,
                            composed: true
                        }));
                    });
                    this.buttons[btn.action] = button;
                    const position = btn.position || 'right';
                    if (position === 'left') {
                        leftDiv.appendChild(button);
                    } else if (position === 'center') {
                        centerDiv.appendChild(button);
                    } else {
                        rightDiv.appendChild(button);
                    }
                });
            } else {
                const submitButton = document.createElement('sl-button');
                submitButton.variant = 'primary';
                submitButton.textContent = 'Submit';
                submitButton.type = 'button';
                submitButton.addEventListener('click', () => {
                    this.lastAction = 'submit';
                    this.dispatchEvent(new CustomEvent('form-submit', {
                        detail: {
                            formData: this.formData,
                            action: 'submit'
                        },
                        bubbles: true,
                        composed: true
                    }));
                });
                this.buttons['submit'] = submitButton;
                rightDiv.appendChild(submitButton);
            }

            form.addEventListener('submit', this.handleSubmit.bind(this));
            form.appendChild(actions);
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
                    fieldContainer.style.padding = '0.5rem';
                    const field = this.createField(col.field, fieldConfig);
                    fieldContainer.appendChild(field);

                    const error = this.validationErrors[col.field];
                    if(error) {
                        field.classList.add('input-invalid');
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
        if (field.tagName === 'SL-CHECKBOX') {
            // Zkus použít event.detail.checked, případně field.checked nebo field.hasAttribute('checked')
            if (event.detail && typeof event.detail.checked !== 'undefined') {
                this.formData[field.name] = event.detail.checked;
            } else if (typeof field.checked !== 'undefined') {
                this.formData[field.name] = field.checked;
            } else {
                this.formData[field.name] = field.hasAttribute('checked');
            }
        } else {
            this.formData[field.name] = field.value;
        }
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
                formData: this.formData,
                action: this.lastAction
            },
            bubbles: true,
            composed: true
        }));
    }

    disableButton(action) {
        if (this.buttons[action]) {
            this.buttons[action].disabled = true;
        }
    }

    enableButton(action) {
        if (this.buttons[action]) {
            this.buttons[action].disabled = false;
        }
    }

    hideButton(action) {
        if (this.buttons[action]) {
            this.buttons[action].hidden = true;
        }
    }

    showButton(action) {
        if (this.buttons[action]) {
            this.buttons[action].hidden = false;
        }
    }
}

customElements.define('ts-form', TSForm);
