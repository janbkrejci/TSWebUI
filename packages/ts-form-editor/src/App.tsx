import { useState } from 'react';
import Sidebar, { SidebarBtn, fieldTypes } from './components/Sidebar';
import Canvas from './components/Canvas';
import PropertiesPanel from './components/PropertiesPanel';
import PreviewModal from './components/PreviewModal';
import { DndContext, useSensor, useSensors, PointerSensor, DragEndEvent, pointerWithin, DragStartEvent, DragOverlay, closestCenter, rectIntersection, CollisionDetection } from '@dnd-kit/core';
import { useFormStore } from './store/formStore';
import { Eye, Download, Upload } from 'lucide-react';

function App() {
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const { setFormDefinition, getFormDefinition } = useFormStore();
    const [activeData, setActiveData] = useState<any>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const handleDragStart = (event: DragStartEvent) => {
        setActiveData(event.active.data.current);
    };


    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        setActiveData(null);

        if (!over) return;

        if (active.data.current?.type === 'field-source' && over.data.current?.type === 'cell') {
            // Dropped a new field onto a cell
            const fieldType = active.data.current.fieldType;
            const { tabIndex, rowIndex, colIndex } = over.data.current;

            useFormStore.getState().addField({ type: fieldType, rowIndex, colIndex, tabIndex });
        } else if (active.data.current?.type === 'field-move') {
            if (over && over.data.current?.type === 'cell') {
                const source = active.data.current.source;
                const target = {
                    tabIndex: Number(over.data.current.tabIndex),
                    rowIndex: Number(over.data.current.rowIndex),
                    colIndex: Number(over.data.current.colIndex)
                };

                useFormStore.getState().moveField(source, target);
            }
        } else if (active.data.current?.type === 'row-move') {
            const targetType = over.data.current?.type;
            if (targetType === 'row-move' || targetType === 'cell') {
                const sourceIndex = Number(active.data.current.rowIndex);
                const targetIndex = Number(over.data.current.rowIndex);
                const tabIndex = Number(active.data.current.tabIndex);

                // Ensure we are in the same tab 
                const targetTab = Number(over.data.current.tabIndex);

                if (sourceIndex !== targetIndex && tabIndex === targetTab) {
                    useFormStore.getState().moveRow(tabIndex, sourceIndex, targetIndex);
                }
            }
        } else if (active.data.current?.type === 'button-move') {
            if (over && over.data.current?.type === 'button-move') {
                const sourceIndex = active.data.current.index;
                const targetIndex = over.data.current.index;

                if (sourceIndex !== targetIndex) {
                    useFormStore.getState().moveButton(sourceIndex, targetIndex);
                }
            }
        } else if (active.data.current?.type === 'tab-move') {
            if (over && over.data.current?.type === 'tab-move') {
                const sourceIndex = active.data.current.index;
                const targetIndex = over.data.current.index;

                if (sourceIndex !== targetIndex) {
                    useFormStore.getState().moveTab(sourceIndex, targetIndex);
                    useFormStore.getState().setActiveTabIndex(targetIndex);
                    useFormStore.getState().selectElement(String(active.id), 'tab');
                }
            }
        }
    };

    const customCollisionDetection: CollisionDetection = (args) => {
        if (activeData?.type === 'row-move' || activeData?.type === 'tab-move') {
            return closestCenter(args);
        }
        return pointerWithin(args);
    };

    const handleExport = () => {
        const def = getFormDefinition();
        const blob = new Blob([JSON.stringify(def, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'form-definition.json';
        a.click();
    };

    const handleImport = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    try {
                        const json = JSON.parse(ev.target?.result as string);
                        setFormDefinition(json);
                    } catch (err) {
                        alert('Invalid JSON');
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    }

    return (
        <DndContext sensors={sensors} collisionDetection={customCollisionDetection} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="w-full h-screen bg-gray-100 text-gray-900 flex flex-col font-sans">
                <header className="bg-white border-b border-gray-200 px-6 py-3 shadow-sm flex justify-between items-center z-10">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        TS Form Editor
                    </h1>
                    <div className="flex gap-2">
                        <button onClick={handleImport} className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                            <Upload size={16} /> Import
                        </button>
                        <button onClick={handleExport} className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                            <Download size={16} /> Export
                        </button>
                        <div className="h-6 w-[1px] bg-gray-300 mx-2"></div>
                        <button
                            onClick={() => setIsPreviewOpen(true)}
                            className="flex items-center gap-2 px-4 py-1.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition-colors"
                        >
                            <Eye size={16} /> Preview
                        </button>
                    </div>
                </header>

                <main className="flex-1 flex overflow-hidden">
                    <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col z-0 overflow-hidden shrink-0">
                        <Sidebar />
                    </aside>

                    <section className="flex-1 bg-gray-50 overflow-hidden relative">
                        <Canvas />
                    </section>

                    <aside className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto z-0">
                        <PropertiesPanel />
                    </aside>
                </main>

                <PreviewModal isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} />
            </div>
            <DragOverlay dropAnimation={null}>
                {activeData?.type === 'field-source' ? (
                    <div className="opacity-90">
                        <SidebarBtn
                            label={fieldTypes.find(f => f.type === activeData.fieldType)?.label || 'Field'}
                            icon={fieldTypes.find(f => f.type === activeData.fieldType)?.icon || Upload}
                        />
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    )
}

export default App
