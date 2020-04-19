import React from 'react'
import { useHistory } from 'react-router-dom'
import { Grid } from '../../styles'
import ImagePlaceholder from '../../assets/img/image_placeholder.png'

interface SearchResultGridProps {
  result: PaginatedResult<IGame>
}

const SearchResultGrid: React.FC<SearchResultGridProps> = ({ result }) => {
  const history = useHistory()

  const goToGamePage = (id: string) => {
    history.push(`/game/${id}`)
  }
  return (
    <Grid className="p-4" min={300}>
      {result.docs.map((element) => (
        <div
          onClick={() => goToGamePage(element.steamAppId)}
          key={element.steamAppId}
          className="cursor-pointer shadow"
        >
          <img
            src={element.imageUrl}
            onError={(e: any) => {
              e.target.onerror = null
              e.target.src = ImagePlaceholder
            }}
            alt={element.name}
          />
        </div>
      ))}
    </Grid>
  )
}

export default SearchResultGrid
