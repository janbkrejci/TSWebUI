# TSWebUI Project Context

## Project Overview
**TSWebUI** is a library of custom web components (Web Components) designed for declarative UI construction. It provides powerful, configuration-driven components that can be easily integrated into any web application by passing JSON configurations.

### Key Components (Packages)
The project is structured as a monorepo with core components located in `packages/`:

1.  **`ts-form`**: A comprehensive form component that generates dynamic forms based on JSON configuration.
    *   **Features**: Supports Tabs or Single page layouts, extensive field types (`text`, `number`, `relationship`, `table`, etc.), validation, and external error injection.
    *   **Events**: `form-submit`, `form-changed`, `form-field-action`.
2.  **`ts-table`**: A feature-rich data table component.
    *   **Features**: Sorting, filtering, pagination, resizable columns, and nested action buttons (export/import).
3.  **`ts-window`**: A draggable and resizable window component using Shadow DOM.
4.  **`ts-form-editor`**: A React-based visual editor (Vite-powered) for creating `ts-form` configurations.

## Building and Running

### Root Scripts (`package.json`)
*   **`npm run bundle`**: Builds the core library bundles (`index.js`, `ts-form-bundle.js`, etc.) into the `dist/` directory using Vite.
*   **`npm run storybook`**: Starts Storybook for component development and documentation on port 3000.
*   **`npm run build:editor`**: Builds the React-based Form Editor located in `packages/ts-form-editor`.
*   **`npm run build:storybook`**: Builds the static Storybook documentation to the `docs/` directory.

### Directory Structure
*   `packages/`: Source code for all web components and the React editor.
*   `storybook/`: Storybook stories and documentation (`.mdx`).
*   `docs/`: Static site for documentation (Storybook output).
*   `dist/`: Bundled library files for production use.
*   `public/`: Static assets.

## Development Conventions

*   **Web Components**: Core UI elements are built as standard `HTMLElement` extensions. They use `observedAttributes` for reactivity and `attributeChangedCallback` to trigger renders.
*   **Styling**: Components rely on **Shoelace Design System** CSS variables (e.g., `--sl-color-primary-*`) for theming and layout.
*   **JSON-Driven**: UI structure and behavior are primarily defined through complex JSON objects (layout, fields, columns).
*   **Event Handling**: Communication between components and the host application is done via standard Custom Events.
*   **Module System**: The project uses ES Modules (`type: "module"`).
*   **Bundling**: Vite is used for both library bundling and application builds.

## Key Files
*   `package.json`: Root configuration and build scripts.
*   `vite.bundle.config.js`: Configuration for generating the library bundles.
*   `ts-form-readme.md`: Detailed technical documentation for the `ts-form` JSON schema.
*   `packages/index.js`: Main entry point exporting all components.
