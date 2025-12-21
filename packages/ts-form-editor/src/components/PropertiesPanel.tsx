import React from 'react';
import { useFormStore } from '../store/formStore';
import { FormFieldConfig } from '../types';
import clsx from 'clsx';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/Select';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from './ui/AlertDialog';

// ...

// Sortable Button Item
function SortableButton({
    btn,
    index,
    updateButtons,
    buttons
}: {
    btn: any,
    index: number,
    updateButtons: (btns: any[]) => void,
    buttons: any[]
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: `btn-${index}`, data: { type: 'button-move', index } });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 'auto',
        position: isDragging ? 'relative' as const : undefined
    };

    return (
        <div ref={setNodeRef} style={style} className={clsx("p-3 bg-gray-50 rounded border border-gray-200 space-y-2 relative group", isDragging && "z-50 opacity-50")}>
            <div className="absolute left-2 top-2 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600" {...listeners} {...attributes}>
                <GripVertical size={16} />
            </div>

            <button
                onClick={() => {
                    const newBtns = [...buttons];
                    newBtns.splice(index, 1);
                    updateButtons(newBtns);
                }}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
                &times;
            </button>

            <div className="grid grid-cols-2 gap-2 pl-6">
                <div>
                    <label className="block text-xs font-medium text-gray-500">Label</label>
                    <input
                        type="text"
                        value={btn.label}
                        onChange={(e) => {
                            const newBtns = [...buttons];
                            newBtns[index].label = e.target.value;
                            updateButtons(newBtns);
                        }}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                    />
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-500">Action</label>
                    <input
                        type="text"
                        value={btn.action}
                        onChange={(e) => {
                            const newBtns = [...buttons];
                            newBtns[index].action = e.target.value;
                            updateButtons(newBtns);
                        }}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pl-6">
                <div>
                    <label className="block text-xs font-medium text-gray-500">Variant</label>
                    <select
                        value={btn.variant || 'default'}
                        onChange={(e) => {
                            const newBtns = [...buttons];
                            newBtns[index].variant = e.target.value;
                            updateButtons(newBtns);
                        }}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                    >
                        <option value="default">Default</option>
                        <option value="primary">Primary</option>
                        <option value="success">Success</option>
                        <option value="neutral">Neutral</option>
                        <option value="warning">Warning</option>
                        <option value="danger">Danger</option>
                        <option value="text">Text</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-medium text-gray-500">Position</label>
                    <select
                        value={btn.position || 'left'}
                        onChange={(e) => {
                            const newBtns = [...buttons];
                            newBtns[index].position = e.target.value;
                            updateButtons(newBtns);
                        }}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
                    >
                        <option value="left">Left</option>
                        <option value="right">Right</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default function PropertiesPanel() {
    const {
        selectedElement, fields, updateFieldConfig, updateLayoutColumn, layout,
        updateTab, removeTab, renameField, buttons, updateButtons
    } = useFormStore();

    // Global Settings (Buttons) - Show when no element is selected
    if (!selectedElement) {
        return (
            <div className="space-y-6">
                <h2 className="text-lg font-bold border-b pb-2">Form Properties</h2>

                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Buttons</h3>
                    <div className="space-y-3">
                        <SortableContext
                            items={buttons?.map((_, i) => `btn-${i}`) || []}
                            strategy={verticalListSortingStrategy}
                        >
                            {buttons?.map((btn, idx) => (
                                <SortableButton
                                    key={`btn-${idx}`} // Key must match ID used in useSortable
                                    btn={{ ...btn, id: `btn-${idx}` }}
                                    index={idx}
                                    updateButtons={updateButtons}
                                    buttons={buttons}
                                />
                            ))}
                        </SortableContext>

                        <button
                            onClick={() => updateButtons([...(buttons || []), { label: 'New Button', action: 'action', variant: 'default', position: 'left' }])}
                            className="w-full py-2 border-2 border-dashed border-gray-200 rounded text-sm text-gray-500 hover:border-blue-300 hover:text-blue-500 transition-colors"
                        >
                            + Add Button
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Find the column to edit width
    let selectedCol: any = null;
    let location: { tabIndex: number, rowIndex: number, colIndex: number } | null = null;
    let selectedTabIndex = -1;

    if (selectedElement.type === 'tab' && layout.tabs) {
        selectedTabIndex = layout.tabs.findIndex(t => t.id === selectedElement.id);
    }

    const findCol = () => {
        if (selectedElement.type === 'tab') return; // Skip for tabs

        if (layout.mode === 'single' || !layout.tabs) {
            layout.rows?.forEach((r, rIdx) => {
                r.columns.forEach((c, cIdx) => {
                    if (c.id === selectedElement.id) {
                        selectedCol = c;
                        location = { tabIndex: -1, rowIndex: rIdx, colIndex: cIdx };
                    }
                });
            });
        } else {
            layout.tabs?.forEach((t, tIdx) => {
                t.rows.forEach((r, rIdx) => {
                    r.columns.forEach((c, cIdx) => {
                        if (c.id === selectedElement.id) {
                            selectedCol = c;
                            location = { tabIndex: tIdx, rowIndex: rIdx, colIndex: cIdx };
                        }
                    });
                });
            });
        }
    };
    findCol();

    const fieldConfig = selectedElement.fieldName ? fields[selectedElement.fieldName] : null;

    const handleChange = (key: keyof FormFieldConfig, value: any) => {
        if (selectedElement.fieldName) {
            updateFieldConfig(selectedElement.fieldName, { [key]: value });
        }
    };

    const handleWidthChange = (width: string) => {
        if (location) {
            updateLayoutColumn(location.tabIndex, location.rowIndex, location.colIndex, { width });
        }
    };

    return (
        <div className="space-y-6">
            <div className="border-b pb-2">
                <h2 className="text-lg font-bold">
                    {selectedElement.type === 'tab' ? 'Tab Properties' : 'Properties'}
                </h2>
                {(fieldConfig?.type || selectedElement.type === 'separator') && (
                    <p className="text-xs text-gray-400 font-mono mt-1">
                        type: {fieldConfig?.type || selectedElement.type}
                    </p>
                )}
            </div>

            {selectedElement.type === 'tab' && selectedTabIndex !== -1 && layout.tabs && (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tab Label</label>
                        <input
                            type="text"
                            value={layout.tabs[selectedTabIndex].label}
                            onChange={(e) => updateTab(selectedTabIndex, { label: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        />
                    </div>

                    <div className="pt-4 border-t border-gray-100">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <button
                                    className="w-full py-2 bg-red-50 text-red-600 border border-red-200 rounded-md hover:bg-red-100 text-sm font-medium"
                                >
                                    Delete Tab
                                </button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Tab</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Are you sure you want to delete this tab? All content in it will be lost.
                                        {layout.tabs.length === 1 && " This will switch the form to Single Mode."}
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => removeTab(selectedTabIndex)} className="bg-red-600 hover:bg-red-700">
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                    </div>
                </div>
            )}

            {/* Layout Properties */}
            {selectedCol && (
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Layout</h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Width</label>
                        <input
                            type="text"
                            value={selectedCol.width || '1fr'}
                            onChange={(e) => handleWidthChange(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                            placeholder="e.g. 1fr, 50%, 200px"
                        />
                        <p className="text-xs text-gray-400 mt-1">CSS Grid width (1fr, auto, 100%, 200px)</p>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Alignment</label>
                            <Select
                                value={selectedCol.align || ''}
                                onValueChange={(value) => {
                                    if (location) {
                                        updateLayoutColumn(location.tabIndex, location.rowIndex, location.colIndex, { align: value as any });
                                    }
                                }}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Default (Left)" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="left">Left</SelectItem>
                                    <SelectItem value="center">Center</SelectItem>
                                    <SelectItem value="right">Right</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            )}

            <div className="w-full h-[1px] bg-gray-200"></div>

            {selectedElement.type === 'separator' && (
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                    <input
                        type="text"
                        value={selectedCol?.label || ''}
                        onChange={(e) => {
                            if (location) updateLayoutColumn(location.tabIndex, location.rowIndex, location.colIndex, { label: e.target.value });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                </div>
            )}

            {fieldConfig && (
                <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Field</h3>

                    {/* Rename Field ID */}
                    {selectedElement.fieldName && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Field ID (Key)</label>
                            <input
                                type="text"
                                value={selectedElement.fieldName}
                                onChange={(e) => renameField(selectedElement.fieldName!, e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm font-mono text-gray-600"
                            />
                            <p className="text-xs text-gray-400 mt-1">Must be unique</p>
                        </div>
                    )}

                    {selectedElement.type !== 'separator' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                            <input
                                type="text"
                                value={fieldConfig.label}
                                onChange={(e) => handleChange('label', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                            />
                        </div>
                    )}

                    {fieldConfig.type === 'markdown' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Content (Markdown)</label>
                            <textarea
                                value={fieldConfig.content || ''}
                                onChange={(e) => handleChange('content', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm h-32"
                                placeholder="# Title..."
                            />
                        </div>
                    )}

                    {!['separator', 'markdown'].includes(selectedElement.type) && (
                        <>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="required"
                                    checked={fieldConfig.required || false}
                                    onChange={(e) => handleChange('required', e.target.checked)}
                                    className="rounded border-gray-300 text-blue-600 shadow-sm"
                                />
                                <label htmlFor="required" className="text-sm text-gray-700">Required</label>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="hidden"
                                    checked={fieldConfig.hidden || false}
                                    onChange={(e) => handleChange('hidden', e.target.checked)}
                                    className="rounded border-gray-300 text-blue-600 shadow-sm"
                                />
                                <label htmlFor="hidden" className="text-sm text-gray-700">Hidden</label>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="disabled"
                                    checked={fieldConfig.disabled || false}
                                    onChange={(e) => handleChange('disabled', e.target.checked)}
                                    className="rounded border-gray-300 text-blue-600 shadow-sm"
                                />
                                <label htmlFor="disabled" className="text-sm text-gray-700">Disabled</label>
                            </div>
                        </>
                    )}

                    {fieldConfig.type === 'number' && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Round To (e.g. 0.01 for Currency)</label>
                            <input
                                key={`${fieldConfig.label}_roundTo_${fieldConfig.roundTo}`}
                                type="number"
                                step="any"
                                defaultValue={fieldConfig.roundTo ?? ''}
                                onBlur={(e) => {
                                    const val = parseFloat(e.target.value);
                                    if (!isNaN(val)) {
                                        handleChange('roundTo', val);
                                    }
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                placeholder="0.01"
                            />
                        </div>
                    )}

                    {['text', 'number', 'textarea', 'password'].includes(fieldConfig.type) && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Placeholder</label>
                            <input
                                type="text"
                                value={fieldConfig.placeholder || ''}
                                onChange={(e) => handleChange('placeholder', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
