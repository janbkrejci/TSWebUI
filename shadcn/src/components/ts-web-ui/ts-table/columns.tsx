"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { numberFilter, dateFilter, booleanFilter } from "./filters"

export interface TsTableColumnDef {
  key: string
  title: string
  type?: "text" | "number" | "date" | "boolean"
  sortable?: boolean
  filterable?: boolean
  visible?: boolean
  width?: number | string
  align?: "left" | "center" | "right"
  canBeCopied?: boolean
  isClickable?: boolean
}

export function generateColumns(
    columnDefinitions: TsTableColumnDef[], 
    enableSelection: boolean,
    onRowClick?: (row: any, columnKey?: string) => void
): ColumnDef<any>[] {
    const cols: ColumnDef<any>[] = []

    // 1. Selection column
    if (enableSelection) {
      cols.push({
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
            className="translate-y-[2px]"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            onClick={(e) => e.stopPropagation()}
            className="translate-y-[2px]"
          />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 40,
      })
    }

    // 2. Data columns
    columnDefinitions.forEach((def) => {
      cols.push({
        accessorKey: def.key,
        header: ({ column }) => {
            return (
                <div className={cn("flex items-center space-x-2", def.align === "center" && "justify-center", def.align === "right" && "justify-end")}>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="-ml-3 h-8 data-[state=open]:bg-accent"
                        onClick={() => def.sortable !== false && column.toggleSorting(column.getIsSorted() === "asc")}
                        disabled={def.sortable === false}
                    >
                        <span>{def.title}</span>
                        {def.sortable !== false && (
                            column.getIsSorted() === "desc" ? (
                                <ArrowDown className="ml-2 h-4 w-4" />
                            ) : column.getIsSorted() === "asc" ? (
                                <ArrowUp className="ml-2 h-4 w-4" />
                            ) : (
                                <ArrowUpDown className="ml-2 h-4 w-4 opacity-50" />
                            )
                        )}
                    </Button>
                </div>
            )
        },
        cell: ({ row }) => {
          const value = row.getValue(def.key)
          
          let formattedValue: React.ReactNode = String(value ?? "")
          
          if (def.type === "number" && typeof value === "number") {
             formattedValue = value.toLocaleString("cs-CZ", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
          } else if (def.type === "date" && value) {
             formattedValue = new Date(value as string).toLocaleDateString("cs-CZ")
          } else if (def.type === "boolean") {
             formattedValue = (
                <div className={cn("flex", def.align === "center" && "justify-center", def.align === "right" && "justify-end")}>
                    <Checkbox checked={!!value} disabled className="opacity-70 cursor-default" />
                </div>
             )
          }

          return (
            <div 
              className={cn(
                "truncate",
                def.align === "center" && "text-center",
                def.align === "right" && "text-right",
                def.isClickable && "text-primary hover:underline cursor-pointer font-medium"
              )}
              onClick={() => def.isClickable && onRowClick?.(row.original, def.key)}
            >
              {formattedValue}
            </div>
          )
        },
        enableSorting: def.sortable ?? true,
        enableColumnFilter: def.filterable ?? true,
        size: typeof def.width === "number" ? def.width : 200,
        filterFn: (row, id, value) => {
             if (def.type === 'number') return numberFilter(row, id, value)
             if (def.type === 'date') return dateFilter(row, id, value)
             if (def.type === 'boolean') return booleanFilter(row, id, value)

             // Custom simple filter logic mirroring original behavior (case insensitive contains)
             const rowValue = String(row.getValue(id) ?? "").toLowerCase()
             const filterValue = String(value ?? "").toLowerCase()
             return rowValue.includes(filterValue)
        },
        meta: {
            // Uložíme si typ pro použití v UI (např. renderování boolean selectu)
            type: def.type
        }
      })
    })

    return cols
}
