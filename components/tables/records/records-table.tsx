'use client'

import * as React from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useDataTable } from '@/hooks/use-data-table'
import { Button } from '@/components/ui/button'
import { ArrowDownToLine, Box, Dot, MoreHorizontal, QrCode } from 'lucide-react'
import { getRelativeTime } from '@/lib/timeago'
import clsx from 'clsx'
import type { Record as Record } from '@/types/record'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { Dialog, DialogBody, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Drawer, DrawerBody, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import DynamicModal from '@/components/modal/dynamic-modal'
import GenerateQr from '@/components/generate-qr'
import { getRandomValues } from 'crypto'

interface RecordsTableProps {
  data: Record[]
  filter?: Partial<Record>
}

interface RecordSelected extends Partial<Record> {
  open: boolean
  setOpen?: (value: boolean) => void
}

export function RecordsTable({
  data,
  filter,
}: RecordsTableProps) {
  const [selected, setSelected] = React.useState<RecordSelected>({
    open: false,
  })

  const columns = React.useMemo<ColumnDef<Record, unknown>[]>(
    () => [
      {
        id: 'menu',
        cell() {
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='secondary'
                  className='flex !size-7 items-center bg-gray/60 p-0 hover:bg-gray'
                >
                  <span className='sr-only'>Abrir menú</span>
                  <MoreHorizontal className='size-5' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='start'>
                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                <DropdownMenuItem
                // onClick={() => navigator.clipboard.writeText(payment.id)}
                >
                  Copiar número de cargo
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Ver producto</DropdownMenuItem>
                <DropdownMenuItem>Ver cliente</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )
        },
      },
      {
        accessorKey: 'key',
        header: 'Cargo No',
        cell({ row }) {
          return <h1 className='whitespace-nowrap text-sm font-semibold'>{row.original.key}</h1>
        },
      },
      {
        accessorKey: 'status',
        header: 'Estatus',
        cell({ row }) {
          const status = row.original.status
          return (
            <Button
              className={clsx('hover:bg-current/80 flex h-5 items-center p-2 text-[12px] font-medium', {
                'bg-primary': status === 'active',
                'bg-gray': status === 'inactive',
                'bg-red text-white': status === 'destroyed',
              })}
            >
              <Dot className='-ml-2 -mr-1' />

              {status === 'active' && 'Activo'}
              {status === 'inactive' && 'Inactivo'}
              {status === 'destroyed' && 'Destruido'}
            </Button>
          )
        },
      },
      {
        accessorKey: 'description',
        header: 'Descriptión',
        cell({ row }) {
          return <h1 className='text-sm font-medium'>{row.original.description}</h1>
        },
      },
      {
        accessorKey: 'date',
        header: 'Registro',
        cell({ row }) {
          const dateFormated = getRelativeTime(row.original.date.getTime() / 1000)
          return <span className='text-sm font-medium'>{dateFormated}</span>
        },
      },
      {
        id: 'actions',
        cell({ row }) {
          return (
            <div className='flex justify-end gap-[6px]'>
              <Button
                variant='secondary'
                className='flex !size-7 items-center bg-gray/60 p-0 hover:bg-primary'
                onClick={() => {
                  setSelected({
                    ...row.original,
                    open: true
                  })
                }}
              >
                <span className='sr-only'>Abrir qr</span>
                <QrCode className='size-5' />
              </Button>
              <Button
                variant='secondary'
                className='flex !size-7 items-center bg-gray/60 p-0 hover:bg-primary'
              >
                <span className='sr-only'>Abrir caja</span>
                <Box className='size-5' />
              </Button>
              <Button
                variant='secondary'
                className='flex !size-7 items-center bg-gray/60 p-0 hover:bg-primary'
              >
                <span className='sr-only'>Descargar qr</span>
                <ArrowDownToLine className='size-5' />
              </Button>
            </div>
          )
        },
      },
    ],
    [data]
  )

  const table = useReactTable({
    data: data.filter((item) => {
      if (filter) {
        return item.status === filter?.status
      }
      return true
    }),
    columns,
    getCoreRowModel: getCoreRowModel()
  })

  return (
    <>
      <div className='rounded-md'>
        <Table className='border-separate border-spacing-y-[6px]'>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className='!bg-transparent'>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className='h-9 text-xs font-semibold text-grayText'>
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
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className='border-y p-3 first:rounded-l-lg first:border-l last:rounded-r-lg last:border-r'>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className='mt-2'>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious className='!size-8 border p-0' href="" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink className='size-8 bg-primary hover:bg-primary/80' href="">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink className='size-8' href="">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext className='!size-8 border p-0' href="" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* MODAL */}
      <DynamicModal
        open={selected?.open}
        setOpen={(value) => setSelected(prev => ({ ...prev, open: value }))}
        title={selected?.key}
        description={selected?.description}
        body={
          <div className='flex items-center justify-center'>
            <GenerateQr
              bgColor='white'
              value={selected?.key}
            />
          </div>
        }
      />
    </>
  )
}
