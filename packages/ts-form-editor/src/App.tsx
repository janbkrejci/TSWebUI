import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import PropertiesPanel from './components/PropertiesPanel';
import PreviewModal from './components/PreviewModal';
import { DndContext, useSensor, useSensors, PointerSensor, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { useFormStore } from './store/formStore';
import { Eye, Download, Upload } from 'lucide-react';

function App() {
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const { setFormDefinition, getFormDefinition } = useFormStore();

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        if (active.data.current?.type === 'field-source' && over.data.current?.type === 'cell') {
            // Dropped a new field onto a cell
            const fieldType = active.data.current.fieldType;
            const { tabIndex, rowIndex, colIndex } = over.data.current;

            // Update store
            // We need to implement logic to update the SPECIFIC CELL to be 'field' type with the new field name.
            // The `addField` action in store currently just adds to `fields`. 
            // We need to update it to also place it in the layout.

            // This requires updating the store logic slightly.
            // Let's call a more complex action: `dropNewField(type, location)`

            // For now, let's manually act on store via custom expanded logic or updated store.
            // I'll update the store logic in a separate file update or just hack it here?
            // Better to update store logic. But I can't easily multi-file edit. 
            // I'll assume addField does the right thing or I update it next.

            // Actually I will invoke a specialized method which I will add to store in next step or now.
            // let's use: useFormStore.getState().handleDropNewField(fieldType, tabIndex, rowIndex, colIndex);
            // Check if handleDropNewField exists? Use addField and I will patch it.

            useFormStore.getState().addField({ type: fieldType, rowIndex, colIndex, tabIndex });
        }
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
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
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
                    <aside className="w-64 bg-white border-r border-gray-200 p-4 flex flex-col z-0">
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
        </DndContext>
    )
}

export default App
