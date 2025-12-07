/** @type { import('@storybook/html-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['TSWebUI', ['Introduction', 'TSWindow', 'TSTable', 'TSForm']],
      },
    },
  },
};

export default preview;