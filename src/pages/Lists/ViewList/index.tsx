/* eslint-disable no-restricted-globals */
import React from 'react'
import { useParams, Redirect, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../store'
import GamesGrid from '../../../components/GamesGrid'
import { deleteGameList } from '../../../store/lists/actions'

interface Params {
  id: string
}

const ViewList: React.FC = () => {
  const { id } = useParams<Params>()
  const list = useSelector(
    (state: RootState) => state.gameListReducer.gameLists
  ).find((list) => list._id === id)
  const history = useHistory()
  const dispatch = useDispatch()

  const onAddGames = () => {
    history.push('/search')
  }

  const onDeleteList = () => {
    const mayDelete = confirm('Are you sure you want to delete this list?')
    if (mayDelete) {
      dispatch(deleteGameList(id))
    }
  }

  if (!list) return <Redirect to="/" />

  return (
    <section className="px-2 md:px-5">
      <h1 className="tracking-widest text-white font-bold text-2xl uppercase py-3">
        {list.name}
      </h1>
      <div className="flex flex-col w-full xl:flex-row flex-wrap mt-2">
        <button
          type="button"
          onClick={onAddGames}
          className="bg-blue-600 text-white p-5 w-full text-center block md:inline xl:w-1/6 uppercase font-bold text-lg"
        >
          add game
        </button>
        <button
          type="button"
          onClick={onDeleteList}
          className="bg-red-600 mt-3 xl:mt-0 xl:ml-3 text-white p-5 w-full text-center block md:inline xl:w-1/6 uppercase font-bold text-lg"
        >
          delete
        </button>
      </div>
      <h1 className="text-white mt-10 uppercase">games on this list</h1>
      <GamesGrid games={list.games} />
    </section>
  )
}

export default ViewList
