"use client"

import * as React from "react"
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { TsTableView, TsTableColumnDef } from "./ts-table-view"
import { TsTableToolbar } from "./ts-table-toolbar"
import { TsTablePagination } from "./ts-table-pagination"

export interface TsTableProps {
  data: any[]
  columnDefinitions: TsTableColumnDef[]
  title?: string
  showCreateButton?: boolean
  showImportButton?: boolean
  showExportButton?: boolean
  showColumnSelector?: boolean
  enableSelection?: boolean
  onRowClick?: (row: any, columnKey?: string) => void
  onCreateClick?: () => void
  pageSize?: number
  pageSizeOptions?: number[]
}

export function TsTable({
  data: initialData,
  columnDefinitions,
  title,
  showCreateButton = true,
  showImportButton = true,
  showExportButton = true,
  showColumnSelector = true,
  enableSelection = true,
  onRowClick,
  onCreateClick,
  pageSize = 10,
  pageSizeOptions = [5, 10, 20, 50, 100],
}: TsTableProps) {
  const [data, setData] = React.useState(initialData)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(
    columnDefinitions.reduce((acc, col) => {
      if (col.visible === false) acc[col.key] = false
      return acc
    }, {} as VisibilityState)
  )
  const [rowSelection, setRowSelection] = React.useState({})
  const [globalFilter, setGlobalFilter] = React.useState("")

  // Update data if initialData changes
  React.useEffect(() => {
    setData(initialData)
  }, [initialData])

  const table = useReactTable({
    data,
    columns: [], // Bude vygenerováno uvnitř TsTableView, nebo bychom ho mohli generovat zde
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: pageSize,
      },
    },
  })

  const handleImport = (newData: any[]) => {
      setData(prev => [...prev, ...newData])
  }

  return (
    <div className="w-full space-y-4">
      <TsTableToolbar 
        table={table} 
        title={title}
        showCreateButton={showCreateButton}
        showImportButton={showImportButton}
        showExportButton={showExportButton}
        showColumnSelector={showColumnSelector}
        onCreateClick={onCreateClick}
        onImportClick={handleImport}
      />
      <TsTableView 
        data={data}
        columnDefinitions={columnDefinitions}
        enableSelection={enableSelection}
        onRowClick={onRowClick}
        sorting={sorting}
        setSorting={setSorting}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        columnVisibility={columnVisibility}
        setColumnVisibility={setColumnVisibility}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
      />
      <TsTablePagination table={table} pageSizeOptions={pageSizeOptions} />
    </div>
  )
}
