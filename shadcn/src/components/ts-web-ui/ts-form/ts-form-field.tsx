"use client"

import * as React from "react"
import { useFormContext } from "react-hook-form"
import Markdown from "react-markdown"
import { TsFieldDef } from "./types"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Check, ChevronsUpDown, Info, Upload, X as XIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { cs } from "date-fns/locale"
import { TsTable } from "../ts-table"

interface TsFormFieldProps {
  name: string
  fieldDef: TsFieldDef
}

export function TsFormField({ name, fieldDef }: TsFormFieldProps) {
  const form = useFormContext()

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(fieldDef.hidden && "hidden")}>
          {/* Label is rendered unless it's a checkbox/switch/infobox/button/separator/empty/markdown */}
          {fieldDef.type !== "checkbox" && 
           fieldDef.type !== "switch" && 
           fieldDef.type !== "infobox" && 
           fieldDef.type !== "button" && 
           fieldDef.type !== "separator" && 
           fieldDef.type !== "empty" && 
           fieldDef.type !== "markdown" && (
            <FormLabel>
                {fieldDef.label} 
                {fieldDef.required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
          )}
          
          <FormControl>
            {renderWidget(field, fieldDef, name)}
          </FormControl>
          
          {fieldDef.hint && <FormDescription>{fieldDef.hint}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

function renderWidget(field: any, def: TsFieldDef, name: string) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
          e.preventDefault()
          if (def.type === 'number') {
              field.onChange(undefined)
          } else {
              field.onChange("")
          }
      }
  }

  switch (def.type) {
    case "text":
    case "password":
      return <Input type={def.type} placeholder={def.placeholder} {...field} value={field.value ?? ""} onKeyDown={handleKeyDown} disabled={def.disabled || def.readonly} />
    
    case "number":
      return (
        <Input 
            type="number" 
            placeholder={def.placeholder} 
            {...field} 
            value={field.value ?? ""}
            onChange={e => {
                const val = e.target.value
                field.onChange(val === "" ? undefined : e.target.valueAsNumber)
            }}
            onKeyDown={handleKeyDown}
            min={def.min}
            max={def.max}
            step={def.step}
            disabled={def.disabled || def.readonly}
        />
      )

    case "textarea":
      return <Textarea placeholder={def.placeholder} {...field} value={field.value ?? ""} rows={def.rows || 3} onKeyDown={handleKeyDown} disabled={def.disabled || def.readonly} />

    case "checkbox":
      return (
        <div className="flex items-center space-x-2">
            <Checkbox 
                checked={!!field.value} 
                onCheckedChange={field.onChange} 
                disabled={def.disabled || def.readonly}
            />
            <FormLabel className="font-normal cursor-pointer">
                {def.label}
                {def.required && <span className="text-destructive ml-1">*</span>}
            </FormLabel>
        </div>
      )

    case "switch":
        return (
            <div className="flex items-center space-x-2">
                <Switch 
                    checked={!!field.value} 
                    onCheckedChange={field.onChange}
                    disabled={def.disabled || def.readonly}
                />
                <FormLabel className="font-normal cursor-pointer">
                    {def.label}
                    {def.required && <span className="text-destructive ml-1">*</span>}
                </FormLabel>
            </div>
        )

    case "radio":
        return (
            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} disabled={def.disabled || def.readonly} className="flex flex-col space-y-1">
                {(def.options || []).map((opt: any) => {
                    const value = typeof opt === 'string' ? opt : opt.value
                    const label = typeof opt === 'string' ? opt : opt.label
                    return (
                        <div key={value} className="flex items-center space-x-2">
                            <RadioGroupItem value={value} id={`${field.name}-${value}`} />
                            <FormLabel htmlFor={`${field.name}-${value}`} className="font-normal cursor-pointer">{label}</FormLabel>
                        </div>
                    )
                })}
            </RadioGroup>
        )

    case "button-group":
        return (
            <ToggleGroup type="single" value={field.value} onValueChange={field.onChange} disabled={def.disabled || def.readonly}>
                {(def.options || []).map((opt: any) => {
                    // format value/enabled/variant/Label or just value/label or object
                    // Assuming object {value, label} or string "value/Label"
                    let value = typeof opt === 'string' ? opt.split('/')[0] : opt.value
                    let label = typeof opt === 'string' ? opt.split('/').pop() : opt.label
                    
                    return (
                        <ToggleGroupItem key={value} value={value} aria-label={label}>
                            {label}
                        </ToggleGroupItem>
                    )
                })}
            </ToggleGroup>
        )

    case "slider":
        return (
            <div className="py-4">
                <Slider 
                    defaultValue={[field.value || def.min || 0]} 
                    max={def.max || 100} 
                    min={def.min || 0} 
                    step={def.step || 1}
                    onValueChange={(vals) => field.onChange(vals[0])}
                    disabled={def.disabled || def.readonly}
                />
            </div>
        )

    case "select":
      return (
        <Select onValueChange={field.onChange} value={field.value} disabled={def.disabled || def.readonly}>
          <SelectTrigger>
            <SelectValue placeholder={def.placeholder || "Vyberte..."} />
          </SelectTrigger>
          <SelectContent>
            {(def.options || []).map((opt: any) => {
                const value = typeof opt === 'string' ? opt : opt.value
                const label = typeof opt === 'string' ? opt : opt.label
                return <SelectItem key={value} value={value}>{label}</SelectItem>
            })}
          </SelectContent>
        </Select>
      )

    case "combobox":
        return <ComboboxWidget field={field} def={def} />

    case "multiselect":
        return <MultiSelectWidget field={field} def={def} />

    case "date":
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !field.value && "text-muted-foreground"
              )}
              disabled={def.disabled || def.readonly}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {field.value ? format(field.value, "PPP", { locale: cs }) : <span>{def.placeholder || "Vyberte datum"}</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={field.onChange}
              initialFocus
              locale={cs}
            />
          </PopoverContent>
        </Popover>
      )

    case "datetime":
        return (
            <Input 
                type="datetime-local" 
                {...field} 
                value={field.value ? new Date(field.value).toISOString().slice(0, 16) : ""}
                onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : undefined)}
                disabled={def.disabled || def.readonly}
            />
        )

    case "file":
    case "image":
        return (
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Input 
                    type="file" 
                    accept={def.accept || (def.type === 'image' ? "image/*" : undefined)}
                    multiple={def.multiple}
                    disabled={def.disabled || def.readonly}
                    onChange={(e) => {
                        const files = e.target.files
                        if (def.multiple) {
                            field.onChange(files)
                        } else {
                            field.onChange(files?.[0])
                        }
                    }}
                />
            </div>
        )

    case "infobox":
        return (
            <Alert variant={def.variant as any || "default"}>
                <Info className="h-4 w-4" />
                <AlertTitle>{def.label || "Info"}</AlertTitle>
                <AlertDescription>
                    {def.value || def.content || "Obsah infoboxu"}
                </AlertDescription>
            </Alert>
        )
    
    case "markdown":
        return (
            <div className="prose dark:prose-invert max-w-none p-4 border rounded-md bg-muted/50 text-sm">
                <Markdown>{def.value || def.content || ""}</Markdown>
            </div>
        )

    case "table":
        return (
            <div className="border rounded-md p-2">
                <TsTable 
                    data={field.value || []} 
                    columnDefinitions={(def as any).columns || []}
                    showCreateButton={(def as any).showCreateButton}
                    // Pass other props if needed, but data binding is tricky without specific table editing features
                />
            </div>
        )

    case "button":
        return (
            <Button 
                variant={def.variant as any} 
                className="w-full"
                onClick={(e) => {
                    e.preventDefault()
                    // Dispatch custom event for bubbling
                    const event = new CustomEvent('form-field-action', { 
                        detail: { field: name, action: (def as any).action },
                        bubbles: true 
                    })
                    e.target.dispatchEvent(event)
                }}
            >
                {def.label}
            </Button>
        )
    
    // Fallback for not implemented
    default:
        return <div className="p-2 border border-destructive/50 text-destructive text-sm rounded bg-destructive/10">Unsupported widget: {def.type}</div>
  }
}

