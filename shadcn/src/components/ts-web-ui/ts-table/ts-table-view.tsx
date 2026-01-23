"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"

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

interface TsTableViewProps {
  data: any[]
  columnDefinitions: TsTableColumnDef[]
  enableSelection?: boolean
  onRowClick?: (row: any, columnKey?: string) => void
  // State from parent
  sorting: SortingState
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>
  columnFilters: ColumnFiltersState
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>
  columnVisibility: VisibilityState
  setColumnVisibility: React.Dispatch<React.SetStateAction<VisibilityState>>
  rowSelection: Record<string, boolean>
  setRowSelection: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
}

export function TsTableView({
  data,
  columnDefinitions,
  enableSelection = true,
  onRowClick,
  sorting,
  setSorting,
  columnFilters,
  setColumnFilters,
  columnVisibility,
  setColumnVisibility,
  rowSelection,
  setRowSelection,
}: TsTableViewProps) {
  
  // Mapování našich definic na TanStack ColumnDef
  const columns = React.useMemo<ColumnDef<any>[]>(() => {
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
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            onClick={(e) => e.stopPropagation()} // Zabránit row-clicku při kliku na checkbox
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
        header: def.title,
        cell: ({ row }) => {
          const value = row.getValue(def.key)
          
          // Formátování podle typu (zrcadlo původního ts-datatable.js)
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
      })
    })

    return cols
  }, [columnDefinitions, enableSelection, onRowClick])

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="rounded-md border bg-card overflow-hidden">
      <Table>
        <TableHeader className="bg-muted/50">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead 
                    key={header.id}
                    className="h-10 px-4 text-xs font-bold text-muted-foreground uppercase tracking-wider"
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={cn("hover:bg-muted/50 transition-colors cursor-default", onRowClick && "cursor-pointer")}
                onClick={() => onRowClick?.(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="p-3">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Žádné záznamy k zobrazení.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
