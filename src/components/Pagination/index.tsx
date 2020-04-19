import React from 'react'

interface PaginationProps {
  result: PaginatedResult<any>
  refresh: (page: number, pageSize: number) => void
}

const btnClassName = 'p-3 hover:bg-pink-700 hover:text-white'
const btnClassNameDisabled = 'p-3 cursor-not-allowed'

const Pagination: React.FC<PaginationProps> = ({
  result,
  refresh,
  children,
}) => {
  const { limit, page, totalDocs, prevPage, nextPage, totalPages } = result
  const pageStart = Math.max(1, (page - 1) * limit)
  const pageEnd = Math.min(totalDocs, page * limit)
  return (
    <section>
      {children}
      <div className="ml-3 text-base text-indigo-100">
        {`Showing ${pageStart} - ${pageEnd} from ${totalDocs} result${
          totalDocs === 1 ? '' : 's'
        }`}
      </div>
      <div className="text-xl m-3 flex justify-between my-2 text-indigo-100">
        <div>
          <button
            className={page === 1 ? btnClassNameDisabled : btnClassName}
            onClick={() => page > 1 && refresh(1, limit)}
          >
            First
          </button>
          <button
            className={page === 1 ? btnClassNameDisabled : btnClassName}
            onClick={() => page > 1 && refresh(prevPage, limit)}
          >
            Previous
          </button>
        </div>
        <div>
          <button
            className={!nextPage ? btnClassNameDisabled : btnClassName}
            onClick={() => nextPage && refresh(nextPage ?? page, limit)}
          >
            Next
          </button>
          <button
            className={
              page === totalPages ? btnClassNameDisabled : btnClassName
            }
            onClick={() => page < totalPages && refresh(totalPages, limit)}
          >
            Last
          </button>
        </div>
      </div>
    </section>
  )
}

export default Pagination
