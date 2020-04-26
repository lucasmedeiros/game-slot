import React from 'react'
import { GameSlider, GameSliderItem } from '../../components/GameSlider'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

const Home: React.FC = () => {
  const user = useSelector((state: RootState) => state.userReducer.user)
  const lists = useSelector(
    (state: RootState) => state.gameListReducer.gameLists
  )
  return (
    <section>
      {user?.user ? (
        lists.length ? (
          lists.map((list) => (
            <GameSlider key={list._id} title={list.name}>
              {list.games.map((game, key) => (
                <GameSliderItem key={key} game={game} />
              ))}
            </GameSlider>
          ))
        ) : (
          <p>Ainda não há listas de jogos cadastradas...</p>
        )
      ) : (
        <p>Usuário não logado...</p>
      )}
    </section>
  )
}

export default Home
