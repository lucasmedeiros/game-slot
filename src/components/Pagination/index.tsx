import React from 'react'
import { getPaginationFooterText } from '../../utils'

const Pagination: React.FC<PaginationProps> = ({ result, children }) => {
  return (
    <div>
      {children}
      <div className="ml-3 text-sm text-gray-800">
        {getPaginationFooterText(result.page, result.pageSize, result.total)}
      </div>
    </div>
  )
}

export default Pagination
