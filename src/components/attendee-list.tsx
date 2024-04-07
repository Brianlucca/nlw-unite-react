import { Search, MoreHorizontal, ChevronLeft, ChevronsLeft, ChevronRight, ChevronsRight } from 'lucide-react'
import  dayjs  from 'dayjs'
import 'dayjs/locale/pt-br'
import  relativeTime from 'dayjs/plugin/relativeTime'
import { IconButton } from './icon-button'
import { Table } from './table/table'
import { TableHeader } from './table/table-header'
import { TableCell } from './table/table-cell'
import { ChangeEvent, useState } from 'react'
import { attendees } from '../data/attendees'

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

export function Attendee() {
        const [search, setSearch] = useState('')
        const [page, setPage] = useState(1)

        const totalPages = Math.ceil(attendees.length / 10)

        const filteredAttendees = attendees.filter((attendee) => {
            const searchTermLower = search.toLowerCase();
            return (
              attendee.name.toLowerCase().includes(searchTermLower) ||
              attendee.email.toLowerCase().includes(searchTermLower)
            );
          });
        
          const paginatedAttendees = filteredAttendees.slice(
            (page - 1) * 10,
            page * 10
          );        

        function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
            setSearch(event.target.value)
            setPage(1)
        }

        function goToFirstPage() {
            setPage(1)
        }
        function goToLastPage() {
            setPage(totalPages)
        }
        function goToPreviusPage() {
            setPage(page - 1)
        }
        function goToNextPage() {
            setPage(page + 1)
        }

    return (
        <div className='flex flex-col gap-4'>
            <div className="flex gap-3 items-center">
                <h1 className="text-2xl font-bold">Participantes</h1>
                <div className="px-3 w-72 py-1.5 border border-white/10 bg-transparent rounded-lg flex items-center gap-3">
                    <Search className='size-4 text-emerald-300' />
                    <input onChange={onSearchInputChanged} 
                        className="bg-transparent flex-1 outline-none border-0 p-0 text-sm focus:ring-0" 
                        placeholder="Buscar Participante..." 
                    />
                </div>
            </div>
                <Table>
                    <thead>
                        <tr className='border-b border-white/10'>
                            <TableHeader style={{ width: 48 }}>
                                <input type='checkbox' className='size-4 bg-black/20 rounded border border-white/10 checked:bg-orange-400' />
                            </TableHeader>
                            <TableHeader>Código</TableHeader>
                            <TableHeader>Participantes</TableHeader>
                            <TableHeader>Data da inscrição</TableHeader>
                            <TableHeader>Data do check-in</TableHeader>
                            <TableHeader style={{ width: 64 }}></TableHeader>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedAttendees.map((Attendee) => {
                            return (
                                <tr key={Attendee.id} className='border-b border-white/10 hover:bg-white/5'>
                                    <TableCell>
                                        <input type='checkbox' className='size-4 bg-black/20 rounded border border-white/10 checked:bg-orange-400' />
                                    </TableCell>
                                    <TableCell>{Attendee.id}</TableCell>
                                    <TableCell>
                                        <div className='flex flex-col gap-1'>
                                            <span className='font-semibold text-white'>{Attendee.name}</span>
                                            <span>{Attendee.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{dayjs().to(Attendee.createdAT)}</TableCell>
                                    <TableCell>{dayjs().to(Attendee.checkedInAt)}</TableCell>
                                    <TableCell>
                                        <IconButton transparent={true}>
                                            <MoreHorizontal className='size-4 ' />
                                        </IconButton>
                                    </TableCell>
                                </tr>    
                            )
                        })} 
                    </tbody>
                    <tfoot>
                        <tr>
                            <td className='py-3 px-4 text-sm text-zinc-300' colSpan={3}>
                                Mostrando 10 de {attendees.length} itens
                            </td>
                            <td className='py-3 px-4 text-sm text-zinc-300 text-right' colSpan={3}>
                                <div className='inline-flex items-center gap-8 '>
                                    <span>Pagina {page} de {totalPages}</span>

                                    <div className='flex gap-1.5 '>
                                        <IconButton onClick={goToFirstPage} disabled={page === 1}>
                                            <ChevronsLeft className='size-4' />
                                        </IconButton>
                                        <IconButton onClick={goToPreviusPage} disabled={page === 1}>
                                            <ChevronLeft className='size-4' />
                                        </IconButton>
                                        <IconButton onClick={goToNextPage} disabled={page === totalPages}> 
                                            <ChevronRight className='size-4' />
                                        </IconButton>                                                             
                                        <IconButton onClick={goToLastPage} disabled={page === totalPages}>
                                            <ChevronsRight className='size-4' />
                                        </IconButton>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </Table>
        </div>
    )
}