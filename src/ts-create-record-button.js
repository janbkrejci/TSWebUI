class TSCreateRecordButton extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <style>
                .create-record-btn {
                    display: inline-block;
                }
            </style>
            <sl-tooltip content="Nový záznam">
                <sl-button class="create-record-btn">
                    <sl-icon name="plus-lg"></sl-icon>
                </sl-button>
            </sl-tooltip>
        `;
    }

    connectedCallback() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        const button = this.querySelector('.create-record-btn');
        if (button) {
            button.addEventListener('click', () => {
                this.dispatchEvent(new CustomEvent('new-record', { detail: {} }));
            });
        }
    }
}

customElements.define('ts-create-record-button', TSCreateRecordButton);

export { TSCreateRecordButton };