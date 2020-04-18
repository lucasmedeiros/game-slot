import React from 'react'
import Pagination from '../../components/Pagination'
import { useHistory } from 'react-router-dom'
import { Grid } from '../../styles'
import ImagePlaceholder from '../../assets/img/image_placeholder.png'

const SearchResult: React.FC<SearchResultProps> = ({ result, refresh }) => {
  const history = useHistory()

  const goToGamePage = (id: string) => {
    history.push(`/game/${id}`)
  }

  return (
    <div style={{ minHeight: '92vh', width: '100%' }}>
      <Pagination result={result} refresh={refresh}>
        <Grid className="p-4" min={300}>
          {result.data.map((result) => (
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
      </Pagination>
    </div>
  )
}

export default SearchResult
