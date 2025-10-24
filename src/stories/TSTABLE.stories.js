import { fn } from 'storybook/test';
import template from './TSTABLE.html?raw';
import './ts-table.js';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'TSWebUI/TSTABLE',
  tags: ['autodocs'],
  render: (args) => {
    const theme = args.dark ? 'dark' : 'light';
    let html = template.replace(/\{\{theme\}\}/g, theme);
    
    // Replace attributes in the ts-table element
    // Find the ts-table element and replace its attributes
    const tableRegex = /<ts-table([^>]*)>/;
    const match = html.match(tableRegex);
    
    if (match) {
      const attributes = [
        `show-create-button="${args.showCreateButton}"`,
        `show-import-button="${args.showImportButton}"`,
        `show-export-button="${args.showExportButton}"`,
        `show-column-selector="${args.showColumnSelector}"`,
        `enable-sorting="${args.enableSorting}"`,
        `enable-filtering="${args.enableFiltering}"`,
        `enable-column-resizing="${args.enableColumnResizing}"`,
        `enable-column-reordering="${args.enableColumnReordering}"`,
        `enable-selection="${args.enableSelection}"`,
        `enable-row-menu="${args.enableRowMenu}"`,
        `enable-clickable-rows="${args.enableClickableRows}"`,
        `enable-clickable-columns="${args.enableClickableColumns}"`,
        `enable-pagination="${args.enablePagination}"`,
        `single-item-actions="${args.singleItemActions}"`,
        `multiple-items-actions="${args.multipleItemsActions}"`,
        `preselected-columns="${args.preselectedColumns}"`,
        `unhideable-columns="${args.unhideableColumns}"`,
        `unshowable-columns="${args.unshowableColumns}"`,
        `columns-required-for-import="${args.columnsRequiredForImport}"`,
        `items-per-page="${args.itemsPerPage}"`,
        `items-per-page-options="${args.itemsPerPageOptions}"`,
      ].join(' ');
      
      html = html.replace(tableRegex, `<ts-table ${attributes}>`);
    }
    
    return html;
  },
  argTypes: {
    dark: { 
      control: 'boolean',
      description: 'Dark theme mode'
    },
    showCreateButton: { 
      control: 'boolean',
      description: 'Show create button in toolbar'
    },
    showImportButton: { 
      control: 'boolean',
      description: 'Show import button in toolbar'
    },
    showExportButton: { 
      control: 'boolean',
      description: 'Show export button in toolbar'
    },
    showColumnSelector: { 
      control: 'boolean',
      description: 'Show column selector in toolbar'
    },
    enableSorting: { 
      control: 'boolean',
      description: 'Enable column sorting'
    },
    enableFiltering: { 
      control: 'boolean',
      description: 'Enable column filtering'
    },
    enableColumnResizing: { 
      control: 'boolean',
      description: 'Enable column resizing'
    },
    enableColumnReordering: { 
      control: 'boolean',
      description: 'Enable column reordering'
    },
    enableSelection: { 
      control: 'boolean',
      description: 'Enable row selection'
    },
    enableRowMenu: { 
      control: 'boolean',
      description: 'Enable row menu'
    },
    enableClickableRows: { 
      control: 'boolean',
      description: 'Enable clickable rows'
    },
    enableClickableColumns: { 
      control: 'boolean',
      description: 'Enable clickable columns'
    },
    enablePagination: { 
      control: 'boolean',
      description: 'Enable pagination'
    },
    singleItemActions: { 
      control: 'text',
      description: 'Single item actions (format: action/Label,action2/Label2)'
    },
    multipleItemsActions: { 
      control: 'text',
      description: 'Multiple items actions (format: action/Label,action2/Label2)'
    },
    preselectedColumns: { 
      control: 'text',
      description: 'Preselected columns (comma-separated keys)'
    },
    unhideableColumns: { 
      control: 'text',
      description: 'Unhideable columns (comma-separated keys)'
    },
    unshowableColumns: { 
      control: 'text',
      description: 'Unshowable columns (comma-separated keys)'
    },
    columnsRequiredForImport: { 
      control: 'text',
      description: 'Columns required for import (comma-separated keys)'
    },
    itemsPerPage: { 
      control: 'number',
      description: 'Items per page'
    },
    itemsPerPageOptions: { 
      control: 'text',
      description: 'Items per page options (comma-separated numbers, -1 for all)'
    },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const DEFAULT = {
  args: {
    dark: false,
    showCreateButton: true,
    showImportButton: true,
    showExportButton: true,
    showColumnSelector: true,
    enableSorting: true,
    enableFiltering: true,
    enableColumnResizing: true,
    enableColumnReordering: true,
    enableSelection: true,
    enableRowMenu: true,
    enableClickableRows: true,
    enableClickableColumns: true,
    enablePagination: true,
    singleItemActions: 'edit/Upravit,duplicate/Duplikovat,delete/Smazat,view_details/Zobrazit detaily,export/Exportovat řádek',
    multipleItemsActions: 'delete/Smazat vybrané,export/Exportovat vybrané',
    preselectedColumns: 'name,email,turnover,contractDate,approved',
    unhideableColumns: 'name,email',
    unshowableColumns: 'id',
    columnsRequiredForImport: 'id,name,email',
    itemsPerPage: 5,
    itemsPerPageOptions: '3,5,10,20,50,-1',
  },
};

export const MinimalFeatures = {
  args: {
    dark: false,
    showCreateButton: false,
    showImportButton: false,
    showExportButton: false,
    showColumnSelector: false,
    enableSorting: false,
    enableFiltering: false,
    enableColumnResizing: false,
    enableColumnReordering: false,
    enableSelection: false,
    enableRowMenu: false,
    enableClickableRows: false,
    enableClickableColumns: false,
    enablePagination: false,
    singleItemActions: '',
    multipleItemsActions: '',
    preselectedColumns: 'name,email,turnover,contractDate,approved',
    unhideableColumns: '',
    unshowableColumns: 'id',
    columnsRequiredForImport: '',
    itemsPerPage: 5,
    itemsPerPageOptions: '5,10,20',
  },
};

export const ReadOnlyTable = {
  args: {
    dark: false,
    showCreateButton: false,
    showImportButton: false,
    showExportButton: false,
    showColumnSelector: true,
    enableSorting: true,
    enableFiltering: true,
    enableColumnResizing: true,
    enableColumnReordering: false,
    enableSelection: false,
    enableRowMenu: false,
    enableClickableRows: true,
    enableClickableColumns: false,
    enablePagination: true,
    singleItemActions: '',
    multipleItemsActions: '',
    preselectedColumns: 'name,email,turnover,contractDate,approved',
    unhideableColumns: 'name',
    unshowableColumns: 'id',
    columnsRequiredForImport: '',
    itemsPerPage: 10,
    itemsPerPageOptions: '5,10,20,50,-1',
  },
};