/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { memo } from 'react'
import { Grid } from '../styles'
import ImagePlaceholder from '../assets/img/image_placeholder.png'
import Delete from '../icons/Delete'

interface GamesGridListProps {
  games: IGame[]
  onClick: (id: string) => void
  toDelete: (id: string) => void
}

const GamesGridList: React.FC<GamesGridListProps> = ({
  games,
  onClick,
  toDelete,
}) => (
  <Grid className="p-4" min={300}>
    {games.map((game) => (
      <div
        key={game.steamAppId}
        className="cursor-pointer shadow"
        style={{
          position: 'relative',
        }}
      >
        <div
          onClick={() => {
            toDelete(game.steamAppId)
          }}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: '1px',
            background: 'rgba(0,0,0,0.75)',
            borderBottomLeftRadius: '25%',
            width: '36px',
            height: '36px',
          }}
        >
          <Delete size={28} />
        </div>
        <img
          src={game.imageUrl}
          onError={(e: any) => {
            e.target.onerror = null
            e.target.src = ImagePlaceholder
          }}
          onClick={() => onClick(game.steamAppId)}
          alt={game.name}
          style={{ display: 'block' }}
        />
      </div>
    ))}
  </Grid>
)

export default memo(GamesGridList)
