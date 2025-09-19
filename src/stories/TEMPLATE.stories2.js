import { fn } from 'storybook/test';
import template from './TEMPLATE.html?raw';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
export default {
  title: 'TSWebUI/TEMPLATE',
  tags: ['autodocs'],
  render: ({ label, ...args }) => {
    const theme = args.dark ? 'dark' : 'light';
    return template.replace(/\{\{label\}\}/g, label)
                   .replace(/\{\{theme\}\}/g, theme)
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
export const DARK = {
  args: {
    dark: true,
    label: "DARK",
  },
};

export const LIGHT = {
  args: {
    dark: false,
    label: "LIGHT",
  },
};
