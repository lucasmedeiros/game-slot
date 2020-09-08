import React from 'react'
import Pagination from '../../components/Pagination'
import GamesGrid from '../../components/GamesGrid'
import { useHistory } from 'react-router-dom'

interface SearchResultProps {
  result: PaginatedResult<IGame>
  refresh: (page: number, pageSize: number) => void
}

const SearchResult: React.FC<SearchResultProps> = ({ result, refresh }) => {
  const history = useHistory()

  const goToGamePage = (id: string) => {
    history.push(`/game/${id}`)
  }

  return (
    <div className="h-full w-full">
      <Pagination result={result} refresh={refresh}>
        <GamesGrid games={result.docs} onClick={goToGamePage} />
      </Pagination>
    </div>
  )
}

export default SearchResult
