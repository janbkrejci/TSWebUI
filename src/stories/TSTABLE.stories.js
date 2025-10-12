import { fn } from 'storybook/test';
import template from './TSTABLE.html?raw';
import './TSTABLE.css';
import '../ts-table.js';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'TSWebUI/TSTABLE',
  tags: ['autodocs'],
  render: (args) => {
    const theme = args.dark ? 'dark' : 'light';
    return template.replace(/\{\{theme\}\}/g, theme);
  },
  argTypes: {
    //backgroundColor: { control: 'color' },
    dark: { control: 'boolean' },
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
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
// export const DARK = {
//   args: {
//     dark: true,
//   },
// };

// export const LIGHT = {
//   args: {
//     dark: false,
//   },
// };
export const DEFAULT = {
  args: {
    dark: false,
  },
};