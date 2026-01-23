"use client"

import * as React from "react"
import { Rnd, RndResizeCallback, RndDragCallback } from "react-rnd"
import { X, Minus, Square, Copy } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface TsWindowProps {
  title?: string
  defaultWidth?: number
  defaultHeight?: number
  defaultTop?: number
  defaultLeft?: number
  minWidth?: number
  minHeight?: number
  children?: React.ReactNode
  onClose?: () => void
  className?: string
  zIndex?: number
  onFocus?: () => void
  initiallyMinimized?: boolean
  initiallyMaximized?: boolean
}

type WindowState = "normal" | "minimized" | "maximized"

interface Rect {
  width: number
  height: number
  x: number
  y: number
}

export function TsWindow({
  title = "Window",
  defaultWidth = 400,
  defaultHeight = 300,
  defaultTop = 100,
  defaultLeft = 100,
  minWidth = 200,
  minHeight = 100,
  children,
  onClose,
  className,
  zIndex = 100,
  onFocus,
  initiallyMinimized = false,
  initiallyMaximized = false,
}: TsWindowProps) {
  const [windowState, setWindowState] = React.useState<WindowState>(
    initiallyMaximized ? "maximized" : initiallyMinimized ? "minimized" : "normal"
  )
  
  // Aktuální pozice a velikost pro Rnd
  const [size, setSize] = React.useState({ width: defaultWidth, height: defaultHeight })
  const [position, setPosition] = React.useState({ x: defaultLeft, y: defaultTop })

  // Uložení stavu před maximalizací/minimalizací pro restore
  const [restoreRect, setRestoreRect] = React.useState<Rect | null>(null)

  // Reference na obsah pro auto-size
  const contentRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (initiallyMaximized) {
        setRestoreRect({ width: defaultWidth, height: defaultHeight, x: defaultLeft, y: defaultTop })
        setSize({ width: window.innerWidth, height: window.innerHeight })
        setPosition({ x: 0, y: 0 })
    }
  }, [initiallyMaximized, defaultWidth, defaultHeight, defaultLeft, defaultTop])

  const handleMinimize = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (windowState === "minimized") {
      restore()
      return
    }

    // Uložíme aktuální stav, pokud nejsme už maximalizovaní (tam už uložený je)
    if (windowState === "normal") {
      setRestoreRect({ ...size, ...position })
    }

    setWindowState("minimized")
    // Fixní velikost pro minimalizované okno
    setSize({ width: 200, height: 40 }) // 40px cca výška headeru
  }

  const handleMaximize = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (windowState === "maximized") {
      restore()
      return
    }

    // Uložíme aktuální stav
    if (windowState === "normal") {
      setRestoreRect({ ...size, ...position })
    }

    setWindowState("maximized")
    setSize({ width: window.innerWidth, height: window.innerHeight })
    setPosition({ x: 0, y: 0 })
  }

  const restore = () => {
    if (!restoreRect) return

    setWindowState("normal")
    setSize({ width: restoreRect.width, height: restoreRect.height })
    // Pozici obnovíme jen pokud jsme byli maximalizovaní, nebo pokud chceme vrátit i pozici po minimalizaci
    // V původním kódu: minimalizace nemění pozici (jen velikost), ale tady Rnd mění obojí.
    // Takže musíme obnovit i pozici.
    setPosition({ x: restoreRect.x, y: restoreRect.y })
  }

  const handleDragStop: RndDragCallback = (e, d) => {
    setPosition({ x: d.x, y: d.y })
  }

  const handleResizeStop: RndResizeCallback = (e, direction, ref, delta, position) => {
    setSize({
      width: Number.parseInt(ref.style.width),
      height: Number.parseInt(ref.style.height),
    })
    setPosition(position)
  }

  // Double click na header -> maximize
  const handleHeaderDoubleClick = () => {
    if (windowState === "minimized") return
    if (windowState === "maximized") restore()
    else handleMaximize()
  }

  // Auto-size (double click na resize handle - simulace)
  // Rnd nemá přímý support pro double click na handle, ale můžeme zkusit custom handle.
  // Pro zjednodušení v této fázi přidáme tlačítko "Auto Size" do headeru nebo to vynecháme, 
  // jelikož shadcn nemá standardizovaný "resize handle" element.
  // Ale původní požadavek byl "double click na SE handle". 
  // Rnd renderuje handle jako divy. Můžeme se pokusit připojit přes ref, ale je to hacky.
  // Alternativa: Přidáme malou ikonku do rohu obsahu pro auto-size.

  return (
    <Rnd
      size={size}
      position={position}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      onDragStart={onFocus}
      onMouseDown={onFocus}
      minWidth={windowState === "minimized" ? 200 : minWidth}
      minHeight={windowState === "minimized" ? 40 : minHeight}
      disableDragging={windowState === "maximized"}
      enableResizing={windowState === "normal"}
      dragHandleClassName="window-drag-handle"
      bounds="parent"
      style={{ zIndex }}
      className={cn(
        "flex flex-col overflow-hidden rounded-lg border bg-background shadow-xl transition-all duration-100 ease-in-out",
        windowState === "maximized" && "rounded-none border-none",
        className
      )}
    >
      {/* Header / Titlebar */}
      <div
        className={cn(
          "window-drag-handle flex h-10 shrink-0 items-center justify-between border-b bg-muted px-3 select-none",
          windowState !== "maximized" && "cursor-move"
        )}
        onDoubleClick={handleHeaderDoubleClick}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          {/* Mac-like buttons mimic or just functional icons? Let's go functional but clean */}
           <div className="flex gap-1.5 mr-2">
             <div 
                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 cursor-pointer flex items-center justify-center group"
                onClick={(e) => { e.stopPropagation(); onClose?.() }}
             >
                <X className="w-2 h-2 text-red-900 opacity-0 group-hover:opacity-100" />
             </div>
             <div 
                className={cn("w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 cursor-pointer flex items-center justify-center group")}
                onClick={handleMinimize}
             >
                 <Minus className="w-2 h-2 text-yellow-900 opacity-0 group-hover:opacity-100" />
             </div>
             <div 
                className={cn("w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 cursor-pointer flex items-center justify-center group", windowState === "minimized" && "bg-gray-400 pointer-events-none")}
                onClick={handleMaximize}
             >
                 {windowState === "maximized" ? (
                     <Copy className="w-2 h-2 text-green-900 opacity-0 group-hover:opacity-100 rotate-180" />
                 ) : (
                     <Square className="w-2 h-2 text-green-900 opacity-0 group-hover:opacity-100 fill-current" />
                 )}
             </div>
           </div>
           
           <span className="text-sm font-medium truncate opacity-90">
             {title}
           </span>
        </div>
      </div>

      {/* Content */}
      <div 
        ref={contentRef}
        className={cn(
            "flex-1 overflow-auto bg-background p-4",
            windowState === "minimized" && "hidden"
        )}
      >
        {children}
      </div>
    </Rnd>
  )
}
