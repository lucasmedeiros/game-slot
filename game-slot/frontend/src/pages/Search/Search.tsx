import React from 'react'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ClipLoader } from 'react-spinners'
import useGameSearch from '../../hooks/useGameSearch'
import ScreenImage from '../../assets/svg/search_screen_image.svg'
import SearchResult from './SearchResult'

const Search: React.FC = () => {
  const { searchTerm } = useParams<{ searchTerm: string }>()
  const { searchResult, error, loading, update } = useGameSearch(
    searchTerm as string
  )

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
        ) : loading ? (
          <ClipLoader size={50} color="white" />
        ) : error || !searchResult?.docs.length ? (
          <>
            <FontAwesomeIcon icon="times-circle" size="2x" />
            <p className="mt-5 text-center">
              {error || '0 results match your search'}
            </p>
          </>
        ) : (
          <SearchResult result={searchResult} refresh={update} />
        )}
      </div>
    </section>
  )
}

export default Search
