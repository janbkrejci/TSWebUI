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
  country: {
      type: "combobox",
      label: "Země",
      options: [
          { value: "cz", label: "Česká republika" },
          { value: "sk", label: "Slovensko" },
          { value: "de", label: "Německo" },
          { value: "at", label: "Rakousko" }
      ],
      placeholder: "Vyberte nebo hledejte..."
  },
  gender: {
      type: "radio",
      label: "Pohlaví",
      options: [
          { value: "male", label: "Muž" },
          { value: "female", label: "Žena" },
          { value: "other", label: "Jiné" }
      ]
  },
  rating: {
      type: "slider",
      label: "Spokojenost (0-10)",
      min: 0, 
      max: 10
  },
  skills: {
      type: "multiselect",
      label: "Dovednosti",
      options: [
          { value: "js", label: "JavaScript" },
          { value: "react", label: "React" },
          { value: "ts", label: "TypeScript" },
          { value: "next", label: "Next.js" }
      ]
  },
  active: { type: "switch", label: "Aktivní účet" },
  newsletter: { type: "checkbox", label: "Přihlásit k odběru newsletteru" },
  birthDate: { type: "date", label: "Datum narození", required: true },
  meetingTime: { type: "datetime", label: "Čas schůzky" },
  avatar: { type: "image", label: "Profilové foto", accept: "image/png, image/jpeg" },
  info: {
      type: "infobox", 
      variant: "default", 
      label: "Upozornění", 
      content: "Tento formulář slouží pouze pro ukázkové účely a data nejsou nikam odesílána." 
  },
  notes: {
      type: "markdown",
      value: "### Poznámky\n- Markdown je **podporován**\n- Můžete psát seznamy\n- A další formátování"
  }
}

const formLayout: TsFormLayout = {
  tabs: [
    {
      label: "Osobní údaje",
      rows: [
        [{ field: "info" }],
        [{ field: "name", width: "1fr" }, { field: "surname", width: "1fr" }],
        [{ field: "email", width: "1fr" }, { field: "age", width: "100px" }],
        [{ field: "birthDate", width: "1fr" }, { field: "gender", width: "1fr" }],
        [{ field: "country", width: "1fr" }, { field: "role", width: "1fr" }],
        [{ field: "bio", width: "1fr" }]
      ]
    },
    {
        label: "Detaily & Nastavení",
        rows: [
            [{ field: "meetingTime" }],
            [{ field: "avatar" }],
            [{ field: "rating" }],
            [{ field: "skills" }],
            [{ type: "separator", label: "Nastavení účtu" }],
            [{ field: "active" }],
            [{ field: "newsletter" }],
            [{ field: "notes" }]
        ]
    }
  ]
}

const formButtons: TsFormButton[] = [
    {
        action: "delete", 
        label: "Smazat účet", 
        variant: "danger", 
        type: "button",
        confirmation: {
            title: "Opravdu smazat?",
            text: "Tato akce je nevratná. Opravdu chcete smazat tento účet?",
            buttons: [
                { action: "cancel", label: "Zrušit" },
                { action: "confirm", label: "Smazat", variant: "danger", confirm: true }
            ]
        }
    },
    { action: "save", label: "Uložit změny", variant: "primary", type: "submit" }
]

export default function TsFormPage() {
  const [formData, setFormData] = React.useState<any>(null)

  const handleSubmit = (data: any, action: string) => {
    console.log("Form Submitted:", action, data)
    setFormData({ action, data })
    if (action === 'save') {
        toast("Formulář odeslán", { description: "Data byla úspěšně uložena." })
    } else if (action === 'delete') {
        toast("Účet smazán", { description: "Požadavek na smazání byl odeslán." })
    } else {
        toast("Akce provedena", { description: `Akce: ${action}` })
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