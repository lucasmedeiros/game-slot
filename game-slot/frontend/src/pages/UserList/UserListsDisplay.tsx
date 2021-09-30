import React from 'react'
import { Link } from 'react-router-dom'
import { GameSlider, GameSliderItem } from '../../components/GameSlider'

interface Props {
  lists: GameList[]
  currentUser?: boolean
}

const CurrentUserLists = ({ lists, currentUser }: Props) => {
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
      {currentUser && (
        <div className="p-2 md:p-5">
          <Link
            to="/list"
            className="bg-red-600 text-white p-3 mb-3 w-full text-center block md:inline md:w-auto uppercase font-bold"
            style={{ borderRadius: '4px' }}
          >
            create game list
          </Link>
        </div>
      )}
    </div>
  )
}

export default CurrentUserLists
