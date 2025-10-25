const E=`<div class="sl-theme-{{theme}} base-container main-container">
    <ts-table id="table"></ts-table>


    <script>
        // References to component
        //počkat na definici web componenty ts-table

        var table = document.getElementById('table');

        // Initialize component when DOM is ready
        function initializeComponents() {

            // Configure table
            table.setColumnDefinitions(columnDefinitions);
            table.setData(tableData); // Set data after predefined filters

            setupEventListeners();

            // Initialize table
            table.run();
        }

        function setupEventListeners() {
            // Table events
            table.addEventListener('create-new-record', () => {
                console.log('Create new record');
            });

            table.addEventListener('selection-action-activated', (event) => {
                const { action, rows } = event.detail;
                console.log('Action:', action, 'for', rows.length, 'row(s):', rows);
            });

            table.addEventListener('row-clicked', (event) => {
                const { row, columnKey } = event.detail;
                console.log('Row clicked:', row, 'in column:', columnKey);
            });

            table.addEventListener('do-import', (event) => {
                const { importData, file } = event.detail;
                console.log('Import received:', importData.length, 'rows from file:', file.name);

                // Process import data - demo logic with random rejection
                let added = 0, updated = 0, rejected = 0, skipped = 0;
                const rejectedRows = [];
                const rejectedRowsData = [];
                const processedRows = [];

                importData.forEach(({ __index, data }) => {
                    // Randomly reject ~20% of rows for testing purposes
                    const shouldRejectRandomly = Math.random() < 0.2;

                    if (shouldRejectRandomly) {
                        rejected++;
                        rejectedRows.push(__index);
                        rejectedRowsData.push(data);
                        return;
                    }

                    // Check if row with same ID exists (for update vs add logic)
                    const existingRow = table.getAllRows().find(r => r.id === data.id);

                    if (!data.id) {
                        rejected++;
                        rejectedRows.push(__index);
                        rejectedRowsData.push(data);
                    } else if (existingRow) {
                        table.updateExistingRow(data.id, data);
                        updated++;
                        processedRows.push({ ...data, __importAction: 'updated' });
                    } else {
                        table.addImportedRow(data);
                        added++;
                        processedRows.push({ ...data, __importAction: 'added' });
                    }
                });

                // Show results via the table
                table.showImportResults({
                    added,
                    updated,
                    rejected,
                    skipped,
                    rejectedRows,
                    rejectedRowsData
                });

                console.log('Import completed:', processedRows);
            });
        }


        initializeComponents();
    <\/script>
</div>`;class R extends HTMLElement{constructor(){super(),this.innerHTML=`
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
                    font-family: var(--sl-font-sans);
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
                    margin-top: 0;
                    padding: 0;
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
                    font-family: var(--sl-font-sans);
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
                    font-family: var(--sl-font-sans);
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
        `}static get observedAttributes(){return["totalrecordscount","filteredrecordscount","pagesize","pagesizes","currentpage"]}attributeChangedCallback(e,t,i){t!==i&&this.updateUI()}connectedCallback(){this.setupEventListeners(),this.updateUI()}updateUI(){const e=parseInt(this.getAttribute("totalrecordscount"))||0,t=parseInt(this.getAttribute("filteredrecordscount"))||0,i=parseInt(this.getAttribute("pagesize"))||5,n=JSON.parse(this.getAttribute("pagesizes")||"[5,10,20,50,100]"),s=parseInt(this.getAttribute("currentpage"))||1,o=i===-1?1:Math.ceil(t/i),l=this.querySelector("#item-count");if(l)if(i===-1){const h=t!==e?` (filtrováno z ${e})`:"";l.textContent=`Zobrazeno ${t} z ${t}${h}`}else{const h=t>0?(s-1)*i+1:0,b=Math.min(s*i,t),p=t!==e?` (filtrováno z ${e})`:"";l.textContent=`Zobrazeno ${h}-${b} z ${t}${p}`}const r=this.querySelector(".items-per-page sl-button");if(r){const h=i===-1?"Vše":i;r.innerHTML=`${h}<sl-icon name="chevron-down" class="chevron-icon"></sl-icon>`}const a=this.querySelector(".items-per-page sl-menu");a&&(a.innerHTML="",n.forEach(h=>{const b=document.createElement("sl-menu-item");b.textContent=h===-1?"Vše":h,b.setAttribute("data-value",h),a.appendChild(b)}));const c=this.querySelector("#page-number");c&&(c.value=s);const u=this.querySelector("#page-info");u&&(u.querySelector("sl-input").nextSibling.textContent=` / ${o}`);const d=this.querySelectorAll(".pager sl-button");d.length>=4&&(i===-1?(d[0].disabled=!0,d[1].disabled=!0,d[2].disabled=!0,d[3].disabled=!0):(d[0].disabled=s<=1,d[1].disabled=s<=1,d[2].disabled=s>=o,d[3].disabled=s>=o))}setupEventListeners(){const e=l=>{l.target.select(),l.preventDefault()},t=l=>{!/[0-9]/.test(l.key)&&l.key!=="Backspace"&&l.key!=="Delete"&&l.key!=="ArrowLeft"&&l.key!=="ArrowRight"&&l.preventDefault(),l.key==="Enter"&&l.target.blur()},i=l=>{const r=parseInt(l.target.value),a=parseInt(this.getAttribute("filteredrecordscount"))||0,c=parseInt(this.getAttribute("pagesize"))||5,u=Math.ceil(a/c);let d=r;isNaN(r)||r<1?d=1:r>u&&(d=u),l.target.value=d,d!==parseInt(this.getAttribute("currentpage"))&&this.dispatchEvent(new CustomEvent("page-changed",{detail:{page:d},bubbles:!0,composed:!0}))},n=this.querySelector(".items-per-page sl-menu");n&&n.addEventListener("sl-select",l=>{const r=parseInt(l.detail.item.getAttribute("data-value"));this.dispatchEvent(new CustomEvent("page-size-changed",{detail:{pageSize:r},bubbles:!0,composed:!0}))});const s=this.querySelectorAll(".pager sl-button");s.length>=4&&(s[0].addEventListener("click",()=>this.dispatchEvent(new CustomEvent("page-changed",{detail:{page:1},bubbles:!0,composed:!0}))),s[1].addEventListener("click",()=>this.dispatchEvent(new CustomEvent("page-changed",{detail:{page:parseInt(this.getAttribute("currentpage"))-1},bubbles:!0,composed:!0}))),s[2].addEventListener("click",()=>this.dispatchEvent(new CustomEvent("page-changed",{detail:{page:parseInt(this.getAttribute("currentpage"))+1},bubbles:!0,composed:!0}))),s[3].addEventListener("click",()=>{const l=parseInt(this.getAttribute("filteredrecordscount"))||0,r=parseInt(this.getAttribute("pagesize"))||5,a=Math.ceil(l/r);this.dispatchEvent(new CustomEvent("page-changed",{detail:{page:a},bubbles:!0,composed:!0}))}));const o=this.querySelector("#page-number");o&&(o.addEventListener("click",e),o.addEventListener("keydown",t),o.addEventListener("blur",i))}}customElements.define("ts-table-pager",R);class D extends HTMLElement{constructor(){super(),this.innerHTML=`
            <style>
                :host {
                    display: block;
                    width: 100%;
                }
                
                .toolbar {
                    display: grid;
                    grid-template-columns: 1fr auto 1fr;
                    align-items: center;
                    padding: 0;
                    gap: 0.5rem;
                    width: 100%;
                    box-sizing: border-box;
                }
                
                .toolbar-left {
                    justify-self: start;
                }
                
                .toolbar-center {
                    justify-self: center;
                    display: flex;
                    align-items: center;
                    gap: 0.25rem;
                }
                
                .toolbar-right {
                    justify-self: end;
                }
                
                .toolbar-right-placeholder {
                    justify-self: end;
                }
                
                .hidden {
                    display: none;
                }
            </style>
            <div class="toolbar">
                <div class="toolbar-left">
                    <ts-create-record-button id="create-record-btn"></ts-create-record-button>
                </div>
                <div class="toolbar-center">
                    <ts-import-button id="import-btn"></ts-import-button>
                    <ts-export-button id="export-btn"></ts-export-button>
                </div>
                <div class="toolbar-right" id="toolbar-right">
                    <ts-column-selector id="column-selector"></ts-column-selector>
                </div>
                <div class="toolbar-right-placeholder hidden" id="toolbar-right-placeholder"></div>
            </div>
        `}connectedCallback(){this.setupEventForwarding()}setupEventForwarding(){}getImportButton(){return this.querySelector("#import-btn")}setImportData(e){const t=this.getImportButton();t&&typeof t.setImportData=="function"&&t.setImportData(e)}showImportResults(e){const t=this.getImportButton();t&&typeof t.showImportResults=="function"&&t.showImportResults(e)}setColumnsRequiredForImport(e){const t=this.getImportButton();t&&typeof t.setColumnsRequiredForImport=="function"&&t.setColumnsRequiredForImport(e)}getExportButton(){return this.querySelector("#export-btn")}setExportData(e){const t=this.getExportButton();t&&typeof t.setExportData=="function"&&t.setExportData(e)}getColumnSelector(){return this.querySelector("#column-selector")}setColumnDefinitions(e){const t=this.getColumnSelector();t&&typeof t.setColumnDefinitions=="function"&&t.setColumnDefinitions(e)}setColumnFilters(e){const t=this.getColumnSelector();t&&typeof t.setColumnFilters=="function"&&t.setColumnFilters(e)}setUnshowableColumns(e){const t=this.getColumnSelector();t&&typeof t.setUnshowableColumns=="function"&&t.setUnshowableColumns(e)}setUnhideableColumns(e){const t=this.getColumnSelector();t&&typeof t.setUnhideableColumns=="function"&&t.setUnhideableColumns(e)}refreshColumnMenu(){const e=this.getColumnSelector();e&&typeof e.refreshMenu=="function"&&e.refreshMenu()}setShowColumnSelector(e){const t=this.querySelector("#toolbar-right"),i=this.querySelector("#toolbar-right-placeholder");e?(t&&t.classList.remove("hidden"),i&&i.classList.add("hidden")):(t&&t.classList.add("hidden"),i&&i.classList.remove("hidden"))}setShowImportButton(e){const t=this.querySelector("#import-btn");t&&(e?t.classList.remove("hidden"):t.classList.add("hidden"))}setShowExportButton(e){const t=this.querySelector("#export-btn");t&&(e?t.classList.remove("hidden"):t.classList.add("hidden"))}setShowCreateButton(e){const t=this.querySelector("#create-record-btn");t&&(e?t.classList.remove("hidden"):t.classList.add("hidden"))}getCreateRecordButton(){return this.querySelector("#create-record-btn")}}customElements.define("ts-toolbar",D);class I extends HTMLElement{constructor(){super(),this.originalData=[],this.tableData=[],this.columnDefinitions=[],this.currentPage=1,this.itemsPerPage=5,this.availablePageSizes=[5,10,20,50,100],this.columnFilters={},this.predefinedFilters={},this.filteredData=[],this.filterTimeout=null,this.FILTER_DEBOUNCE_DELAY=500,this.selectedRowIds=new Set,this.selectionViewMode="all",this.menuActions=[],this.singleItemActions="",this.multipleItemsActions="",this.visibleColumns=[],this.unhideableColumns=[],this.unshowableColumns=[],this.enableSorting=!0,this.enableFiltering=!0,this.enableColumnResizing=!0,this.enableColumnReordering=!0,this.enableSelection=!0,this.enableRowMenu=!0,this.enableClickableRows=!0,this.enableClickableColumns=!1,this.enablePagination=!0,this.initialized=!1,this.isResizing=!1,this.resizeColKey=null,this.startX=0,this.startWidth=0,this.lastResizeEnd=0,this.currentOpenDropdown=null,this.innerHTML=`
            <style>
                :host {
                    display: block;
                    width: 100%;
                }
                
                /* Utility classes */
                .invisible {
                    visibility: hidden !important;
                }
                
                .hidden {
                    display: none !important;
                }
                
                #table-container {
                    position: relative;
                    width: 100%;
                    user-select: none;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                }
                
                /* Table base styles */
                #data-table {
                    table-layout: fixed;
                    width: max-content;
                    border-collapse: separate;
                    border-spacing: 0;
                    background: var(--sl-color-neutral-0);
                    color: var(--sl-color-neutral-1000);
                    font-family: var(--sl-font-sans);
                    border-radius: var(--sl-border-radius-large);
                    overflow: hidden;
                }
                
                thead {
                    background: var(--sl-color-neutral-100);
                }

                th:not(.checkbox-column):not(.menu-column), 
                td:not(.checkbox-column):not(.menu-column) {
                    padding: 0.75em 1.25em;
                    border-bottom: 1px solid var(--sl-color-neutral-200);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    width: 200px;
                    max-width: 200px;
                }
                
                /* Text content inside cells should also be truncated */
                td span,
                td .clickable-cell-content {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    display: inline-block;
                    max-width: 100%;
                }
                
                /* Ensure all cells have border */
                th, td {
                    border-bottom: 1px solid var(--sl-color-neutral-200);
                }
                
                th {
                    font-weight: var(--sl-font-weight-semibold);
                    color: var(--sl-color-neutral-900);
                    background: var(--sl-color-neutral-100);
                    text-align: left;
                    position: relative;
                    user-select: none;
                    overflow: visible;
                    padding-left: 8px;
                    padding-right: 24px;
                    cursor: default;
                }
                
                /* Sortable columns get pointer cursor */
                th[data-sortable="true"] {
                    cursor: pointer;
                }
                
                th[data-sortable="true"]:hover .column-header-label {
                    color: var(--sl-color-primary-600);
                }
                
                tbody tr {
                    cursor: default;
                }
                
                tbody tr.clickable {
                    cursor: pointer;
                }
                
                tbody tr:hover td {
                    background: transparent;
                }
                
                tr.clickable:hover td {
                    background: var(--sl-color-primary-50) !important;
                }
                
                /* Clickable column cells */
                td.clickable-column {
                    cursor: pointer;
                }
                
                td.clickable-column:hover .clickable-cell-content {
                    color: var(--sl-color-primary-600);
                    text-decoration: underline;
                }
                
                /* Don't highlight when hovering over copy button */
                td.clickable-column:has(sl-copy-button:hover) .clickable-cell-content {
                    color: inherit;
                    text-decoration: none;
                }
                
                tr.no-data-row {
                    cursor: default;
                }
                
                tr.no-data-row:hover td {
                    background: transparent !important;
                }
                
                /* Checkbox column */
                .checkbox-column {
                    width: 44px;
                    min-width: 44px;
                    max-width: 44px;
                    text-align: center;
                    padding: 0.75em 0.5em !important;
                }
                
                th.checkbox-column,
                td.checkbox-column {
                    width: 44px !important;
                    min-width: 44px !important;
                    max-width: 44px !important;
                    padding: 0 !important;
                }
                
                .checkbox-column .header-cell-content {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0;
                    min-height: 24px;
                }
                
                th.checkbox-column sl-checkbox {
                    margin: 0 0 8px 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 24px;
                    min-width: 24px;
                }
                
                th.checkbox-column.no-filtering sl-checkbox {
                    margin: 0;
                }
                
                td.checkbox-column sl-checkbox {
                    margin: -1px 0 0 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 24px;
                    min-width: 24px;
                }
                
                /* Menu column */
                .menu-column {
                    width: 44px;
                    min-width: 44px;
                    max-width: 44px;
                    text-align: center;
                    padding: 0.5em 0.25em !important;
                }
                
                th.menu-column,
                td.menu-column {
                    width: 44px !important;
                    min-width: 44px !important;
                    max-width: 44px !important;
                    padding: 0 !important;
                }
                
                th.menu-column {
                    position: relative;
                }
                
                th.menu-column .header-cell-content {
                    position: absolute;
                    bottom: 14px;
                    left: 0;
                    right: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                th.menu-column.no-filtering .header-cell-content {
                    position: static;
                    height: 100%;
                    bottom: auto;
                }
                
                th.menu-column ts-selection-menu {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                /* Col elements for fixed columns */
                col[data-fixed="checkbox"],
                col[data-fixed="menu"] {
                    width: 44px;
                }
                
                /* Header cell content */
                .header-cell-content {
                    display: flex;
                    align-items: center;
                    gap: 0.5em;
                    padding: 0;
                    min-height: 24px;
                }
                
                th.no-filtering .header-cell-content {
                    height: 100%;
                    align-items: center;
                }
                
                /* Column header label (title + sort indicator) */
                .column-header-label {
                    display: flex;
                    align-items: center;
                    gap: 0.5em;
                    flex: 1;
                    min-width: 0;
                }
                
                /* Right-aligned column labels */
                .column-header-label.right-aligned {
                    flex-direction: row-reverse;
                    justify-content: flex-start;
                }
                
                /* Center-aligned column labels */
                .column-header-label.center-aligned {
                    justify-content: center;
                }
                
                /* Center-aligned header with split controls */
                .header-cell-content.center-aligned {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 0.25em;
                }
                
                .column-ordering-control-left,
                .column-ordering-control-right {
                    display: flex;
                    opacity: 0;
                    transition: opacity 0.2s ease;
                    min-width: 28px;
                }
                
                th:hover .column-ordering-control-left,
                th:hover .column-ordering-control-right {
                    opacity: 1;
                }
                
                /* Column ordering controls */
                .column-ordering-controls {
                    display: flex;
                    gap: 0.5em;
                    opacity: 0;
                    transition: opacity 0.2s ease;
                }
                
                .column-ordering-controls sl-icon-button {
                    margin: 0;
                }
                
                .column-ordering-controls sl-icon-button::part(base) {
                    padding: 0;
                }
                
                th:hover .column-ordering-controls {
                    opacity: 1;
                }
                
                /* Filter row specific */
                .filter-row .checkbox-column {
                    padding: 0.5em 0.5em !important;
                }
                
                .checkbox-column .filter-cell-content {
                    text-align: center;
                    padding: 0.25em 0;
                }
                
                .checkbox-column .filter-cell-content sl-checkbox {
                    margin: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                
                /* Filter cell content */
                .filter-cell-content {
                    padding: 0;
                    padding-top: 4px;
                }
                
                .filter-cell-content sl-input,
                .filter-cell-content sl-dropdown {
                    width: 100%;
                }
                
                /* Sort indicator */
                .sort-indicator {
                    display: inline-block;
                    vertical-align: middle;
                    margin-left: 0.25em;
                    position: relative;
                    top: -2px;
                }
                
                /* Hidden sort indicator for centering balance */
                .sort-indicator-hidden {
                    /* visibility: hidden; */
                    margin-left: 0;
                    margin-right: 0.25em;
                }
                
                .sort-svg {
                    vertical-align: middle;
                }
                
                /* Column resizer */
                .col-resizer {
                    position: absolute;
                    top: 0;
                    right: -8px;
                    width: 16px;
                    height: 100%;
                    cursor: col-resize;
                    user-select: none;
                    touch-action: none;
                    z-index: 10;
                    pointer-events: auto;
                }
                
                .col-resizer::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    right: 8px;
                    width: 2px;
                    background: var(--sl-color-neutral-400);
                    opacity: 0;
                    transition: opacity 0.2s;
                    pointer-events: none;
                }
                
                th:last-child .col-resizer {
                    right: 0;
                }
                
                th:last-child .col-resizer::after {
                    right: 0;
                }
                
                .col-resizer:hover::after,
                th:hover .col-resizer::after {
                    opacity: 1;
                }
                
                /* Selection view toggle */
                .selection-view-toggle {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 24px;
                    min-width: 24px;
                    margin-left: -7px;
                }
                
                .selection-view-toggle-btn-wrapper {
                    position: relative;
                    display: inline-block;
                }
                
                .selection-view-badge {
                    line-height: 1;
                    position: absolute;
                    right: -2px;
                    bottom: -2px;
                    font-size: 12px;
                }
                
                .selection-view-badge-hidden {
                    display: none;
                }
                
                /* Loading overlay */
                .table-loading-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: var(--sl-color-neutral-0);
                    opacity: 0.8;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    backdrop-filter: blur(1px);
                    pointer-events: none;
                }
                
                .table-loading-overlay.hidden {
                    display: none;
                }
                
                /* No data row */
                .no-data-row td {
                    text-align: center;
                    color: var(--sl-color-neutral-500);
                    font-style: italic;
                    padding: 0.75em 1.25em;
                }
            </style>
            </style>
            <div id="table-container">
                <table id="data-table">
                    <thead></thead>
                    <tbody></tbody>
                </table>
                <div id="table-loading-overlay" class="table-loading-overlay hidden"></div>
            </div>
        `}connectedCallback(){this.setupBodyEvents(),window.addEventListener("resize",()=>{this.isResizing&&this.stopResize({type:"mouseup",clientX:this.startX})}),this.addEventListener("unselect-all-rows",()=>{this.unselectAllRows()})}disconnectedCallback(){this.boundOnResize&&(document.removeEventListener("mousemove",this.boundOnResize),document.removeEventListener("touchmove",this.boundOnResize)),this.boundStopResize&&(document.removeEventListener("mouseup",this.boundStopResize),document.removeEventListener("touchend",this.boundStopResize))}setData(e){this.originalData=e||[],this.applyPredefinedFilters(),Object.keys(this.columnFilters).length>0?this.applyFilters():this.initialized&&this.render()}setColumnDefinitions(e){this.columnDefinitions=e||[],this.initialized&&this.render()}setMenuActions(e){typeof e=="string"?(this.singleItemActions=e,this.menuActions=e.split(",").map(t=>{const[i,n]=t.split("/");return{actionName:i.trim(),label:n.trim()}})):this.menuActions=e||[]}setMultipleItemsActions(e){this.multipleItemsActions=e}setvisibleColumns(e){this.visibleColumns=e||[]}setUnhideableColumns(e){this.unhideableColumns=e||[]}setUnshowableColumns(e){this.unshowableColumns=e||[]}setEnableSorting(e){this.enableSorting=e!==!1,this.initialized&&this.render()}setEnableFiltering(e){this.enableFiltering=e!==!1,this.initialized&&this.render()}setEnableColumnResizing(e){this.enableColumnResizing=e!==!1,this.initialized&&this.render()}setEnableColumnReordering(e){this.enableColumnReordering=e!==!1,this.initialized&&this.render()}setEnableSelection(e){this.enableSelection=e!==!1,this.initialized&&this.render()}setEnableRowMenu(e){this.enableRowMenu=e!==!1,this.initialized&&this.render()}setEnableClickableRows(e){this.enableClickableRows=e!==!1,this.initialized&&this.render()}setEnableClickableColumns(e){this.enableClickableColumns=e!==!1,this.initialized&&this.render()}setEnablePagination(e){this.enablePagination=e!==!1,this.initialized&&this.render()}setPredefinedFilters(e){this.predefinedFilters=e||{},this.originalData.length>0&&(this.applyPredefinedFilters(),Object.keys(this.columnFilters).length>0?this.applyFilters():this.render())}applyPredefinedFilters(){Object.keys(this.predefinedFilters).length>0?this.tableData=this.originalData.filter(e=>Object.keys(this.predefinedFilters).every(t=>{const i=this.predefinedFilters[t];if(!i)return!0;const n=this.columnDefinitions.find(o=>o.key===t);if(!n)return!0;const s=e[t];return n.type==="boolean"?String(s)===i:n.type==="date"?this.matchDateFilter(s,i):n.type==="number"?this.matchNumberFilter(s,i):this.matchTextPattern(String(s),i)})):this.tableData=this.originalData.slice(),this.filteredData=this.tableData.slice()}initialize(){this.columnDefinitions.forEach(t=>{this.unshowableColumns.includes(t.key)?t.visible=!1:this.visibleColumns.includes(t.key)||this.unhideableColumns.includes(t.key)?t.visible=!0:t.visible=!1});const e=this.columnDefinitions.filter(t=>t.sortable&&t.sortDirection&&t.sortDirection!=="none");if(e.length>1){const i=(this.columnDefinitions.filter(n=>n.visible&&n.sortable&&n.sortDirection&&n.sortDirection!=="none").sort((n,s)=>n.order-s.order)[0]||e[0]).key;this.clearOtherSorts(i)}this.filteredData=this.tableData.slice(),this.render(),this.updateSelectionUI(),this.initialized=!0}render(){this.columnDefinitions.length&&(this.rebuildColgroup(),this.createTableHeaders(),this.populateTableRows(),this.updatePaginationUI())}getVisibleColumns(){return this.columnDefinitions.filter(e=>e.visible).sort((e,t)=>e.order-t.order)}getSelectionMenu(){return this.querySelector("#selection-menu")}showSelectionMenu(){const e=this.getSelectionMenu();e&&typeof e.show=="function"&&e.show()}hideSelectionMenu(){const e=this.getSelectionMenu();e&&typeof e.hide=="function"&&e.hide()}setSelectedRows(e){const t=this.getSelectionMenu();t&&typeof t.setSelectedRows=="function"&&t.setSelectedRows(e)}setSelectionCount(e){const t=this.getSelectionMenu();t&&typeof t.setSelectionCount=="function"&&t.setSelectionCount(e)}clearOtherSorts(e){this.columnDefinitions.forEach(t=>{t.key!==e&&(t.sortDirection="none")})}rebuildColgroup(){const e=this.querySelector("#data-table");if(!e)return;let t=e.querySelector("colgroup");if(t||(t=document.createElement("colgroup"),e.insertBefore(t,e.firstChild)),t.innerHTML="",this.enableSelection){const n=document.createElement("col");n.setAttribute("data-fixed","checkbox"),n.style.width="44px",t.appendChild(n)}if(this.enableRowMenu){const n=document.createElement("col");n.setAttribute("data-fixed","menu"),n.style.width="44px",t.appendChild(n)}this.getVisibleColumns().forEach(n=>{const s=document.createElement("col");s.setAttribute("data-column-key",n.key),n.width?s.style.width=typeof n.width=="number"?`${n.width}px`:String(n.width):s.style.width="200px",t.appendChild(s)})}createTableHeaders(){const e=this.querySelector("#data-table");if(!e)return!1;const t=e.querySelector("thead");if(!t)return!1;t.innerHTML="";const i=document.createElement("tr");if(this.enableSelection){const s=document.createElement("th");s.className=this.enableFiltering?"checkbox-column":"checkbox-column no-filtering",s.innerHTML=`
                ${this.enableFiltering?`
                <div class="header-cell-content">
                    <div id="selection-view-toggle" class="selection-view-toggle invisible">
                        <sl-tooltip hoist content="">
                            <div class="selection-view-toggle-btn-wrapper">
                                <sl-icon-button id="selection-view-toggle-btn" name="funnel" size="small" title=""></sl-icon-button>
                                <sl-icon id="selection-view-badge" class="selection-view-badge selection-view-badge-hidden" name=""></sl-icon>
                            </div>
                        </sl-tooltip>
                    </div>
                </div>
                `:""}
                <div>
                    <sl-checkbox id="header-select-all"></sl-checkbox>
                </div>
            `,i.appendChild(s)}if(this.enableRowMenu){const s=document.createElement("th");s.className=this.enableFiltering?"menu-column":"menu-column no-filtering",s.innerHTML=`
                <div class="header-cell-content">
                    <ts-selection-menu id="selection-menu"></ts-selection-menu>
                </div>
            `,i.appendChild(s)}const n=this.getVisibleColumns();return n.forEach((s,o)=>{const l=document.createElement("th");this.enableFiltering||l.classList.add("no-filtering"),s.align&&(l.style.textAlign=s.align),s.type==="boolean"&&(l.style.minWidth="140px"),l.setAttribute("data-column-key",s.key),this.enableSorting&&s.sortable&&l.setAttribute("data-sortable","true");const r=this.enableSorting?this.createSortIndicator(s.sortable,s.sortDirection):"",a=s.align==="right",c=s.align==="center";let u;if(c&&this.enableColumnReordering){const d=o>0?`<div class="column-ordering-control-left">
                        <sl-icon-button name="arrow-left" size="small" class="move-column-left" data-column-key="${s.key}" title="Move left"></sl-icon-button>
                    </div>`:`<div class="column-ordering-control-left">
                        <sl-icon-button name="arrow-left" size="small" class="move-column-left" data-column-key="${s.key}" disabled></sl-icon-button>
                    </div>`,h=o<n.length-1?`<div class="column-ordering-control-right">
                        <sl-icon-button name="arrow-right" size="small" class="move-column-right" data-column-key="${s.key}" title="Move right"></sl-icon-button>
                    </div>`:`<div class="column-ordering-control-right">
                        <sl-icon-button name="arrow-right" size="small" class="move-column-right" data-column-key="${s.key}" disabled></sl-icon-button>
                    </div>`,b=r?`<span class="sort-indicator sort-indicator-hidden">${r.replace('<span class="sort-indicator">',"").replace("</span>","")}</span>`:"";u=`
                    <div class="header-cell-content center-aligned">
                        ${d}
                        <div class="column-header-label center-aligned">
                            ${b}
                            ${s.title}
                            ${r}
                        </div>
                        ${h}
                    </div>`}else{const d=this.enableColumnReordering&&(o>0||o<n.length-1)?`<div class="column-ordering-controls">${o>0?`<sl-icon-button name="arrow-left" size="small" class="move-column-left" data-column-key="${s.key}" title="Move left"></sl-icon-button>`:""}${o<n.length-1?`<sl-icon-button name="arrow-right" size="small" class="move-column-right" data-column-key="${s.key}" title="Move right"></sl-icon-button>`:""}</div>`:"",h=`<div class="column-header-label${a?" right-aligned":""}">
                    ${s.title}
                    ${r}
                </div>`;u=`
                    <div class="header-cell-content">
                        ${a?d+h:h+d}
                    </div>`}l.innerHTML=`
                ${u}
                ${this.enableFiltering?`<div class="filter-cell-content">
                    ${s.filterable?this.createFilterInput(s):""}
                </div>`:""}
                ${this.enableColumnResizing?`<span class="col-resizer" data-column-key="${s.key}"></span>`:""}
            `,i.appendChild(l)}),t.appendChild(i),this.setupHeaderEvents(i),this.restoreFilterValues(),this.restoreSelectionMenuConfig(),!0}createSortIndicator(e=!1,t="none"){return e?`
            <span class="sort-indicator">
                <svg width="10" height="16" viewBox="0 0 10 16" class="sort-svg">
                    <polygon points="5,3 1,7 9,7" fill="${t==="asc"?"var(--sl-color-neutral-500)":"var(--sl-color-neutral-300)"}" />
                    <polygon points="5,13 1,9 9,9" fill="${t==="desc"?"var(--sl-color-neutral-500)":"var(--sl-color-neutral-300)"}" />
                </svg>
            </span>
        `:""}createFilterInput(e){const t=`filter-${e.key}`;return e.type==="boolean"?`
                <sl-dropdown hoist placement="bottom" style="width: 100%;">
                    <sl-button slot="trigger" size="small" variant="default" id="${t}" data-column-key="${e.key}" style="width: 100%; justify-content: space-between;">
                        Všechny<sl-icon name="chevron-down" slot="suffix"></sl-icon>
                    </sl-button>
                    <sl-menu>
                        <sl-menu-item data-value="">Všechny</sl-menu-item>
                        <sl-menu-item data-value="true">Ano</sl-menu-item>
                        <sl-menu-item data-value="false">Ne</sl-menu-item>
                    </sl-menu>
                </sl-dropdown>
            `:`
                <sl-input id="${t}" size="small" placeholder="${e.filterPlaceholder||""}" autocomplete="off" data-column-key="${e.key}" style="width: 100%;"></sl-input>
            `}restoreFilterValues(){Object.keys(this.columnFilters).forEach(e=>{const t=this.columnFilters[e];if(!t)return;const i=this.columnDefinitions.find(n=>n.key===e);if(i)if(i.type==="boolean"){const n=this.querySelector(`#filter-${e}`);if(n){const s=t==="true"?"Ano":t==="false"?"Ne":"Všechny";n.textContent=s}}else{const n=this.querySelector(`#filter-${e}`);n&&(n.value=t)}})}restoreSelectionMenuConfig(){if(!this.enableRowMenu)return;const e=this.querySelector("#selection-menu");if(!e){console.warn("Selection menu not found after header recreation");return}customElements.whenDefined("ts-selection-menu").then(()=>{if(this.singleItemActions&&e.setAttribute("single-item-actions",this.singleItemActions),this.multipleItemsActions&&e.setAttribute("multiple-items-actions",this.multipleItemsActions),this.selectedRowIds.size>0){const t=Array.from(this.selectedRowIds).map(i=>this.tableData.find(n=>String(n.id)===String(i))).filter(i=>i!==void 0);e.setSelectedRows(t),e.setSelectionCount(this.selectedRowIds.size),e.show()}else e.hide()})}setupHeaderEvents(e){const t=e.querySelector("#header-select-all");t&&t.addEventListener("sl-change",()=>this.handleHeaderCheckboxChange());const i=e.querySelector("#selection-view-toggle-btn");i&&i.addEventListener("click",()=>this.toggleSelectionView()),e.querySelectorAll("th[data-column-key]").forEach(n=>{n.addEventListener("click",s=>{const o=Date.now()-(this.lastResizeEnd||0);if(this.enableSorting&&o>100&&!s.target.closest(".col-resizer")&&!s.target.closest(".filter-cell-content")&&!s.target.closest(".column-ordering-controls")){const l=n.getAttribute("data-column-key");this.toggleSort(l)}})}),e.querySelectorAll(".move-column-left, .move-column-right").forEach(n=>{n.addEventListener("click",s=>{s.stopPropagation();const o=n.getAttribute("data-column-key"),l=n.classList.contains("move-column-left");this.moveColumn(o,l?"left":"right")})}),e.querySelectorAll(".col-resizer").forEach(n=>{n.addEventListener("mousedown",s=>this.startResize(s)),n.addEventListener("touchstart",s=>this.startResize(s),{passive:!1}),n.addEventListener("dblclick",s=>this.autoSizeColumn(s))}),e.querySelectorAll("sl-input[data-column-key]").forEach(n=>{n.addEventListener("sl-input",()=>{clearTimeout(this.filterTimeout),this.filterTimeout=setTimeout(()=>{const s=n.getAttribute("data-column-key");this.columnFilters[s]=n.value.trim(),this.applyFilters()},this.FILTER_DEBOUNCE_DELAY)}),n.addEventListener("keydown",s=>{if(s.key==="Escape"){s.target.value="";const o=n.getAttribute("data-column-key");delete this.columnFilters[o],this.applyFilters()}}),n.addEventListener("focus",s=>{setTimeout(()=>{n.select()},0)})}),e.querySelectorAll("th:not(.checkbox-column):not(.menu-column) sl-dropdown[hoist]").forEach(n=>{const s=n.querySelector("sl-menu");s&&s.addEventListener("sl-select",o=>{const l=o.detail.item;if(!l)return;const r=l.getAttribute("data-value");if(r==null)return;const a=n.querySelector("sl-button");if(!a)return;const c=a.getAttribute("data-column-key");c&&(a.textContent=l.textContent,r===""?delete this.columnFilters[c]:this.columnFilters[c]=r,this.applyFilters())})})}setupBodyEvents(){const e=this.querySelector("tbody");e&&(e.addEventListener("sl-change",t=>{const i=t.target;if(i&&i.classList.contains("row-select")){const n=i.closest("tr"),s=String(n.getAttribute("data-row-id"));this.handleRowCheckboxChange(s,i.checked)}}),e.addEventListener("sl-select",t=>{const i=t.detail?.item;if(!i||i.tagName!=="SL-MENU-ITEM")return;const n=i.closest("sl-dropdown");if(!n||!n.id||!n.id.startsWith("row-menu-"))return;const s=String(n.id.replace("row-menu-","")),o=i.getAttribute("data-action"),l=this.tableData.find(r=>String(r.id)===s);l&&o&&this.dispatchEvent(new CustomEvent("selection-action-activated",{detail:{action:o,rows:[l]},bubbles:!0,composed:!0}))}))}setupRowClickHandlers(){const e=this.querySelector("tbody");e&&(this.rowClickHandler&&(e.removeEventListener("click",this.rowClickHandler),this.rowClickHandler=null),(this.enableClickableRows||this.enableClickableColumns)&&(this.rowClickHandler=t=>{if(t.target.closest(".checkbox-column")||t.target.closest(".menu-column")||t.target.closest("sl-copy-button")||t.target.closest("sl-switch"))return;const i=t.target.closest("tr"),n=t.target.closest("td");if(i&&i.hasAttribute("data-row-id")&&n){const s=String(i.getAttribute("data-row-id")),o=this.tableData.find(l=>String(l.id)===s);if(o){let l=null;if(!this.enableClickableRows&&this.enableClickableColumns)if(n.classList.contains("clickable-column"))l=n.getAttribute("data-column-key");else return;else if(this.enableClickableRows&&!this.enableClickableColumns)l=null;else if(this.enableClickableRows&&this.enableClickableColumns)n.classList.contains("clickable-column")&&(l=n.getAttribute("data-column-key"));else return;this.dispatchEvent(new CustomEvent("row-clicked",{detail:{row:o,columnKey:l},bubbles:!0,composed:!0}))}}},e.addEventListener("click",this.rowClickHandler)))}handleHeaderCheckboxChange(e){const t=this.querySelector("#header-select-all");if(!t)return;const i=t.checked,n=this.getActiveData();i?n.forEach(s=>{this.selectedRowIds.add(String(s.id))}):n.forEach(s=>{this.selectedRowIds.delete(String(s.id))}),this.emitSelectionChange(),this.populateTableRows(),this.updatePaginationUI(),this.updateSelectionUI()}handleRowCheckboxChange(e,t){t?this.selectedRowIds.add(e):this.selectedRowIds.delete(e),this.updateHeaderCheckbox(),this.selectionViewMode!=="all"&&(this.populateTableRows(),this.updatePaginationUI()),this.emitSelectionChange(),this.updateSelectionUI()}toggleSort(e){const t=this.columnDefinitions.find(s=>s.key===e);if(!t||!t.sortable)return;const i=t.sortDirection||"none",n=i==="none"?"asc":i==="asc"?"desc":"none";this.clearOtherSorts(e),t.sortDirection=n,this.createTableHeaders(),this.populateTableRows(),this.updatePaginationUI()}moveColumn(e,t){const i=this.getVisibleColumns(),n=i.findIndex(r=>r.key===e);if(n===-1)return;const s=t==="left"?n-1:n+1;if(s<0||s>=i.length)return;const o=i[n].order,l=i[s].order;i[n].order=l,i[s].order=o,this.dispatchEvent(new CustomEvent("column-order-changed",{detail:{columnDefinitions:this.columnDefinitions},bubbles:!1})),this.render()}toggleSelectionView(){if(this.selectedRowIds.size===0)return;const e=["all","selected","unselected"],i=(e.indexOf(this.selectionViewMode)+1)%e.length;this.selectionViewMode=e[i],this.currentPage=1,this.populateTableRows(),this.updatePaginationUI(),this.updateSelectionViewUI()}startResize(e){if(e.preventDefault(),e.stopPropagation(),Date.now()-this.lastResizeEnd<50)return;this.isResizing=!0,this.resizeColKey=e.target.getAttribute("data-column-key"),this.startX=e.type==="touchstart"?e.touches[0].clientX:e.clientX;const n=this.querySelector("#data-table").querySelector(`th[data-column-key="${this.resizeColKey}"]`);if(n)this.startWidth=n.getBoundingClientRect().width;else{const s=this.columnDefinitions.find(o=>o.key===this.resizeColKey);s&&s.width?this.startWidth=typeof s.width=="number"?s.width:parseFloat(s.width):this.startWidth=200}document.body.style.cursor="col-resize",document.body.style.userSelect="none",this.boundOnResize=s=>this.onResize(s),this.boundStopResize=s=>this.stopResize(s),document.addEventListener("mousemove",this.boundOnResize),document.addEventListener("mouseup",this.boundStopResize),document.addEventListener("touchmove",this.boundOnResize,{passive:!1}),document.addEventListener("touchend",this.boundStopResize)}onResize(e){if(!this.isResizing)return;e.preventDefault();const i=(e.type==="touchmove"?e.touches[0].clientX:e.clientX)-this.startX,n=Math.max(50,this.startWidth+i),o=this.querySelector("#data-table").querySelector(`col[data-column-key="${this.resizeColKey}"]`);o&&(o.style.width=`${n}px`)}stopResize(e){if(!this.isResizing)return;document.removeEventListener("mousemove",this.boundOnResize),document.removeEventListener("mouseup",this.boundStopResize),document.removeEventListener("touchmove",this.boundOnResize),document.removeEventListener("touchend",this.boundStopResize);const i=(e.type==="touchend"?e.changedTouches[0].clientX:e.clientX)-this.startX,n=Math.max(50,this.startWidth+i),s=this.columnDefinitions.find(o=>o.key===this.resizeColKey);s&&(s.width=n),document.body.style.cursor="",document.body.style.userSelect="",this.isResizing=!1,this.lastResizeEnd=Date.now()}autoSizeColumn(e){e.preventDefault(),e.stopPropagation();const t=e.target.getAttribute("data-column-key");if(!t)return;const i=document.createElement("span");i.style.visibility="hidden",i.style.position="absolute",i.style.whiteSpace="nowrap",i.style.left="-9999px";const n=this.querySelector("#data-table"),s=n.querySelector(`th[data-column-key="${t}"]`);if(!s)return;const o=n.querySelector("tbody"),l=o?o.querySelector("td:not(.checkbox-column):not(.menu-column)"):null;if(l){const h=window.getComputedStyle(l);i.style.font=h.font,i.style.fontSize=h.fontSize,i.style.fontFamily=h.fontFamily,i.style.fontWeight=h.fontWeight}document.body.appendChild(i),i.textContent=s.textContent.trim();let r=i.offsetWidth;const a=this.columnDefinitions.find(h=>h.key===t);a&&this.tableData.forEach(h=>{let b="";const p=h[t];if(a.type==="number"&&p!==null&&p!==void 0?b=p.toLocaleString("cs-CZ",{minimumFractionDigits:2,maximumFractionDigits:2}):a.type==="date"&&p?b=new Date(p).toLocaleDateString("cs-CZ"):a.type==="boolean"?b="":b=String(p||""),b){i.textContent=b;const f=i.offsetWidth;r=Math.max(r,f)}}),document.body.removeChild(i);let c=40;a&&a.canBeCopied&&(c+=40);const u=Math.max(80,Math.ceil(r+c));console.log(`Auto-sizing column ${t}: maxWidth=${r.toFixed(2)}px, padding=${c}px, newWidth=${u}px, canBeCopied=${a?.canBeCopied||!1}`),a&&(a.width=u);const d=n.querySelector(`col[data-column-key="${t}"]`);d&&(d.style.width=`${u}px`)}populateTableRows(){const e=this.querySelector("#data-table");if(!e)return!1;const t=e.querySelector("tbody");if(!t)return!1;t.innerHTML="";const i=this.getVisibleColumns(),n=this.getCurrentPageData();if(n.length===0){const s=document.createElement("tr");s.className="no-data-row";const o=document.createElement("td"),l=(this.enableSelection?1:0)+(this.enableRowMenu?1:0);o.colSpan=i.length+l,o.textContent="Nenalezeny žádné záznamy",o.className="no-data-row",s.appendChild(o),t.appendChild(s)}else n.forEach(s=>{const o=this.createTableRow(s,i);t.appendChild(o)});return this.updateHeaderCheckbox(),this.updateSelectionUI(),this.setupRowClickHandlers(),!0}createTableRow(e,t){const i=document.createElement("tr");if(i.setAttribute("data-row-id",e.id),this.enableClickableRows&&i.classList.add("clickable"),this.enableSelection){const n=document.createElement("td");n.className="checkbox-column",n.innerHTML='<sl-checkbox class="row-select"></sl-checkbox>';const s=n.querySelector("sl-checkbox");s.checked=this.selectedRowIds.has(String(e.id)),i.appendChild(n)}if(this.enableRowMenu){const n=document.createElement("td");n.className="menu-column";const s=this.menuActions.map(o=>`<sl-menu-item data-action="${o.actionName}">${o.label}</sl-menu-item>`).join("");n.innerHTML=`
                <sl-dropdown hoist id="row-menu-${e.id}">
                    <sl-button slot="trigger" size="small" variant="text" circle>
                        <sl-icon name="three-dots-vertical"></sl-icon>
                    </sl-button>
                    <sl-menu>${s}</sl-menu>
                </sl-dropdown>
            `,i.appendChild(n)}return t.forEach(n=>{const s=document.createElement("td");n.align&&(s.style.textAlign=n.align),n.type==="boolean"&&(s.style.minWidth="140px"),this.enableClickableColumns&&n.isClickable&&(s.classList.add("clickable-column"),s.setAttribute("data-column-key",n.key));let o="",l="";if(n.key==="turnover")o=`<sl-format-number value="${e[n.key]}" type="decimal" minimum-fraction-digits="2" maximum-fraction-digits="2"></sl-format-number>`,l=e[n.key];else if(n.key==="contractDate")o=`<sl-format-date date="${e[n.key]}"></sl-format-date>`,l=new Date(e[n.key]).toLocaleDateString("cs-CZ").replace(/\s/g,"");else if(n.key==="approved"){const r=e[n.key]?"checked":"";n.align==="center"?o=`<div style="display: flex; justify-content: center;"><sl-switch ${r} disabled></sl-switch></div>`:o=`<sl-switch ${r} disabled></sl-switch>`,l=e[n.key]?"Ano":"Ne"}else o=e[n.key],l=e[n.key];if(this.enableClickableColumns&&n.isClickable&&typeof o=="string"&&(o=`<span class="clickable-cell-content">${o}</span>`),n.canBeCopied&&l!==void 0&&l!==null){const r=`<sl-copy-button value="${l}" copy-label="Zkopírovat do schránky" success-label="Zkopírováno!" error-label="Váš prohlížeč nepodporuje tuto funkci"></sl-copy-button>`;n.align==="right"?s.innerHTML=`<div style="display: flex; align-items: center; justify-content: flex-end; gap: 0.5em;"><span>${o}</span>${r}</div>`:n.align==="center"?s.innerHTML=`<div style="display: flex; align-items: center; justify-content: center; gap: 0.5em;"><span>${o}</span>${r}</div>`:s.innerHTML=`<div style="display: flex; align-items: center; justify-content: space-between;"><span>${o}</span>${r}</div>`}else typeof o=="string"?s.innerHTML=o:s.textContent=o;i.appendChild(s)}),i}getActiveData(){const e=Object.keys(this.columnFilters).length>0?this.filteredData:this.tableData;return this.selectionViewMode==="selected"?e.filter(t=>this.selectedRowIds.has(String(t.id))):this.selectionViewMode==="unselected"?e.filter(t=>!this.selectedRowIds.has(String(t.id))):e}getCurrentPageData(){const e=this.getActiveData(),t=this.getSortedData(e);if(!this.enablePagination||this.itemsPerPage===-1)return t;const i=(this.currentPage-1)*this.itemsPerPage,n=i+this.itemsPerPage;return t.slice(i,n)}getSortedData(e){const t=this.getActiveSortColumn();if(!t||t.sortDirection==="none")return e;const i=t.key,n=t.sortDirection;return e.slice().sort((o,l)=>{const r=this.compareValues(o[i],l[i]);return n==="asc"?r:-r})}getActiveSortColumn(){const e=this.columnDefinitions.filter(i=>i.visible&&i.sortable&&i.sortDirection&&i.sortDirection!=="none").sort((i,n)=>i.order-n.order);return e.length>0?e[0]:this.columnDefinitions.find(i=>i.sortable&&i.sortDirection&&i.sortDirection!=="none")||null}compareValues(e,t){const i=e==null,n=t==null;return i&&n?0:i?1:n?-1:typeof e=="number"&&typeof t=="number"?e-t:String(e).localeCompare(String(t),void 0,{numeric:!0,sensitivity:"base"})}updatePaginationUI(){const e=this.getActiveData();this.dispatchEvent(new CustomEvent("pagination-changed",{detail:{totalRecordsCount:this.tableData.length,filteredRecordsCount:e.length,pageSize:this.itemsPerPage,currentPage:this.currentPage,pageSizes:this.availablePageSizes},bubbles:!0,composed:!0}))}updateHeaderCheckbox(){const e=this.querySelector("#header-select-all");if(!e)return;const t=this.getActiveData(),i=t.length;if(i===0){e.checked=!1,e.indeterminate=!1;return}let n=0;for(const s of t)this.selectedRowIds.has(String(s.id))&&n++;n===0?(e.checked=!1,e.indeterminate=!1):n===i?(e.checked=!0,e.indeterminate=!1):(e.checked=!1,e.indeterminate=!0)}updateRowCheckboxes(){const e=this.querySelector("tbody");e&&e.querySelectorAll("tr[data-row-id]").forEach(t=>{const i=t.getAttribute("data-row-id"),n=t.querySelector(".row-select");n&&(n.checked=this.selectedRowIds.has(i))})}updateSelectionUI(){const e=this.querySelector("#selection-view-toggle");if(!e)return;if(this.selectedRowIds.size===0){this.selectionViewMode!=="all"&&(this.selectionViewMode="all",this.populateTableRows(),this.updatePaginationUI()),e.classList.add("invisible");const i=this.querySelector("#selection-view-badge");i&&i.classList.add("selection-view-badge-hidden");return}e.classList.remove("invisible"),this.updateSelectionViewUI()}updateSelectionViewUI(){const e=this.querySelector("#selection-view-badge"),t=this.querySelector("#selection-view-toggle-btn"),i=this.querySelector("#selection-view-toggle"),n=i?i.querySelector("sl-tooltip"):null;if(!e||!t||!n)return;let s="";this.selectionViewMode==="all"?(s="Režim zobrazení: všechny řádky",e.classList.add("selection-view-badge-hidden")):this.selectionViewMode==="selected"?(s="Režim zobrazení: jen vybrané řádky",e.classList.remove("selection-view-badge-hidden"),e.setAttribute("name","check"),e.style.color="var(--sl-color-success-600)"):(s="Režim zobrazení: jen nevybrané řádky",e.classList.remove("selection-view-badge-hidden"),e.setAttribute("name","x"),e.style.color="var(--sl-color-danger-600)"),t.setAttribute("title",s),n.setAttribute("content",s)}emitSelectionChange(){this.dispatchEvent(new CustomEvent("selection-changed",{detail:{selectedRowIds:Array.from(this.selectedRowIds),selectedCount:this.selectedRowIds.size},bubbles:!0,composed:!0}))}applyFilters(){this.filteredData=this.tableData.filter(e=>Object.keys(this.columnFilters).every(t=>{const i=this.columnFilters[t];if(!i)return!0;const n=this.columnDefinitions.find(o=>o.key===t);if(!n)return!0;const s=e[t];return n.type==="boolean"?String(s)===i:n.type==="date"?this.matchDateFilter(s,i):n.type==="number"?this.matchNumberFilter(s,i):this.matchTextPattern(String(s),i)})),this.currentPage=1,this.populateTableRows(),this.updatePaginationUI(),this.emitFilterChange()}matchDateFilter(e,t){if(!e)return!1;const i=new Date(e);if(isNaN(i.getTime()))return!1;const n=new Date(i.getFullYear(),i.getMonth(),i.getDate()),s=this.parseDateRange(t);if(s.min&&s.max)return n>=s.min&&n<=s.max;if(s.min)return n>=s.min;if(s.max)return n<=s.max;const o=new Intl.DateTimeFormat("cs-CZ").format(n);return this.matchTextPattern(o,t)}matchNumberFilter(e,t){const i=Number(e);if(isNaN(i))return!1;const n=this.parseNumberRange(t);return n.min!==null&&n.max!==null?i>=n.min&&i<=n.max:n.min!==null?i>=n.min:n.max!==null?i<=n.max:this.matchTextPattern(String(e),t)}matchTextPattern(e,t){if(!t)return!0;if(!e)return!1;const i=e.toLowerCase(),n=t.toLowerCase();if(n.includes("*")||n.includes("?")){const s=n.replace(/[.+^${}()|[\]\\]/g,"\\$&").replace(/\*/g,".*").replace(/\?/g,".");return new RegExp(`^${s}$`,"i").test(i)}return i.includes(n)}parseDateRange(e){const t=e.trim();if(!t)return{min:null,max:null};if(t.includes("..")){const n=t.split("..").map(a=>a.trim()),s=n[0],o=n[1];let l=null,r=null;if(s){const a=this.parseFlexibleDate(s);a&&(l=a)}if(o){const a=this.parseFlexibleDate(o);a&&(r=this.setEndOfDay(a))}return{min:l,max:r}}const i=this.parseFlexibleDate(t);return i?{min:i,max:this.setEndOfDay(new Date(i))}:{min:null,max:null}}parseFlexibleDate(e){if(!e)return null;const t=e.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);if(t){const[,s,o,l]=t,r=new Date(Number(l),Number(o)-1,Number(s));if(!isNaN(r.getTime()))return r}const i=e.match(/^(\d{1,2})\.(\d{1,2})\.(\d{2})$/);if(i){let[,s,o,l]=i;l=Number(l);const r=l<50?2e3+l:1900+l,a=new Date(r,Number(o)-1,Number(s));if(!isNaN(a.getTime()))return a}const n=e.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);if(n){const[,s,o,l]=n,r=new Date(Number(s),Number(o)-1,Number(l));if(!isNaN(r.getTime()))return r}return null}setEndOfDay(e){const t=new Date(e);return t.setHours(23,59,59,999),t}parseNumberRange(e){const t=e.trim();if(!t)return{min:null,max:null};if(t.includes("..")){const n=t.split("..").map(a=>a.trim()),s=n[0],o=n[1];let l=null,r=null;if(s){const a=parseFloat(s);isNaN(a)||(l=a)}if(o){const a=parseFloat(o);isNaN(a)||(r=a)}return{min:l,max:r}}const i=parseFloat(t);return isNaN(i)?{min:null,max:null}:{min:i,max:i}}emitFilterChange(){this.dispatchEvent(new CustomEvent("filters-changed",{detail:{columnFilters:{...this.columnFilters},hasActiveFilters:Object.keys(this.columnFilters).length>0},bubbles:!0,composed:!0}))}goToPage(e){if(this.itemsPerPage===-1)return;const t=Math.ceil(this.getActiveData().length/this.itemsPerPage);e>=1&&e<=t&&e!==this.currentPage&&(this.currentPage=e,this.populateTableRows(),this.updatePaginationUI())}changePageSize(e){this.itemsPerPage!==e&&(this.itemsPerPage=e,this.currentPage=1,this.populateTableRows(),this.updatePaginationUI())}clearFilters(){this.columnFilters={};const e=this.querySelector("thead");e&&(e.querySelectorAll("sl-input[data-column-key]").forEach(t=>{t.value=""}),e.querySelectorAll("sl-dropdown[hoist]").forEach(t=>{const i=t.querySelector("sl-button");i&&(i.textContent="Všechny")})),this.applyFilters()}unselectAllRows(){this.selectedRowIds.clear(),this.updateHeaderCheckbox(),this.updateRowCheckboxes(),this.updateSelectionUI(),this.emitSelectionChange()}getSelectedRows(){return this.tableData.filter(e=>this.selectedRowIds.has(String(e.id)))}getAllRows(){return this.tableData.slice()}getFilteredRows(){return this.getSortedData(this.getActiveData())}getAllSortedRows(){return this.getSortedData(this.tableData)}clearAllSelectedRecords(){this.selectedRowIds.clear(),this.selectionViewMode="all",this.populateTableRows(),this.updatePaginationUI(),this.updateSelectionUI(),this.emitSelectionChange()}addImportedRow(e){const t=this.tableData.length>0?Math.max(...this.tableData.map(n=>Number(n.id)||0)):0,i={...e,id:String(t+1)};this.tableData.push(i),this.applyFilters()}updateExistingRow(e,t){const i=this.tableData.findIndex(n=>String(n.id)===String(e));i!==-1&&(this.tableData[i]={...this.tableData[i],...t},this.applyFilters())}updateColumnVisibility(e,t){const i=this.columnDefinitions.find(n=>n.key===e);i&&(i.visible=t,this.render())}getColumnDefinitions(){return this.columnDefinitions.slice()}getColumnFilters(){return{...this.columnFilters}}showLoadingOverlay(){const e=this.querySelector("#table-loading-overlay");e&&e.classList.remove("hidden")}hideLoadingOverlay(){const e=this.querySelector("#table-loading-overlay");e&&e.classList.add("hidden")}refresh(){this.applyFilters()}}customElements.define("ts-datatable",I);class A extends HTMLElement{constructor(){super(),this.innerHTML=`
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
        `}connectedCallback(){this.setupEventListeners()}setupEventListeners(){const e=this.querySelector(".create-record-btn");e&&e.addEventListener("click",()=>{this.dispatchEvent(new CustomEvent("create-new-record",{detail:{},bubbles:!0,composed:!0}))})}}customElements.define("ts-create-record-button",A);class z extends HTMLElement{constructor(){super(),this.innerHTML=`
            <style>
                .export-btn {
                    display: inline-block;
                }
                .export-options {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    font-family: var(--sl-font-sans);
                }
                .export-section {
                    border: 1px solid var(--sl-color-neutral-200);
                    border-radius: var(--sl-border-radius-medium);
                    padding: 1rem;
                    background: var(--sl-color-neutral-50);
                    font-family: var(--sl-font-sans);
                }
                .export-section-title {
                    font-weight: var(--sl-font-weight-semibold);
                    margin-bottom: 0.5rem;
                    color: var(--sl-color-neutral-700);
                    font-family: var(--sl-font-sans);
                }
                .export-section sl-radio-group {
                    margin-top: 0.5rem;
                }
                .export-section sl-radio-group::part(form-control) {
                    display: flex;
                    flex-direction: column;
                    gap: 0.625rem;
                }
                .export-section sl-radio {
                    margin: 0;
                    margin-bottom: 0.625rem;
                }
                .export-section sl-radio:last-child {
                    margin-bottom: 0;
                }
                .export-section #export-rows-group {
                    margin-top: 0.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 0.625rem;
                }
                .export-option-item {
                    margin: 0;
                }
                sl-dialog::part(title) {
                    font-family: var(--sl-font-sans);
                    flex-shrink: 0;
                }
                sl-dialog::part(body) {
                    font-family: var(--sl-font-sans);
                    overflow-y: auto;
                    overflow-x: hidden;
                    flex: 1 1 auto;
                    min-height: 0;
                }
                sl-dialog::part(panel) {
                    max-height: 90vh;
                    max-width: 90vw;
                    display: flex;
                    flex-direction: column;
                }
                sl-dialog::part(footer) {
                    display: flex;
                    justify-content: space-between;
                    flex-shrink: 0;
                }
            </style>
            <sl-tooltip hoist content="Exportovat do Excelu">
                <sl-button class="export-btn">
                    <sl-icon name="download"></sl-icon>
                </sl-button>
            </sl-tooltip>
        `}static get observedAttributes(){return[]}connectedCallback(){this.selectedRowOptions=new Set,this.setupEventListeners()}getDialog(e){let t=this.parentElement;for(;t;){const i=t.querySelector(`#${e}`);if(i)return i;t=t.parentElement}return null}setExportData(e){this.dataProvider=e}updateRowCounts(){const e=this.getDialog("export-dialog"),t=e?.querySelector("#export-rows-group"),i=e?.querySelector("#export-columns-group"),n=e?.querySelector("#export-rows-section .export-section-title"),s=e?.querySelector("#export-columns-section .export-section-title"),o=e?.querySelector("#export-confirm-btn");if(!t||!i)return;const l=t.querySelectorAll("sl-checkbox[checked]"),r=Array.from(l).map(d=>d.getAttribute("value"));let a=0;r.includes("filtered")&&r.includes("selected")?a=this.getExportableRows("filtered-selected").length:r.includes("filtered")?a=this.getExportableRows("filtered").length:r.includes("selected")?a=this.getExportableRows("selected").length:a=this.getExportableRows("all").length;const c=i.value||"visible",u=this.getExportableColumns(c).length;n&&(n.textContent=`Řádky (${a})`),s&&(s.textContent=`Sloupce (${u})`),o&&(o.disabled=a===0)}setupEventListeners(){const e=this.querySelector(".export-btn");e&&e.addEventListener("click",()=>{this.onExportClick()}),setTimeout(()=>{const t=this.getDialog("export-dialog"),i=t?.querySelector("#export-cancel-btn"),n=t?.querySelector("#export-confirm-btn");i&&i.addEventListener("click",()=>{const s=this.getDialog("export-dialog");s&&s.hide()}),n&&n.addEventListener("click",()=>{this.onExportConfirm()})},0)}getExportableRows(e){const{selectedRowIds:t,getSortedActiveData:i,getAllSortedRows:n}=this.dataProvider();return e==="selected"?n().filter(l=>t.has(String(l.id))):e==="filtered"?i():e==="filtered-selected"?i().filter(o=>t.has(String(o.id))):n()}getExportableColumns(e){const{columnDefinitions:t,getVisibleColumns:i}=this.dataProvider();return e==="visible"?i():t.slice().sort((n,s)=>n.order-s.order)}buildExportDataset(e,t){const i=t.map(s=>s.key),n=e.map(s=>t.map(o=>s[o.key]));return{headers:i,data:n}}async ensureSheetJS(){return window.XLSX||await new Promise((e,t)=>{const i=document.createElement("script");i.src="https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js",i.onload=e,i.onerror=t,document.head.appendChild(i)}),window.XLSX}formatExportFilename(){const e=new Date,t=o=>String(o).padStart(2,"0"),i=e.getFullYear(),n=t(e.getMonth()+1),s=t(e.getDate());return`${i}-${n}-${s} Export.xlsx`}async performExport(e,t){const i=this.getExportableRows(e),n=this.getExportableColumns(t),{headers:s,data:o}=this.buildExportDataset(i,n),l=await this.ensureSheetJS(),r=l.utils.aoa_to_sheet([s,...o]),a=l.utils.book_new();l.utils.book_append_sheet(a,r,"Export"),l.writeFile(a,this.formatExportFilename())}onExportClick(){const{columnFilters:e,selectedRowIds:t,columnDefinitions:i,getVisibleColumns:n}=this.dataProvider(),s=Object.keys(e).length>0,o=t.size>0,l=n().length===i.filter(f=>!this.unshowableColumns?.includes(f.key)).length,r=s||o,a=!l;if(!r&&!a){this.performExport("all","visible");return}const c=this.getDialog("export-dialog"),u=c?.querySelector("#export-rows-group"),d=c?.querySelector("#export-columns-group"),h=c?.querySelector("#export-rows-section"),b=c?.querySelector("#export-columns-section");if(c?.querySelector("#export-rows-section .export-section-title"),c?.querySelector("#export-columns-section .export-section-title"),!c||!u||!d||!h||!b)return;this.selectedRowOptions.clear();const p=()=>{this.updateRowCounts()};if(u.innerHTML="",r){const f=(g,v,y=!1,k=!1)=>{const x=document.createElement("div");x.className="export-option-item";const w=document.createElement("sl-checkbox");w.setAttribute("value",g),w.textContent=v,y&&(w.disabled=!0),k&&(w.checked=!0),w.addEventListener("sl-change",()=>{setTimeout(()=>{this.updateRowCounts()},0)}),x.appendChild(w),u.appendChild(x)};s&&f("filtered","Pouze filtrované řádky",!1,!1),o&&f("selected","Pouze vybrané řádky",!1,!1),h.style.display=""}else h.style.display="none",u.innerHTML="";if(d.value="",d.innerHTML="",a){const f=(g,v)=>{const y=document.createElement("sl-radio");y.setAttribute("value",g),y.textContent=v,d.appendChild(y)};f("all","Všechny sloupce"),f("visible","Jen viditelné sloupce"),d.value="all",d.addEventListener("sl-change",p),b.style.display=""}else b.style.display="none",d.innerHTML="";p(),c.show()}onExportConfirm(){const e=this.getDialog("export-dialog"),t=e?.querySelector("#export-rows-group"),i=e?.querySelector("#export-columns-group"),n=t?.querySelectorAll("sl-checkbox[checked]"),s=Array.from(n).map(r=>r.getAttribute("value"));let o="all";s.includes("filtered")&&s.includes("selected")?o="filtered-selected":s.includes("filtered")?o="filtered":s.includes("selected")&&(o="selected");let l=i.value||i.querySelector("sl-radio[checked]")?.getAttribute("value");l||(l="visible"),e.hide(),this.performExport(o,l)}}customElements.define("ts-export-button",z);class L extends HTMLElement{constructor(){super(),this.innerHTML=`
            <style>
                .import-btn {
                    display: inline-block;
                }
                .large-icon {
                    font-size: 32px;
                }
                .import-missing-columns {
                    margin-top: 8px;
                    font-size: var(--sl-font-size-small);
                    font-family: var(--sl-font-sans);
                }
                .import-file-input-hidden {
                    display: none;
                }
                .import-results {
                    padding: 1rem 0;
                    font-family: var(--sl-font-sans);
                }
                .import-stats {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    gap: 1rem;
                    margin-bottom: 1rem;
                    font-family: var(--sl-font-sans);
                }
                .stat-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 1rem;
                    background: var(--sl-color-neutral-50);
                    border-radius: var(--sl-border-radius-medium);
                    border: 1px solid var(--sl-color-neutral-200);
                    font-family: var(--sl-font-sans);
                }
                .stat-label {
                    font-size: var(--sl-font-size-small);
                    color: var(--sl-color-neutral-600);
                    margin-bottom: 0.5rem;
                    font-weight: var(--sl-font-weight-medium);
                    font-family: var(--sl-font-sans);
                }
                .stat-value {
                    font-size: var(--sl-font-size-2x-large);
                    font-weight: var(--sl-font-weight-bold);
                    color: var(--sl-color-neutral-900);
                    font-family: var(--sl-font-sans);
                }
                sl-dialog::part(title) {
                    font-family: var(--sl-font-sans);
                    flex-shrink: 0;
                }
                sl-dialog::part(body) {
                    font-family: var(--sl-font-sans);
                    overflow-y: auto;
                    overflow-x: hidden;
                    flex: 1 1 auto;
                    min-height: 0;
                }
                sl-dialog::part(panel) {
                    max-height: 90vh;
                    max-width: 90vw;
                    display: flex;
                    flex-direction: column;
                }
                sl-dialog::part(footer) {
                    display: flex;
                    justify-content: space-between;
                    flex-shrink: 0;
                }
            </style>
            <sl-tooltip hoist content="Importovat z Excelu">
                <sl-button class="import-btn">
                    <sl-icon name="upload"></sl-icon>
                </sl-button>
            </sl-tooltip>
            <!-- Hidden file input for importing Excel -->
            <input type="file" id="import-file-input" accept=".xlsx" class="import-file-input-hidden" />
        `}static get observedAttributes(){return[]}connectedCallback(){this.columnsRequiredForImport=[],this.setupEventListeners()}setImportData(e){this.dataProvider=e}setColumnsRequiredForImport(e){this.columnsRequiredForImport=e||[]}getDialog(e){let t=this.parentElement;for(;t;){const i=t.querySelector(`#${e}`);if(i)return i;t=t.parentElement}return null}setupEventListeners(){const e=this.querySelector(".import-btn"),t=this.querySelector("#import-file-input");e&&t&&(e.addEventListener("click",()=>{t.value="",t.click()}),t.addEventListener("change",i=>{this.onImportFileSelected(i)})),setTimeout(()=>{const i=this.getDialog("import-error-dialog")?.querySelector('sl-button[slot="footer"][variant="default"]'),n=this.getDialog("import-summary-dialog")?.querySelector("#import-summary-close-btn"),s=this.getDialog("import-summary-dialog")?.querySelector("#import-rejected-save-btn");i&&i.addEventListener("click",()=>{const o=this.getDialog("import-error-dialog");o&&o.hide()}),n&&n.addEventListener("click",()=>{const o=this.getDialog("import-summary-dialog");o&&o.hide()}),s&&s.addEventListener("click",()=>{this.saveRejectedRows()})},0)}showImportResults(e){const{added:t,updated:i,rejected:n,skipped:s,rejectedRowsData:o}=e;this.rejectedRowsData=o||[];const l=this.getDialog("import-summary-dialog"),r=l?.querySelector("#import-added-count"),a=l?.querySelector("#import-updated-count"),c=l?.querySelector("#import-rejected-count"),u=l?.querySelector("#import-skipped-count"),d=l?.querySelector("#import-rejected-save-btn"),h=l?.querySelector("#import-footer-placeholder");r&&(r.textContent=t||0),a&&(a.textContent=i||0),c&&(c.textContent=n||0),u&&(u.textContent=s||0),(n||0)>0?(d&&(d.style.display=""),h&&(h.style.display="none")):(d&&(d.style.display="none"),h&&(h.style.display="")),l&&l.show()}formatRejectedFilename(){const e=new Date,t=o=>String(o).padStart(2,"0"),i=e.getFullYear(),n=t(e.getMonth()+1),s=t(e.getDate());return`${i}-${n}-${s} Zamítnuté řádky.xlsx`}async ensureSheetJS(){return window.XLSX||await new Promise((e,t)=>{const i=document.createElement("script");i.src="https://cdn.sheetjs.com/xlsx-latest/package/dist/xlsx.full.min.js",i.onload=e,i.onerror=t,document.head.appendChild(i)}),window.XLSX}async saveRejectedRows(){try{const{columnDefinitions:e}=this.dataProvider(),t=await this.ensureSheetJS(),i=e.find(u=>u.key==="id"),n=new Set,s=[];i&&(s.push(i),n.add("id")),e.forEach(u=>{n.has(u.key)||(s.push(u),n.add(u.key))});const o=s.map(u=>u.key),l=this.rejectedRowsData||[],r=[o,...l.map(u=>s.map(d=>u[d.key]??""))],a=t.utils.aoa_to_sheet(r),c=t.utils.book_new();t.utils.book_append_sheet(c,a,"Zamítnuté"),t.writeFile(c,this.formatRejectedFilename())}catch(e){console.error("Error saving rejected rows:",e),alert("Chyba při ukládání zamítnutých řádků: "+e.message)}}async onImportFileSelected(e){const t=e.target.files&&e.target.files[0];if(t)try{const{columnDefinitions:i}=this.dataProvider(),n=await this.ensureSheetJS(),s=await t.arrayBuffer(),o=n.read(s,{type:"array"}),l=o.SheetNames[0],r=o.Sheets[l],a=n.utils.sheet_to_json(r,{defval:""});if(a.length===0){this.showImportResults({added:0,updated:0,rejected:0,skipped:0,rejectedRowsData:[]});return}const c=Object.keys(a[0]||{}),u=[],d=this.columnsRequiredForImport&&this.columnsRequiredForImport.length>0?i.filter(p=>this.columnsRequiredForImport.includes(p.key)):i;for(const p of d)c.includes(p.key)||u.push(p.key);if(u.length>0){const p=this.getDialog("import-error-dialog"),f=p?.querySelector("#import-missing-columns"),g=this.columnsRequiredForImport&&this.columnsRequiredForImport.length>0?"Chybějící povinné sloupce: ":"Chybějící sloupce: ";f&&(f.textContent=g+u.join(", ")),p&&p.show();return}const h=new Set(i.map(p=>p.key)),b=a.map((p,f)=>{const g={};for(const[v,y]of Object.entries(p))h.has(v)&&(g[v]=y);return{__index:f+2,data:g}});this.dispatchEvent(new CustomEvent("do-import",{detail:{importData:b,file:t},bubbles:!0,composed:!0}))}catch(i){console.error("Import failed",i);const n=this.getDialog("import-error-dialog"),s=n?.querySelector("#import-missing-columns");s&&(s.textContent="Chyba při čtení souboru."),n&&n.show()}}}customElements.define("ts-import-button",L);class F extends HTMLElement{constructor(){super(),this.innerHTML=`
            <style>
                .selection-menu-container {
                    display: inline-block;
                }
                
                .selection-menu-container-hidden {
                    display: none;
                }
                
                .selection-menu {
                    min-width: 200px;
                }
                
                .selection-count-item {
                    font-weight: bold;
                    pointer-events: none;
                    opacity: 0.8;
                }
            </style>
            <div class="selection-menu-container selection-menu-container-hidden">
                <sl-dropdown hoist>
                    <sl-button slot="trigger" size="small" variant="text" circle>
                        <sl-icon name="three-dots-vertical"></sl-icon>
                    </sl-button>
                    <sl-menu class="selection-menu">
                        <!-- Menu items will be populated based on attributes -->
                    </sl-menu>
                </sl-dropdown>
            </div>
        `}static get observedAttributes(){return["single-item-actions","multiple-items-actions"]}connectedCallback(){this._selectionCount=0,this.selectedRows=[],this.setupEventListeners(),this.updateMenuItems(0)}attributeChangedCallback(e,t,i){(e==="single-item-actions"||e==="multiple-items-actions")&&this.updateMenuItems()}setupEventListeners(){const e=this.querySelector(".selection-menu");e&&e.addEventListener("sl-select",t=>{const i=t.detail.item?.getAttribute("data-action");i&&(i==="unselect-all"?this.dispatchEvent(new CustomEvent("unselect-all-rows",{bubbles:!0,composed:!0})):this.dispatchEvent(new CustomEvent("selection-action-activated",{detail:{action:i,rows:this.selectedRows},bubbles:!0,composed:!0})))})}updateMenuItems(e=0){const t=this.querySelector(".selection-menu");if(!t)return;t.innerHTML="";const i=document.createElement("sl-menu-item");i.className="selection-count-item",i.textContent=`Vybráno: ${e}`,t.appendChild(i);const n=document.createElement("sl-divider");t.appendChild(n);const s=document.createElement("sl-menu-item");s.setAttribute("data-action","unselect-all"),s.textContent="Zrušit výběr všech řádků",t.appendChild(s);const o=this.parseActionsAttribute("single-item-actions"),l=this.parseActionsAttribute("multiple-items-actions");let r=[];if(e===1?r=o:e>1&&(r=l),r.length>0){const a=document.createElement("sl-divider");t.appendChild(a)}r.forEach(a=>{const c=document.createElement("sl-menu-item");c.setAttribute("data-action",a.action),c.textContent=a.label,t.appendChild(c)})}parseActionsAttribute(e){const t=this.getAttribute(e);return t?t.split(",").map(i=>{const n=i.trim(),s=n.split("/");return s.length===2?{action:s[0].trim(),label:s[1].trim()}:{action:n,label:n}}).filter(i=>i.action):[]}show(){const e=this.querySelector(".selection-menu-container");e&&e.classList.remove("selection-menu-container-hidden")}hide(){const e=this.querySelector(".selection-menu-container");e&&e.classList.add("selection-menu-container-hidden")}setSelectedRows(e){this.selectedRows=e||[]}setSelectionCount(e){this._selectionCount=e,this.updateMenuItems(e)}}customElements.define("ts-selection-menu",F);class P extends HTMLElement{constructor(){super()}createContent(){this.innerHTML||(this.innerHTML=`
            <style>
                .column-selector {
                    display: inline-block;
                }
                
                .columns-menu {
                    min-width: 250px;
                    max-height: 400px;
                    overflow-y: auto;
                }
                
                .search-input {
                    margin: 0.5rem;
                    width: calc(100% - 1rem);
                }
                
                .column-filter-hidden {
                    display: none !important;
                }
                
                .filter-icon {
                    margin-left: 0.5rem;
                    fill: currentColor;
                }
            </style>
            <div class="column-selector">
                <sl-tooltip content="Výběr sloupců">
                    <sl-dropdown>
                        <sl-button slot="trigger" caret>
                            <sl-icon name="gear"></sl-icon>
                        </sl-button>
                        <sl-menu class="columns-menu">
                            <!-- Menu items will be populated dynamically -->
                        </sl-menu>
                    </sl-dropdown>
                </sl-tooltip>
            </div>
        `,this.setupEventListeners())}connectedCallback(){}setColumnDefinitions(e){this.columnDefinitions=e,Promise.all([customElements.whenDefined("sl-tooltip"),customElements.whenDefined("sl-dropdown"),customElements.whenDefined("sl-button"),customElements.whenDefined("sl-menu"),customElements.whenDefined("sl-input")]).then(()=>{this.createContent(),this.createColumnsMenu()}).catch(()=>{this.createContent(),this.createColumnsMenu()})}setColumnFilters(e){this.columnFilters=e,this.createColumnsMenu()}setUnshowableColumns(e){this.unshowableColumns=e,this.createColumnsMenu()}setUnhideableColumns(e){this.unhideableColumns=e,this.createColumnsMenu()}setupEventListeners(){const e=this.querySelector("sl-dropdown"),t=this.querySelector(".columns-menu");e&&e.addEventListener("sl-show",()=>{setTimeout(()=>{const i=this.querySelector(".columns-menu #column-search");i&&i.focus()},50)}),t&&t.addEventListener("sl-select",i=>{const n=i.detail.item,s=n?.getAttribute("data-action"),o=n?.getAttribute("data-column-key");if(this.clearColumnFilter(),s==="clear-filters"){this.dispatchEvent(new CustomEvent("clear-filters",{bubbles:!0,composed:!0}));return}else if(s==="select-all"){this.dispatchEvent(new CustomEvent("select-all-columns",{bubbles:!0,composed:!0}));return}else if(s==="clear-all"){this.dispatchEvent(new CustomEvent("clear-all-columns",{bubbles:!0,composed:!0}));return}if(o){const l=this.columnDefinitions?.find(r=>r.key===o);if(l){if(n.disabled){i.preventDefault();return}if(n.hasAttribute("data-unhideable")&&this.unhideableColumns?.includes(o)&&!n.checked){n.checked=!0,i.preventDefault();return}l.visible=n.checked,this.dispatchEvent(new CustomEvent("column-visibility-changed",{detail:{columnKey:o,visible:n.checked},bubbles:!0,composed:!0}))}}})}createColumnsMenu(){const e=this.querySelector(".columns-menu");if(!e||!this.columnDefinitions)return!1;if(e.innerHTML="",this.columnFilters&&Object.keys(this.columnFilters).length>0){const a=document.createElement("sl-menu-item");a.textContent="Vymazat všechny filtry",a.setAttribute("data-action","clear-filters"),e.appendChild(a);const c=document.createElement("sl-divider");e.appendChild(c)}const i=document.createElement("sl-menu-item");i.textContent="Vybrat vše",i.setAttribute("data-action","select-all"),e.appendChild(i);const n=document.createElement("sl-menu-item");n.textContent="Zrušit výběr",n.setAttribute("data-action","clear-all"),e.appendChild(n);const s=document.createElement("sl-divider");e.appendChild(s);const o=document.createElement("sl-input");o.autofocus=!0,o.placeholder="Hledat sloupce...",o.className="search-input",o.setAttribute("id","column-search"),o.setAttribute("autocomplete","off"),e.appendChild(o),this.columnDefinitions.filter(a=>!this.unshowableColumns?.includes(a.key)).sort((a,c)=>a.order-c.order).forEach(a=>{const c=document.createElement("sl-menu-item");c.type="checkbox";const d=this.columnFilters?.[a.key]&&this.columnFilters[a.key].trim()!==""?`
                <svg width="12" height="12" viewBox="0 0 16 16" class="filter-icon">
                    <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z"/>
                </svg>
            `:"";c.innerHTML=`${a.title}${d}`,c.setAttribute("data-column-key",a.key),c.checked=a.visible,this.unhideableColumns?.includes(a.key)&&(c.setAttribute("data-unhideable","true"),c.disabled=!0),e.appendChild(c)});const r=e.querySelector("#column-search");return r&&(["input","sl-input","keyup","change"].forEach(a=>{r.addEventListener(a,c=>{const u=c.target.value||"";setTimeout(()=>this.filterColumnMenu(u),10)})}),r.addEventListener("keydown",a=>{a.key==="Escape"&&(a.preventDefault(),a.stopPropagation(),a.stopImmediatePropagation(),a.target.value="",this.filterColumnMenu(""))})),!0}filterColumnMenu(e){const t=this.querySelector(".columns-menu");if(!t)return;const i=t.querySelectorAll('sl-menu-item[role="menuitemcheckbox"]'),n=e.toLowerCase();i.forEach(s=>{s.textContent.toLowerCase().includes(n)?s.classList.remove("column-filter-hidden"):s.classList.add("column-filter-hidden")})}refreshMenu(){this.columnDefinitions&&this.createColumnsMenu()}clearColumnFilter(){const e=this.querySelector(".columns-menu #column-search");e&&(e.value="",this.filterColumnMenu(""))}}customElements.define("ts-column-selector",P);class M extends HTMLElement{constructor(){super(),this.tableData=[],this.columnDefinitions=[],this.visibleColumns=[],this.unhideableColumns=[],this.unshowableColumns=[],this.columnsRequiredForImport=[],this.singleItemActions="",this.multipleItemsActions="",this.itemsPerPage=5,this.itemsPerPageOptions=[5,10,20,50,100],this.predefinedFilters={},this.showColumnSelector=!0,this.showImportButton=!0,this.showExportButton=!0,this.showCreateButton=!0,this.enableSorting=!0,this.enableFiltering=!0,this.enableColumnResizing=!0,this.enableColumnReordering=!0,this.enableSelection=!0,this.enableRowMenu=!0,this.enableClickableRows=!0,this.enablePagination=!0,this.datatable=null,this.toolbar=null,this.pager=null,this.innerHTML=`
            <style>
                :host {
                    display: block;
                    width: 100%;
                    height: 100vh;
                }
                
                .ts-table-container {
                    display: grid;
                    grid-template-rows: auto 1fr auto;
                    width: 100%;
                    height: 100%;
                    gap: 0.5em;
                }
                
                #toolbar {
                    width: 100%;
                    position: sticky;
                    top: 0;
                    z-index: 10;
                    grid-row: 1;
                }
                
                .datatable-wrapper {
                    width: 100%;
                    overflow: auto;
                    grid-row: 2;
                    min-height: 0;
                }
                
                #datatable {
                    min-width: 100%;
                }
                
                #pager {
                    width: 100%;
                    grid-row: 3;
                }
                
                /* Import dialog styles */
                .large-icon {
                    font-size: 32px;
                }
                .import-missing-columns {
                    margin-top: 8px;
                    font-size: var(--sl-font-size-small);
                    font-family: var(--sl-font-sans);
                }
                .import-results {
                    padding: 1rem 0;
                    font-family: var(--sl-font-sans);
                }
                .import-stats {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    gap: 1rem;
                    margin-bottom: 1rem;
                    font-family: var(--sl-font-sans);
                }
                .stat-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 1rem;
                    background: var(--sl-color-neutral-50);
                    border-radius: var(--sl-border-radius-medium);
                    border: 1px solid var(--sl-color-neutral-200);
                    font-family: var(--sl-font-sans);
                }
                .stat-label {
                    font-size: var(--sl-font-size-small);
                    color: var(--sl-color-neutral-600);
                    margin-bottom: 0.5rem;
                    font-weight: var(--sl-font-weight-medium);
                    font-family: var(--sl-font-sans);
                }
                .stat-value {
                    font-size: var(--sl-font-size-2x-large);
                    font-weight: var(--sl-font-weight-bold);
                    color: var(--sl-color-neutral-900);
                    font-family: var(--sl-font-sans);
                }
                
                /* Export dialog styles */
                .export-options {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    font-family: var(--sl-font-sans);
                }
                .export-section {
                    padding: 0.75rem 0;
                }
                .export-section-title {
                    font-weight: var(--sl-font-weight-semibold);
                    margin-bottom: 0.625rem;
                    color: var(--sl-color-neutral-700);
                    font-size: var(--sl-font-size-medium);
                    font-family: var(--sl-font-sans);
                }
                .export-rows-section {
                    display: flex;
                    flex-direction: column;
                    gap: 0.625rem;
                }
                .export-option-item {
                    margin: 0;
                }
                
                /* Dialog common styles */
                sl-dialog::part(title) {
                    font-family: var(--sl-font-sans);
                    flex-shrink: 0;
                }
                sl-dialog::part(body) {
                    font-family: var(--sl-font-sans);
                    overflow-y: auto;
                    overflow-x: hidden;
                    flex: 1 1 auto;
                    min-height: 0;
                }
                sl-dialog::part(panel) {
                    max-height: 90vh;
                    max-width: 90vw;
                    display: flex;
                    flex-direction: column;
                }
                sl-dialog::part(footer) {
                    display: flex;
                    justify-content: space-between;
                    flex-shrink: 0;
                }
            </style>
            <div class="ts-table-container">
                <ts-toolbar id="toolbar"></ts-toolbar>
                <div class="datatable-wrapper">
                    <ts-datatable id="datatable"></ts-datatable>
                </div>
                <ts-table-pager id="pager"></ts-table-pager>
            </div>
            
            <!-- Import error dialog -->
            <sl-dialog hoist id="import-error-dialog" label="Import nelze provést">
                <sl-alert open variant="danger">
                    <sl-icon slot="icon" name="exclamation-octagon" class="large-icon"></sl-icon>
                    Struktura souboru neodpovídá. Import nebude proveden.
                    <div id="import-missing-columns" class="import-missing-columns"></div>
                </sl-alert>
                <div slot="footer"></div>
                <sl-button slot="footer" variant="default" id="import-error-close-btn">Zavřít</sl-button>
            </sl-dialog>
            
            <!-- Import summary dialog -->
            <sl-dialog hoist id="import-summary-dialog" label="Výsledek importu">
                <div class="import-results">
                    <div class="import-stats">
                        <div class="stat-item">
                            <span class="stat-label">Přidáno:</span>
                            <span class="stat-value" id="import-added-count">0</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Upraveno:</span>
                            <span class="stat-value" id="import-updated-count">0</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Přeskočeno:</span>
                            <span class="stat-value" id="import-skipped-count">0</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Zamítnuto:</span>
                            <span class="stat-value" id="import-rejected-count">0</span>
                        </div>
                    </div>
                </div>
                <div id="import-footer-placeholder" slot="footer" style="display: none;"></div>
                <sl-button slot="footer" variant="default" id="import-rejected-save-btn">Exportovat zamítnuté řádky</sl-button>
                <sl-button slot="footer" variant="primary" id="import-summary-close-btn">OK</sl-button>
            </sl-dialog>
            
            <!-- Export dialog -->
            <sl-dialog hoist id="export-dialog" label="Export do Excelu">
                <div class="export-options">
                    <div id="export-rows-section" class="export-section export-rows-section">
                        <div class="export-section-title">Řádky</div>
                        <div id="export-rows-group"></div>
                    </div>
                    <div id="export-columns-section" class="export-section">
                        <div class="export-section-title">Sloupce</div>
                        <sl-radio-group id="export-columns-group"></sl-radio-group>
                    </div>
                </div>
                <sl-button slot="footer" variant="default" id="export-cancel-btn">Zrušit</sl-button>
                <sl-button slot="footer" variant="primary" id="export-confirm-btn">Exportovat</sl-button>
            </sl-dialog>
        `}static get observedAttributes(){return["table-data","column-definitions","show-create-button","show-import-button","show-export-button","show-column-selector","enable-sorting","enable-filtering","enable-column-resizing","enable-column-reordering","enable-selection","enable-row-menu","enable-clickable-rows","enable-clickable-columns","enable-pagination","single-item-actions","multiple-items-actions","visible-columns","unhideable-columns","unshowable-columns","columns-required-for-import","items-per-page","items-per-page-options","predefined-filters"]}attributeChangedCallback(e,t,i){if(t===i)return;const n=i!=="false"&&i!==null;switch(e){case"table-data":if(i)try{const s=JSON.parse(i);this.setData(s)}catch(s){console.error("Failed to parse table-data attribute:",s)}break;case"column-definitions":if(i)try{const s=JSON.parse(i);this.setColumnDefinitions(s)}catch(s){console.error("Failed to parse column-definitions attribute:",s)}break;case"show-create-button":this.showCreateButton=n,this.toolbar&&this.toolbar.setShowCreateButton(this.showCreateButton);break;case"show-import-button":this.showImportButton=n,this.toolbar&&this.toolbar.setShowImportButton(this.showImportButton);break;case"show-export-button":this.showExportButton=n,this.toolbar&&this.toolbar.setShowExportButton(this.showExportButton);break;case"show-column-selector":this.showColumnSelector=n,this.toolbar&&this.toolbar.setShowColumnSelector(this.showColumnSelector);break;case"enable-sorting":this.enableSorting=n,this.datatable&&this.datatable.setEnableSorting(this.enableSorting);break;case"enable-filtering":this.enableFiltering=n,this.datatable&&this.datatable.setEnableFiltering(this.enableFiltering);break;case"enable-column-resizing":this.enableColumnResizing=n,this.datatable&&this.datatable.setEnableColumnResizing(this.enableColumnResizing);break;case"enable-column-reordering":this.enableColumnReordering=n,this.datatable&&this.datatable.setEnableColumnReordering(this.enableColumnReordering);break;case"enable-selection":this.enableSelection=n,this.datatable&&this.datatable.setEnableSelection(this.enableSelection);break;case"enable-row-menu":this.enableRowMenu=n,this.datatable&&this.datatable.setEnableRowMenu(this.enableRowMenu);break;case"enable-clickable-rows":this.enableClickableRows=n,this.datatable&&this.datatable.setEnableClickableRows(this.enableClickableRows);break;case"enable-clickable-columns":this.enableClickableColumns=n,this.datatable&&this.datatable.setEnableClickableColumns(this.enableClickableColumns);break;case"enable-pagination":this.enablePagination=n,this.datatable&&this.datatable.setEnablePagination(this.enablePagination),this.pager&&(this.pager.style.display=this.enablePagination?"":"none");break;case"single-item-actions":i&&this.setSingleItemActions(i);break;case"multiple-items-actions":i&&this.setMultipleItemsActions(i);break;case"visible-columns":if(i)try{const s=i.startsWith("[")?JSON.parse(i):i.split(",").map(o=>o.trim());this.setvisibleColumns(s)}catch(s){console.error("Failed to parse visible-columns attribute:",s)}break;case"unhideable-columns":if(i)try{const s=i.startsWith("[")?JSON.parse(i):i.split(",").map(o=>o.trim());this.setUnhideableColumns(s)}catch(s){console.error("Failed to parse unhideable-columns attribute:",s)}break;case"unshowable-columns":if(i)try{const s=i.startsWith("[")?JSON.parse(i):i.split(",").map(o=>o.trim());this.setUnshowableColumns(s)}catch(s){console.error("Failed to parse unshowable-columns attribute:",s)}break;case"columns-required-for-import":if(i)try{const s=i.startsWith("[")?JSON.parse(i):i.split(",").map(o=>o.trim());this.setColumnsRequiredForImport(s)}catch(s){console.error("Failed to parse columns-required-for-import attribute:",s)}break;case"items-per-page":if(i){const s=parseInt(i,10);isNaN(s)||this.setItemsPerPage(s)}break;case"items-per-page-options":if(i)try{const s=i.startsWith("[")?JSON.parse(i):i.split(",").map(o=>{const l=parseInt(o.trim(),10);return isNaN(l)?-1:l});this.setItemsPerPageOptions(s)}catch(s){console.error("Failed to parse items-per-page-options attribute:",s)}break;case"predefined-filters":if(i)try{const s=JSON.parse(i);this.setPredefinedFilters(s)}catch(s){console.error("Failed to parse predefined-filters attribute:",s)}break}}connectedCallback(){this.datatable=this.querySelector("#datatable"),this.toolbar=this.querySelector("#toolbar"),this.pager=this.querySelector("#pager"),this.applyInitialAttributes(),this.setupEventListeners()}applyInitialAttributes(){this.constructor.observedAttributes.forEach(t=>{if(this.hasAttribute(t)){const i=this.getAttribute(t);this.attributeChangedCallback(t,null,i)}})}setupEventListeners(){!this.datatable||!this.toolbar||!this.pager||(this.datatable.addEventListener("pagination-changed",e=>{const{totalRecordsCount:t,filteredRecordsCount:i,pageSize:n,currentPage:s,pageSizes:o}=e.detail;this.pager.setAttribute("totalrecordscount",t),this.pager.setAttribute("filteredrecordscount",i),this.pager.setAttribute("pagesize",n),this.pager.setAttribute("currentpage",s),this.pager.setAttribute("pagesizes",JSON.stringify(o))}),this.datatable.addEventListener("selection-changed",e=>{const{selectedRowIds:t,selectedCount:i}=e.detail,n=t.map(s=>this.datatable.tableData.find(o=>String(o.id)===String(s))).filter(s=>s!==void 0);this.datatable.setSelectedRows(n),this.datatable.setSelectionCount(i),i>0?this.datatable.showSelectionMenu():this.datatable.hideSelectionMenu()}),this.datatable.addEventListener("filters-changed",e=>{const{columnFilters:t,hasActiveFilters:i}=e.detail;this.toolbar.setColumnFilters(t)}),this.datatable.addEventListener("column-order-changed",e=>{const{columnDefinitions:t}=e.detail;this.toolbar.setColumnDefinitions(t)}),this.addEventListener("unselect-all-rows",e=>{e.stopPropagation(),this.datatable.unselectAllRows()}),this.addEventListener("column-visibility-changed",e=>{e.stopPropagation();const{columnKey:t,visible:i}=e.detail;this.datatable.updateColumnVisibility(t,i)}),this.addEventListener("clear-filters",e=>{e.stopPropagation(),this.datatable.clearFilters()}),this.addEventListener("select-all-columns",e=>{e.stopPropagation(),this.columnDefinitions.forEach(t=>{this.unshowableColumns.includes(t.key)||this.datatable.updateColumnVisibility(t.key,!0)}),this.toolbar.refreshColumnMenu()}),this.addEventListener("clear-all-columns",e=>{e.stopPropagation(),this.columnDefinitions.forEach(t=>{this.unhideableColumns.includes(t.key)||this.datatable.updateColumnVisibility(t.key,!1)}),this.toolbar.refreshColumnMenu()}),this.addEventListener("page-changed",e=>{e.stopPropagation();const{page:t}=e.detail;this.datatable.goToPage(t)}),this.addEventListener("page-size-changed",e=>{e.stopPropagation();const{pageSize:t}=e.detail;this.datatable.changePageSize(t)}))}setData(e){this.tableData=e,this.datatable&&this.datatable.setData(e)}setColumnDefinitions(e){this.columnDefinitions=e,this.datatable&&this.datatable.setColumnDefinitions(e),this.toolbar&&this.toolbar.setColumnDefinitions(e)}setvisibleColumns(e){this.visibleColumns=e,this.datatable&&this.datatable.setvisibleColumns(e)}setUnhideableColumns(e){this.unhideableColumns=e,this.datatable&&this.datatable.setUnhideableColumns(e),this.toolbar&&this.toolbar.setUnhideableColumns(e)}setUnshowableColumns(e){this.unshowableColumns=e,this.datatable&&this.datatable.setUnshowableColumns(e),this.toolbar&&this.toolbar.setUnshowableColumns(e)}setColumnsRequiredForImport(e){this.columnsRequiredForImport=e,this.toolbar&&this.toolbar.setColumnsRequiredForImport(e)}setItemsPerPage(e){this.itemsPerPage=e,this.datatable&&(this.datatable.itemsPerPage=e)}setItemsPerPageOptions(e){this.itemsPerPageOptions=e,this.datatable&&(this.datatable.availablePageSizes=e)}setPredefinedFilters(e){this.predefinedFilters=e,this.datatable&&this.datatable.setPredefinedFilters(e)}setShowColumnSelector(e){this.showColumnSelector=e!==!1,this.toolbar&&(this.toolbar.setShowColumnSelector(this.showColumnSelector),this.updateToolbarVisibility())}setShowImportButton(e){this.showImportButton=e!==!1,this.toolbar&&(this.toolbar.setShowImportButton(this.showImportButton),this.updateToolbarVisibility())}setShowExportButton(e){this.showExportButton=e!==!1,this.toolbar&&(this.toolbar.setShowExportButton(this.showExportButton),this.updateToolbarVisibility())}setShowCreateButton(e){this.showCreateButton=e!==!1,this.toolbar&&(this.toolbar.setShowCreateButton(this.showCreateButton),this.updateToolbarVisibility())}updateToolbarVisibility(){if(!this.toolbar)return;!this.showColumnSelector&&!this.showImportButton&&!this.showExportButton&&!this.showCreateButton?this.toolbar.style.display="none":this.toolbar.style.display=""}setEnableSorting(e){this.enableSorting=e!==!1,this.datatable&&this.datatable.setEnableSorting(this.enableSorting)}setEnableFiltering(e){this.enableFiltering=e!==!1,this.datatable&&this.datatable.setEnableFiltering(this.enableFiltering)}setEnableColumnResizing(e){this.enableColumnResizing=e!==!1,this.datatable&&this.datatable.setEnableColumnResizing(this.enableColumnResizing)}setEnableColumnReordering(e){this.enableColumnReordering=e!==!1,this.datatable&&this.datatable.setEnableColumnReordering(this.enableColumnReordering)}setEnableSelection(e){this.enableSelection=e!==!1,this.datatable&&this.datatable.setEnableSelection(this.enableSelection)}setEnableRowMenu(e){this.enableRowMenu=e!==!1,this.datatable&&this.datatable.setEnableRowMenu(this.enableRowMenu)}setEnableClickableRows(e){this.enableClickableRows=e!==!1,this.datatable&&this.datatable.setEnableClickableRows(this.enableClickableRows)}setEnableClickableColumns(e){this.enableClickableColumns=e!==!1,this.datatable&&this.datatable.setEnableClickableColumns(this.enableClickableColumns)}setEnablePagination(e){this.enablePagination=e!==!1,this.datatable&&this.datatable.setEnablePagination(this.enablePagination),this.pager&&(this.pager.style.display=this.enablePagination?"":"none")}setSingleItemActions(e){if(this.singleItemActions=e,this.datatable){this.datatable.setMenuActions(e);const t=this.datatable.getSelectionMenu();t&&t.setAttribute("single-item-actions",e)}}setMultipleItemsActions(e){if(this.multipleItemsActions=e,this.datatable){this.datatable.setMultipleItemsActions(e);const t=this.datatable.getSelectionMenu();t&&t.setAttribute("multiple-items-actions",e)}}showImportResults(e){this.toolbar&&this.toolbar.showImportResults(e)}getAllRows(){return this.datatable?this.datatable.getAllRows():[]}updateExistingRow(e,t){this.datatable&&this.datatable.updateExistingRow(e,t)}addImportedRow(e){this.datatable&&this.datatable.addImportedRow(e)}run(){!this.datatable||!this.toolbar||(Object.keys(this.predefinedFilters).length>0&&this.datatable.setPredefinedFilters(this.predefinedFilters),this.datatable.initialize(),this.singleItemActions&&this.setSingleItemActions(this.singleItemActions),this.multipleItemsActions&&this.setMultipleItemsActions(this.multipleItemsActions),this.toolbar.setColumnFilters({}),this.toolbar.setShowColumnSelector(this.showColumnSelector),this.toolbar.setShowImportButton(this.showImportButton),this.toolbar.setShowExportButton(this.showExportButton),this.toolbar.setShowCreateButton(this.showCreateButton),this.toolbar.setExportData(()=>({tableData:this.datatable.getAllRows(),columnDefinitions:this.datatable.getColumnDefinitions(),selectedRowIds:this.datatable.selectedRowIds,columnFilters:this.datatable.getColumnFilters(),getVisibleColumns:()=>this.datatable.getVisibleColumns(),filteredData:this.datatable.getFilteredRows(),getSortedActiveData:()=>this.datatable.getFilteredRows(),getAllSortedRows:()=>this.datatable.getAllSortedRows()})),this.toolbar.setImportData(()=>({columnDefinitions:this.datatable.getColumnDefinitions()})))}}customElements.define("ts-table",M);const{action:S}=__STORYBOOK_MODULE_ACTIONS__,q={title:"TSWebUI/TSTABLE",parameters:{docs:{story:{inline:!1,iframeHeight:"600px"}}},render:m=>{const e=m.dark?"dark":"light";let t=E.replace(/\{\{theme\}\}/g,e);const i=/<ts-table([^>]*)>/;if(t.match(i)){const s=[`show-create-button="${m.showCreateButton}"`,`show-import-button="${m.showImportButton}"`,`show-export-button="${m.showExportButton}"`,`show-column-selector="${m.showColumnSelector}"`,`enable-sorting="${m.enableSorting}"`,`enable-filtering="${m.enableFiltering}"`,`predefined-filters='${m.predefinedFilters}'`,`enable-column-resizing="${m.enableColumnResizing}"`,`enable-column-reordering="${m.enableColumnReordering}"`,`enable-selection="${m.enableSelection}"`,`enable-row-menu="${m.enableRowMenu}"`,`enable-clickable-rows="${m.enableClickableRows}"`,`enable-clickable-columns="${m.enableClickableColumns}"`,`enable-pagination="${m.enablePagination}"`,`single-item-actions="${m.singleItemActions}"`,`multiple-items-actions="${m.multipleItemsActions}"`,`visible-columns="${m.visibleColumns}"`,`unhideable-columns="${m.unhideableColumns}"`,`unshowable-columns="${m.unshowableColumns}"`,`columns-required-for-import="${m.columnsRequiredForImport}"`,`items-per-page="${m.itemsPerPage}"`,`items-per-page-options="${m.itemsPerPageOptions}"`].join(" ");t=t.replace(i,`<ts-table id="table" ${s}>`)}return setTimeout(()=>{const s=document.getElementById("table");if(s)for(const o of["create-new-record","selection-action-activated","row-clicked","do-import"])s.removeEventListener(o,S(o)),s.addEventListener(o,l=>{S(o)(l.detail)})},0),t},argTypes:{dark:{control:"boolean",description:"Dark theme mode"},showCreateButton:{control:"boolean",description:"Show create button in toolbar"},showImportButton:{control:"boolean",description:"Show import button in toolbar"},showExportButton:{control:"boolean",description:"Show export button in toolbar"},showColumnSelector:{control:"boolean",description:"Show column selector in toolbar"},enableSorting:{control:"boolean",description:"Enable column sorting"},enableFiltering:{control:"boolean",description:"Enable column filtering"},predefinedFilters:{control:"text",description:"Predefined filters (JSON object, cannot be cleared by user)"},enableColumnResizing:{control:"boolean",description:"Enable column resizing"},enableColumnReordering:{control:"boolean",description:"Enable column reordering"},enableSelection:{control:"boolean",description:"Enable row selection"},enableRowMenu:{control:"boolean",description:"Enable row menu"},enableClickableRows:{control:"boolean",description:"Enable clickable rows"},enableClickableColumns:{control:"boolean",description:"Enable clickable columns"},enablePagination:{control:"boolean",description:"Enable pagination"},singleItemActions:{control:"text",description:"Single item actions (format: action/Label,action2/Label2)"},multipleItemsActions:{control:"text",description:"Multiple items actions (format: action/Label,action2/Label2)"},visibleColumns:{control:"text",description:"visible columns (comma-separated keys)"},unhideableColumns:{control:"text",description:"Unhideable columns (comma-separated keys)"},unshowableColumns:{control:"text",description:"Unshowable columns (comma-separated keys)"},columnsRequiredForImport:{control:"text",description:"Columns required for import (comma-separated keys)"},itemsPerPage:{control:"number",description:"Items per page"},itemsPerPageOptions:{control:"text",description:"Items per page options (comma-separated numbers, -1 for all)"}}},C={args:{dark:!1,showCreateButton:!0,showImportButton:!0,showExportButton:!0,showColumnSelector:!0,enableSorting:!0,enableFiltering:!0,predefinedFilters:'{"approved": "true"}',enableColumnResizing:!0,enableColumnReordering:!0,enableSelection:!0,enableRowMenu:!0,enableClickableRows:!0,enableClickableColumns:!0,enablePagination:!0,singleItemActions:"edit/Upravit,duplicate/Duplikovat,delete/Smazat,view_details/Zobrazit detaily,export/Exportovat řádek",multipleItemsActions:"delete/Smazat vybrané,export/Exportovat vybrané",visibleColumns:"name,email,turnover,contractDate,approved",unhideableColumns:"name,email",unshowableColumns:"id",columnsRequiredForImport:"id,name,email",itemsPerPage:5,itemsPerPageOptions:"3,5,10,20,50,-1"}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    dark: false,
    showCreateButton: true,
    showImportButton: true,
    showExportButton: true,
    showColumnSelector: true,
    enableSorting: true,
    enableFiltering: true,
    predefinedFilters: \`{"approved": "true"}\`,
    enableColumnResizing: true,
    enableColumnReordering: true,
    enableSelection: true,
    enableRowMenu: true,
    enableClickableRows: true,
    enableClickableColumns: true,
    enablePagination: true,
    singleItemActions: 'edit/Upravit,duplicate/Duplikovat,delete/Smazat,view_details/Zobrazit detaily,export/Exportovat řádek',
    multipleItemsActions: 'delete/Smazat vybrané,export/Exportovat vybrané',
    visibleColumns: 'name,email,turnover,contractDate,approved',
    unhideableColumns: 'name,email',
    unshowableColumns: 'id',
    columnsRequiredForImport: 'id,name,email',
    itemsPerPage: 5,
    itemsPerPageOptions: '3,5,10,20,50,-1'
  }
}`,...C.parameters?.docs?.source}}};const T=["DEFAULT"];export{C as DEFAULT,T as __namedExportsOrder,q as default};
