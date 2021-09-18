import React from 'react'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ClipLoader } from 'react-spinners'
import useGameSearch from '../../hooks/useGameSearch'
import ScreenImage from '../../assets/svg/search_screen_image.svg'
import SearchResult from './SearchResult'
import useUserSearch from '../../hooks/useUserSearch'

const Search: React.FC = () => {
  const { searchTerm } = useParams<{ searchTerm: string }>()
  const {
    searchResult: searchGamesResult,
    error: errorGames,
    loading: loadingGames,
    update: updateGames,
  } = useGameSearch(searchTerm)

  const {
    searchResult: searchUsersResult,
    error: errorUsers,
    loading: loadingUsers,
  } = useUserSearch(searchTerm)

  return (
    <section className="flex flex-col w-full h-full text-gray-400 text-4xl">
      <div className="flex flex-col justify-center items-center h-full">
        {!searchTerm ? (
          <div className="flex items-center flex-col justify-center w-full text-white text-5xl">
            <img
              src={ScreenImage}
              alt="Search screen"
              style={{ width: '250px' }}
            />
            <p className="mt-5 px-2 text-center">
              Use the search bar above to find games
            </p>
          </div>
        ) : loadingGames || loadingUsers ? (
          <ClipLoader size={50} color="white" />
        ) : !!errorGames || !!errorUsers ? (
          <>
            <FontAwesomeIcon icon="times-circle" size="2x" />
            <p className="mt-5 text-center">
              {errorGames || errorUsers || '0 results match your search'}
            </p>
          </>
        ) : (
          <SearchResult
            resultGames={searchGamesResult}
            refreshGames={updateGames}
            resultUsers={searchUsersResult}
          />
        )}
      </div>
    </section>
  )
}

export default Search
