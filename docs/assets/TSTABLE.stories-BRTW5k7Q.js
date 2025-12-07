import"./ts-table-BYRwQNre.js";const c=`<style>
    /* :not(:defined) {
        visibility: hidden;
    } */

    .base-container {
        background-color: var(--sl-color-neutral-0);
        color: var(--sl-color-neutral-1000);
        font-family: var(--sl-font-sans);
        /* padding: 0.5em;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0; */
    }
</style>
<div class="sl-theme-{{theme}} base-container main-container">
    <ts-table id="table"></ts-table>


    <script>
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
                const { data } = event.detail;
                console.log('Import received:', data.length);

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
                        // table.updateExistingRow(data.id, data);
                        updated++;
                        processedRows.push({ ...data, __importAction: 'updated' });
                    } else {
                        // table.addImportedRow(data);
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
</div>`,{action:a}=__STORYBOOK_MODULE_ACTIONS__,u={title:"TSWebUI/TSTable",parameters:{docs:{story:{inline:!1,iframeHeight:"600px"}}},render:e=>{const r=e.dark?"dark":"light";let t=c.replace(/\{\{theme\}\}/g,r);const i=/<ts-table([^>]*)>/;if(t.match(i)){const n=[`show-create-button="${e.showCreateButton}"`,`show-import-button="${e.showImportButton}"`,`show-export-button="${e.showExportButton}"`,`show-column-selector="${e.showColumnSelector}"`,`enable-sorting="${e.enableSorting}"`,`enable-filtering="${e.enableFiltering}"`,`predefined-filters='${e.predefinedFilters}'`,`enable-column-resizing="${e.enableColumnResizing}"`,`enable-column-reordering="${e.enableColumnReordering}"`,`enable-selection="${e.enableSelection}"`,`enable-row-menu="${e.enableRowMenu}"`,`enable-clickable-rows="${e.enableClickableRows}"`,`enable-clickable-columns="${e.enableClickableColumns}"`,`enable-pagination="${e.enablePagination}"`,`single-item-actions="${e.singleItemActions}"`,`multiple-items-actions="${e.multipleItemsActions}"`,`visible-columns="${e.visibleColumns}"`,`unhideable-columns="${e.unhideableColumns}"`,`unshowable-columns="${e.unshowableColumns}"`,`columns-required-for-import="${e.columnsRequiredForImport}"`,`items-per-page="${e.itemsPerPage}"`,`items-per-page-options="${e.itemsPerPageOptions}"`].join(" ");t=t.replace(i,`<ts-table id="table" ${n}>`)}return setTimeout(()=>{const n=document.getElementById("table");if(n){customElements.whenDefined("ts-table").then(()=>{n.run()});for(const o of["create-new-record","selection-action-activated","row-clicked","do-import"])n.removeEventListener(o,a(o)),n.addEventListener(o,s=>{a(o)(s.detail)})}},0),t},argTypes:{dark:{control:"boolean",description:"Dark theme mode"},showCreateButton:{control:"boolean",description:"Show create button in toolbar"},showImportButton:{control:"boolean",description:"Show import button in toolbar"},showExportButton:{control:"boolean",description:"Show export button in toolbar"},showColumnSelector:{control:"boolean",description:"Show column selector in toolbar"},enableSorting:{control:"boolean",description:"Enable column sorting"},enableFiltering:{control:"boolean",description:"Enable column filtering"},predefinedFilters:{control:"text",description:"Predefined filters (JSON object, cannot be cleared by user)"},enableColumnResizing:{control:"boolean",description:"Enable column resizing"},enableColumnReordering:{control:"boolean",description:"Enable column reordering"},enableSelection:{control:"boolean",description:"Enable row selection"},enableRowMenu:{control:"boolean",description:"Enable row menu"},enableClickableRows:{control:"boolean",description:"Enable clickable rows"},enableClickableColumns:{control:"boolean",description:"Enable clickable columns"},enablePagination:{control:"boolean",description:"Enable pagination"},singleItemActions:{control:"text",description:"Single item actions (format: action/Label,action2/Label2)"},multipleItemsActions:{control:"text",description:"Multiple items actions (format: action/Label,action2/Label2)"},visibleColumns:{control:"text",description:"visible columns (comma-separated keys)"},unhideableColumns:{control:"text",description:"Unhideable columns (comma-separated keys)"},unshowableColumns:{control:"text",description:"Unshowable columns (comma-separated keys)"},columnsRequiredForImport:{control:"text",description:"Columns required for import (comma-separated keys)"},itemsPerPage:{control:"number",description:"Items per page"},itemsPerPageOptions:{control:"text",description:"Items per page options (comma-separated numbers, -1 for all)"}}},l={args:{dark:!1,showCreateButton:!0,showImportButton:!0,showExportButton:!0,showColumnSelector:!0,enableSorting:!0,enableFiltering:!0,predefinedFilters:'{"approved": "true"}',enableColumnResizing:!0,enableColumnReordering:!0,enableSelection:!0,enableRowMenu:!0,enableClickableRows:!0,enableClickableColumns:!0,enablePagination:!0,singleItemActions:"edit/Upravit,duplicate/Duplikovat,delete/Smazat,view_details/Zobrazit detaily,export/Exportovat řádek",multipleItemsActions:"delete/Smazat vybrané,export/Exportovat vybrané",visibleColumns:"name,email,turnover,contractDate,approved",unhideableColumns:"name,email",unshowableColumns:"id",columnsRequiredForImport:"id,name,email",itemsPerPage:5,itemsPerPageOptions:"3,5,10,20,50,-1"}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}};const b=["DEFAULT"];export{l as DEFAULT,b as __namedExportsOrder,u as default};
