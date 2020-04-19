import React from 'react'
import Pagination from '../../components/Pagination'
import SearchResultGrid from './SearchResultGrid'

interface SearchResultProps {
  result: PaginatedResult<IGame>
  refresh: (page: number, pageSize: number) => void
}

const SearchResult: React.FC<SearchResultProps> = ({ result, refresh }) => (
  <div style={{ minHeight: '92vh', width: '100%' }}>
    <Pagination result={result} refresh={refresh}>
      <SearchResultGrid result={result} />
    </Pagination>
  </div>
)

export default SearchResult
