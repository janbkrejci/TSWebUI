# TSWebUI Project Context

## Project Overview
**TSWebUI** is a library of custom web components (Web Components) designed for declarative UI construction. It provides powerful, configuration-driven components that can be easily integrated into any web application.

## Key Components (Packages)

The core components are located in `packages/`:

### 1. `ts-form`
A comprehensive form component that generates dynamic forms based on JSON configuration.
*   **Source:** `packages/ts-form`
*   **Key Features:**
    *   **Layout:** Supports Tabs or Single page layouts via JSON.
    *   **Fields:** Extensive field types including `text`, `number`, `date`, `combobox`, `relationship` (complex entity picker), `file`, `table` (nested), etc.
    *   **Validation:** Supports required fields and external error injection.
    *   **Events:** `form-submit`, `form-changed`, `form-field-action`.
    *   **Data:** Import/Export functionality (JSON).
*   **Documentation:** See `ts-form-readme.md` for detailed JSON schema and API.

### 2. `ts-table`
A feature-rich data table component.
*   **Source:** `packages/ts-table`
*   **Key Features:**
    *   **Data Handling:** Sorting, filtering, pagination (`ts-table-pager`).
    *   **Columns:** Resizable, reorderable, hideable columns (`ts-column-selector`).
    *   **Actions:** Selection, row menus, export/import buttons.
    *   **Configuration:** `columnDefinitions`, `itemsPerPage`, `visibleColumns`.

### 3. `ts-window`
A draggable and resizable window component using Shadow DOM.
*   **Source:** `packages/ts-window`
*   **State:** Manages minimized/maximized states, position (top/left), and dimensions.

### 4. `ts-form-editor`
A React-based visual editor for creating `ts-form` configurations.
*   **Source:** `packages/ts-form-editor`
*   **Tech Stack:** React, Vite, Tailwind CSS, Radix UI, dnd-kit, Zustand.
*   **Purpose:** Allows users to drag-and-drop fields to generate the JSON required for `ts-form`.

## Development & Build

### Root Scripts (`package.json`)
*   **`npm run bundle`**: Builds the core components using Vite (`vite.bundle.config.js`).
*   **`npm run build:editor`**: Installs dependencies and builds the React-based Form Editor.
*   **`npm run storybook`**: Starts Storybook for component development and documentation (port 3000).
*   **`npm run build-storybook`**: Builds the Storybook static site to `docs/`.

### Directory Structure
*   `packages/`: Source code for all components.
*   `storybook/`: Storybook stories (`.stories.js`) and documentation (`.mdx`).
*   `docs/`: Generated static files (Storybook build).
*   `dist/`: Output directory for bundled libraries.

## Coding Conventions

*   **Web Components:** Core UI elements are built as standard HTMLElement extensions.
*   **Styling:** Components rely on **Shoelace Design System** CSS variables (e.g., `--sl-color-primary-*`) for theming.
*   **Module System:** ES Modules (`type: "module"`).
*   **Bundling:** Vite is used for both the library bundle and the React editor application.

## Quick Reference
*   **Form Attributes:** `layout` (structure), `fields` (definitions), `buttons` (actions), `values` (data).
*   **Table Attributes:** `tableData`, `columnDefinitions`.
*   **Event Handling:** Use standard `addEventListener` for custom events like `form-submit` or `form-changed`.