function ComboboxWidget({ field, def }: { field: any, def: TsFieldDef }) {
    const [open, setOpen] = React.useState(false)
    const [searchValue, setSearchValue] = React.useState("")
    const options = (def.options || []).map((opt: any) => {
        const value = typeof opt === 'string' ? opt : opt.value
        const label = typeof opt === 'string' ? opt : opt.label
        return { value, label }
    })

    // Allow custom value if not found
    const filteredOptions = options.filter(opt => opt.label.toLowerCase().includes(searchValue.toLowerCase()))
    const showCustom = (def as any).allowCustom && searchValue && !options.find(o => o.label.toLowerCase() === searchValue.toLowerCase())

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                    disabled={def.disabled || def.readonly}
                >
                    {field.value
                        ? options.find((framework) => framework.value === field.value)?.label ?? field.value
                        : (def.placeholder || "Vyberte...")}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput 
                        placeholder={def.placeholder || "Hledat..."} 
                        value={searchValue}
                        onValueChange={setSearchValue}
                    />
                    <CommandList>
                        <CommandEmpty>
                            {showCustom ? (
                                <div 
                                    className="p-2 cursor-pointer hover:bg-muted text-sm"
                                    onClick={() => {
                                        field.onChange(searchValue)
                                        setOpen(false)
                                    }}
                                >
                                    Použít: "{searchValue}"
                                </div>
                            ) : "Nenalezeno."}
                        </CommandEmpty>
                        <CommandGroup>
                            {options.map((framework) => (
                                <CommandItem
                                    key={framework.value}
                                    value={framework.label} 
                                    onSelect={(currentValue) => {
                                        // Shadcn command returns lowercase label as value
                                        // We need to map back to original value
                                        // Simple lookup by label
                                        const original = options.find(o => o.label.toLowerCase() === currentValue.toLowerCase())
                                        field.onChange(original ? original.value : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            field.value === framework.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {framework.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

function MultiSelectWidget({ field, def }: { field: any, def: TsFieldDef }) {
    const [open, setOpen] = React.useState(false)
    const selectedValues: string[] = Array.isArray(field.value) ? field.value : []
    const options = (def.options || []).map((opt: any) => {
        const value = typeof opt === 'string' ? opt : opt.value
        const label = typeof opt === 'string' ? opt : opt.label
        return { value, label }
    })

    const toggleValue = (val: string) => {
        const newValues = selectedValues.includes(val)
            ? selectedValues.filter(v => v !== val)
            : [...selectedValues, val]
        field.onChange(newValues)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-between h-auto min-h-[40px]"
                    disabled={def.disabled || def.readonly}
                >
                    <div className="flex flex-wrap gap-1">
                        {selectedValues.length > 0 ? (
                            selectedValues.map(val => (
                                <Badge key={val} variant="secondary" className="mr-1">
                                    {options.find(o => o.value === val)?.label || val}
                                    <XIcon 
                                        className="ml-1 h-3 w-3 cursor-pointer" 
                                        onClick={(e) => { e.stopPropagation(); toggleValue(val) }}
                                    />
                                </Badge>
                            ))
                        ) : (
                            <span className="text-muted-foreground">{def.placeholder || "Vyberte..."}</span>
                        )}
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder={def.placeholder || "Hledat..."} />
                    <CommandList>
                        <CommandEmpty>Nenalezeno.</CommandEmpty>
                        <CommandGroup>
                            {options.map((opt) => (
                                <CommandItem
                                    key={opt.value}
                                    value={opt.label}
                                    onSelect={() => toggleValue(opt.value)}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selectedValues.includes(opt.value) ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {opt.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
