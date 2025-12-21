export type FieldType =
    | 'text' | 'number' | 'email' | 'password' | 'textarea'
    | 'select' | 'multiselect' | 'combobox' | 'radio' | 'checkbox' | 'switch'
    | 'date' | 'datetime'
    | 'file' | 'image'
    | 'relationship'
    | 'button' | 'infobox' | 'markdown' | 'table';

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
    // Specific to number
    min?: number;
    max?: number;
    step?: number;
    roundTo?: number;
    // Specific to select/radio
    options?: Array<{ value: string; label: string }>;
    // Specific to relationships
    targetEntity?: string;
    // Specific to table
    columns?: any[];
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
