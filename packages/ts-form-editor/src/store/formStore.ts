import { create } from 'zustand';
import { EditorState, FormFieldConfig, FormColumn, FormRow } from '../types';


const generateId = () => Math.random().toString(36).substr(2, 9);

interface FormStore extends EditorState {
    // Actions
    addField: (item: { type: string, rowIndex?: number, colIndex?: number, tabIndex?: number }) => void;
    updateFieldConfig: (fieldName: string, config: Partial<FormFieldConfig>) => void;
    updateLayoutColumn: (tabIndex: number, rowIndex: number, colIndex: number, formattedCol: Partial<FormColumn>) => void;
    selectElement: (id: string | null, type: 'field' | 'separator' | 'empty' | 'tab' | null, fieldName?: string) => void;
    selectedElement: { id: string, type: 'field' | 'separator' | 'empty' | 'tab', fieldName?: string } | null;
    renameField: (oldName: string, newName: string) => void;

    // Layout manipulation
    moveField: (source: { tabIndex: number, rowIndex: number, colIndex: number }, dest: { tabIndex: number, rowIndex: number, colIndex: number }) => void;
    addTab: () => void;
    addRow: (tabIndex: number) => void;
    removeRow: (tabIndex: number, rowIndex: number) => void;
    addColumn: (tabIndex: number, rowIndex: number) => void;

    // Global properties
    buttons: any[];
    updateButtons: (buttons: any[]) => void;

    // Import/Export
    setFormDefinition: (definition: { layout: any, fields: any, buttons?: any[] }) => void;
    getFormDefinition: () => { layout: any, fields: any, buttons?: any[] };

    updateTab: (tabIndex: number, props: { label: string }) => void;
    removeTab: (tabIndex: number) => void;
    deleteSelectedElement: () => void;
    insertRow: (tabIndex: number, targetRowIndex: number, position: 'before' | 'after') => void;
    insertColumn: (tabIndex: number, rowIndex: number, targetColIndex: number, position: 'before' | 'after') => void;
}

