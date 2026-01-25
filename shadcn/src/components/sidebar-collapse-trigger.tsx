"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useSidebar } from "@/components/ts-web-ui/ts-sidebar"
import { cn } from "@/lib/utils"

/**
 * Tlačítko pro kolapsování sidebaru
 * Kroužek na středu pravé hrany sidebaru
 * Zobrazuje se pouze na desktopu (ne na mobile)
 */
export function SidebarCollapseTrigger({ className }: { className?: string }) {
  const { isCollapsed, toggleCollapsed, isMobile } = useSidebar()

  // Na mobile nikdy nezobrazovat - mobile sidebar nemá být collapsed
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
