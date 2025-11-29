import './ts-file-upload.js';
import './ts-file-upload.js';
import './ts-relationship-picker.js';
import './ts-combobox.js';
import flatpickr from 'flatpickr';
import { Czech } from 'flatpickr/dist/l10n/cs.js';

export class TSFormField extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['field-name', 'config', 'value', 'error'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.requestRender();
        }
    }

    connectedCallback() {
        this.requestRender();
    }

    requestRender() {
        if (this.renderPending) return;
        this.renderPending = true;
        requestAnimationFrame(() => {
            this.render();
            this.renderPending = false;
        });
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
                        field.value = parsedValue;
                    } else {
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
                const checkboxWrapper = document.createElement('div');
                checkboxWrapper.style.display = 'flex';
                checkboxWrapper.style.flexDirection = 'column';

                // Add spacer to align with other inputs that have labels
                const spacer = document.createElement('div');
                spacer.style.height = 'calc(var(--sl-input-label-font-size-medium) + var(--sl-spacing-2x-small))';
                spacer.style.marginBottom = 'var(--sl-spacing-2x-small)'; // Match label spacing
                checkboxWrapper.appendChild(spacer);

                field = document.createElement('sl-checkbox');
                if (!config.hideLabel) {
                    field.textContent = config.label;
                }
                field.checked = value === true;
                checkboxWrapper.appendChild(field);
                return checkboxWrapper;
            case 'switch':
                const switchWrapper = document.createElement('div');
                switchWrapper.style.display = 'flex';
                switchWrapper.style.flexDirection = 'column';
                switchWrapper.style.gap = 'var(--sl-spacing-2x-small)';

                if (!config.hideLabel) {
                    const switchLabel = document.createElement('label');
                    switchLabel.textContent = config.label;
                    switchLabel.style.fontSize = 'var(--sl-input-label-font-size-medium)';
                    switchLabel.style.fontWeight = 'var(--sl-font-weight-semibold)';
                    // switchLabel.style.color = 'var(--sl-input-label-color)'; // Removed to allow error color override
                    switchWrapper.appendChild(switchLabel);
                }

                const switchContainer = document.createElement('div');
                switchContainer.style.display = 'flex';
                switchContainer.style.alignItems = 'center';
                switchContainer.style.minHeight = 'var(--sl-input-height-medium)';
                switchContainer.style.paddingLeft = '2px'; // Prevent clipping of focus ring/switch

                field = document.createElement('sl-switch');
                field.checked = value === true;

                switchContainer.appendChild(field);
                switchWrapper.appendChild(switchContainer);
                return switchWrapper;

            case 'slider':
                const sliderWrapper = document.createElement('div');
                sliderWrapper.style.display = 'flex';
                sliderWrapper.style.flexDirection = 'column';

                if (!config.hideLabel) {
                    const sliderLabel = document.createElement('label');
                    sliderLabel.textContent = config.label;
                    sliderLabel.style.fontSize = 'var(--sl-input-label-font-size-medium)';
                    sliderLabel.style.fontWeight = 'var(--sl-font-weight-semibold)';
                    // sliderLabel.style.color = 'var(--sl-input-label-color)'; // Removed to allow error color override
                    sliderLabel.style.marginBottom = 'var(--sl-spacing-2x-small)';
                    sliderWrapper.appendChild(sliderLabel);
                }

                field = document.createElement('sl-range');
                if (config.min) field.min = config.min;
                if (config.max) field.max = config.max;
                if (config.step) field.step = config.step;
                field.value = value || config.min || 0;

                sliderWrapper.appendChild(field);
                return sliderWrapper;
            case 'combobox':
                field = document.createElement('ts-combobox');
                field.setAttribute('label', config.label || '');
                field.setAttribute('value', value || '');
                if (config.options) {
                    field.setAttribute('options', JSON.stringify(config.options));
                }
                if (config.placeholder) {
                    field.setAttribute('placeholder', config.placeholder);
                }
                if (config.disabled) {
                    field.setAttribute('disabled', '');
                }
                break;
            case 'file':
            case 'image':
                field = document.createElement('ts-file-upload');
                if (!config.hideLabel) {
                    field.setAttribute('label', config.label || 'Upload file');
                }
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
                let slButtonGroup;

                if (config.variant === 'process') {
                    slButtonGroup = document.createElement('div');
                    slButtonGroup.className = 'process-group';
                    slButtonGroup.style.display = 'flex';
                    slButtonGroup.style.gap = '0'; // Process group handles gap internally
                } else {
                    slButtonGroup = document.createElement('sl-button-group');
                    slButtonGroup.style.gap = '0.5rem'; // Default gap for standard button groups
                }

                if (config.options) {
                    config.options.forEach(btnStr => {
                        const [val, enabled = 'true', variant = 'default', label = ''] = btnStr.split('/');
                        const b = document.createElement('sl-button');
                        b.dataset.value = val;
                        const btnVariant = (value === val) ? (variant || 'primary') : (variant || 'default');
                        b.variant = btnVariant;
                        b.setAttribute('data-variant', btnVariant); // For CSS styling in process group
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
                const radioWrapper = document.createElement('div');
                radioWrapper.style.display = 'flex';
                radioWrapper.style.flexDirection = 'column';
                radioWrapper.style.gap = 'var(--sl-spacing-2x-small)';

                if (!config.hideLabel) {
                    const radioLabel = document.createElement('label');
                    radioLabel.textContent = config.label;
                    radioLabel.style.fontSize = 'var(--sl-input-label-font-size-medium)';
                    radioLabel.style.fontWeight = 'var(--sl-font-weight-semibold)';
                    // radioLabel.style.color = 'var(--sl-input-label-color)'; // Removed to allow error color override
                    radioLabel.style.marginBottom = 'var(--sl-spacing-small)'; // Increased spacing
                    radioWrapper.appendChild(radioLabel);
                }

                field = document.createElement('sl-radio-group');
                // field.label = config.label; // We use custom label for better control

                if (config.options) {
                    config.options.forEach(opt => {
                        const radio = document.createElement('sl-radio');
                        radio.value = opt.value;
                        radio.textContent = opt.label;
                        radio.style.marginBottom = 'var(--sl-spacing-2x-small)'; // Spacing between radios
                        field.appendChild(radio);
                    });
                }
                setTimeout(() => {
                    field.value = value || '';
                }, 0);

                radioWrapper.appendChild(field);
                return radioWrapper;
            case 'date':
                field = document.createElement('sl-input');
                field.type = 'text'; // Use text for flatpickr
                field.value = value || '';
                // Initialize flatpickr
                setTimeout(() => {
                    const inputElement = field.shadowRoot ? field.shadowRoot.querySelector('input') : field;
                    if (inputElement) {
                        flatpickr(inputElement, {
                            locale: Czech,
                            defaultDate: value,
                            dateFormat: 'd. m. Y',
                            allowInput: true,
                            onChange: (selectedDates, dateStr) => {
                                field.value = dateStr;
                                field.dispatchEvent(new CustomEvent('sl-change', { bubbles: true }));
                            }
                        });
                    }
                }, 0);
                break;
            case 'datetime':
                field = document.createElement('sl-input');
                field.type = 'text'; // Use text for flatpickr
                field.value = value || '';
                // Initialize flatpickr
                setTimeout(() => {
                    const inputElement = field.shadowRoot ? field.shadowRoot.querySelector('input') : field;
                    if (inputElement) {
                        flatpickr(inputElement, {
                            locale: Czech,
                            defaultDate: value,
                            enableTime: true,
                            dateFormat: 'd. m. Y H:i',
                            time_24hr: true,
                            allowInput: true,
                            onChange: (selectedDates, dateStr) => {
                                field.value = dateStr;
                                field.dispatchEvent(new CustomEvent('sl-change', { bubbles: true }));
                            }
                        });
                    }
                }, 0);
                break;
            case 'select':
                field = document.createElement('sl-select');
                field.hoist = true; // Fix clipping by hoisting dropdown
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
                if (config.label && !config.hideLabel) {
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

            case 'separator':
                field = document.createElement('div');
                field.className = 'form-separator';
                field.textContent = config.label || '';
                return field;

            case 'table':
                field = document.createElement('ts-table');

                // Map columns to ts-datatable format and calculate visible columns
                if (config.columns) {
                    const mappedColumns = config.columns.map((col, index) => ({
                        ...col,
                        key: col.field || col.key,
                        title: col.header || col.title || col.label,
                        visible: col.visible !== false, // Default to true
                        order: col.order !== undefined ? col.order : index // Default order to index
                    }));
                    field.setAttribute('column-definitions', JSON.stringify(mappedColumns));

                    // Calculate and set visible columns attribute
                    const visibleColKeys = mappedColumns
                        .filter(col => col.visible)
                        .map(col => col.key)
                        .join(',');
                    field.setAttribute('visible-columns', visibleColKeys);
                }

                // Map all other ts-table attributes
                const boolAttrs = [
                    'show-create-button', 'show-import-button', 'show-export-button', 'show-column-selector',
                    'enable-sorting', 'enable-filtering', 'enable-column-resizing', 'enable-column-reordering',
                    'enable-selection', 'enable-row-menu', 'enable-clickable-rows', 'enable-clickable-columns',
                    'enable-pagination'
                ];

                boolAttrs.forEach(attr => {
                    // Check config for camelCase version (e.g. showCreateButton)
                    const configKey = attr.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                    if (config[configKey] !== undefined) {
                        field.setAttribute(attr, String(config[configKey]));
                    }
                });

                const stringAttrs = [
                    'single-item-actions', 'multiple-items-actions', 'unhideable-columns',
                    'unshowable-columns', 'columns-required-for-import'
                ];

                stringAttrs.forEach(attr => {
                    const configKey = attr.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                    if (config[configKey]) {
                        field.setAttribute(attr, config[configKey]);
                    }
                });

                if (config.itemsPerPage) field.setAttribute('items-per-page', config.itemsPerPage);
                if (config.itemsPerPageOptions) field.setAttribute('items-per-page-options', config.itemsPerPageOptions);
                if (config.predefinedFilters) field.setAttribute('predefined-filters', JSON.stringify(config.predefinedFilters));

                if (config.settings) {
                    field.setAttribute('settings', JSON.stringify(config.settings));
                }

                // Pass data via attribute if provided in config or value
                const tableData = value || config.data;
                if (tableData) {
                    field.setAttribute('table-data', JSON.stringify(tableData));
                }

                // Propagate events
                // Listen to all relevant table events and re-dispatch
                const tableEvents = [
                    'row-clicked',
                    'selection-changed',
                    'selection-action-activated',
                    'create-new-record',
                    'do-import',
                    'export-data',
                    'column-visibility-changed',
                    'filters-changed',
                    'pagination-changed'
                ];

                tableEvents.forEach(evtName => {
                    field.addEventListener(evtName, (e) => {
                        e.stopPropagation();
                        this.dispatchEvent(new CustomEvent('form-table-action', {
                            detail: {
                                field: fieldName,
                                action: evtName,
                                originalDetail: e.detail
                            },
                            bubbles: true,
                            composed: true
                        }));
                    });
                });

                // Initialize table after a brief delay to ensure it's connected and ready
                setTimeout(() => {
                    if (typeof field.run === 'function') {
                        field.run();
                    }
                }, 0);
                break;

            default:
                field = document.createElement('sl-input');
                field.type = config.type || 'text';
                field.value = value || '';
        }

        field.name = fieldName;

        if (!config.hideLabel) {
            if (config.type !== 'checkbox' && config.type !== 'radio' && config.type !== 'file' && config.type !== 'image') {
                field.label = config.label;
            }
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
        } else if (field.tagName === 'TS-COMBOBOX') {
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
