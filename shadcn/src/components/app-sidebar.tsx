"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AppSidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn("pb-12 h-screen border-r", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            TS Web UI
          </h2>
          <div className="space-y-1">
            <Button 
                variant={pathname === "/" ? "secondary" : "ghost"} 
                className="w-full justify-start" 
                asChild
            >
              <Link href="/">Overview</Link>
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Components
          </h2>
          <div className="space-y-1">
             <Button 
                variant={pathname === "/components/ts-window" ? "secondary" : "ghost"} 
                className="w-full justify-start" 
                asChild
            >
              <Link href="/components/ts-window">Window</Link>
            </Button>
            <Button 
                variant={pathname === "/ts-window-demo" ? "secondary" : "ghost"} 
                className="w-full justify-start text-xs text-muted-foreground" 
                asChild
            >
              <Link href="/ts-window-demo">Window Demo (Temp)</Link>
            </Button>
            <Button 
                variant={pathname?.startsWith("/components/ts-table") ? "secondary" : "ghost"} 
                className="w-full justify-start" 
                asChild
            >
              <Link href="/components/ts-table">Table</Link>
            </Button>
            <Button 
                variant={pathname === "/components/ts-form" ? "secondary" : "ghost"} 
                className="w-full justify-start" 
                asChild
            >
              <Link href="/components/ts-form">Form</Link>
            </Button>
            <Button 
                variant={pathname === "/components/ts-form-editor" ? "secondary" : "ghost"} 
                className="w-full justify-start" 
                asChild
            >
              <Link href="/components/ts-form-editor">Form Editor</Link>
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Form Widgets
            </h2>
            <ScrollArea className="h-[300px] px-2">
                <div className="space-y-1 p-2">
                    <Button variant="ghost" className="w-full justify-start h-8 px-2" disabled>
                        Text Input (Coming Soon)
                    </Button>
                    {/* Add more widgets here later */}
                </div>
            </ScrollArea>
        </div>
      </div>
    </div>
  )
}
