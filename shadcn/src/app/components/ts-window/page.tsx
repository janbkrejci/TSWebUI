"use client"

import * as React from "react"
import { TsWindow, TsWindowRef, WindowProvider, useWindowManager, WindowOutlet } from "@/components/ts-web-ui/ts-window"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

const WindowControls = ({ windowId }: { windowId: string }) => {
    const { getWindow } = useWindowManager()
    
    return (
        <div className="bg-muted/50 p-3 rounded-md border text-xs mt-4">
            <p className="font-semibold mb-2">Imperative API Control:</p>
            <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => getWindow(windowId)?.minimize()}>Minimize</Button>
                <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => getWindow(windowId)?.maximize()}>Maximize</Button>
                <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => getWindow(windowId)?.restore()}>Restore</Button>
                <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => getWindow(windowId)?.centerOnScreen()}>Center</Button>
                <Button variant="outline" size="sm" className="h-7 text-xs col-span-2" onClick={() => getWindow(windowId)?.fitToContent()}>Fit to Content</Button>
            </div>
        </div>
    )
}

function TsWindowDemo() {
  const { openWindow, windows } = useWindowManager()
  
  const openWelcomeWindow = () => {
    const id = "welcome"
    openWindow(
        <div className="space-y-4">
            <p>This is content for <strong>Welcome Window</strong>.</p>
            <p className="text-sm text-muted-foreground">
                Try dragging this window, resizing it, or minimizing/maximizing it.
            </p>
            <WindowControls windowId={id} />
        </div>,
        { 
            id, 
            title: "Welcome Window", 
            defaultLeft: 50, 
            defaultTop: 50 
        }
    )
  }

  const openDataWindow = () => {
    const id = "data"
    openWindow(
        <div className="space-y-4">
            <p>This is content for <strong>Data Viewer</strong>.</p>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded text-xs font-mono border border-blue-100 dark:border-blue-800 text-foreground">
                Data: [1, 2, 3, 4, 5]
            </div>
            <WindowControls windowId={id} />
        </div>,
        { 
            id, 
            title: "Data Viewer", 
            defaultLeft: 80, 
            defaultTop: 80 
        }
    )
  }

  const openSettingsWindow = () => {
    const id = "settings"
    openWindow(
        <div className="space-y-4">
            <p>Settings configuration.</p>
            <Button size="sm" className="w-full">Save Settings</Button>
            <WindowControls windowId={id} />
        </div>,
        { 
            id, 
            title: "Settings", 
            defaultWidth: 300,
            defaultHeight: 200,
            defaultLeft: 110, 
            defaultTop: 110 
        }
    )
  }

  const createNewWindow = () => {
      const newId = `new-${Math.random().toString(36).substring(7)}`
      openWindow(
          <div className="space-y-4">
              <p>Dynamic window content.</p>
              <WindowControls windowId={newId} />
          </div>,
          {
              id: newId,
              title: "New Window",
              defaultLeft: 150 + Math.random() * 50,
              defaultTop: 150 + Math.random() * 50
          }
      )
  }

  // Check if windows are open to disable buttons
  const isWelcomeOpen = windows.some(w => w.id === "welcome")
  const isDataOpen = windows.some(w => w.id === "data")
  const isSettingsOpen = windows.some(w => w.id === "settings")

  // Open default windows on mount
  React.useEffect(() => {
      // Small delay to ensure layout is ready
      const t = setTimeout(() => {
          if (!isWelcomeOpen) openWelcomeWindow()
      }, 100)
      return () => clearTimeout(t)
  }, []) // run once

  return (
    <div className="flex-1 flex flex-col gap-4 min-h-0 data-[state=inactive]:hidden text-foreground">
        <div className="flex flex-wrap gap-2 p-4 border rounded-lg bg-card items-center shrink-0 shadow-sm">
            <Button onClick={openWelcomeWindow} disabled={isWelcomeOpen}>Open Welcome</Button>
            <Button onClick={openDataWindow} disabled={isDataOpen}>Open Data</Button>
            <Button onClick={openSettingsWindow} disabled={isSettingsOpen}>Open Settings</Button>
            <div className="h-6 w-px bg-border mx-2" />
            <Button onClick={createNewWindow} variant="secondary">
                <Plus className="w-4 h-4 mr-2" />
                Create New Window
            </Button>
        </div>

        {/* Added select-none to the workspace container */}
        <div className="flex-1 relative border rounded-lg bg-slate-100 dark:bg-slate-950 overflow-hidden shadow-inner h-full select-none">
            <div className="absolute inset-0 p-8 pointer-events-none">
                <div className="h-full w-full border-2 border-dashed border-slate-300 dark:border-slate-800 rounded flex items-center justify-center text-slate-400">
                    Window Workspace Area (Select text disabled)
                </div>
            </div>
            
            {/* Windows are rendered here via WindowOutlet */}
            <WindowOutlet />
        </div>
    </div>
  )
}

