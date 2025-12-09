'use client'

import React, { useState } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  Column,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ArrowUpDown, ArrowDown, ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { parseAsSort } from './use-sorting-search-params'
import { useQueryState } from 'nuqs'

type Payment = {
  name: string
  status: string
  amount: number
}

const defaultData: Payment[] = [
  {
    name: 'Invoice 1',
    status: 'Paid',
    amount: 25,
  },
  {
    name: 'Invoice 2',
    status: 'Pending',
    amount: 10,
  },
  {
    name: 'Invoice 3',
    status: 'Failed',
    amount: 25,
  },
]

const columnHelper = createColumnHelper<Payment>()

const SortingHeader = ({ column }: { column: Column<Payment> }) => {
  const isSorted = column.getIsSorted()
  return (
    <Button variant="ghost" onClick={() => {
      column.toggleSorting(undefined, true)
    }}>
      {column.id}
      {isSorted === "asc" ? <ArrowUp /> : isSorted === "desc" ? <ArrowDown /> : <ArrowUpDown />}
    </Button>
  )
}

const columns = [
  columnHelper.accessor('name', {
    cell: (info) => <span>{info.getValue()}</span>,
    header: SortingHeader,
  }),
  columnHelper.accessor('status', {
    header: SortingHeader,
  }),
  columnHelper.accessor('amount', {
    header: SortingHeader,
  }),
]

export default function Page() {
  const [data, _setData] = React.useState(() => [...defaultData])
  const [sorting, setSorting] = useQueryState('sorting', parseAsSort.withDefault([]));

  console.log(sorting)
  const table = useReactTable({
    data,
    columns,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  })

  return (
    <div className="container mx-auto py-10">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}