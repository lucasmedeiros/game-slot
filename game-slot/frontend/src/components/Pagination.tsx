/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { ClipLoader } from 'react-spinners'

interface PaginationProps {
  result: PaginatedResult<any>
  loading?: boolean
  refresh: (page: number, pageSize: number) => void
}

const btnClassName = 'p-3 hover:bg-red-700 hover:text-white'
const btnClassNameDisabled = 'p-3 cursor-not-allowed opacity-25'

const Pagination: React.FC<PaginationProps> = ({
  result,
  refresh,
  children,
  loading = false,
}) => {
  const { limit, page, totalDocs, prevPage, nextPage, totalPages } = result
  const pageStart = Math.max(1, (page - 1) * limit + 1)
  const pageEnd = Math.min(totalDocs, page * limit)
  return (
    <section>
      {loading ? (
        <div className="flex w-full justify-center">
          <ClipLoader size={50} color="white" />
        </div>
      ) : (
        children
      )}
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
