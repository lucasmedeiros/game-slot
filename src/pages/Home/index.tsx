import React from 'react'
import { GameSlider, GameSlideItem } from '../../components/GameSlider'

const games: IGame[] = [
  // {
  //   name: 'Stardew Valley',
  //   steamAppId: '413150',
  //   imageUrl:
  //     'https://steamcdn-a.akamaihd.net/steam/apps/413150/header.jpg?t=1583864420',
  // },
  // {
  //   name: 'Terraria',
  //   steamAppId: '105600',
  //   imageUrl:
  //     'https://steamcdn-a.akamaihd.net/steam/apps/105600/header.jpg?t=1583864420',
  // },
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
