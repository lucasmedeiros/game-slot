import React from 'react'
import { GameSlider, GameSliderItem } from '../../components/GameSlider'

const games: IGame[] = [
  {
    name: 'Stardew Valley',
    steamAppId: '413150',
    imageUrl:
      'https://steamcdn-a.akamaihd.net/steam/apps/413150/header.jpg?t=1583864420',
  },
  {
    name: 'Terraria',
    steamAppId: '105600',
    imageUrl:
      'https://steamcdn-a.akamaihd.net/steam/apps/105600/header.jpg?t=1583864420',
  },
  {
    name: 'Hollow Knight: Silksong',
    steamAppId: '1030300',
    imageUrl:
      'https://steamcdn-a.akamaihd.net/steam/apps/1030300/header.jpg?t=1583864420',
  },
  {
    name: 'Hollow Knight',
    steamAppId: '367520',
    imageUrl:
      'https://steamcdn-a.akamaihd.net/steam/apps/367520/header.jpg?t=1583864420',
  },
  {
    name: 'The Elder Scrolls V: Skyrim',
    steamAppId: '72850',
    imageUrl:
      'https://steamcdn-a.akamaihd.net/steam/apps/72850/header.jpg?t=1583864420',
  },
  {
    name: 'The Elder Scrolls® Online',
    steamAppId: '306130',
    imageUrl:
      'https://steamcdn-a.akamaihd.net/steam/apps/306130/header.jpg?t=1583864420',
  },
  {
    name: 'Path of Exile',
    steamAppId: '238960',
    imageUrl:
      'https://steamcdn-a.akamaihd.net/steam/apps/238960/header.jpg?t=1583864420',
  },
]

const Home: React.FC = () => {
  return (
    <section className="mt-20">
      <GameSlider title="Games I've played">
        {games.map((game, key) => (
          <GameSliderItem key={key} game={game} />
        ))}
      </GameSlider>
      <GameSlider title="Games I want to play">
        {games.map((game, key) => (
          <GameSliderItem key={key} game={game} />
        ))}
      </GameSlider>
    </section>
  )
}

export default Home
