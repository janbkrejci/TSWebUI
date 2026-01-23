"use client"

import * as React from "react"
import { TsWindow } from "@/components/ts-web-ui/ts-window"
import { Button } from "@/components/ui/button"

export default function TsWindowPage() {
  const [windows, setWindows] = React.useState([
    { id: 1, title: "Welcome Window", zIndex: 100, isOpen: true },
    { id: 2, title: "Data Viewer", zIndex: 101, isOpen: false },
    { id: 3, title: "Settings", zIndex: 102, isOpen: false }
  ])

  const bringToFront = (id: number) => {
    setWindows(prev => {
        const maxZ = Math.max(...prev.map(w => w.zIndex))
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

  return (
    <div className="flex flex-col h-full gap-6">
        <div>
            <h1 className="text-3xl font-bold">TS Window</h1>
            <p className="text-muted-foreground mt-2">
                A window component with drag, resize, minimize, maximize, and Z-index management capabilities.
            </p>
        </div>

        <div className="flex gap-2 p-4 border rounded-lg bg-card">
            <Button onClick={() => openWindow(1)} disabled={windows.find(w => w.id === 1)?.isOpen}>Open Welcome</Button>
            <Button onClick={() => openWindow(2)} disabled={windows.find(w => w.id === 2)?.isOpen}>Open Data</Button>
            <Button onClick={() => openWindow(3)} disabled={windows.find(w => w.id === 3)?.isOpen}>Open Settings</Button>
        </div>

        {/* Workspace area */}
        <div className="flex-1 relative border rounded-lg bg-slate-100 dark:bg-slate-950 overflow-hidden shadow-inner min-h-[500px]">
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
                    defaultLeft={50 + w.id * 40}
                    defaultTop={50 + w.id * 40}
                    defaultWidth={w.id === 3 ? 300 : 400}
                    defaultHeight={w.id === 3 ? 200 : 300}
                >
                    <div className="space-y-4">
                        <p>This is content for <strong>{w.title}</strong>.</p>
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
    </div>
  )
}
