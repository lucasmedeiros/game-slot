import React from 'react'
import useGameSearch from '../../hooks/useGameSearch'
import { useParams, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ClipLoader } from 'react-spinners'
import { Grid } from '../../styles'
import ImagePlaceholder from '../../assets/img/image_placeholder.png'

const Search = () => {
  const { searchTerm } = useParams()
  const history = useHistory()
  const { searchResult, error, loading } = useGameSearch(searchTerm as string)
  const goToGamePage = (id: string) => {
    history.push(`/game/${id}`)
  }
  return (
    <div className="flex flex-col w-full text-gray-400 text-4xl">
      <div
        className="flex flex-col justify-center items-center h-full"
        style={{ minHeight: '92vh' }}
      >
        {loading ? (
          <ClipLoader size={200} color="#e2e8f0" />
        ) : error || !searchResult.length ? (
          <>
            <FontAwesomeIcon icon="times-circle" size="2x" />
            <p className="mt-5">0 results match your search</p>
          </>
        ) : (
          <div style={{ minHeight: '92vh', width: '100%' }}>
            <Grid className="p-4" min={300}>
              {searchResult.map(result => (
                <div
                  onClick={() => goToGamePage(result.steamAppId)}
                  key={result.steamAppId}
                  className="cursor-pointer"
                >
                  <img
                    src={result.imageUrl}
                    onError={(e: any) => {
                      e.target.onerror = null
                      e.target.src = ImagePlaceholder
                    }}
                    alt={result.name}
                  />
                </div>
              ))}
            </Grid>
          </div>
        )}
      </div>
    </div>
  )
}

export default Search
