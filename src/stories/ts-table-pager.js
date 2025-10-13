class TSTablePager extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <style>
                #page-number {
                    max-width: 4em;
                    display: inline-block;
                }

                #page-number::part(input) {
                    text-align: right;
                }

                #page-info,
                #item-count,
                #items-per-page {
                    font-size: var(--sl-font-size-small);
                    color: var(--sl-color-neutral-700);
                    font-weight: var(--sl-font-weight-light);
                    white-space: nowrap;
                }

                #items-per-page {
                    display: flex;
                    align-items: center;
                    gap: 0.5em;
                    flex-wrap: nowrap;
                }

                #pager {
                    display: flex;
                    align-items: center;
                    gap: 0.5em;
                    align-self: center;
                    flex-wrap: nowrap;
                    white-space: nowrap;
                }

                /* Footer styles */
                .footer {
                    display: grid;
                    grid-template-columns: 1fr auto 1fr;
                    align-items: center;
                    margin-top: 1em;
                    padding: 0.5em 0;
                    width: 100%;
                    max-width: 100%;
                    margin-left: 0;
                    margin-right: 0;
                    min-width: 0;
                    box-sizing: border-box;
                }
                
                :host {
                    display: block;
                    width: 100%;
                }

                .footer > :first-child {
                    justify-self: start;
                }

                .footer > :nth-child(2) {
                    justify-self: center;
                }

                .footer > :nth-child(3) {
                    justify-self: end;
                }

                .items-per-page {
                    display: flex;
                    align-items: center;
                    gap: 0.5em;
                    font-size: var(--sl-font-size-small);
                    color: var(--sl-color-neutral-700);
                    font-weight: var(--sl-font-weight-light);
                    white-space: nowrap;
                }

                .pager {
                    display: flex;
                    align-items: center;
                    gap: 0.5em;
                }

                .chevron-icon {
                    margin-left: 0.5em;
                }
            </style>
            <div class="footer">
                <div id="item-count">Zobrazeno 1-5 z 25</div>
                <div class="items-per-page">
                    Zobrazit
                    <sl-dropdown>
                        <sl-button slot="trigger">
                            5
                            <sl-icon name="chevron-down" class="chevron-icon"></sl-icon>
                        </sl-button>
                        <sl-menu>
                            <sl-menu-item>5</sl-menu-item>
                            <sl-menu-item>10</sl-menu-item>
                            <sl-menu-item>20</sl-menu-item>
                            <sl-menu-item>50</sl-menu-item>
                            <sl-menu-item>100</sl-menu-item>
                        </sl-menu>
                    </sl-dropdown>
                    na stránku
                </div>
                <!-- PAGER -->
                <div class="pager">
                    <sl-button-group>
                        <sl-button disabled>
                            <sl-icon name="chevron-bar-left"></sl-icon>
                        </sl-button>
                        <sl-button disabled>
                            <sl-icon name="chevron-left"></sl-icon>
                        </sl-button>
                    </sl-button-group>
                    <div id="page-info" variant="none">
                        Stránka
                        <sl-input id="page-number" size="small" value="1"></sl-input>
                        / 5
                    </div>
                    <sl-button-group>
                        <sl-button>
                            <sl-icon name="chevron-right"></sl-icon>
                        </sl-button>
                        <sl-button>
                            <sl-icon name="chevron-bar-right"></sl-icon>
                        </sl-button>
                    </sl-button-group>
                </div>
            </div>
        `;
    }

    static get observedAttributes() {
        return ['totalrecordscount', 'filteredrecordscount', 'pagesize', 'pagesizes', 'currentpage'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.updateUI();
        }
    }

    connectedCallback() {
        this.setupEventListeners();
        this.updateUI();
    }

    updateUI() {
        const totalRecordsCount = parseInt(this.getAttribute('totalrecordscount')) || 0;
        const filteredRecordsCount = parseInt(this.getAttribute('filteredrecordscount')) || 0;
        const pageSize = parseInt(this.getAttribute('pagesize')) || 5;
        const pageSizes = JSON.parse(this.getAttribute('pagesizes') || '[5,10,20,50,100]');
        const currentPage = parseInt(this.getAttribute('currentpage')) || 1;

        const totalPages = pageSize === -1 ? 1 : Math.ceil(filteredRecordsCount / pageSize);

        // Update item count
        const itemCountEl = this.querySelector('#item-count');
        if (itemCountEl) {
            if (pageSize === -1) {
                // Show all items
                const filterText = filteredRecordsCount !== totalRecordsCount ? ` (filtrováno z ${totalRecordsCount})` : '';
                itemCountEl.textContent = `Zobrazeno ${filteredRecordsCount} z ${filteredRecordsCount}${filterText}`;
            } else {
                const startItem = filteredRecordsCount > 0 ? (currentPage - 1) * pageSize + 1 : 0;
                const endItem = Math.min(currentPage * pageSize, filteredRecordsCount);
                const filterText = filteredRecordsCount !== totalRecordsCount ? ` (filtrováno z ${totalRecordsCount})` : '';
                itemCountEl.textContent = `Zobrazeno ${startItem}-${endItem} z ${filteredRecordsCount}${filterText}`;
            }
        }

        // Update items per page dropdown
        const itemsPerPageButton = this.querySelector('.items-per-page sl-button');
        if (itemsPerPageButton) {
            const displaySize = pageSize === -1 ? 'Vše' : pageSize;
            itemsPerPageButton.innerHTML = `${displaySize}<sl-icon name="chevron-down" class="chevron-icon"></sl-icon>`;
        }

        // Update page sizes menu
        const menu = this.querySelector('.items-per-page sl-menu');
        if (menu) {
            menu.innerHTML = '';
            pageSizes.forEach(size => {
                const item = document.createElement('sl-menu-item');
                item.textContent = size === -1 ? 'Vše' : size;
                item.setAttribute('data-value', size);
                menu.appendChild(item);
            });
        }

        // Update page number input
        const pageInput = this.querySelector('#page-number');
        if (pageInput) {
            pageInput.value = currentPage;
        }

        // Update page info
        const pageInfo = this.querySelector('#page-info');
        if (pageInfo) {
            pageInfo.querySelector('sl-input').nextSibling.textContent = ` / ${totalPages}`;
        }

        // Update navigation buttons
        const pagerButtons = this.querySelectorAll('.pager sl-button');
        if (pagerButtons.length >= 4) {
            if (pageSize === -1) {
                // Disable all navigation when showing all items
                pagerButtons[0].disabled = true;
                pagerButtons[1].disabled = true;
                pagerButtons[2].disabled = true;
                pagerButtons[3].disabled = true;
            } else {
                // First page and previous page buttons
                pagerButtons[0].disabled = currentPage <= 1;
                pagerButtons[1].disabled = currentPage <= 1;

                // Next page and last page buttons
                pagerButtons[2].disabled = currentPage >= totalPages;
                pagerButtons[3].disabled = currentPage >= totalPages;
            }
        }
    }

    setupEventListeners() {
        // Utility functions for page number input
        const pageNumberClick = (event) => {
            event.target.select();
            event.preventDefault();
        };

        const pageNumberKeyDown = (event) => {
            if (!/[0-9]/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Delete' && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
                event.preventDefault();
            }
            if (event.key === 'Enter') {
                event.target.blur();
            }
        };

        const pageNumberBlur = (event) => {
            const value = parseInt(event.target.value);
            const filteredRecordsCount = parseInt(this.getAttribute('filteredrecordscount')) || 0;
            const pageSize = parseInt(this.getAttribute('pagesize')) || 5;
            const totalPages = Math.ceil(filteredRecordsCount / pageSize);
            let correctedValue = value;
            if (isNaN(value) || value < 1) {
                correctedValue = 1;
            } else if (value > totalPages) {
                correctedValue = totalPages;
            }
            event.target.value = correctedValue;
            if (correctedValue !== parseInt(this.getAttribute('currentpage'))) {
                this.dispatchEvent(new CustomEvent('page-changed', { 
                    detail: { page: correctedValue },
                    bubbles: true,
                    composed: true
                }));
            }
        };

        // Items per page dropdown
        const itemsPerPageMenu = this.querySelector('.items-per-page sl-menu');
        if (itemsPerPageMenu) {
            itemsPerPageMenu.addEventListener('sl-select', (event) => {
                const selectedValue = parseInt(event.detail.item.getAttribute('data-value'));
                this.dispatchEvent(new CustomEvent('page-size-changed', { 
                    detail: { pageSize: selectedValue },
                    bubbles: true,
                    composed: true
                }));
            });
        }

        // Page navigation buttons
        const pagerButtons = this.querySelectorAll('.pager sl-button');
        if (pagerButtons.length >= 4) {
            // First page button (index 0)
            pagerButtons[0].addEventListener('click', () => this.dispatchEvent(new CustomEvent('page-changed', { 
                detail: { page: 1 },
                bubbles: true,
                composed: true
            })));

            // Previous page button (index 1)
            pagerButtons[1].addEventListener('click', () => this.dispatchEvent(new CustomEvent('page-changed', { 
                detail: { page: parseInt(this.getAttribute('currentpage')) - 1 },
                bubbles: true,
                composed: true
            })));

            // Next page button (index 2)
            pagerButtons[2].addEventListener('click', () => this.dispatchEvent(new CustomEvent('page-changed', { 
                detail: { page: parseInt(this.getAttribute('currentpage')) + 1 },
                bubbles: true,
                composed: true
            })));

            // Last page button (index 3)
            pagerButtons[3].addEventListener('click', () => {
                const filteredRecordsCount = parseInt(this.getAttribute('filteredrecordscount')) || 0;
                const pageSize = parseInt(this.getAttribute('pagesize')) || 5;
                const totalPages = Math.ceil(filteredRecordsCount / pageSize);
                this.dispatchEvent(new CustomEvent('page-changed', { 
                    detail: { page: totalPages },
                    bubbles: true,
                    composed: true
                }));
            });
        }

        // Page number input events
        const pageInput = this.querySelector('#page-number');
        if (pageInput) {
            pageInput.addEventListener('click', pageNumberClick);
            pageInput.addEventListener('keydown', pageNumberKeyDown);
            pageInput.addEventListener('blur', pageNumberBlur);
        }
    }
}

customElements.define('ts-table-pager', TSTablePager);

export { TSTablePager };