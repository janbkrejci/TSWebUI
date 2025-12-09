

/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
  "stories": [
    "../storybook/**/*.mdx",
    "../storybook/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-docs"
  ],
  "framework": {
    "name": "@storybook/html-vite",
    "options": {}
  },
  "staticDirs": [
    { from: '../dist', to: '/dist' }
  ]
};
export default config;