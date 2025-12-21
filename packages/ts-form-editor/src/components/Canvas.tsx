import React from 'react';
import { useDroppable, useDraggable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, horizontalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { useFormStore } from '../store/formStore';
import { FormRow, FormColumn } from '../types';
import clsx from 'clsx';

// Sortable Tab Component
function SortableTab({ tab, isActive, onClick, index }: { tab: any, isActive: boolean, onClick: () => void, index: number }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: tab.id,
        data: { type: 'tab-move', index }
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 'auto',
    };

    return (
        <button
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            onClick={onClick}
            className={clsx(
                "px-4 py-2 text-sm font-medium border-b-2 transition-colors cursor-grab active:cursor-grabbing shrink-0",
                isActive ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                isDragging ? "opacity-50" : ""
            )}
        >
            {tab.label}
        </button>
    );
}

// Draggable Row Wrapper
function SortableDesignerRow({ tabIndex, rowIndex, row }: { tabIndex: number, rowIndex: number, row: FormRow }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: row.id, data: { type: 'row-move', rowIndex, tabIndex } });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 'auto',
        position: isDragging ? 'relative' as const : undefined
    };

    return (
        <div ref={setNodeRef} style={style} className={clsx("relative group", isDragging && "z-50")}>
            <div
                ref={setActivatorNodeRef}
                className={clsx(
                    "absolute -left-8 top-1/2 -translate-y-1/2 transition-opacity cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 z-10 w-6 h-6 flex items-center justify-center",
                    isDragging ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                )}
                style={{ touchAction: 'none' }}
                {...listeners}
                {...attributes}
            >
                <GripVertical size={16} />
            </div>
            <DesignerRow tabIndex={tabIndex} rowIndex={rowIndex} row={row} />
        </div>
    );
}

// ... (keep DesignerRow definition as is, just used for rendering content)

// In Canvas component:
// <SortableContext items={rows.map(r => r.id)} strategy={verticalListSortingStrategy}>
//   ... map rows ...
// </SortableContext>

// Be careful: SortableContext needs items prop.
// I will just replace the rendering logic in Canvas.

// Component for a draggable element (field or separator)
function DraggableElement({
    column,
    fieldConfig,
    location
}: {
    column: FormColumn,
    fieldConfig?: any,
    location: { tabIndex: number, rowIndex: number, colIndex: number }
}) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: `move-${column.id}`,
        data: {
            type: 'field-move',
            fieldId: column.field,
            source: location
        }
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 50
    } : undefined;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className={clsx(
                "cursor-grab active:cursor-grabbing w-full",
                isDragging ? "opacity-50" : ""
            )}
        >
            {column.type === 'field' && fieldConfig && (
                <>
                    <label className="text-xs font-semibold text-gray-600 mb-1 block select-none text-left">
                        {fieldConfig.label} {fieldConfig.required && <span className="text-red-500">*</span>}
                    </label>
                    <div className="h-8 bg-gray-100 rounded border border-gray-200 w-full flex items-center px-2 text-xs text-gray-500 select-none">
                        {fieldConfig.type}
                    </div>
                </>
            )}

            {column.type === 'separator' && (
                <div className="flex items-center gap-2 py-4 select-none w-full">
                    {column.label ? (
                        <>
                            <span className="text-xs font-bold text-gray-500 uppercase whitespace-nowrap">{column.label}</span>
                            <div className="h-[1px] bg-gray-300 w-full"></div>
                        </>
                    ) : (
                        <div className="h-[1px] bg-gray-300 w-full"></div>
                    )}
                </div>
            )}
        </div>
    );
}

