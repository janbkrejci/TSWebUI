import { fn } from 'storybook/test';
import template from './DATATABLE.html?raw';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'TSWebUI/DATATABLE',
  tags: ['autodocs'],
  render: ({ label, selectedColumns, ...args }) => {
    const theme = args.dark ? 'dark' : 'light';
    const selectedCols = selectedColumns || ['Name', 'Username', 'Email']; // Default selected columns
    return template.replace(/\{\{label\}\}/g, label)
                   .replace(/\{\{theme\}\}/g, theme)
                   .replace(/\{\{selectedColumns\}\}/g, JSON.stringify(selectedCols))
                   .replace(/\{\{args\}\}/g, JSON.stringify(args, null, 2))
                   .replace(/\{\{variant\}\}/g, args.variant ? `variant="${args.variant}"` : '');
  },
  argTypes: {
    //backgroundColor: { control: 'color' },
    label: { control: 'text' },
    dark: { control: 'boolean' },
    variant: {
      control: { type: 'select' },
      options: ['', 'primary', 'success', 'warning', 'danger', 'neutral', ],
    },
    selectedColumns: {
      control: { type: 'multi-select' },
      options: ['ID', 'Name', 'Username', 'Email', 'City', 'Phone', 'Website', 'Company'],
      description: 'Columns to show by default in the column chooser',
    },
    // bgintensity: {
    //   control: { type: 'select' },
    //   options: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
    // },
    // fgcolor: {
    //   control: { type: 'select' },
    //   options: ['primary', 'success', 'warning', 'danger', 'neutral', ],
    // },
    // fgintensity: {
    //   control: { type: 'select' },
    //   options: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'],
    // },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  //args: { onClick: fn() },
  play: async ({ selectedColumns }) => {
    // Wait for the component to be ready
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Update the component with the selected columns
    if (window.updateDataTableColumns) {
      window.updateDataTableColumns(selectedColumns || ['Name', 'Username', 'Email']);
    }
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const DARK = {
  args: {
    dark: true,
    label: "DARK",
    selectedColumns: ['Name', 'Username', 'Email'],
  },
};

export const LIGHT = {
  args: {
    dark: false,
    label: "LIGHT",
    selectedColumns: ['Name', 'Username', 'Email'],
  },
};

export const MINIMAL = {
  args: {
    dark: false,
    label: "MINIMAL",
    selectedColumns: ['Name', 'Email'],
  },
};

export const FULL = {
  args: {
    dark: false,
    label: "FULL",
    selectedColumns: ['ID', 'Name', 'Username', 'Email', 'City', 'Phone', 'Website', 'Company'],
  },
};

export const CONTACT_INFO = {
  args: {
    dark: false,
    label: "CONTACT INFO",
    selectedColumns: ['Name', 'Email', 'Phone', 'City'],
  },
};
