import React from 'react'
import { useHistory } from 'react-router-dom'
import { Grid } from '../styles'
import ImagePlaceholder from '../assets/img/image_placeholder.png'

interface GamesGridProps {
  games: IGame[]
}

const GamesGrid: React.FC<GamesGridProps> = ({ games }) => {
  const history = useHistory()

  const goToGamePage = (id: string) => {
    history.push(`/game/${id}`)
  }
  return (
    <Grid className="p-4" min={300}>
      {games.map((game) => (
        <div
          onClick={() => goToGamePage(game.steamAppId)}
          key={game.steamAppId}
          className="cursor-pointer shadow"
        >
          <img
            src={game.imageUrl}
            onError={(e: any) => {
              e.target.onerror = null
              e.target.src = ImagePlaceholder
            }}
            alt={game.name}
          />
        </div>
      ))}
    </Grid>
  )
}

export default GamesGrid