export const useFormStore = create<FormStore>((set, get) => ({
    layout: {
        mode: 'tabs',
        tabs: [
            {
                id: generateId(),
                label: 'General',
                rows: [
                    {
                        id: generateId(),
                        columns: [
                            { id: generateId(), type: 'empty', field: '', width: '1fr' }
                        ]
                    }
                ]
            }
        ]
    },
    fields: {},
    buttons: [
        { action: 'cancel', label: 'Cancel', variant: 'default' },
        { action: 'submit', label: 'Submit', variant: 'primary' }
    ],
    selectedFieldId: null,
    selectedElement: null,

    updateButtons: (buttons) => set({ buttons }),

    renameField: (oldName, newName) => set((state) => {
        if (state.fields[newName]) {
            // Name collision or no change
            return state;
        }

        const newFields = { ...state.fields };
        newFields[newName] = newFields[oldName];
        delete newFields[oldName];

        const newLayout = JSON.parse(JSON.stringify(state.layout));

        // Helper to traverse
        const traverseColumns = (cols: FormColumn[]) => {
            cols.forEach(col => {
                if (col.field === oldName) {
                    col.field = newName;
                }
            });
        };

        if (newLayout.mode === 'single' || !newLayout.tabs) {
            newLayout.rows?.forEach((row: FormRow) => traverseColumns(row.columns));
        } else {
            newLayout.tabs?.forEach((tab: any) => {
                tab.rows.forEach((row: FormRow) => traverseColumns(row.columns));
            });
        }

        // Update selectedElement if needed
        let selectedElement = state.selectedElement;
        if (selectedElement && selectedElement.fieldName === oldName) {
            selectedElement = { ...selectedElement, fieldName: newName };
        }

        return { fields: newFields, layout: newLayout, selectedElement };
    }),

    addField: ({ type, rowIndex, colIndex, tabIndex }) => set((state) => {
        const fieldName = `field_${generateId()}`;
        const newFieldConfig: FormFieldConfig = {
            type: type as any,
            label: type === 'separator' ? 'Separator' : 'New Field',
        };

        const newFields = { ...state.fields };
        if (type !== 'separator') {
            newFields[fieldName] = newFieldConfig;
        }

        const newLayout = JSON.parse(JSON.stringify(state.layout));
        let rows: FormRow[] | undefined;

        if (state.layout.mode === 'single' || !state.layout.tabs) {
            rows = newLayout.rows;
        } else if (tabIndex !== undefined && newLayout.tabs) {
            rows = newLayout.tabs[tabIndex]?.rows;
        }

        if (rows && rowIndex !== undefined && colIndex !== undefined && rows[rowIndex]) {
            const cell = rows[rowIndex].columns[colIndex];
            cell.type = type === 'separator' ? 'separator' : 'field';
            cell.field = type === 'separator' ? undefined : fieldName;
            if (type === 'separator') cell.label = 'Separator';
        }

        return { fields: newFields, layout: newLayout };
    }),

    selectElement: (id, type, fieldName) => set({
        selectedElement: id ? { id, type: type as any, fieldName } : null
    }),

    updateTab: (tabIndex, props) => set((state) => {
        const newLayout = JSON.parse(JSON.stringify(state.layout));
        if (newLayout.tabs && newLayout.tabs[tabIndex]) {
            Object.assign(newLayout.tabs[tabIndex], props);
        }
        return { layout: newLayout };
    }),

    removeTab: (tabIndex) => set((state) => {
        const newLayout = JSON.parse(JSON.stringify(state.layout));
        if (newLayout.tabs) {
            newLayout.tabs.splice(tabIndex, 1);
            if (newLayout.tabs.length === 0) {
                // Switch to single mode if no tabs left
                newLayout.mode = 'single';
                newLayout.rows = [
                    {
                        id: generateId(),
                        columns: [{ id: generateId(), type: 'empty', field: '', width: '1fr' }]
                    }
                ];
                delete newLayout.tabs;
            }
        }
        return { layout: newLayout, selectedElement: null }; // Deselect upon removal
    }),

    updateFieldConfig: (fieldName, config) => set((state) => ({
        fields: {
            ...state.fields,
            [fieldName]: { ...state.fields[fieldName], ...config }
        }
    })),

    updateLayoutColumn: (tabIndex, rowIndex, colIndex, formattedCol) => set((state) => {
        const newLayout = JSON.parse(JSON.stringify(state.layout));

        let rows: FormRow[] | undefined;
        if (state.layout.mode === 'single' || !state.layout.tabs) {
            rows = newLayout.rows;
        } else if (tabIndex !== -1 && newLayout.tabs) {
            rows = newLayout.tabs[tabIndex]?.rows;
        }

        if (state.layout.mode === 'single') {
            rows = newLayout.rows;
        }

        if (rows && rows[rowIndex]) {
            const col = rows[rowIndex].columns[colIndex];
            Object.assign(col, formattedCol);
        }

        return { layout: newLayout };
    }),

    moveField: (source, target) => set((state) => {
        const newLayout = JSON.parse(JSON.stringify(state.layout));

        const getColumn = (loc: { tabIndex: number, rowIndex: number, colIndex: number }) => {
            if (newLayout.mode === 'single' || !newLayout.tabs) {
                return newLayout.rows?.[loc.rowIndex]?.columns?.[loc.colIndex];
            } else {
                return newLayout.tabs?.[loc.tabIndex]?.rows?.[loc.rowIndex]?.columns?.[loc.colIndex];
            }
        };

        const sourceCol = getColumn(source);
        const targetCol = getColumn(target);

        if (!sourceCol || !targetCol) return state;

        // Perform swap
        // We swap all relevant properties: field, type, label, width (maybe not width?)
        // Usually drag drop only moves content, not column width.
        // So we swap field, type, label.

        const sourceData = {
            field: sourceCol.field,
            type: sourceCol.type,
            label: sourceCol.label
        };

        const targetData = {
            field: targetCol.field,
            type: targetCol.type,
            label: targetCol.label
        };

        // Apply source data to target
        targetCol.field = sourceData.field;
        targetCol.type = sourceData.type;
        targetCol.label = sourceData.label;

        // Apply target data to source
        sourceCol.field = targetData.field;
        sourceCol.type = targetData.type;
        sourceCol.label = targetData.label;

        // normalization for 'empty'
        if (targetCol.type === 'empty') {
            targetCol.field = '';
            delete targetCol.label;
        }
        if (sourceCol.type === 'empty') {
            sourceCol.field = '';
            delete sourceCol.label;
        }

        return { layout: newLayout };
    }),

    addTab: () => set((state) => {
        const newLayout = JSON.parse(JSON.stringify(state.layout));

        // Convert single mode to tabs mode
        if (newLayout.mode === 'single') {
            newLayout.mode = 'tabs';
            newLayout.tabs = [
                {
                    id: generateId(),
                    label: 'Tab 1',
                    rows: newLayout.rows || []
                }
            ];
            delete newLayout.rows;
            return { layout: newLayout };
        }

        if (!newLayout.tabs) newLayout.tabs = [];
        newLayout.tabs.push({
            id: generateId(),
            label: `Tab ${newLayout.tabs.length + 1}`,
            rows: [{ id: generateId(), columns: [{ id: generateId(), type: 'empty', field: '', width: '1fr' }] }]
        });
        return { layout: newLayout };
    }),

    addRow: (tabIndex) => set((state) => {
        const newLayout = JSON.parse(JSON.stringify(state.layout));
        let rows: FormRow[] | undefined;

        if (state.layout.mode === 'single' || !state.layout.tabs) {
            if (!newLayout.rows) newLayout.rows = [];
            rows = newLayout.rows;
        } else {
            rows = newLayout.tabs[tabIndex]?.rows;
            if (!rows) {
                // Fallback for safety
                if (!newLayout.tabs[tabIndex]) return state;
                newLayout.tabs[tabIndex].rows = [];
                rows = newLayout.tabs[tabIndex].rows;
            }
        }

        if (rows) {
            rows.push({
                id: generateId(),
                columns: [
                    { id: generateId(), type: 'empty', field: '', width: '1fr' }
                ]
            });
        }
        return { layout: newLayout };
    }),

    removeRow: (tabIndex, rowIndex) => set((state) => {
        const newLayout = JSON.parse(JSON.stringify(state.layout));
        let rows: FormRow[] | undefined;
        if (state.layout.mode === 'single' || !state.layout.tabs) {
            rows = newLayout.rows;
        } else {
            rows = newLayout.tabs[tabIndex]?.rows;
        }

        if (rows) {
            rows.splice(rowIndex, 1);
        }
        return { layout: newLayout };
    }),

    addColumn: (tabIndex, rowIndex) => set((state) => {
        const newLayout = JSON.parse(JSON.stringify(state.layout));
        let rows: FormRow[] | undefined;
        if (state.layout.mode === 'single' || !state.layout.tabs) {
            rows = newLayout.rows;
        } else {
            rows = newLayout.tabs[tabIndex]?.rows;
        }

        if (rows && rows[rowIndex]) {
            rows[rowIndex].columns.push({
                id: generateId(),
                type: 'empty',
                field: '',
                width: '1fr'
            });
        }
        return { layout: newLayout };
    }),

    setFormDefinition: (def) => {
        let mode: 'tabs' | 'single' = 'tabs';
        let tabs: any[] = [];
        let rows: any[] = [];

        if (def.layout.tabs) {
            mode = 'tabs';
            tabs = def.layout.tabs.map((t: any) => ({
                ...t,
                id: t.id || generateId(),
                rows: t.rows.map((r: any) => ({
                    id: generateId(),
                    columns: r.map((c: any) => ({
                        ...c,
                        id: generateId(),
                        type: c.type || ((c.field || c.type === 'separator') ? (c.type || 'field') : 'empty')
                    }))
                }))
            }));
        } else if (def.layout.rows) {
            mode = 'single';
            rows = def.layout.rows.map((r: any) => ({
                id: generateId(),
                columns: r.map((c: any) => ({
                    ...c,
                    id: generateId(),
                    type: c.type || (c.field ? 'field' : (c.type === 'separator' ? 'separator' : 'empty'))
                }))
            }));
        }

        set({
            layout: { mode, tabs: mode === 'tabs' ? tabs : undefined, rows: mode === 'single' ? rows : undefined },
            fields: def.fields,
            buttons: def.buttons // Import buttons if present
        });
    },

    getFormDefinition: () => {
        const s = get();
        const layout: any = {};
        const usedFields = new Set<string>();

        const mapRows = (rows: FormRow[]) => {
            return rows.map(r => r.columns.map(c => {
                const col: any = { width: c.width || '1fr' };
                if (c.type === 'field' && c.field) {
                    col.field = c.field;
                    usedFields.add(c.field);
                }
                if (c.type === 'separator') {
                    col.type = 'separator';
                    col.label = c.label;
                }
                if (c.type === 'empty') col.type = 'empty';
                return col;
            }));
        };

        if ((!s.layout.mode || s.layout.mode === 'tabs') && s.layout.tabs) {
            layout.tabs = s.layout.tabs.map(t => ({
                label: t.label,
                rows: mapRows(t.rows)
            }));
        } else if (s.layout.rows) {
            layout.rows = mapRows(s.layout.rows);
        }

        // Filter fields to only include those used in the layout
        const filteredFields: any = {};
        usedFields.forEach(fieldKey => {
            if (s.fields[fieldKey]) {
                filteredFields[fieldKey] = s.fields[fieldKey];
            }
        });

        return { layout, fields: filteredFields, buttons: s.buttons };
    },

    deleteSelectedElement: () => set((state) => {
        const { selectedElement, layout } = state;
        if (!selectedElement) return state;

        // If it's a tab
        if (selectedElement.type === 'tab') {
            // Find tab index
            const tabs = layout.tabs || [];
            const idx = tabs.findIndex(t => t.id === selectedElement.id);
            if (idx !== -1) {
                // Use removeTab logic effectively
                const newLayout = JSON.parse(JSON.stringify(layout));
                if (newLayout.tabs) {
                    newLayout.tabs.splice(idx, 1);
                    if (newLayout.tabs.length === 0) {
                        newLayout.mode = 'single';
                        newLayout.rows = [
                            {
                                id: generateId(),
                                columns: [{ id: generateId(), type: 'empty', field: '', width: '1fr' }]
                            }
                        ];
                        delete newLayout.tabs;
                    }
                }
                return { layout: newLayout, selectedElement: null };
            }
            return state;
        }

        // If it's a column item (field, separator, empty)
        const newLayout = JSON.parse(JSON.stringify(layout));
        let found = false;

        const processRows = (rows: FormRow[] | undefined) => {
            if (!rows) return;
            for (let rIdx = 0; rIdx < rows.length; rIdx++) {
                const row = rows[rIdx];
                const cIdx = row.columns.findIndex(c => c.id === selectedElement.id);
                if (cIdx !== -1) {
                    // Found the column, remove it
                    row.columns.splice(cIdx, 1);
                    found = true;
                    // If row is empty, remove row
                    if (row.columns.length === 0) {
                        rows.splice(rIdx, 1);
                    }
                    return;
                }
            }
        };

        if (newLayout.mode === 'single' || !newLayout.tabs) {
            processRows(newLayout.rows);
        } else {
            newLayout.tabs?.forEach((tab: any) => processRows(tab.rows));
        }

        if (found) {
            return { layout: newLayout, selectedElement: null };
        }

        return state;
    }),

    insertRow: (tabIndex, targetRowIndex, position) => set((state) => {
        const newLayout = JSON.parse(JSON.stringify(state.layout));
        let rows: FormRow[] | undefined;

        if (state.layout.mode === 'single' || !state.layout.tabs) {
            if (!newLayout.rows) newLayout.rows = [];
            rows = newLayout.rows;
        } else {
            rows = newLayout.tabs[tabIndex]?.rows;
            if (!rows) {
                if (!newLayout.tabs[tabIndex]) return state;
                newLayout.tabs[tabIndex].rows = [];
                rows = newLayout.tabs[tabIndex].rows;
            }
        }

        if (rows) {
            const newRow: FormRow = {
                id: generateId(),
                columns: [{ id: generateId(), type: 'empty', field: '', width: '1fr' }]
            };

            const insertIdx = position === 'after' ? targetRowIndex + 1 : targetRowIndex;
            rows.splice(insertIdx, 0, newRow);
        }
        return { layout: newLayout };
    }),

    insertColumn: (tabIndex, rowIndex, targetColIndex, position) => set((state) => {
        const newLayout = JSON.parse(JSON.stringify(state.layout));
        let rows: FormRow[] | undefined;
        if (state.layout.mode === 'single' || !state.layout.tabs) {
            rows = newLayout.rows;
        } else {
            rows = newLayout.tabs[tabIndex]?.rows;
        }

        if (rows && rows[rowIndex]) {
            const newCol: FormColumn = {
                id: generateId(),
                type: 'empty',
                field: '',
                width: '1fr'
            };

            const insertIdx = position === 'after' ? targetColIndex + 1 : targetColIndex;
            rows[rowIndex].columns.splice(insertIdx, 0, newCol);
        }
        return { layout: newLayout };
    })
}));
