import './ts-form-field.js';

class TSForm extends HTMLElement {
    constructor() {
        super();
        this.formData = {};
        this.validationErrors = {};
        this.lastAction = null;
        this.buttons = {};
    }

    static get observedAttributes() {
        return ['layout', 'fields', 'errors', 'buttons', 'values'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.addEventListener('field-change', (e) => {
            e.stopPropagation();
            const { field, value } = e.detail;
            this.formData[field] = value;

            this.dispatchEvent(new CustomEvent('form-changed', {
                detail: {
                    field: field,
                    value: value,
                    formData: this.formData
                },
                bubbles: true,
                composed: true
            }));
        });

        this.addEventListener('form-field-action', (e) => {
            // Re-dispatch or handle specific field actions
        });
    }

    render() {
        this.innerHTML = ''; // Clear previous content
        this.buttons = {}; // Reset button references
        const layout = this.getAttribute('layout');
        const fields = this.getAttribute('fields');
        const errors = this.getAttribute('errors');
        const buttons = this.getAttribute('buttons');
        const values = this.getAttribute('values');

        if (!layout || !fields) {
            return;
        }

        try {
            const layoutConfig = JSON.parse(layout);
            const fieldsConfig = JSON.parse(fields);
            this.validationErrors = errors ? JSON.parse(errors) : {};

            // Initialize formData
            // Only reset if empty to preserve state during re-renders if needed, 
            // but for now we follow original logic to reset or merge with values
            if (Object.keys(this.formData).length === 0) {
                Object.keys(fieldsConfig).forEach(fieldName => {
                    const config = fieldsConfig[fieldName];
                    this.formData[fieldName] = config.type === 'checkbox' ? false : '';
                });
            }

            if (values) {
                const valuesObj = JSON.parse(values);
                this.formData = { ...this.formData, ...valuesObj };
            }

            const style = document.createElement('style');
            style.textContent = `
                :host {
                    display: block;
                    --label-spacing: var(--sl-spacing-2x-small);
                }
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
                
                /* Increase label spacing */
                ts-form-field::part(form-control-label) {
                    margin-bottom: var(--label-spacing);
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

                /* switch label when its container has .input-invalid */
                .input-invalid label {
                    color: var(--sl-color-danger-700);
                }

                .input-invalid sl-switch::part(label) {
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
                    background: var(--sl-color-neutral-0);
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
            actions.style.background = 'var(--sl-color-neutral-0)';
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
                        button.style.display = 'none';
                    }
                    button.addEventListener('click', () => {
                        this.lastAction = btn.action;
                        if (btn.confirmation) {
                            this.showConfirmationDialog(btn.confirmation, () => {
                                this.dispatchEvent(new CustomEvent('form-submit', {
                                    detail: {
                                        formData: this.formData,
                                        action: btn.action
                                    },
                                    bubbles: true,
                                    composed: true
                                }));
                            });
                        } else {
                            this.dispatchEvent(new CustomEvent('form-submit', {
                                detail: {
                                    formData: this.formData,
                                    action: btn.action
                                },
                                bubbles: true,
                                composed: true
                            }));
                        }
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

                    const fieldComponent = document.createElement('ts-form-field');
                    fieldComponent.setAttribute('field-name', col.field);
                    fieldComponent.setAttribute('config', JSON.stringify(fieldConfig));

                    const value = this.formData[col.field];
                    if (value !== undefined && value !== null) {
                        if (typeof value === 'object') {
                            fieldComponent.setAttribute('value', JSON.stringify(value));
                        } else {
                            fieldComponent.setAttribute('value', value);
                        }
                    }

                    const error = this.validationErrors[col.field];
                    if (error) {
                        fieldComponent.setAttribute('error', error);
                    }

                    fieldContainer.appendChild(fieldComponent);
                    rowDiv.appendChild(fieldContainer);
                }
            });
            parent.appendChild(rowDiv);
        });
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
            this.buttons[action].style.display = 'none';
        }
    }

    showButton(action) {
        if (this.buttons[action]) {
            this.buttons[action].style.display = '';
        }
    }

    showConfirmationDialog(confirmation, onConfirm) {
        const dialog = document.createElement('sl-dialog');
        dialog.label = confirmation.title || 'Confirm';
        dialog.open = true;
        dialog.size = 'medium';
        dialog.style.fontFamily = 'var(--sl-font-sans)';

        const content = document.createElement('div');
        content.textContent = confirmation.text || 'Are you sure?';
        dialog.appendChild(content);

        const footer = document.createElement('div');
        footer.slot = 'footer';
        footer.style.display = 'flex';
        footer.style.justifyContent = 'space-between';
        footer.style.alignItems = 'center';

        const leftDiv = document.createElement('div');
        leftDiv.style.display = 'flex';
        leftDiv.style.gap = '0.5rem';
        const centerDiv = document.createElement('div');
        centerDiv.style.display = 'flex';
        centerDiv.style.gap = '0.5rem';
        const rightDiv = document.createElement('div');
        rightDiv.style.display = 'flex';
        rightDiv.style.gap = '0.5rem';

        footer.appendChild(leftDiv);
        footer.appendChild(centerDiv);
        footer.appendChild(rightDiv);

        confirmation.buttons.forEach(btn => {
            const button = document.createElement('sl-button');
            button.variant = btn.variant || 'primary';
            button.textContent = btn.label || btn.action;
            button.addEventListener('click', () => {
                dialog.hide();
                if (btn.confirm) {
                    onConfirm();
                }
            });
            const position = btn.position || 'right';
            if (position === 'left') {
                leftDiv.appendChild(button);
            } else if (position === 'center') {
                centerDiv.appendChild(button);
            } else {
                rightDiv.appendChild(button);
            }
        });

        dialog.appendChild(footer);
        document.body.appendChild(dialog);
    }
}

customElements.define('ts-form', TSForm);