export default function TsWindowPage() {
  const codeString = `"use client"

import * as React from "react"
import { 
  WindowProvider, 
  useWindowManager, 
  WindowOutlet 
} from "@/components/ts-web-ui/ts-window"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const WindowControls = ({ windowId }: { windowId: string }) => {
    const { getWindow } = useWindowManager()
    
    return (
        <div className="bg-muted/50 p-3 rounded-md border text-xs mt-4">
            <p className="font-semibold mb-2">Imperative API Control:</p>
            <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => getWindow(windowId)?.minimize()}>Minimize</Button>
                <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => getWindow(windowId)?.maximize()}>Maximize</Button>
                <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => getWindow(windowId)?.restore()}>Restore</Button>
                <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => getWindow(windowId)?.centerOnScreen()}>Center</Button>
                <Button variant="outline" size="sm" className="h-7 text-xs col-span-2" onClick={() => getWindow(windowId)?.fitToContent()}>Fit to Content</Button>
            </div>
        </div>
    )
}

function TsWindowDemo() {
  const { openWindow, windows } = useWindowManager()
  
  const openWelcomeWindow = () => {
    const id = "welcome"
    openWindow(
        <div className="space-y-4">
            <p>This is content for <strong>Welcome Window</strong>.</p>
            <p className="text-sm text-muted-foreground">
                Try dragging this window, resizing it, or minimizing/maximizing it.
            </p>
            <WindowControls windowId={id} />
        </div>,
        { 
            id, 
            title: "Welcome Window", 
            defaultLeft: 50, 
            defaultTop: 50 
        }
    )
  }

  const openDataWindow = () => {
    const id = "data"
    openWindow(
        <div className="space-y-4">
            <p>This is content for <strong>Data Viewer</strong>.</p>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded text-xs font-mono border border-blue-100 dark:border-blue-800 text-foreground">
                Data: [1, 2, 3, 4, 5]
            </div>
            <WindowControls windowId={id} />
        </div>,
        { 
            id, 
            title: "Data Viewer", 
            defaultLeft: 80, 
            defaultTop: 80 
        }
    )
  }

  const openSettingsWindow = () => {
    const id = "settings"
    openWindow(
        <div className="space-y-4">
            <p>Settings configuration.</p>
            <Button size="sm" className="w-full">Save Settings</Button>
            <WindowControls windowId={id} />
        </div>,
        { 
            id, 
            title: "Settings", 
            defaultWidth: 300,
            defaultHeight: 200,
            defaultLeft: 110, 
            defaultTop: 110 
        }
    )
  }

  const createNewWindow = () => {
      const newId = \`new-\${Math.random().toString(36).substring(7)}\`
      openWindow(
          <div className="space-y-4">
              <p>Dynamic window content.</p>
              <WindowControls windowId={newId} />
          </div>,
          {
              id: newId,
              title: "New Window",
              defaultLeft: 150 + Math.random() * 50,
              defaultTop: 150 + Math.random() * 50
          }
      )
  }

  const isWelcomeOpen = windows.some(w => w.id === "welcome")
  const isDataOpen = windows.some(w => w.id === "data")
  const isSettingsOpen = windows.some(w => w.id === "settings")

  // Open default windows on mount
  React.useEffect(() => {
      const t = setTimeout(() => {
          if (!isWelcomeOpen) openWelcomeWindow()
      }, 100)
      return () => clearTimeout(t)
  }, [])

  return (
    <div className="flex-1 flex flex-col gap-4 min-h-0 pt-4 text-foreground">
        <div className="flex flex-wrap gap-2 p-4 border rounded-lg bg-card items-center shrink-0 shadow-sm">
            <Button onClick={openWelcomeWindow} disabled={isWelcomeOpen}>Open Welcome</Button>
            <Button onClick={openDataWindow} disabled={isDataOpen}>Open Data</Button>
            <Button onClick={openSettingsWindow} disabled={isSettingsOpen}>Open Settings</Button>
            <div className="h-6 w-px bg-border mx-2" />
            <Button onClick={createNewWindow} variant="secondary">
                <Plus className="w-4 h-4 mr-2" />
                Create New Window
            </Button>
        </div>

        <div className="flex-1 relative border rounded-lg bg-slate-100 dark:bg-slate-950 overflow-hidden shadow-inner h-full select-none">
            <div className="absolute inset-0 p-8 pointer-events-none">
                <div className="h-full w-full border-2 border-dashed border-slate-300 dark:border-slate-800 rounded flex items-center justify-center text-slate-400">
                    Window Workspace Area (Select text disabled)
                </div>
            </div>
            
            <WindowOutlet />
        </div>
    </div>
  )
}

export default function Page() {
  return (
    <WindowProvider>
       <TsWindowDemo />
    </WindowProvider>
  )
}`

  return (
    <div className="flex flex-col flex-1 gap-6 min-h-0">
        <div className="shrink-0">
            <h1 className="text-3xl font-bold tracking-tight">TS Window</h1>
            <p className="text-muted-foreground mt-2">
                A professional window component with drag, resize, minimize, maximize, and Z-index management.
            </p>
        </div>

        <Tabs defaultValue="preview" className="flex-1 flex flex-col min-h-0">
            <TabsList className="shrink-0 w-fit">
                <TabsTrigger value="preview">Preview</TabsTrigger>
                <TabsTrigger value="code">Code</TabsTrigger>
                <TabsTrigger value="documentation">Documentation</TabsTrigger>
            </TabsList>

            <TabsContent value="preview" className="flex-1 flex flex-col min-h-0 pt-4">
                 <WindowProvider>
                     <TsWindowDemo />
                 </WindowProvider>
            </TabsContent>

            <TabsContent value="code" className="flex-1 min-h-0 overflow-auto py-6 data-[state=inactive]:hidden">
                <Card className="max-w-5xl mx-auto w-full">
                    <CardHeader>
                        <CardTitle>Usage with WindowManager</CardTitle>
                        <CardDescription>
                            The <code>WindowProvider</code>, <code>WindowOutlet</code> and <code>useWindowManager</code> hook work together to provide a robust windowing system.
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

            <TabsContent value="documentation" className="flex-1 min-h-0 overflow-auto pt-4 data-[state=inactive]:hidden text-foreground">
                <div className="space-y-8 pb-8 max-w-5xl mx-auto w-full">
                    <Card>
                        <CardHeader>
                            <CardTitle>Window Manager API</CardTitle>
                            <CardDescription>
                                Methods available from <code>useWindowManager()</code>.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[250px]">Method</TableHead>
                                        <TableHead>Description</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-mono text-xs font-semibold text-primary">openWindow(content, options)</TableCell>
                                        <TableCell>
                                            Opens a new window with the provided React content. 
                                            If an <code>id</code> is provided and already exists, the window is brought to front.
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-mono text-xs font-semibold text-primary">closeWindow(id)</TableCell>
                                        <TableCell>Closes the window with the specified ID.</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-mono text-xs font-semibold text-primary">getWindow(id)</TableCell>
                                        <TableCell>Returns the <code>TsWindowRef</code> for the specified window, allowing imperative control.</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-mono text-xs font-semibold text-primary">windows</TableCell>
                                        <TableCell>An array of currently open window objects.</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Imperative API (TsWindowRef)</CardTitle>
                            <CardDescription>Methods available on the window reference (retrieved via <code>getWindow(id)</code>).</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[250px]">Method</TableHead>
                                        <TableHead>Description</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-mono text-xs font-semibold text-primary">minimize()</TableCell>
                                        <TableCell>Minimizes the window.</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-mono text-xs font-semibold text-primary">maximize()</TableCell>
                                        <TableCell>Maximizes the window to fill its container.</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-mono text-xs font-semibold text-primary">restore()</TableCell>
                                        <TableCell>Restores the window from minimized or maximized state.</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-mono text-xs font-semibold text-primary">close()</TableCell>
                                        <TableCell>Closes the window.</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-mono text-xs font-semibold text-primary">centerOnScreen()</TableCell>
                                        <TableCell>Centers the window within its parent container.</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-mono text-xs font-semibold text-primary">fitToContent()</TableCell>
                                        <TableCell>Adjusts the window height to match its content scroll height.</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-mono text-xs font-semibold text-primary">bringToFront()</TableCell>
                                        <TableCell>Increments the window's Z-index to place it above others.</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>TsWindow Properties</CardTitle>
                            <CardDescription>Available props for configuring the window (passed as the second argument to <code>openWindow</code>).</CardDescription>
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
                                        <TableCell className="font-mono text-xs">id</TableCell>
                                        <TableCell className="text-xs italic">string | number</TableCell>
                                        <TableCell>Unique identifier for the window.</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-mono text-xs">title</TableCell>
                                        <TableCell className="text-xs italic">string</TableCell>
                                        <TableCell>Title displayed in the header bar.</TableCell>
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
                                        <TableCell>Initial Y position (default: 100).</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-mono text-xs">defaultLeft</TableCell>
                                        <TableCell className="text-xs italic">number</TableCell>
                                        <TableCell>Initial X position (default: 100).</TableCell>
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
                                        <TableCell className="font-mono text-xs">zIndex</TableCell>
                                        <TableCell className="text-xs italic">number</TableCell>
                                        <TableCell>Initial Z-index value.</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-mono text-xs">initiallyMinimized</TableCell>
                                        <TableCell className="text-xs italic">boolean</TableCell>
                                        <TableCell>Start the window in minimized state.</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-mono text-xs">initiallyMaximized</TableCell>
                                        <TableCell className="text-xs italic">boolean</TableCell>
                                        <TableCell>Start the window in maximized state.</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-mono text-xs">onClose</TableCell>
                                        <TableCell className="text-xs italic">() =&gt; void</TableCell>
                                        <TableCell>Callback when the window is closed.</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-mono text-xs">onFocus</TableCell>
                                        <TableCell className="text-xs italic">() =&gt; void</TableCell>
                                        <TableCell>Callback when the window gains focus.</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-mono text-xs">className</TableCell>
                                        <TableCell className="text-xs italic">string</TableCell>
                                        <TableCell>Additional CSS classes for the window container.</TableCell>
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