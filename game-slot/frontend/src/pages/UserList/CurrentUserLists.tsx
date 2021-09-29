import React from 'react'
import { Link } from 'react-router-dom'
import { GameSlider, GameSliderItem } from '../../components/GameSlider'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

const CurrentUserLists = () => {
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
    <div>
      {lists.length ? renderLists(lists) : null}
      <div className="p-2 md:p-5">
        <Link
          to="/list"
          className="bg-red-600 text-white p-5 mb-3 w-full text-center block md:inline md:w-auto uppercase font-bold text-lg"
        >
          create new game list
        </Link>
      </div>
    </div>
  )
}

export default CurrentUserLists
