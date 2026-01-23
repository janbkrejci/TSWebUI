export type FieldType = 
  | 'text' 
  | 'textarea' 
  | 'password' 
  | 'number' 
  | 'slider' 
  | 'select' 
  | 'multiselect' 
  | 'combobox' 
  | 'radio' 
  | 'checkbox' 
  | 'switch' 
  | 'date' 
  | 'datetime' 
  | 'file' 
  | 'image' 
  | 'button' 
  | 'separator' 
  | 'empty'
  | 'table' // nested
  | 'relationship'

export interface TsFieldOptions {
    label: string
    value: any
}

export interface TsFieldDef {
    type: FieldType
    label?: string
    required?: boolean
    hidden?: boolean
    disabled?: boolean
    readonly?: boolean
    placeholder?: string
    hint?: string
    
    // Number specific
    min?: number
    max?: number
    step?: number
    
    // Select/Radio specific
    options?: TsFieldOptions[] | string[]
    
    // Textarea
    rows?: number
    
    // File
    accept?: string
    multiple?: boolean
    
    // Relationship
    targetEntity?: string
    
    // Custom width in grid (overrides layout width if needed, though layout usually handles it)
}

export interface TsFormRowItem {
    field: string // Key referencing fields object, or special type like 'empty'
    width?: string // CSS grid width (e.g. '1fr', '200px')
    type?: 'empty' | 'separator'
    label?: string // For separator
    align?: 'left' | 'center' | 'right'
}

export type TsFormRow = TsFormRowItem[]

export interface TsFormTab {
    label: string
    rows: TsFormRow[]
}

export interface TsFormLayout {
    tabs?: TsFormTab[]
    rows?: TsFormRow[]
}

export interface TsFormButton {
    action: string
    label: string
    variant?: 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link' | 'default'
    type?: 'submit' | 'button' | 'reset'
    icon?: string
}
