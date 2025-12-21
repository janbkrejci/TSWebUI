export type FieldType =
    | 'text' | 'number' | 'email' | 'password' | 'textarea'
    | 'select' | 'multiselect' | 'combobox' | 'radio' | 'checkbox' | 'switch'
    | 'date' | 'datetime'
    | 'file' | 'image'
    | 'relationship' | 'slider'
    | 'button' | 'button-group' | 'infobox' | 'markdown' | 'table';

export interface FormFieldConfig {
    type: FieldType;
    label: string;
    required?: boolean;
    hidden?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    hint?: string;
    placeholder?: string;
    width?: string;
    autofocus?: boolean;
    enterAction?: string;
    escapeAction?: string;

    // Textarea
    rows?: number;

    // Number / Slider
    min?: number;
    max?: number;
    step?: number;
    roundTo?: number;
    hideLabel?: boolean;

    // Select / Radio / ButtonGroup / Combobox / Relationship
    options?: Array<{ value: string; label: string }> | string[]; // ButtonGroup uses string[] format
    allowCustom?: boolean; // Combobox
    allowEmpty?: boolean; // Combobox

    // Relationship
    targetEntity?: string;
    mode?: 'single' | 'multiple';
    displayFields?: string[];
    chipDisplayFields?: string[];

    // File / Image
    multiple?: boolean;
    accept?: string;
    innerLabel?: string;

    // Button / ButtonGroup / Infobox
    variant?: string; // primary, default, neutral, danger, success, warning, process (for button-group)
    action?: string;

    // Infobox
    icon?: string;

    // Markdown / Infobox
    content?: string;
    value?: string; // value override

    // Table
    columns?: any[];
    data?: any[];
    showCreateButton?: boolean;
    enableSorting?: boolean;
    enableFiltering?: boolean;
    enablePagination?: boolean;
    singleItemActions?: any[];
    multipleItemsActions?: any[];

    // Any other prop
    [key: string]: any;
}

export interface FormColumn {
    id: string; // Unique ID for editor
    field?: string; // The data field name
    width?: string;
    align?: 'left' | 'center' | 'right';
    type?: 'empty' | 'separator' | 'field';
    label?: string; // For separator
}

export interface FormRow {
    id: string;
    columns: FormColumn[];
}

export interface FormTab {
    id: string;
    label: string;
    rows: FormRow[];
}

export interface FormLayout {
    mode?: 'tabs' | 'single';
    tabs?: FormTab[];
    rows?: FormRow[]; // If not using tabs
}

export interface EditorState {
    layout: FormLayout;
    fields: Record<string, FormFieldConfig>;
    selectedFieldId: string | null; // This corresponds to the field NAME in `fields` map, or an ID of the layout element? 
    // Ideally, selection should pinpoint a slot in the layout OR a field definition.
    // In ts-form, layout refers to field NAMES. 
    // So selecting a box in layout selects the field name x.

    // However, we might have empty cells or separators which are not in `fields`.
    // So selectedId might be the ID of the FormColumn.
}