// A single cell in the grid
function DesignerCell({
    tabIndex,
    rowIndex,
    colIndex,
    column
}: {
    tabIndex: number,
    rowIndex: number,
    colIndex: number,
    column: FormColumn
}) {
    const { fields, selectElement, selectedElement } = useFormStore();
    const { setNodeRef, isOver } = useDroppable({
        id: `cell-${tabIndex}-${rowIndex}-${colIndex}`,
        data: {
            type: 'cell',
            tabIndex,
            rowIndex,
            colIndex
        }
    });

    const fieldConfig = column.field ? fields[column.field] : null;
    const isSelected = selectedElement?.id === column.id;

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        selectElement(column.id, column.type || 'empty', column.field);
    };

    const hasContent = (column.type === 'field' && fieldConfig) || column.type === 'separator';

    const alignClass = {
        'left': 'justify-start',
        'center': 'justify-center',
        'right': 'justify-end'
    }[(column.align as string) || 'left'];

    return (
        <div
            ref={setNodeRef}
            onClick={handleClick}
            className={clsx(
                "min-h-[72px] border rounded-md p-2 transition-colors relative group flex items-center",
                alignClass,
                isOver ? "bg-blue-50 border-blue-300 border-2 border-dashed" : "bg-white border-gray-200",
                isSelected ? "ring-2 ring-blue-500 border-blue-500" : "hover:border-gray-300"
            )}
            style={{ width: column.width || '1fr' }} // This works if parent is flex
        >
            {column.type === 'empty' && (
                <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs italic pointer-events-none">
                    Drop field here
                </div>
            )}

            {hasContent && (
                <DraggableElement
                    column={column}
                    fieldConfig={fieldConfig}
                    location={{ tabIndex, rowIndex, colIndex }}
                />
            )}
        </div>
    );
}

// Helper for insert handles
function InsertHandle({
    vertical = false,
    onClick
}: {
    vertical?: boolean,
    onClick: () => void
}) {
    return (
        <div
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
            className={clsx(
                "group/handle flex items-center justify-center transition-all opacity-0 hover:opacity-100 z-10 relative",
                vertical
                    ? "w-4 h-auto cursor-col-resize -mx-2 py-2"
                    : "h-4 w-full cursor-row-resize -my-2 px-2"
            )}
        >
            <div className={clsx(
                "bg-blue-500 rounded-full flex items-center justify-center shadow-sm transform scale-0 group-hover/handle:scale-100 transition-transform z-10",
                vertical ? "w-5 h-5" : "w-5 h-5"
            )}>
                <span className="text-white text-xs font-bold leading-none pb-0.5">+</span>
            </div>
            {/* Guide line */}
            <div className={clsx(
                "absolute bg-blue-400 opacity-0 group-hover/handle:opacity-50 pointer-events-none",
                vertical ? "w-[2px] h-full" : "h-[2px] w-full"
            )}></div>
        </div>
    );
}


