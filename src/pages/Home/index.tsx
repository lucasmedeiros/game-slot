import React from 'react'
import { GameSlider, GameSlideItem } from '../../components/GameSlider'

const games: IGame[] = [
  {
    name: 'Eldest Souls',
    steamAppId: '1108590',
    imageUrl: 'https://steamcdn-a.akamaihd.net/steam/apps/1108590/header.jpg',
  },
  {
    name: 'Guacamelee! 2',
    steamAppId: '534550',
    imageUrl: 'https://steamcdn-a.akamaihd.net/steam/apps/534550/header.jpg',
  },
  {
    name: 'The Elder Scrolls Online',
    steamAppId: '306130',
    imageUrl: 'https://steamcdn-a.akamaihd.net/steam/apps/306130/header.jpg',
  },
]

const Home: React.FC = () => {
  return (
    <section>
      <GameSlider sectionTitle="Playing">
        {games.map((game, key) => (
          <GameSlideItem key={key} game={game} />
        ))}
      </GameSlider>
      <GameSlider sectionTitle="Want to play">
        {games.map((game, key) => (
          <GameSlideItem key={key} game={game} />
        ))}
      </GameSlider>
      <GameSlider sectionTitle="Finished">
        {games.map((game, key) => (
          <GameSlideItem key={key} game={game} />
        ))}
      </GameSlider>
    </section>
  )
}

export default Home
