import React from 'react'
import { GameSlider, GameSliderItem } from '../../components/GameSlider'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import NotLoggedHome from './NotLoggedHome'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
  const user = useSelector((state: RootState) => state.userReducer.user)
  const lists = useSelector(
    (state: RootState) => state.gameListReducer.gameLists
  )

  const renderLists = (lists: GameList[]) => {
    return lists.map((list) => {
      return (
        <GameSlider
          key={list._id}
          title={list.name}
          titleUrl={`/list/${list._id}`}
        >
          {list.games.map((game, key) => (
            <GameSliderItem key={key} game={game} />
          ))}
        </GameSlider>
      )
    })
  }

  return (
    <section className="w-full h-full justify-center items-center">
      {user?.user ? (
        <div>
<<<<<<< HEAD
          {lists.length ? renderLists(lists) : null}
=======
          {lists.length
            ? lists.map((list) => (
                <GameSlider
                  key={list._id}
                  title={list.name}
                  titleUrl={`/list/${list._id}`}
                >
                  {list.games.map((game, key) => (
                    <GameSliderItem key={key} game={game} />
                  ))}
                </GameSlider>
              ))
            : null}
>>>>>>> add user section
          <div className="p-2 md:p-5">
            <Link
              to="/list"
              className="bg-red-600 text-white p-5 mb-3 w-full text-center block md:inline md:w-auto uppercase font-bold text-lg"
            >
              create new game list
            </Link>
          </div>
        </div>
      ) : (
        <NotLoggedHome />
      )}
    </section>
  )
}

export default Home
