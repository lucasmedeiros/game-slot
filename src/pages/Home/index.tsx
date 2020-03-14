import React from 'react'
import { GameSlider, GameSlideItem } from '../../components/GameSlider'

const games: IGame[] = [
  {
    name: 'Hollow Knight - Silksong',
    steamAppId: '1030300',
    imageUrl: 'https://steamcdn-a.akamaihd.net/steam/apps/1030300/header.jpg',
  },
  {
    name: 'Hollow Knight',
    steamAppId: '367520',
    imageUrl: 'https://steamcdn-a.akamaihd.net/steam/apps/367520/header.jpg',
  },
  {
    name: 'The Elder Scrolls® Online',
    steamAppId: '306130',
    imageUrl: 'https://steamcdn-a.akamaihd.net/steam/apps/306130/header.jpg',
  },
  {
    name: 'The Elder Scrolls V: Skyrim Special Edition',
    steamAppId: '489830',
    imageUrl: 'https://steamcdn-a.akamaihd.net/steam/apps/489830/header.jpg',
  },
  {
    name: 'Guacamelee! Super Turbo Championship Edition',
    steamAppId: '275390',
    imageUrl: 'https://steamcdn-a.akamaihd.net/steam/apps/275390/header.jpg',
  },
  {
    name: 'Guacamelee! 2',
    steamAppId: '534550',
    imageUrl: 'https://steamcdn-a.akamaihd.net/steam/apps/534550/header.jpg',
  },
  {
    name: 'Cuphead',
    steamAppId: '268910',
    imageUrl: 'https://steamcdn-a.akamaihd.net/steam/apps/268910/header.jpg',
  },
]

const Home: React.FC = () => {
  return (
    <div>
      <h1 className="py-0 ml-5">Playing</h1>
      <GameSlider>
        {games.map((game, key) => (
          <GameSlideItem key={key} game={game} />
        ))}
      </GameSlider>
      <h1 className="py-0 ml-5">Want to play</h1>
      <GameSlider>
        {games.map((game, key) => (
          <GameSlideItem key={key} game={game} />
        ))}
      </GameSlider>
      <h1 className="py-0 ml-5">Finished</h1>
      <GameSlider>
        {games.map((game, key) => (
          <GameSlideItem key={key} game={game} />
        ))}
      </GameSlider>
    </div>
  )
}

export default Home
