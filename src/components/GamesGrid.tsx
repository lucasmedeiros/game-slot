import React, { memo } from 'react'
import { Grid } from '../styles'
import ImagePlaceholder from '../assets/img/image_placeholder.png'

interface GamesGridProps {
  games: IGame[]
  onClick: (id: string) => void
}

const GamesGrid: React.FC<GamesGridProps> = ({ games, onClick }) => (
  <Grid className="p-4" min={300}>
    {games.map((game) => (
      <div
        onClick={() => onClick(game.steamAppId)}
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

export default memo(GamesGrid)
