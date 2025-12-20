class TSFormWrapper extends HTMLElement {
    static get observedAttributes() {
        return ['definition', 'data'];
    }

    constructor() {
        super();
        this.definition = null;
        this.data = null;
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }

    getParsedAttribute(name) {
        const value = this.getAttribute(name);
        if (!value) return null;
        try {
            return JSON.parse(value);
        } catch (e) {
            console.error(`Error parsing ${name} attribute:`, e);
            return null;
        }
    }

    render() {
        // Clear previous content
        this.innerHTML = '';

        // Get definition and data
        const definition = this.getParsedAttribute('definition');
        const data = this.getParsedAttribute('data');

        if (!definition) {
            // If no definition, do nothing or show warning? 
            // Ideally we just wait.
            return;
        }

        // Create ts-form
        const form = document.createElement('ts-form');

        // Layout is definition.layout
        if (definition.layout) {
            form.setAttribute('layout', JSON.stringify(definition.layout));
        }

        // Fields is definition.fields
        if (definition.fields) {
            form.setAttribute('fields', JSON.stringify(definition.fields));
        }

        // Buttons if present in definition
        if (definition.buttons) {
            form.setAttribute('buttons', JSON.stringify(definition.buttons));
        }

        // Errors if present
        if (definition.errors) {
            form.setAttribute('errors', JSON.stringify(definition.errors));
        }

        // Data becomes values
        if (data) {
            form.setAttribute('values', JSON.stringify(data));
        }

        // Forward events
        form.addEventListener('form-submit', (e) => {
            // Re-dispatch from wrapper
            this.dispatchEvent(new CustomEvent('form-submit', {
                detail: e.detail,
                bubbles: true,
                composed: true
            }));
        });

        form.addEventListener('form-changed', (e) => {
            // Re-dispatch from wrapper
            const { formData } = e.detail;
            // Update our internal data notion if we want? 
            // Or just let parent handle it. Parent usually listens to this.
            this.dispatchEvent(new CustomEvent('form-changed', {
                detail: e.detail,
                bubbles: true,
                composed: true
            }));
        });

        this.appendChild(form);

        // Initialize the form
        if (typeof form.run === 'function') {
            form.run();
        }
    }
}

customElements.define('ts-form-wrapper', TSFormWrapper);
