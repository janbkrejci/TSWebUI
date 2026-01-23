"use client"

import * as React from "react"
import { TsForm } from "@/components/ts-web-ui/ts-form"
import { TsFormLayout, TsFieldDef, TsFormButton } from "@/components/ts-web-ui/ts-form/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Toaster } from "sonner"
import { toast } from "sonner"

// Example Configuration
const formFields: Record<string, TsFieldDef> = {
  name: { type: "text", label: "Jméno", required: true, placeholder: "Jan" },
  surname: { type: "text", label: "Příjmení", required: true, placeholder: "Novák" },
  email: { type: "text", label: "E-mail", required: true, placeholder: "jan@example.com" },
  age: { type: "number", label: "Věk", min: 18, max: 99, required: true },
  bio: { type: "textarea", label: "Biografie", rows: 4, hint: "Krátký popis o vás" },
  role: { 
      type: "select", 
      label: "Role", 
      options: [
          { value: "admin", label: "Administrátor" },
          { value: "user", label: "Uživatel" },
          { value: "guest", label: "Host" }
      ],
      required: true 
  },
  active: { type: "switch", label: "Aktivní účet" },
  newsletter: { type: "checkbox", label: "Přihlásit k odběru newsletteru" },
  birthDate: { type: "date", label: "Datum narození", required: true },
  street: { type: "text", label: "Ulice a číslo" },
  city: { type: "text", label: "Město" },
  zip: { type: "text", label: "PSČ" }
}

const formLayout: TsFormLayout = {
  tabs: [
    {
      label: "Základní info",
      rows: [
        [{ field: "name", width: "1fr" }, { field: "surname", width: "1fr" }],
        [{ field: "email", width: "1fr" }, { field: "age", width: "100px" }],
        [{ field: "birthDate", width: "1fr" }, { field: "role", width: "1fr" }],
        [{ field: "bio", width: "1fr" }]
      ]
    },
    {
        label: "Nastavení & Adresa",
        rows: [
            [{ field: "active" }],
            [{ field: "newsletter" }],
            [{ type: "separator", label: "Adresa bydliště" }],
            [{ field: "street" }],
            [{ field: "city", width: "2fr" }, { field: "zip", width: "1fr" }]
        ]
    }
  ]
}

const formButtons: TsFormButton[] = [
    { action: "cancel", label: "Zrušit", variant: "outline", type: "button" },
    { action: "save", label: "Uložit změny", variant: "primary", type: "submit" }
]

export default function TsFormPage() {
  const [formData, setFormData] = React.useState<any>(null)

  const handleSubmit = (data: any, action: string) => {
    console.log("Form Submitted:", action, data)
    setFormData({ action, data })
    if (action === 'save') {
        toast("Formulář odeslán", { description: "Data byla úspěšně uložena." })
    } else {
        toast("Akce zrušena", { description: "Formulář byl resetován." })
    }
  }

  return (
    <div className="space-y-6">
      <Toaster />
      <div>
        <h1 className="text-3xl font-bold">TS Form</h1>
        <p className="text-muted-foreground mt-2">
          Dynamic form generator based on JSON configuration and Zod validation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Form Preview</CardTitle>
              <CardDescription>
                Vyplňte formulář a odešlete. Validace je aktivní.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TsForm 
                layout={formLayout}
                fields={formFields}
                buttons={formButtons}
                onSubmit={handleSubmit}
              />
            </CardContent>
          </Card>

          <div className="space-y-6">
              <Card>
                  <CardHeader>
                      <CardTitle>Submitted Data</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <pre className="bg-slate-950 text-slate-50 p-4 rounded-lg overflow-auto text-sm min-h-[200px]">
                          {formData ? JSON.stringify(formData, null, 2) : "// Žádná data zatím neodeslána..."}
                      </pre>
                  </CardContent>
              </Card>

              <Card>
                  <CardHeader>
                      <CardTitle>JSON Configuration</CardTitle>
                  </CardHeader>
                  <CardContent>
                       <pre className="bg-slate-100 dark:bg-slate-900 p-2 rounded text-xs overflow-auto max-h-[300px]">
{`// Fields
${JSON.stringify(formFields, null, 2)}

// Layout
${JSON.stringify(formLayout, null, 2)}`}
                       </pre>
                  </CardContent>
              </Card>
          </div>
      </div>
    </div>
  )
}
