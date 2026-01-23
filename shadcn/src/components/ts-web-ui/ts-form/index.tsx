"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { TsFieldDef, TsFormLayout as LayoutType, TsFormButton } from "./types"
import { generateZodSchema } from "./ts-form-schema"
import { TsFormLayout } from "./ts-form-layout"
import { Loader2 } from "lucide-react"

export interface TsFormProps {
  layout: LayoutType
  fields: Record<string, TsFieldDef>
  values?: any
  buttons?: TsFormButton[]
  onSubmit?: (data: any, action: string) => void
  readOnly?: boolean
  className?: string
}

export function TsForm({
  layout,
  fields,
  values,
  buttons = [],
  onSubmit,
  readOnly = false,
  className
}: TsFormProps) {
  // 1. Generate Schema based on fields
  // Memoize schema to prevent recreation on every render unless fields change
  const formSchema = React.useMemo(() => generateZodSchema(fields), [fields])
  type FormValues = z.infer<typeof formSchema>

  // 2. Initialize Form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: values || {},
    mode: "onChange"
  })

  // Update form values when props change
  React.useEffect(() => {
    if (values) {
        form.reset(values)
    }
  }, [values, form])

  const [submittingAction, setSubmittingAction] = React.useState<string | null>(null)

  // 3. Handle Submit
  const handleSubmit = (data: FormValues) => {
    // This is called only if validation passes
    if (submittingAction) {
        onSubmit?.(data, submittingAction)
    }
    setSubmittingAction(null)
  }

  const handleButtonClick = (e: React.MouseEvent, btn: TsFormButton) => {
    // If it's a submit button, let the form handle it (it will trigger validation)
    // We just track which action triggered it
    if (!btn.type || btn.type === 'submit') {
        setSubmittingAction(btn.action)
    } else {
        // Normal button, prevent default form submit
        e.preventDefault()
        // Call submit handler directly with current values (no validation required usually for cancel/secondary)
        // But maybe we want validation? For now, let's assume non-submit buttons skip validation
        onSubmit?.(form.getValues(), btn.action)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={className}>
        <TsFormLayout layout={layout} fields={fields} />
        
        {/* Buttons Bar */}
        {buttons.length > 0 && (
            <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t">
                {buttons.map((btn, idx) => {
                     // Determine variant mapping
                     let variant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" = "default"
                     if (btn.variant === 'primary') variant = "default"
                     else if (btn.variant === 'danger') variant = "destructive"
                     else if (btn.variant) variant = btn.variant as any

                     return (
                        <Button
                            key={idx}
                            type={btn.type || 'submit'}
                            variant={variant}
                            onClick={(e) => handleButtonClick(e, btn)}
                            disabled={form.formState.isSubmitting && submittingAction === btn.action}
                        >
                            {form.formState.isSubmitting && submittingAction === btn.action && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {btn.label}
                        </Button>
                     )
                })}
            </div>
        )}
      </form>
    </Form>
  )
}
