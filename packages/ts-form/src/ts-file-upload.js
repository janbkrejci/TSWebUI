

export class TSFileUpload extends HTMLElement {
    constructor() {
        super();
        this.files = [];
        this.multiple = false;
        this.accept = '*';
        this.label = 'Upload files';
    }

    static get observedAttributes() {
        return ['multiple', 'accept', 'label', 'value'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'multiple') {
            this.multiple = newValue !== null && newValue !== 'false';
        } else if (name === 'accept') {
            this.accept = newValue || '*';
        } else if (name === 'label') {
            this.label = newValue;
        } else if (name === 'value') {
            // Handle initial value if needed (e.g. existing files)
        }
        this.render();
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.classList.add('drag-over');
        });

        this.addEventListener('dragleave', (e) => {
            e.preventDefault();
            this.classList.remove('drag-over');
        });

        this.addEventListener('drop', (e) => {
            e.preventDefault();
            this.classList.remove('drag-over');
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                this.handleFiles(e.dataTransfer.files);
            }
        });
    }

    handleFiles(fileList) {
        const newFiles = Array.from(fileList);
        if (this.multiple) {
            this.files = [...this.files, ...newFiles];
        } else {
            this.files = [newFiles[0]];
        }
        this.renderFileList();
        this.dispatchChange();
    }

    removeFile(index) {
        this.files.splice(index, 1);
        this.renderFileList();
        this.dispatchChange();
    }

    dispatchChange() {
        this.dispatchEvent(new CustomEvent('sl-change', {
            detail: {
                files: this.files
            },
            bubbles: true,
            composed: true
        }));
    }

    render() {
        if (this.hasRendered) return;
        this.hasRendered = true;

        this.innerHTML = '';
        const style = document.createElement('style');
        style.textContent = `
            :host {
                display: block;
                font-family: var(--sl-font-sans);
            }
            .drop-zone {
                border: 2px dashed var(--sl-color-neutral-300);
                border-radius: var(--sl-border-radius-medium);
                padding: 2rem;
                text-align: center;
                cursor: pointer;
                transition: border-color 0.2s, background-color 0.2s;
                background: var(--sl-color-neutral-0);
            }
            .drop-zone:hover {
                border-color: var(--sl-color-primary-500);
                background: var(--sl-color-primary-50);
            }
            :host(.drag-over) .drop-zone {
                border-color: var(--sl-color-primary-600);
                background: var(--sl-color-primary-100);
            }
            .file-list {
                margin-top: 1rem;
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
            .file-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0.5rem;
                background: var(--sl-color-neutral-100);
                border-radius: var(--sl-border-radius-small);
                font-size: var(--sl-font-size-small);
            }
            .file-info {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                overflow: hidden;
            }
            .file-name {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .upload-icon {
                font-size: 2rem;
                color: var(--sl-color-neutral-400);
                margin-bottom: 0.5rem;
            }
            input[type="file"] {
                display: none;
            }
        `;
        this.appendChild(style);

        const container = document.createElement('div');

        const input = document.createElement('input');
        input.type = 'file';
        input.multiple = this.multiple;
        input.accept = this.accept;
        input.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                this.handleFiles(e.target.files);
            }
            input.value = ''; // Reset to allow selecting same file again
        });

        const dropZone = document.createElement('div');
        dropZone.className = 'drop-zone';
        dropZone.innerHTML = `
            <div class="upload-icon">
                <sl-icon name="cloud-upload"></sl-icon>
            </div>
            <div>${this.label}</div>
            <div style="font-size: 0.8em; color: var(--sl-color-neutral-500); margin-top: 0.25rem;">
                Drag & drop or click to upload
            </div>
        `;
        dropZone.addEventListener('click', () => input.click());

        if (this.label) {
            const labelEl = document.createElement('label');
            labelEl.textContent = this.label;
            labelEl.style.display = 'block';
            labelEl.style.marginBottom = 'var(--sl-spacing-2x-small)';
            labelEl.style.fontSize = 'var(--sl-input-label-font-size-medium)';
            labelEl.style.fontWeight = 'var(--sl-font-weight-semibold)';
            labelEl.style.color = 'var(--sl-input-label-color)';
            labelEl.className = 'file-upload-label';
            container.appendChild(labelEl);
        }

        const fileListContainer = document.createElement('div');
        fileListContainer.className = 'file-list';
        this.fileListContainer = fileListContainer;

        container.appendChild(input);
        container.appendChild(dropZone);
        container.appendChild(fileListContainer);
        this.appendChild(container);
    }

    renderFileList() {
        if (!this.fileListContainer) return;
        this.fileListContainer.innerHTML = '';

        this.files.forEach((file, index) => {
            const item = document.createElement('div');
            item.className = 'file-item';

            const info = document.createElement('div');
            info.className = 'file-info';

            const icon = document.createElement('sl-icon');
            icon.name = 'file-earmark';

            const name = document.createElement('span');
            name.className = 'file-name';
            name.textContent = file.name;

            const size = document.createElement('span');
            size.style.color = 'var(--sl-color-neutral-500)';
            size.textContent = `(${(file.size / 1024).toFixed(1)} KB)`;

            info.appendChild(icon);
            info.appendChild(name);
            info.appendChild(size);

            const removeBtn = document.createElement('sl-icon-button');
            removeBtn.name = 'x';
            removeBtn.label = 'Remove';
            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.removeFile(index);
            });

            item.appendChild(info);
            item.appendChild(removeBtn);
            this.fileListContainer.appendChild(item);
        });
    }
}

customElements.define('ts-file-upload', TSFileUpload);