function DesignerRow({ tabIndex, rowIndex, row }: { tabIndex: number, rowIndex: number, row: FormRow }) {
    const { insertColumn } = useFormStore();

    return (
        <div className="mb-0 relative group/row rounded p-1 -m-1 transition-colors">
            <div className="flex gap-4 items-stretch">
                {/* Insert Before First Column */}
                <InsertHandle
                    vertical
                    onClick={() => insertColumn(tabIndex, rowIndex, 0, 'before')}
                />

                {row.columns.map((col, colIndex) => (
                    <React.Fragment key={col.id}>
                        <div className="flex-1 min-w-0">
                            <DesignerCell
                                tabIndex={tabIndex}
                                rowIndex={rowIndex}
                                colIndex={colIndex}
                                column={col}
                            />
                        </div>
                        {/* Insert After Column */}
                        <InsertHandle
                            vertical
                            onClick={() => insertColumn(tabIndex, rowIndex, colIndex, 'after')}
                        />
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

export default function Canvas() {
    const { layout, addTab, selectElement, activeTabIndex, setActiveTabIndex, insertRow, addRow } = useFormStore();
    const tabs = layout.tabs || [];

    // Ensure activeTabIdx is valid
    if (activeTabIndex >= tabs.length && tabs.length > 0) {
        // Defer update to avoid render loop if possible, or trust React handles it. 
        // Better to check during render but update via effect?
        // Or just let store handle it? Store doesn't auto-validate.
        // For now, let's keep it simple.
    }

    // Sync validation
    React.useEffect(() => {
        if (activeTabIndex >= tabs.length && tabs.length > 0) {
            setActiveTabIndex(tabs.length - 1);
        } else if (tabs.length === 0 && activeTabIndex !== 0) {
            setActiveTabIndex(0);
        }
    }, [tabs.length, activeTabIndex, setActiveTabIndex]);

    // Global keyboard shortcuts
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ignore if typing in input/textarea
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return;
            }

            if (e.key === 'Delete' || e.key === 'Backspace') {
                const { selectedElement, deleteSelectedElement } = useFormStore.getState();
                if (selectedElement) {
                    deleteSelectedElement();
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const isTabsMode = layout.mode === 'tabs' || !layout.mode; // Default to tabs

    return (
        <div className="h-full flex flex-col">
            {/* Tabs Header - Only show if in tabs mode */}
            {isTabsMode && (
                <div className="flex gap-1 border-b border-gray-200 px-4 bg-white overflow-x-auto">
                    <SortableContext
                        items={tabs.map(t => t.id)}
                        strategy={horizontalListSortingStrategy}
                    >
                        {tabs.map((tab, idx) => (
                            <SortableTab
                                key={tab.id}
                                tab={tab}
                                index={idx}
                                isActive={activeTabIndex === idx}
                                onClick={() => {
                                    setActiveTabIndex(idx);
                                    selectElement(tab.id, 'tab');
                                }}
                            />
                        ))}
                    </SortableContext>
                    <button
                        onClick={addTab}
                        className="px-3 py-2 text-sm font-medium text-gray-400 hover:text-blue-500"
                    >
                        +
                    </button>
                </div>
            )}

            {/* Tab/Content (Canvas) */}
            <div
                className="flex-1 p-8 overflow-y-auto"
                onClick={() => selectElement(null, null)} // Deselect on clicking background
            >
                <div className="w-full mx-auto bg-white min-h-[500px] shadow-sm border border-gray-200 rounded-lg p-6">
                    {isTabsMode ? (
                        <>
                            <div className="flex flex-col gap-4">
                                <SortableContext
                                    items={tabs[activeTabIndex]?.rows.map(r => r.id) || []}
                                    strategy={verticalListSortingStrategy}
                                >
                                    {/* Insert before first row */}
                                    <InsertHandle
                                        onClick={() => insertRow(activeTabIndex, 0, 'before')}
                                    />
                                    {tabs[activeTabIndex]?.rows.map((row, rowIdx) => (
                                        <React.Fragment key={row.id}>
                                            <SortableDesignerRow
                                                tabIndex={activeTabIndex}
                                                rowIndex={rowIdx}
                                                row={row}
                                            />
                                            <InsertHandle
                                                onClick={() => insertRow(activeTabIndex, rowIdx, 'after')}
                                            />
                                        </React.Fragment>
                                    ))}
                                </SortableContext>
                            </div>

                            {/* Empty State / Add First Row if empty */}
                            {(!tabs[activeTabIndex]?.rows || tabs[activeTabIndex]?.rows.length === 0) && (
                                <button
                                    onClick={() => addRow(activeTabIndex)}
                                    className="w-full py-8 border-2 border-dashed border-gray-200 rounded-lg text-gray-400 hover:border-gray-300 hover:text-gray-500 text-sm font-medium transition-colors flex items-center justify-center gap-2"
                                >
                                    Start by adding a row
                                </button>
                            )}
                        </>
                    ) : (
                        <>
                            <div className="flex flex-col gap-4">
                                <SortableContext
                                    items={layout.rows?.map(r => r.id) || []}
                                    strategy={verticalListSortingStrategy}
                                >
                                    <InsertHandle
                                        onClick={() => useFormStore.getState().insertRow(-1, 0, 'before')}
                                    />
                                    {layout.rows?.map((row, rowIdx) => (
                                        <React.Fragment key={row.id}>
                                            <SortableDesignerRow
                                                tabIndex={-1}
                                                rowIndex={rowIdx}
                                                row={row}
                                            />
                                            <InsertHandle
                                                onClick={() => useFormStore.getState().insertRow(-1, rowIdx, 'after')}
                                            />
                                        </React.Fragment>
                                    ))}
                                </SortableContext>
                            </div>

                            {(!layout.rows || layout.rows.length === 0) && (
                                <button
                                    onClick={() => useFormStore.getState().addRow(-1)}
                                    className="w-full py-8 border-2 border-dashed border-gray-200 rounded-lg text-gray-400 hover:border-gray-300 hover:text-gray-500 text-sm font-medium transition-colors flex items-center justify-center gap-2"
                                >
                                    Start by adding a row
                                </button>
                            )}

                            <div className="flex justify-center mt-4">
                                <button
                                    onClick={addTab}
                                    className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
                                    title="Convert to Tabs Layout"
                                >
                                    + Convert to Tabs
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div >
    );
}
