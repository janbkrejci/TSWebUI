"use client"

import * as React from "react"
import { TsWindow } from "@/components/ts-web-ui/ts-window"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TsWindowPage() {
  const [windows, setWindows] = React.useState([
    { id: 1, title: "Welcome Window", zIndex: 100, isOpen: true },
    { id: 2, title: "Data Viewer", zIndex: 101, isOpen: false },
    { id: 3, title: "Settings", zIndex: 102, isOpen: false }
  ])

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
            <h1 className="text-3xl font-bold">TS Window</h1>
            <p className="text-muted-foreground mt-2">
                A window component with drag, resize, minimize, maximize, and Z-index management capabilities.
            </p>
        </div>

        <Tabs defaultValue="preview" className="flex-1 flex flex-col min-h-0">
            <TabsList>
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
                <TabsTrigger value="documentation">Documentation</TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="flex-1 flex flex-col gap-4 min-h-0 pt-4 data-[state=inactive]:hidden">
                <div className="flex flex-wrap gap-2 p-4 border rounded-lg bg-card items-center shrink-0">
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
                                {w.id === 2 && (
                                    <div className="bg-muted p-2 rounded text-xs font-mono">
                                        Data: [1, 2, 3, 4, 5]
                                    </div>
                                )}
                                {w.id === 3 && (
                                    <div className="space-y-2">
                                        <Button size="sm" className="w-full">Save Settings</Button>
                                    </div>
                                )}
                                <Button variant="secondary" size="sm">Dummy Action</Button>
                            </div>
                        </TsWindow>
                    ))}
                </div>
            </TabsContent>

            <TabsContent value="code" className="flex-1 min-h-0 overflow-auto pt-4 data-[state=inactive]:hidden">
                <Card>
                    <CardContent className="pt-6">
                        <pre className="p-4 rounded-lg bg-slate-950 text-slate-50 overflow-auto text-sm">
{`import { TsWindow } from "@/components/ts-web-ui/ts-window"

export default function App() {
  return (
    <div className="relative h-screen">
      <TsWindow 
        title="My Window" 
        defaultLeft={100} 
        defaultTop={100}
        onClose={() => console.log('Closed')}
      >
        <p>Window content goes here...</p>
      </TsWindow>
    </div>
  )
}`}
                        </pre>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="documentation" className="flex-1 min-h-0 overflow-auto pt-4 data-[state=inactive]:hidden">
                <Card>
                    <CardHeader>
                        <CardTitle>TsWindow API</CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-sm dark:prose-invert max-w-none">
                        <h3>Props</h3>
                        <ul>
                            <li><code>title</code>: Titulek okna.</li>
                            <li><code>defaultWidth, defaultHeight</code>: Počáteční rozměry.</li>
                            <li><code>defaultTop, defaultLeft</code>: Počáteční pozice.</li>
                            <li><code>minWidth, minHeight</code>: Minimální rozměry (default 200x100).</li>
                            <li><code>onClose</code>: Callback při zavření.</li>
                            <li><code>onFocus</code>: Callback při kliknutí (pro Z-index management).</li>
                            <li><code>zIndex</code>: CSS z-index.</li>
                            <li><code>initiallyMinimized</code>: Start v minimalizovaném stavu.</li>
                            <li><code>initiallyMaximized</code>: Start v maximalizovaném stavu.</li>
                        </ul>
                        <h3>Ref API</h3>
                        <p>Komponenta vystavuje metody přes ref:</p>
                        <ul>
                            <li><code>minimize()</code>, <code>maximize()</code>, <code>restore()</code></li>
                            <li><code>centerOnScreen()</code>: Vycentruje okno.</li>
                            <li><code>fitToContent()</code>: Přizpůsobí výšku obsahu.</li>
                            <li><code>bringToFront()</code></li>
                        </ul>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
  )
}
