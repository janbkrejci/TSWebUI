"use client"

import * as React from "react"
import { TsWindow, TsWindowRef } from "@/components/ts-web-ui/ts-window"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function TsWindowPage() {
  const [windows, setWindows] = React.useState([
    { id: 1, title: "Welcome Window", zIndex: 100, isOpen: true },
    { id: 2, title: "Data Viewer", zIndex: 101, isOpen: false },
    { id: 3, title: "Settings", zIndex: 102, isOpen: false }
  ])

  // Refs for imperative control of each window
  const windowRefs = React.useRef<Record<number, TsWindowRef | null>>({})

  const bringToFront = (id: number) => {
    setWindows(prev => {
        const maxZ = Math.max(...prev.map(w => w.zIndex))
        const currentWindow = prev.find(w => w.id === id)
        if (currentWindow && currentWindow.zIndex === maxZ) return prev
        return prev.map(w => w.id === id ? { ...w, zIndex: maxZ + 1 } : w)
    })
  }

  const openWindow = (id: number) => {
     setWindows(prev => {
         const maxZ = Math.max(...prev.map(w => w.zIndex))
         return prev.map(w => w.id === id ? { ...w, isOpen: true, zIndex: maxZ + 1 } : w)
     })
  }

  const closeWindow = (id: number) => {
      setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: false } : w))
  }

  const createNewWindow = () => {
      setWindows(prev => {
          const maxZ = Math.max(...prev.map(w => w.zIndex), 100)
          const newId = Math.max(...prev.map(w => w.id), 0) + 1
          return [...prev, { 
              id: newId, 
              title: `New Window ${newId}`, 
              zIndex: maxZ + 1, 
              isOpen: true 
          }]
      })
  }

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] gap-6">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">TS Window</h1>
            <p className="text-muted-foreground mt-2">
                A professional window component with drag, resize, minimize, maximize, and Z-index management.
            </p>
        </div>

        <Tabs defaultValue="preview" className="flex-1 flex flex-col min-h-0">
            <TabsList className="w-fit">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
                <TabsTrigger value="documentation">Documentation</TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="flex-1 flex flex-col gap-4 min-h-0 pt-4 data-[state=inactive]:hidden text-foreground">
                <div className="flex flex-wrap gap-2 p-4 border rounded-lg bg-card items-center shrink-0 shadow-sm">
                    <Button onClick={() => openWindow(1)} disabled={windows.find(w => w.id === 1)?.isOpen}>Open Welcome</Button>
                    <Button onClick={() => openWindow(2)} disabled={windows.find(w => w.id === 2)?.isOpen}>Open Data</Button>
                    <Button onClick={() => openWindow(3)} disabled={windows.find(w => w.id === 3)?.isOpen}>Open Settings</Button>
                    <div className="h-6 w-px bg-border mx-2" />
                    <Button onClick={createNewWindow} variant="secondary">
                        <Plus className="w-4 h-4 mr-2" />
                        Create New Window
                    </Button>
                </div>

                <div className="flex-1 relative border rounded-lg bg-slate-100 dark:bg-slate-950 overflow-hidden shadow-inner min-h-[400px]">
                    <div className="absolute inset-0 p-8 pointer-events-none">
                        <div className="h-full w-full border-2 border-dashed border-slate-300 dark:border-slate-800 rounded flex items-center justify-center text-slate-400">
                            Window Workspace Area
                        </div>
                    </div>

                    {windows.map(w => w.isOpen && (
                        <TsWindow 
                            key={w.id}
                            ref={el => { windowRefs.current[w.id] = el }}
                            title={w.title}
                            zIndex={w.zIndex}
                            onFocus={() => bringToFront(w.id)}
                            onClose={() => closeWindow(w.id)}
                            defaultLeft={50 + (w.id % 10) * 30}
                            defaultTop={50 + (w.id % 10) * 30}
                            defaultWidth={w.id === 3 ? 300 : 400}
                            defaultHeight={w.id === 3 ? 200 : 300}
                        >
                            <div className="space-y-4">
                                <p>This is content for <strong>{w.title}</strong> (ID: {w.id}).</p>
                                <p className="text-sm text-muted-foreground">
                                    Try dragging this window, resizing it, or minimizing/maximizing it.
                                </p>
                                
                                <div className="bg-muted/50 p-3 rounded-md border text-xs">
                                    <p className="font-semibold mb-2">Imperative API Control:</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => windowRefs.current[w.id]?.minimize()}>Minimize</Button>
                                        <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => windowRefs.current[w.id]?.maximize()}>Maximize</Button>
                                        <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => windowRefs.current[w.id]?.restore()}>Restore</Button>
                                        <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => windowRefs.current[w.id]?.centerOnScreen()}>Center</Button>
                                        <Button variant="outline" size="sm" className="h-7 text-xs col-span-2" onClick={() => windowRefs.current[w.id]?.fitToContent()}>Fit to Content</Button>
                                    </div>
                                </div>

                                {w.id === 2 && (
                                    <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded text-xs font-mono border border-blue-100 dark:border-blue-800">
                                        Data: [1, 2, 3, 4, 5]
                                    </div>
                                )}
                                {w.id === 3 && (
                                    <div className="space-y-2 pt-2">
                                        <Button size="sm" className="w-full">Save Settings</Button>
                                    </div>
                                )}
                            </div>
                        </TsWindow>
                    ))}
                </div>
            </TabsContent>

            <TabsContent value="code" className="flex-1 min-h-0 overflow-auto pt-4 data-[state=inactive]:hidden">
                <Card>
                    <CardHeader>
                        <CardTitle>Basic Usage</CardTitle>
                        <CardDescription>How to integrate TsWindow into your React application.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <pre className="p-4 rounded-lg bg-slate-950 text-slate-50 overflow-auto text-sm">
{`import { TsWindow } from "@/components/ts-web-ui/ts-window"

export default function App() {
  return (
    <div className="relative h-screen overflow-hidden">
      <TsWindow 
        title="My Application" 
        defaultWidth={500}
        defaultHeight={400}
        defaultLeft={100} 
        defaultTop={100}
        onClose={() => console.log('Closed')}
      >
        <div className="p-4">
            <h2 className="text-xl font-bold">Hello World</h2>
            <p>Your content goes here...</p>
        </div>
      </TsWindow>
    </div>
  )
}`}
                        </pre>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="documentation" className="flex-1 min-h-0 overflow-auto pt-4 data-[state=inactive]:hidden">
                <div className="space-y-8 pb-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Properties</CardTitle>
                            <CardDescription>Available props for configuring the TsWindow component.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[200px]">Prop</TableHead>
                                        <TableHead className="w-[150px]">Type</TableHead>
                                        <TableHead>Description</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-mono text-xs">title</TableCell>
                                        <TableCell className="text-xs italic">string</TableCell>
                                        <TableCell>Title displayed in the window header.</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-mono text-xs">defaultWidth</TableCell>
                                        <TableCell className="text-xs italic">number</TableCell>
                                        <TableCell>Initial width in pixels (default: 400).</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-mono text-xs">defaultHeight</TableCell>
                                        <TableCell className="text-xs italic">number</TableCell>
                                        <TableCell>Initial height in pixels (default: 300).</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-mono text-xs">defaultTop</TableCell>
                                        <TableCell className="text-xs italic">number</TableCell>
                                        <TableCell>Initial Y position.</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-mono text-xs">defaultLeft</TableCell>
                                        <TableCell className="text-xs italic">number</TableCell>
                                        <TableCell>Initial X position.</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-mono text-xs">minWidth</TableCell>
                                        <TableCell className="text-xs italic">number</TableCell>
                                        <TableCell>Minimum allowed width (default: 200).</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-mono text-xs">minHeight</TableCell>
                                        <TableCell className="text-xs italic">number</TableCell>
                                        <TableCell>Minimum allowed height (default: 100).</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-mono text-xs">initiallyMinimized</TableCell>
                                        <TableCell className="text-xs italic">boolean</TableCell>
                                        <TableCell>If true, window starts in minimized state.</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-mono text-xs">initiallyMaximized</TableCell>
                                        <TableCell className="text-xs italic">boolean</TableCell>
                                        <TableCell>If true, window starts in maximized state.</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-mono text-xs">onClose</TableCell>
                                        <TableCell className="text-xs italic">() =&gt; void</TableCell>
                                        <TableCell>Callback triggered when close button is clicked.</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-mono text-xs">onFocus</TableCell>
                                        <TableCell className="text-xs italic">() =&gt; void</TableCell>
                                        <TableCell>Callback triggered when window is focused/clicked.</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Imperative API (Refs)</CardTitle>
                            <CardDescription>Methods exposed via the component reference.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[200px]">Method</TableHead>
                                        <TableHead>Description</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-mono text-xs font-semibold text-primary">minimize()</TableCell>
                                        <TableCell>Minimizes the window to the taskbar area.</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-mono text-xs font-semibold text-primary">maximize()</TableCell>
                                        <TableCell>Expands window to fill the entire workspace.</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-mono text-xs font-semibold text-primary">restore()</TableCell>
                                        <TableCell>Restores window from minimized or maximized state.</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-mono text-xs font-semibold text-primary">centerOnScreen()</TableCell>
                                        <TableCell>Moves the window to the exact center of the viewport.</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-mono text-xs font-semibold text-primary">fitToContent()</TableCell>
                                        <TableCell>Automatically adjusts window height to fit its content.</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-mono text-xs font-semibold text-primary">bringToFront()</TableCell>
                                        <TableCell>Triggers the focus callback to update stacking order.</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>
        </Tabs>
    </div>
  )
}