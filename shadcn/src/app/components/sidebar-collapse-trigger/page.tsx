"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, PanelLeft, Menu } from "lucide-react"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import vscDarkPlus from 'react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus'

function CollapseTriggerDemo() {
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  
  return (
    <div className="flex-1 flex flex-col gap-4 min-h-0">
      <Card>
        <CardHeader>
          <CardTitle>Sidebar Collapse Trigger Demo</CardTitle>
          <CardDescription>
            A circular button positioned at the edge of the sidebar to toggle collapse state.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Demo kontejner simulující sidebar */}
          <div className="relative border rounded-lg overflow-hidden min-h-[300px] bg-slate-100 dark:bg-slate-950">
            {/* Simulovaný sidebar */}
            <div 
              className="absolute left-0 top-0 bottom-0 bg-background border-r transition-all duration-300"
              style={{ width: isCollapsed ? '4rem' : '16rem' }}
            >
              {/* Obsah sidebaru */}
              <div className="p-4">
                {!isCollapsed && (
                  <>
                    <h3 className="font-semibold mb-4">Navigation</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 p-2 rounded hover:bg-muted">
                        <Menu className="h-4 w-4" />
                        <span>Menu Item 1</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 rounded hover:bg-muted">
                        <PanelLeft className="h-4 w-4" />
                        <span>Menu Item 2</span>
                      </div>
                    </div>
                  </>
                )}
                {isCollapsed && (
                  <div className="space-y-2 flex flex-col items-center">
                    <div className="p-2 rounded hover:bg-muted">
                      <Menu className="h-4 w-4" />
                    </div>
                    <div className="p-2 rounded hover:bg-muted">
                      <PanelLeft className="h-4 w-4" />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Collapse trigger - kroužek na pravé hraně */}
              <button
                className="absolute top-1/2 -translate-y-1/2 -right-3 z-50 h-6 w-6 rounded-full bg-background border shadow-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onClick={() => setIsCollapsed(!isCollapsed)}
                title={isCollapsed ? "Rozbalit menu" : "Sbalit menu"}
              >
                {isCollapsed ? (
                  <ChevronRight className="h-3.5 w-3.5" />
                ) : (
                  <ChevronLeft className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
            
            {/* Hlavní obsah */}
            <div 
              className="absolute top-0 right-0 bottom-0 p-6 transition-all duration-300"
              style={{ left: isCollapsed ? '4rem' : '16rem' }}
            >
              <div className="h-full flex items-center justify-center text-muted-foreground/50 font-bold text-2xl">
                MAIN CONTENT
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-4 border rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground">
              Current state: <strong>{isCollapsed ? 'Collapsed' : 'Expanded'}</strong>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

const codeString = `"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useSidebar } from "@/components/ts-web-ui/ts-sidebar"
import { cn } from "@/lib/utils"

export function SidebarCollapseTrigger({ className }: { className?: string }) {
  const { isCollapsed, toggleCollapsed, isMobile } = useSidebar()

  // Na mobile nikdy nezobrazovat
  if (isMobile) {
    return null
  }

  return (
    <button
      className={cn(
        "absolute top-1/2 -translate-y-1/2 -right-3 z-50",
        "h-6 w-6 rounded-full",
        "bg-background border shadow-sm",
        "flex items-center justify-center",
        "text-muted-foreground hover:text-foreground hover:bg-accent",
        "transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        className
      )}
      onClick={toggleCollapsed}
      title={isCollapsed ? "Rozbalit menu" : "Sbalit menu"}
      aria-label={isCollapsed ? "Rozbalit menu" : "Sbalit menu"}
    >
      {isCollapsed ? (
        <ChevronRight className="h-3.5 w-3.5" />
      ) : (
        <ChevronLeft className="h-3.5 w-3.5" />
      )}
    </button>
  )
}

// Usage in layout
<Sidebar>
  <SidebarCollapseTrigger />
  <SidebarContent>
    <AppSidebar />
  </SidebarContent>
</Sidebar>`

export default function SidebarCollapseTriggerPage() {
  return (
    <div className="flex flex-col flex-1 gap-6 min-h-0 pb-6">
      <div className="shrink-0">
        <h1 className="text-3xl font-bold tracking-tight">Sidebar Collapse Trigger</h1>
        <p className="text-muted-foreground mt-2">
          A circular button that sits on the edge of the sidebar to toggle between collapsed and expanded states.
        </p>
      </div>

      <Tabs defaultValue="preview" className="flex-1 flex flex-col min-h-0">
        <TabsList className="shrink-0 w-fit">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="flex-1 flex flex-col min-h-0 pt-4">
          <CollapseTriggerDemo />
        </TabsContent>

        <TabsContent value="code" className="flex-1 min-h-0 overflow-auto py-6 data-[state=inactive]:hidden">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Implementation</CardTitle>
              <CardDescription>
                Uses the useSidebar hook from TsSidebar for state management.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SyntaxHighlighter 
                language="tsx" 
                style={vscDarkPlus}
                customStyle={{
                  fontSize: '13px',
                  lineHeight: '1.6',
                  borderRadius: '0.5rem',
                  padding: '1rem'
                }}
              >
                {codeString}
              </SyntaxHighlighter>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documentation" className="flex-1 min-h-0 overflow-auto pt-4 data-[state=inactive]:hidden">
          <div className="space-y-8 pb-8 w-full">
            <Card>
              <CardHeader>
                <CardTitle>Props</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[150px]">Prop</TableHead>
                      <TableHead className="w-[150px]">Type</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-mono text-xs">className</TableCell>
                      <TableCell className="text-xs italic">string</TableCell>
                      <TableCell>Additional CSS classes to apply.</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Positioned at the center of the sidebar's right edge</li>
                  <li>Circular button with shadow for visibility</li>
                  <li>Arrow direction changes based on collapsed state</li>
                  <li>Hidden on mobile (mobile sidebar doesn't collapse)</li>
                  <li>Accessible with keyboard focus ring</li>
                  <li>Hover and transition effects</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dependencies</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li><code>useSidebar</code> hook from TsSidebar component</li>
                  <li><code>lucide-react</code> for chevron icons</li>
                  <li><code>cn</code> utility for class merging</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
