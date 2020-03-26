import React from 'react'
import { GameSlider, GameSlideItem } from '../../components/GameSlider'

const games: IGame[] = []

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
