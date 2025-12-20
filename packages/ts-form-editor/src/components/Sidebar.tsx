import { useDraggable } from '@dnd-kit/core';
import { Type, Hash, AlignJustify, List, CheckSquare, Calendar, Image, FileText, Minus, Circle, ToggleLeft, Link, Box } from 'lucide-react';


const fieldTypes = [
    { type: 'text', label: 'Text Input', icon: Type },
    { type: 'number', label: 'Number', icon: Hash },
    { type: 'textarea', label: 'Text Area', icon: AlignJustify },
    { type: 'select', label: 'Select', icon: List },
    { type: 'multiselect', label: 'Multi Select', icon: List },
    { type: 'checkbox', label: 'Checkbox', icon: CheckSquare },
    { type: 'radio', label: 'Radio Group', icon: Circle },
    { type: 'switch', label: 'Switch', icon: ToggleLeft },
    { type: 'date', label: 'Date', icon: Calendar },
    { type: 'datetime', label: 'Date Time', icon: Calendar },
    { type: 'file', label: 'File Upload', icon: Image },
    { type: 'relationship', label: 'Relationship', icon: Link },
    { type: 'markdown', label: 'Markdown', icon: FileText },
    { type: 'separator', label: 'Separator', icon: Minus },
    { type: 'table', label: 'Nested Table', icon: Box },
];

function DraggableSidebarItem({ type, label, icon: Icon }: { type: string, label: string, icon: any }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `sidebar-${type}`,
        data: {
            type: 'field-source',
            fieldType: type
        }
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-md cursor-grab hover:border-blue-500 hover:shadow-sm mb-2 transition-colors"
        >
            <Icon size={18} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">{label}</span>
            {/* Drag handle visual */}
        </div>
    );
}

export default function Sidebar() {
    return (
        <div className="flex flex-col h-full">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Fields</h2>
            <div className="overflow-y-auto flex-1 pr-2">
                {fieldTypes.map(ft => (
                    <DraggableSidebarItem key={ft.type} {...ft} />
                ))}
            </div>
        </div>
    );
}
