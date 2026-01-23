"use client"

import * as React from "react"
import { TsTable } from "@/components/ts-web-ui/ts-table"
import { TsTableColumnDef } from "@/components/ts-web-ui/ts-table/ts-table-view"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Data z public/table-data.js (přepsaná do JS pole)
const tableData = [
    { id: 1, name: "Jana Nováková", username: "jana_n", email: "jana@example.com", city: "Praha", phone: "555-1234", website: "www.jananovakova.com", company: "Novák s.r.o.", turnover: 125000.50, contractDate: "2022-03-15", approved: true },
    { id: 2, name: "Petr Svoboda", username: "petr_s", email: "petr@example.com", city: "Brno", phone: "555-5678", website: "www.petrsvoboda.com", company: "Svoboda a.s.", turnover: 89000.75, contractDate: "2019-07-22", approved: false },
    { id: 3, name: "Marie Černá", username: "marie_c", email: "marie@example.com", city: "Ostrava", phone: "555-8765", website: "www.mariecerna.com", company: "Černá spol. s r.o.", turnover: 234000.25, contractDate: "2024-01-10", approved: true },
    { id: 4, name: "Tomáš Dvořák", username: "tomas_d", email: "tomas@example.com", city: "Plzeň", phone: "555-4321", website: "www.tomasdvorak.com", company: "Dvořák s.r.o.", turnover: 156000.00, contractDate: "2020-05-08", approved: true },
    { id: 5, name: "Eva Procházková", username: "eva_p", email: "eva@example.com", city: "České Budějovice", phone: "555-2468", website: "www.evaprocha.com", company: "Procházka a syn", turnover: 78000.90, contractDate: "2018-09-14", approved: false },
    { id: 6, name: "Jiří Krejčí", username: "jiri_k", email: "jiri@example.com", city: "Hradec Králové", phone: "555-1357", website: "www.jirikrejci.com", company: "Krejčí Group s.r.o.", turnover: 312000.45, contractDate: "2021-02-28", approved: true },
    { id: 7, name: "Alena Horáková", username: "alena_h", email: "alena@example.com", city: "Pardubice", phone: "555-9753", website: "www.alenahorak.com", company: "Horák s.r.o.", turnover: 187000.30, contractDate: "2025-11-03", approved: false },
    { id: 8, name: "Pavel Němeček", username: "pavel_n", email: "pavel@example.com", city: "Liberec", phone: "555-8642", website: "www.pavelnemecek.com", company: "Němeček a partneři", turnover: 95000.60, contractDate: "2019-06-19", approved: true },
    { id: 9, name: "Tereza Poláková", username: "tereza_p", email: "tereza@example.com", city: "Olomouc", phone: "555-7531", website: "www.terezapolak.com", company: "Polák Group s.r.o.", turnover: 268000.80, contractDate: "2023-04-12", approved: true },
    { id: 10, name: "Martin Veselý", username: "martin_v", email: "martin@example.com", city: "Zlín", phone: "555-1597", website: "www.martinvesely.com", company: "Veselý a.s.", turnover: 134000.15, contractDate: "2020-08-27", approved: false },
]

// Definice z public/column-definitions.js
const columnDefinitions: TsTableColumnDef[] = [
    { key: 'id', title: 'ID', type: 'number', visible: false, align: 'right' },
    { key: 'name', title: 'Jméno', type: 'text', sortable: true, filterable: true, visible: true, align: 'left', isClickable: true },
    { key: 'username', title: 'Uživatel', type: 'text', visible: false },
    { key: 'email', title: 'E-mail', type: 'text', visible: true, canBeCopied: true },
    { key: 'city', title: 'Město', type: 'text', visible: true },
    { key: 'company', title: 'Firma', type: 'text', visible: true, isClickable: true },
    { key: 'turnover', title: 'Obrat', type: 'number', sortable: true, visible: true, align: 'right' },
    { key: 'contractDate', title: 'Smlouva', type: 'date', sortable: true, visible: true, align: 'right' },
    { key: 'approved', title: 'Schváleno', type: 'boolean', visible: true, align: 'center' }
]

export default function TsTablePage() {
  const [lastAction, setLastAction] = React.useState<string | null>(null)

  const handleRowClick = (row: any, columnKey?: string) => {
    setLastAction(`Kliknuto na řádek ID: ${row.id}${columnKey ? `, sloupec: ${columnKey}` : ""}`)
  }

  const handleCreate = () => {
    setLastAction("Kliknuto na 'Nový záznam'")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">TS Table</h1>
        <p className="text-muted-foreground mt-2">
          Advanced data table based on TanStack Table and Shadcn UI.
        </p>
      </div>

      <Tabs defaultValue="preview" className="w-full">
        <TabsList>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="preview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Demo</CardTitle>
              <CardDescription>
                Vyzkoušejte si řazení, filtrování, výběr sloupců a import/export.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TsTable 
                data={tableData} 
                columnDefinitions={columnDefinitions} 
                title="Seznam klientů"
                onRowClick={handleRowClick}
                onCreateClick={handleCreate}
              />
              {lastAction && (
                <div className="mt-4 p-2 bg-muted rounded text-sm font-mono text-primary">
                  Last Action: {lastAction}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code">
          <Card>
            <CardContent className="pt-6">
              <pre className="p-4 rounded-lg bg-slate-950 text-slate-50 overflow-auto text-sm">
{`import { TsTable } from "@/components/ts-web-ui/ts-table"

const columns = [
  { key: 'name', title: 'Jméno', type: 'text', sortable: true },
  { key: 'email', title: 'E-mail', type: 'text', canBeCopied: true },
  { key: 'turnover', title: 'Obrat', type: 'number', align: 'right' },
  { key: 'approved', title: 'Schváleno', type: 'boolean', align: 'center' }
]

const data = [...]

export default function MyPage() {
  return (
    <TsTable 
      data={data} 
      columnDefinitions={columns} 
      title="Moje Tabulka"
      onRowClick={(row) => console.log(row)}
    />
  )
}`}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documentation">
          <Card>
            <CardHeader>
              <CardTitle>API Reference</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm dark:prose-invert max-w-none">
              <h3>Props</h3>
              <ul>
                <li><code>data</code>: Pole objektů s daty.</li>
                <li><code>columnDefinitions</code>: Konfigurace sloupců (key, title, type, sortable, atd.).</li>
                <li><code>title</code>: Titulek tabulky v toolbar.</li>
                <li><code>showCreateButton</code>: Zobrazit tlačítko "Nový".</li>
                <li><code>showImportButton</code>: Povolit import z Excel/CSV.</li>
                <li><code>showExportButton</code>: Povolit export do Excel.</li>
                <li><code>showColumnSelector</code>: Povolit výběr viditelných sloupců.</li>
              </ul>
              <h3>Column Definition</h3>
              <pre className="text-xs bg-muted p-2 rounded">
{`{
  key: string,        // Klíč v datech
  title: string,      // Popisek sloupce
  type: "text" | "number" | "date" | "boolean",
  sortable: boolean,
  filterable: boolean,
  visible: boolean,
  align: "left" | "center" | "right",
  canBeCopied: boolean,
  isClickable: boolean
}`}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
