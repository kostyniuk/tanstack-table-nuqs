import { Suspense } from 'react'
import { TableWithSorting } from './table-with-sorting'

export default function Page() {
  return (
    <Suspense fallback={<div className="container mx-auto py-10">Loading...</div>}>
      <TableWithSorting />
    </Suspense>
  )
}
