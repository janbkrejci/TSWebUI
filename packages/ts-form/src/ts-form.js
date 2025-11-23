import './ts-form-field.js';

class TSForm extends HTMLElement {
    constructor() {
        super();
        this.formData = {};
        this.validationErrors = {};
        this.lastAction = null;
        this.buttons = {};
        this.isInitialized = false;
    }

    static get observedAttributes() {
        return ['layout', 'fields', 'errors', 'buttons', 'values', 'active-tab'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            if (name === 'active-tab') {
                this.switchTab(newValue);
            } else if (this.isInitialized) {
                // Only re-render if already initialized via run()
                this.requestRender();
            }
        }
    }

    run() {
        this.isInitialized = true;
        this.render();

        // Wait for Shoelace components to be defined before showing content
        Promise.all(
            [
                'sl-tab-group',
                'sl-tab',
                'sl-tab-panel',
                'sl-button',
                'sl-input',
                'sl-select',
                'sl-option',
                'sl-switch',
                'sl-checkbox',
                'sl-textarea',
                'sl-radio-group',
                'sl-radio',
                'sl-icon'
            ].map(tag => customElements.whenDefined(tag)))
            .then(() => {
                const container = this.querySelector('.ts-form-container');
                const loader = this.querySelector('.loader');
                if (container) {
                    // Small delay to ensure DOM is painted
                    requestAnimationFrame(() => {
                        container.style.opacity = '1';
                        if (loader) {
                            loader.classList.add('hidden');
                        }
                    });
                }
            }).catch(() => {
                // Fallback
                const container = this.querySelector('.ts-form-container');
                const loader = this.querySelector('.loader');
                if (container) {
                    container.style.opacity = '1';
                    if (loader) {
                        loader.classList.add('hidden');
                    }
                }
            });
    }

    requestRender() {
        if (this.renderPending) return;
        this.renderPending = true;
        requestAnimationFrame(() => {
            this.render();
            this.renderPending = false;
        });
    }

    switchTab(tabIndex) {
        const tabGroup = this.querySelector('sl-tab-group');
        if (tabGroup) {
            const panelName = `tab-${tabIndex}`;
            tabGroup.show(panelName);
        }
    }

    connectedCallback() {
        this.ensureStructure();
        this.setupEventListeners();
    }

