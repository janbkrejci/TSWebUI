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

export interface TsWindowRef {
    minimize: () => void
    maximize: () => void
    restore: () => void
    close: () => void
    centerOnScreen: () => void
    fitToContent: (animate?: boolean) => void
    bringToFront: () => void
}

type WindowState = "normal" | "minimized" | "maximized"

interface Rect {
  width: number
  height: number
  x: number
  y: number
}

export const TsWindow = React.forwardRef<TsWindowRef, TsWindowProps>(({
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
}, ref) => {
  const [windowState, setWindowState] = React.useState<WindowState>(
    initiallyMaximized ? "maximized" : initiallyMinimized ? "minimized" : "normal"
  )
  
  // States for interaction tracking to disable CSS transitions during drag/resize
  const [isDragging, setIsDragging] = React.useState(false)
  const [isResizing, setIsResizing] = React.useState(false)
  
  // Aktuální pozice a velikost pro Rnd
  const [size, setSize] = React.useState({ width: defaultWidth, height: defaultHeight })
  const [position, setPosition] = React.useState({ x: defaultLeft, y: defaultTop })

  // Uložení stavu před maximalizací/minimalizací pro restore
  const [restoreRect, setRestoreRect] = React.useState<Rect | null>(null)

  // Uložení pozice minimalizovaného okna
  const [minimizedPosition, setMinimizedPosition] = React.useState<{ x: number; y: number } | null>(null)

  // Reference
  const contentRef = React.useRef<HTMLDivElement>(null)
  const rndRef = React.useRef<Rnd>(null)

  const getParentSize = React.useCallback(() => {
      if (typeof window === 'undefined') return { width: 1024, height: 768 } // SSR fallback
      
      if (rndRef.current) {
          const el = rndRef.current.getSelfElement()
          const parent = el?.parentElement
          if (parent) {
              const rect = parent.getBoundingClientRect()
              return { width: rect.width, height: rect.height }
          }
      }
      return { width: window.innerWidth, height: window.innerHeight }
  }, [])

  React.useEffect(() => {
    if (initiallyMaximized) {
        setRestoreRect({ width: defaultWidth, height: defaultHeight, x: defaultLeft, y: defaultTop })
        // Delay getting parent size to ensure DOM is ready
        requestAnimationFrame(() => {
            const { width, height } = getParentSize()
            setSize({ width, height })
            setPosition({ x: 0, y: 0 })
        })
    }
  }, [initiallyMaximized, defaultWidth, defaultHeight, defaultLeft, defaultTop, getParentSize])

  const restore = () => {
    if (!restoreRect) return

    setWindowState("normal")
    setSize({ width: restoreRect.width, height: restoreRect.height })
    setPosition({ x: restoreRect.x, y: restoreRect.y })
  }

  const handleMinimize = () => {
    if (windowState === "minimized") {
      restore()
      return
    }
    if (windowState === "normal") {
      setRestoreRect({ ...size, ...position })
    }
    
    setWindowState("minimized")
    setSize({ width: 200, height: 40 })

    if (minimizedPosition) {
        setPosition(minimizedPosition)
    }
  }

  const handleMaximize = () => {
    if (windowState === "maximized") {
      restore()
      return
    }
    if (windowState === "normal") {
      setRestoreRect({ ...size, ...position })
    }
    
    const { width, height } = getParentSize()
    
    setWindowState("maximized")
    setSize({ width, height })
    setPosition({ x: 0, y: 0 })
  }

  // Expose API via ref
  React.useImperativeHandle(ref, () => ({
      minimize: handleMinimize,
      maximize: handleMaximize,
      restore: restore,
      close: () => onClose?.(),
      centerOnScreen: () => {
          if (typeof window === 'undefined') return
          
          let currentWidth = size.width
          let currentHeight = size.height
          
          if (rndRef.current) {
              const el = rndRef.current.getSelfElement()
              if (el) {
                  const rect = el.getBoundingClientRect()
                  currentWidth = rect.width
                  currentHeight = rect.height
              }
          }

          if (windowState !== 'maximized') {
              const { width: parentW, height: parentH } = getParentSize()
              
              const newX = (parentW - currentWidth) / 2
              const newY = (parentH - currentHeight) / 2
              
              setPosition({ x: newX, y: newY })
          }
      },
      fitToContent: () => {
          if (contentRef.current && windowState !== 'minimized') {
              const contentHeight = contentRef.current.scrollHeight
              setSize(prev => ({ ...prev, height: contentHeight + 40 }))
          }
      },
      bringToFront: () => onFocus?.()
  }))

  const setGlobalUserSelect = (val: string) => {
      document.body.style.userSelect = val
      document.documentElement.style.userSelect = val
  }

  const handleDragStart: RndDragCallback = (e, d) => {
    setIsDragging(true)
    setGlobalUserSelect('none')
    onFocus?.()
  }

  const handleDragStop: RndDragCallback = (e, d) => {
    setIsDragging(false)
    setGlobalUserSelect('')
    const newPos = { x: d.x, y: d.y }
    setPosition(newPos)

    if (windowState === "minimized") {
        setMinimizedPosition(newPos)
    }
  }

  const handleResizeStart = () => {
    setIsResizing(true)
    setGlobalUserSelect('none')
  }

  const handleResizeStop: RndResizeCallback = (e, direction, ref, delta, position) => {
    setIsResizing(false)
    setGlobalUserSelect('')
    setSize({
      width: Number.parseInt(ref.style.width),
      height: Number.parseInt(ref.style.height),
    })
    setPosition(position)
  }

  const handleHeaderDoubleClick = () => {
    if (windowState === "minimized") {
      restore()
      return
    }
    if (windowState === "maximized") restore()
    else handleMaximize()
  }

  return (
    <Rnd
      ref={rndRef}
      size={size}
      position={position}
      onDragStart={handleDragStart}
      onDragStop={handleDragStop}
      onResizeStart={handleResizeStart}
      onResizeStop={handleResizeStop}
      onMouseDown={onFocus}
      minWidth={windowState === "minimized" ? 200 : minWidth}
      minHeight={windowState === "minimized" ? 40 : minHeight}
      disableDragging={windowState === "maximized"}
      enableResizing={windowState === "normal"}
      dragHandleClassName="window-drag-handle"
      style={{ zIndex }}
      className={cn(
        "flex flex-col overflow-hidden rounded-lg border bg-background shadow-xl ease-in-out select-none",
        // Apply transition ONLY when NOT dragging or resizing
        (!isDragging && !isResizing) && "transition-all duration-200",
        windowState === "maximized" && "rounded-none border-none",
        className
      )}
    >
      {/* Header / Titlebar */}
      <div
        className={cn(
          "window-drag-handle flex h-10 shrink-0 items-center justify-between border-b bg-muted px-3 select-none",
          windowState === "maximized" ? "cursor-default" : "cursor-move"
        )}
        onDoubleClick={handleHeaderDoubleClick}
      >
        <div className="flex items-center gap-2 overflow-hidden">
           <div className="flex gap-1.5 mr-2">
             <div 
                className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 cursor-pointer flex items-center justify-center group"
                onClick={(e) => { e.stopPropagation(); onClose?.() }}
             >
                <X className="w-2 h-2 text-red-900 opacity-0 group-hover:opacity-100" />
             </div>
             <div 
                className={cn(
                    "w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 cursor-pointer flex items-center justify-center group",
                    windowState === "maximized" && "bg-gray-400 pointer-events-none opacity-50"
                )}
                onClick={(e) => { e.stopPropagation(); handleMinimize() }}
             >
                 <Minus className="w-2 h-2 text-yellow-900 opacity-0 group-hover:opacity-100" />
             </div>
             <div 
                className={cn("w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 cursor-pointer flex items-center justify-center group", windowState === "minimized" && "bg-gray-400 pointer-events-none")}
                onClick={(e) => { e.stopPropagation(); handleMaximize() }}
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
})
TsWindow.displayName = "TsWindow"
