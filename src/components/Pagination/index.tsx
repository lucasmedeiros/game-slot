import React from 'react'

interface PaginationProps {
  result: PaginatedResult<any>
  refresh: (page: number, pageSize: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  result,
  refresh,
  children,
}) => {
  const { limit, page, totalDocs, prevPage, nextPage, totalPages } = result
  const pageStart = Math.max(1, (page - 1) * limit)
  const pageEnd = Math.min(totalDocs, page * limit)
  return (
    <div>
      {children}
      <div className="ml-3 text-sm text-gray-800">
        {`Showing ${pageStart} - ${pageEnd} from ${totalDocs} result${
          totalDocs === 1 ? '' : 's'
        }`}
      </div>
      <div className="border border-blue-500 text-base flex justify-between my-2 text-blue-500">
        <div>
          <button
            className={`p-3 ${
              page === 1
                ? 'cursor-not-allowed'
                : 'hover:bg-blue-500 hover:text-white'
            }`}
            onClick={() => page > 1 && refresh(1, limit)}
          >
            First
          </button>
          <button
            className={`p-3 ${
              page === 1
                ? 'cursor-not-allowed'
                : 'hover:bg-blue-500 hover:text-white'
            }`}
            onClick={() => page > 1 && refresh(prevPage, limit)}
          >
            Previous
          </button>
        </div>
        <div>
          <button
            className={`p-3 ${
              !nextPage
                ? 'cursor-not-allowed'
                : 'hover:bg-blue-500 hover:text-white'
            }`}
            onClick={() => nextPage && refresh(nextPage ?? page, limit)}
          >
            Next
          </button>
          <button
            className={`p-3 ${
              page === totalPages
                ? 'cursor-not-allowed'
                : 'hover:bg-blue-500 hover:text-white'
            }`}
            onClick={() => page < totalPages && refresh(totalPages, limit)}
          >
            Last
          </button>
        </div>
      </div>
    </div>
  )
}

export default Pagination