    ensureStructure() {
        if (this.querySelector('.ts-form-container')) return;

        // Create style
        const style = document.createElement('style');
        style.textContent = `
            :host {
                display: block;
                width: 100%;
                height: 100vh;
                --label-spacing: var(--sl-spacing-2x-small);
                position: relative; /* For loader positioning */
            }
            .ts-form-container {
                opacity: 0;
                transition: opacity 0.3s ease-in-out;
                width: 100%;
                height: 100%;
            }
            .loader {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                width: 100%;
                position: absolute;
                top: 0;
                left: 0;
                background: var(--sl-color-neutral-0);
                z-index: 100;
                transition: opacity 0.3s ease-out;
            }
            .loader.hidden {
                opacity: 0;
                pointer-events: none;
            }
            .dot {
                width: 10px;
                height: 10px;
                margin: 0 5px;
                background-color: var(--sl-color-primary-600);
                border-radius: 50%;
                animation: bounce 1.4s infinite ease-in-out both;
            }
            .dot:nth-child(1) { animation-delay: -0.32s; }
            .dot:nth-child(2) { animation-delay: -0.16s; }
            @keyframes bounce {
                0%, 80%, 100% { transform: scale(0); }
                40% { transform: scale(1); }
            }
            form {
                display: grid;
                grid-template-rows: 1fr auto;
                width: 100%;
                height: 100%;
                overflow: hidden;
            }
            .form-actions {
                grid-row: 2;
                display: flex;
                justify-content: flex-end;
                gap: 1rem;
                background: var(--sl-color-neutral-0);
                padding: 1rem;
                border-top: 1px solid var(--sl-color-neutral-200);
                z-index: 10;
            }
            sl-tab-group {
                grid-row: 1;
                display: flex;
                flex-direction: column;
                height: 100%;
                overflow: hidden;
            }
            sl-tab-group::part(base) {
                display: flex;
                flex-direction: column;
                height: 100%;
            }
            sl-tab-group::part(body) {
                flex: 1;
                overflow: hidden; /* Delegate scrolling to tab-content */
                display: flex;
                flex-direction: column;
            }
            sl-tab-panel {
                height: 100%;
                width: 100%;
                --padding: 0;
            }
            sl-tab-panel::part(base) {
                height: 100%;
                width: 100%;
                display: block; /* Ensure base part fills host */
            }
            .tab-content {
                padding: 1rem;
                max-width: 1200px;
                margin: 0 auto;
                height: 100%;
                overflow: auto;
                box-sizing: border-box;
            }
            .tab-content.full-height {
                padding: 1rem;
                max-width: none;
                overflow: hidden; /* Let table handle scrolling */
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
            }
            .tab-content.full-height .form-row {
                height: 100%;
                margin-bottom: 0;
                gap: 0; /* Remove gap for single item */
                min-height: 0; /* Allow shrinking */
            }
            .tab-content.full-height .form-col {
                height: 100%;
                min-height: 0;
            }
            .tab-content.full-height ts-form-field {
                height: 100%;
                display: block;
                min-height: 0;
            }
            .tab-content.full-height ts-form-field ts-table {
                height: 100%;
                width: 100%;
            }
            .form-row {
                display: flex;
                gap: 1rem;
                margin-bottom: 1rem;
            }
            .form-col {
                flex: 1;
                min-width: 0; /* Critical: allows flex item to shrink below content size */
                overflow: hidden; /* Prevent overflow from expanding parent - critical for Safari */
                padding: 4px; /* Prevent focus ring clipping */
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
                background: var(--sl-color-neutral-0);
                z-index: 1;
                padding-left: 0;
                padding-right: 0;
            }
        `;
        this.appendChild(style);

        const loader = document.createElement('div');
        loader.className = 'loader';
        loader.innerHTML = `
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        `;
        this.appendChild(loader);

        const container = document.createElement('div');
        container.className = 'ts-form-container';
        this.appendChild(container);
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

        this.addEventListener('form-table-action', (e) => {
            // Re-dispatch table actions from fields
            // e.detail contains { field, action, originalDetail }
            // We can just let it bubble or re-dispatch if needed.
            // Since bubbles: true is set in ts-form-field, it should bubble up.
            // But if we want to capture it at ts-form level and maybe modify it, we can.
            // For now, let's just log it or ensure it propagates.
        });
    }

