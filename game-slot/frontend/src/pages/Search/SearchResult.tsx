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
      {resultGames && resultGames.docs.length > 0 ? (
        <Pagination result={resultGames} refresh={refreshGames}>
          <GamesGrid games={resultGames.docs} onClick={goToGamePage} />
        </Pagination>
      ) : (
        <div style={{ fontSize: 20, padding: 16 }}>No games found.</div>
      )}

      <div
        style={{
          width: '100%',
          alignSelf: 'center',
          paddingLeft: 16,
          paddingTop: 32,
        }}
      >
        Users
      </div>
      {resultUsers && resultUsers.length > 0 ? (
        <UsersGrid users={resultUsers} onClick={goToUserPage} />
      ) : (
        <div style={{ fontSize: 20, padding: 16 }}>No users found.</div>
      )}
    </div>
  )
}

export default SearchResult
