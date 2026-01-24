"use client"

import { 
  WindowProvider, 
  useWindowManager, 
  WindowOutlet 
} from "@/components/ts-web-ui/ts-window"
import { Button } from "@/components/ui/button"

// Content component that connects to the window manager context
// to access the current window instance (for buttons to work!)
const WindowContent = ({ id }: { id: string }) => {
    const { getWindow } = useWindowManager()

    return (
        <div className="space-y-4 p-1">
            <p>This is dynamic React content for window <strong>{id}</strong>!</p>
            <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex flex-wrap gap-2">
                <Button size="sm" onClick={() => getWindow(id)?.centerOnScreen()}>
                    Center
                </Button>
                <Button size="sm" variant="outline" onClick={() => getWindow(id)?.minimize()}>
                    Minimize
                </Button>
                <Button size="sm" variant="destructive" onClick={() => getWindow(id)?.close()}>
                    Close
                </Button>
            </div>
            <div className="h-32 bg-muted/50 rounded flex items-center justify-center text-muted-foreground text-xs border border-dashed">
                Scrollable Content Area Placeholder
            </div>
            <p className="text-sm">
            More content to force scroll if window is small.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco.
            </p>
        </div>
    )
}

function MyWindowApp() {
  const { openWindow } = useWindowManager()

  const handleOpen = () => {
    // Generate unique ID
    const id = `win-${Math.random().toString(36).substring(7)}`
    
    // Pass the ID to the content component
    openWindow(
      <WindowContent id={id} />,
      { 
        id,
        title: `Window ${id}`, 
        defaultWidth: 400,
        defaultHeight: 300
      }
    )
  }

  return (
    <div className="h-full w-full flex flex-col gap-4 pb-6">
       {/* Toolbar */}
       <div className="p-4 border rounded-lg bg-card shadow-sm">
           <Button onClick={handleOpen}>Open New Window</Button>
       </div>
       
       {/* Workspace with WindowOutlet */}
       <div className="flex-1 relative border rounded-lg bg-slate-100 dark:bg-slate-950 overflow-hidden shadow-inner">
           <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/20 pointer-events-none font-bold text-4xl select-none">
               WORKSPACE
           </div>
           <WindowOutlet />
       </div>
    </div>
  )
}

export default function Page() {
  return (
    <WindowProvider>
       <MyWindowApp />
    </WindowProvider>
  )
}