    render() {
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
            // Store fields config for later use
            this.fieldsConfig = fieldsConfig;
            const errorsConfig = errors ? JSON.parse(errors) : {};
            const buttonsConfig = buttons ? JSON.parse(buttons) : [];
            const valuesConfig = values ? JSON.parse(values) : {};

            // Merge values into formData
            this.formData = { ...this.formData, ...valuesConfig };

            // Ensure structure exists
            this.ensureStructure();

            // Get container
            const container = this.querySelector('.ts-form-container');
            container.innerHTML = ''; // Clear container content for re-render

            // Create form element
            const form = document.createElement('form');
            form.noValidate = true;
            // Styles are now in CSS


            // Render Tabs
            if (layoutConfig.tabs) {
                const tabGroup = document.createElement('sl-tab-group');
                let hasAnyInvalidTab = false;

                layoutConfig.tabs.forEach((tab, index) => {
                    const slTab = document.createElement('sl-tab');
                    slTab.slot = 'nav';
                    slTab.panel = `tab-${index}`;
                    slTab.textContent = tab.label;

                    // Set active tab if specified
                    const activeTabAttr = this.getAttribute('active-tab');
                    if (activeTabAttr !== null) {
                        if (parseInt(activeTabAttr) === index) {
                            slTab.active = true;
                        }
                    } else if (index === 0) { // Default to first tab if no active-tab specified
                        slTab.active = true;
                    }

                    // Check if tab has any errors
                    const hasErrors = tab.rows.some(row => row.some(col => errorsConfig[col.field]));
                    if (hasErrors) {
                        slTab.classList.add('invalid');
                        hasAnyInvalidTab = true;
                    }

                    const slPanel = document.createElement('sl-tab-panel');
                    slPanel.name = `tab-${index}`;
                    if (activeTabAttr !== null) {
                        if (parseInt(activeTabAttr) === index) {
                            slPanel.active = true;
                        }
                    } else if (index === 0) { // Default to first tab if no active-tab specified
                        slPanel.active = true;
                    }

                    // Check if tab should be full height
                    // Heuristic: if tab has 1 row, 1 col, and that col is type 'table'
                    let isFullHeight = false;
                    if (tab.rows && tab.rows.length === 1 && tab.rows[0].length === 1) {
                        const fieldName = tab.rows[0][0].field;
                        if (fieldsConfig[fieldName] && fieldsConfig[fieldName].type === 'table') {
                            isFullHeight = true;
                        }
                    }

                    const contentDiv = document.createElement('div');
                    contentDiv.className = 'tab-content';
                    if (isFullHeight) {
                        contentDiv.classList.add('full-height');
                    }

                    // Render rows in tab
                    if (tab.rows) {
                        tab.rows.forEach(row => {
                            const rowDiv = document.createElement('div');
                            rowDiv.className = 'form-row';
                            rowDiv.style.gridTemplateColumns = row.map(col => col.width || '1fr').join(' ');

                            row.forEach(col => {
                                const colDiv = document.createElement('div');
                                colDiv.className = 'form-col';

                                const fieldConfig = fieldsConfig[col.field];
                                if (fieldConfig) {
                                    const fieldElement = document.createElement('ts-form-field');
                                    fieldElement.setAttribute('config', JSON.stringify(fieldConfig));
                                    fieldElement.setAttribute('field-name', col.field);

                                    const value = this.formData[col.field];
                                    if (value !== undefined && value !== null) {
                                        if (typeof value === 'object') {
                                            fieldElement.setAttribute('value', JSON.stringify(value));
                                        } else {
                                            fieldElement.setAttribute('value', value);
                                        }
                                    }

                                    if (errorsConfig[col.field]) {
                                        fieldElement.setAttribute('error', errorsConfig[col.field]);
                                    }

                                    colDiv.appendChild(fieldElement);
                                }

                                rowDiv.appendChild(colDiv);
                            });

                            contentDiv.appendChild(rowDiv);
                        });
                    }

                    slPanel.appendChild(contentDiv);
                    tabGroup.appendChild(slTab);
                    tabGroup.appendChild(slPanel);
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

                form.appendChild(tabGroup);
            } else if (layoutConfig.rows) {
                this.renderRows(layoutConfig.rows, fieldsConfig, form);
            }

            const actions = document.createElement('div');
            actions.className = 'form-actions';


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
                                        formData: this.getSubmissionData(),
                                        action: btn.action
                                    },
                                    bubbles: true,
                                    composed: true
                                }));
                            });
                        } else {
                            this.dispatchEvent(new CustomEvent('form-submit', {
                                detail: {
                                    formData: this.getSubmissionData(),
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
                            formData: this.getSubmissionData(),
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
            container.appendChild(form);

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

    getSubmissionData() {
        const submissionData = { ...this.formData };

        if (this.fieldsConfig) {
            Object.keys(this.fieldsConfig).forEach(fieldName => {
                const config = this.fieldsConfig[fieldName];
                if (config.excludeFromSubmit) {
                    delete submissionData[fieldName];
                }
            });
        }

        return submissionData;
    }

    handleSubmit(event) {
        event.preventDefault();
        this.dispatchEvent(new CustomEvent('form-submit', {
            detail: {
                formData: this.getSubmissionData(),
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
