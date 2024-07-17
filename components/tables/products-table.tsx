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
import {
  Pagination,
  PaginationButton,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import DynamicModal from '@/components/modal/dynamic-modal'
import GenerateQr from '@/components/generate-qr'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Product } from '@/types/product'

interface TableProps {
  data: Product[]
  filter?: Partial<Record>
}

interface RecordSelected extends Partial<Record> {
  open: boolean
  setOpen?: (value: boolean) => void
}

export function ProductsTable({
  data,
  filter,
}: TableProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  // OPEN DYNAMIC MODAL (QR SHOW)
  const [selected, setSelected] = React.useState<RecordSelected>({
    open: false,
  })

  const columns = React.useMemo<ColumnDef<Product, unknown>[]>(
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
          // const status = row.original.status
          // const date = row.original.date.toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })
          // const time = row.original.date.toLocaleTimeString('es-MX', { hour: 'numeric', minute: 'numeric' })
          return (
            <TooltipProvider delayDuration={150}>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    className={clsx('hover:bg-current/80 flex h-5 items-center p-2 text-[12px] font-medium', {
                      'bg-primary': status === 'active',
                      'bg-gray': status === 'inactive',
                      'bg-violet text-white': status === 'destroyed',
                    })}
                  >
                    <Dot className='-ml-2 -mr-1' />

                    {status === 'active' && 'Activo'}
                    {status === 'inactive' && 'Inactivo'}
                    {status === 'destroyed' && 'Canjeado'}
                  </Button>

                </TooltipTrigger>
                <TooltipContent className='w-[280px] border bg-white/90 text-xs backdrop-blur-sm'>
                  {status === 'active' && (
                    <span>
                      El producto fue activado el <b className='font-semibold'>{date}</b>{' '}
                      a las <b className='font-semibold'>{time}</b>
                    </span>
                  )}
                  {status === 'inactive' && (
                    <span>
                      El producto está inactivo desde el <b className='font-semibold'>{date}</b>{' '}
                      a las <b className='font-semibold'>{time}</b>
                    </span>
                  )}
                  {status === 'destroyed' && (
                    <span>
                      El producto fue escaneado/canjeado el <b className='font-semibold'>{date}</b>{' '}
                      a las <b className='font-semibold'>{time}</b>
                    </span>
                  )}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
                    open: true,
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
    []
  )

  // PAGINATION
  const itemsPerPage = 6
  const currentPage = searchParams.get('page') ? Number(searchParams.get('page')) : 1

  const paginatedData = React.useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return data
      .filter((item) => {
        if (!filter) return item
        return Object.entries(filter).every(([key, value]) => {
          return item[key as keyof Product] === value
        })
      })
      .slice(startIndex, endIndex)
  }, [data, currentPage, filter])

  const pageCount = Math.ceil(data.length / itemsPerPage)

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', newPage.toString())
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  // DATA TABLE
  const table = useReactTable({
    data: paginatedData,
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
              <PaginationPrevious
                className='!size-8 border p-0'
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            {[...Array(pageCount)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationButton
                  className={clsx('size-8', { 'bg-primary hover:bg-primary/80': index + 1 === currentPage })}
                  onClick={() => changePage(index + 1)}
                >
                  {index + 1}
                </PaginationButton>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                className='!size-8 border p-0'
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === pageCount}
              />
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
