import React from 'react'
import Pagination from '../../components/Pagination'
import SearchResultGrid from './SearchResultGrid'

const SearchResult: React.FC<SearchResultProps> = ({ result, refresh }) => (
  <div style={{ minHeight: '92vh', width: '100%' }}>
    <Pagination result={result} refresh={refresh}>
      <SearchResultGrid result={result} />
    </Pagination>
  </div>
)

export default SearchResult
