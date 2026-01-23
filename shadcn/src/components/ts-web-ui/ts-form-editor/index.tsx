"use client"

import * as React from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  DragEndEvent
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, Plus, Trash2, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

import { TsFieldDef } from "../ts-form/types"

// Types
interface EditorField {
    id: string
    type: string
    label: string
    required: boolean
    // ... other props
}

const AVAILABLE_FIELDS = [
    { type: 'text', label: 'Text Input' },
    { type: 'number', label: 'Number Input' },
    { type: 'date', label: 'Date Picker' },
    { type: 'checkbox', label: 'Checkbox' },
    { type: 'select', label: 'Select Box' },
    { type: 'textarea', label: 'Text Area' },
    { type: 'switch', label: 'Switch' }
]

export function TsFormEditor() {
    const [fields, setFields] = React.useState<EditorField[]>([])
    const [selectedField, setSelectedField] = React.useState<EditorField | null>(null)

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const handleAddField = (type: string) => {
        const newField: EditorField = {
            id: `field_${Date.now()}`,
            type,
            label: `New ${type}`,
            required: false
        }
        setFields([...fields, newField])
    }

    const handleDeleteField = (id: string, e: React.MouseEvent) => {
        e.stopPropagation()
        setFields(fields.filter(f => f.id !== id))
        if (selectedField?.id === id) setSelectedField(null)
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (over && active.id !== over.id) {
            setFields((items) => {
                const oldIndex = items.findIndex(i => i.id === active.id)
                const newIndex = items.findIndex(i => i.id === over.id)
                return arrayMove(items, oldIndex, newIndex)
            })
        }
    }

    const updateField = (id: string, updates: Partial<EditorField>) => {
        setFields(fields.map(f => f.id === id ? { ...f, ...updates } : f))
        if (selectedField?.id === id) {
            setSelectedField(prev => prev ? { ...prev, ...updates } : null)
        }
    }

    // Generate JSON for TsForm
    const generatedConfig = React.useMemo(() => {
        const formFields: Record<string, TsFieldDef> = {}
        const layoutRows: any[] = []

        fields.forEach(f => {
            formFields[f.id] = {
                type: f.type as any,
                label: f.label,
                required: f.required
            }
            layoutRows.push([{ field: f.id, width: '1fr' }])
        })

        return {
            fields: formFields,
            layout: { rows: layoutRows }
        }
    }, [fields])

    return (
        <div className="flex h-[800px] border rounded-lg overflow-hidden bg-background">
            {/* Sidebar - Palette */}
            <div className="w-64 border-r bg-muted/30 p-4 flex flex-col gap-4">
                <div>
                    <h3 className="font-semibold mb-2">Components</h3>
                    <div className="grid gap-2">
                        {AVAILABLE_FIELDS.map(item => (
                            <Button 
                                key={item.type} 
                                variant="outline" 
                                className="justify-start gap-2"
                                onClick={() => handleAddField(item.type)}
                            >
                                <Plus className="w-4 h-4" />
                                {item.label}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Canvas */}
            <div className="flex-1 p-8 bg-slate-50 dark:bg-slate-900 overflow-auto">
                <div className="max-w-2xl mx-auto min-h-[500px] bg-background border rounded-lg shadow-sm p-8">
                    <h2 className="text-2xl font-bold mb-6 text-center border-b pb-4">Form Canvas</h2>
                    
                    {fields.length === 0 ? (
                        <div className="flex items-center justify-center h-40 border-2 border-dashed rounded-lg text-muted-foreground">
                            Select components from the sidebar to add them here.
                        </div>
                    ) : (
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext 
                                items={fields.map(f => f.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                <div className="space-y-3">
                                    {fields.map(field => (
                                        <SortableFieldItem 
                                            key={field.id} 
                                            field={field} 
                                            onDelete={handleDeleteField}
                                            onClick={() => setSelectedField(field)}
                                            isSelected={selectedField?.id === field.id}
                                        />
                                    ))}
                                </div>
                            </SortableContext>
                        </DndContext>
                    )}
                </div>
            </div>

            {/* Properties Panel (Right) */}
            <div className="w-80 border-l bg-background p-4 flex flex-col">
                <h3 className="font-semibold mb-4">Properties</h3>
                {selectedField ? (
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label>ID</Label>
                            <Input value={selectedField.id} disabled />
                        </div>
                        <div className="space-y-2">
                            <Label>Label</Label>
                            <Input 
                                value={selectedField.label} 
                                onChange={(e) => updateField(selectedField.id, { label: e.target.value })} 
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label>Required</Label>
                            <Switch 
                                checked={selectedField.required}
                                onCheckedChange={(checked) => updateField(selectedField.id, { required: checked })}
                            />
                        </div>
                        <Separator />
                        <div className="pt-4">
                            <h4 className="font-medium mb-2 text-sm">JSON Output</h4>
                            <pre className="text-xs bg-muted p-2 rounded overflow-auto h-40">
                                {JSON.stringify(generatedConfig, null, 2)}
                            </pre>
                        </div>
                    </div>
                ) : (
                    <div className="text-sm text-muted-foreground text-center mt-10">
                        Select a field to edit properties.
                    </div>
                )}
            </div>
        </div>
    )
}

function SortableFieldItem({ field, onDelete, onClick, isSelected }: any) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: field.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div 
            ref={setNodeRef} 
            style={style} 
            className={`
                group flex items-center gap-3 p-3 border rounded-md bg-card cursor-pointer transition-colors
                ${isSelected ? 'ring-2 ring-primary border-primary' : 'hover:border-primary/50'}
            `}
            onClick={onClick}
        >
            <div {...attributes} {...listeners} className="cursor-grab text-muted-foreground hover:text-foreground">
                <GripVertical className="w-5 h-5" />
            </div>
            
            <div className="flex-1">
                <div className="font-medium text-sm">{field.label}</div>
                <div className="text-xs text-muted-foreground capitalize">{field.type}</div>
            </div>

            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => onDelete(field.id, e)}>
                <Trash2 className="w-4 h-4" />
            </Button>
        </div>
    )
}
