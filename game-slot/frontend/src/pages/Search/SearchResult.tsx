import React from 'react'
import { useHistory } from 'react-router-dom'

import Pagination from '../../components/Pagination'
import GamesGrid from '../../components/GamesGrid'
import UsersGrid from '../../components/UsersGrid'

interface SearchResultProps {
  resultGames?: PaginatedResult<IGame>
  refreshGames: (page: number, pageSize: number) => void
  resultUsers?: User[]
}

const SearchResult: React.FC<SearchResultProps> = ({
  resultGames,
  refreshGames,
  resultUsers,
}) => {
  const history = useHistory()

  const goToGamePage = (id: string) => {
    history.push(`/game/${id}`)
  }

  const goToUserPage = (username: string) => {
    history.push(`/user/${username}`)
  }

  return (
    <div className="h-full w-full">
      <div style={{ width: '100%', alignSelf: 'center', paddingLeft: '16px' }}>
        Games
      </div>
      {resultGames && (
        <Pagination result={resultGames} refresh={refreshGames}>
          <GamesGrid games={resultGames.docs} onClick={goToGamePage} />
        </Pagination>
      )}
      {resultUsers && <UsersGrid users={resultUsers} onClick={goToUserPage} />}
    </div>
  )
}

export default SearchResult
