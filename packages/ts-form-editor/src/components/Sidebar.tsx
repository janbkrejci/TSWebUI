import { useDraggable } from '@dnd-kit/core';
import { Type, Hash, AlignJustify, List, CheckSquare, Calendar, Image, File, FileText, Minus, Circle, ToggleLeft, Link, Box, Lock, ChevronsUpDown, SlidersHorizontal, MousePointerClick, LayoutList, Info } from 'lucide-react';
import clsx from 'clsx';


export const fieldTypes = [
    { type: 'text', label: 'Text Input', icon: Type },
    { type: 'password', label: 'Password', icon: Lock },
    { type: 'number', label: 'Number', icon: Hash },
    { type: 'textarea', label: 'Text Area', icon: AlignJustify },
    { type: 'combobox', label: 'Combobox', icon: ChevronsUpDown },
    { type: 'select', label: 'Select', icon: List },
    { type: 'multiselect', label: 'Multi Select', icon: List },
    { type: 'checkbox', label: 'Checkbox', icon: CheckSquare },
    { type: 'radio', label: 'Radio Group', icon: Circle },
    { type: 'switch', label: 'Switch', icon: ToggleLeft },
    { type: 'slider', label: 'Slider', icon: SlidersHorizontal },
    { type: 'date', label: 'Date', icon: Calendar },
    { type: 'datetime', label: 'Date Time', icon: Calendar },
    { type: 'file', label: 'File Upload', icon: File },
    { type: 'image', label: 'Image Upload', icon: Image },
    { type: 'relationship', label: 'Relationship', icon: Link },
    { type: 'button', label: 'Button', icon: MousePointerClick },
    { type: 'button-group', label: 'Button Group', icon: LayoutList },
    { type: 'infobox', label: 'Info Box', icon: Info },
    { type: 'markdown', label: 'Markdown', icon: FileText },
    { type: 'table', label: 'Table', icon: Box },
    { type: 'separator', label: 'Separator', icon: Minus },
];

export function SidebarBtn({ label, icon: Icon }: { label: string, icon: any }) {
    return (
        <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:border-blue-500 hover:shadow-md cursor-grab active:cursor-grabbing transition-all select-none">
            <Icon size={18} className="text-gray-500" />
            <div className="text-sm font-medium text-gray-700">{label}</div>
        </div>
    );
}

function DraggableSidebarItem({ type, label, icon: Icon }: { type: string, label: string, icon: any }) {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: `sidebar-${type}`,
        data: {
            type: 'field-source',
            fieldType: type
        }
    });

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className={clsx("mb-3", isDragging && "opacity-50")}
        >
            <SidebarBtn label={label} icon={Icon} />
        </div>
    );
}

export default function Sidebar() {
    return (
        <div className="flex flex-col h-full">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Fields</h2>
            <div className="overflow-y-auto overflow-x-hidden flex-1 pr-2">
                {fieldTypes.map(ft => (
                    <DraggableSidebarItem key={ft.type} {...ft} />
                ))}
            </div>
        </div>
    );
}
