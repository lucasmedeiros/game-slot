/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react'
import { useParams, Redirect, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import classnames from 'classnames'
import { RootState } from '../../../store'
import GamesGrid from '../../../components/GamesGrid'
import {
  deleteGameList as deleteGameListAction,
  deleteGameListItem,
} from '../../../store/lists/actions'
import {
  deleteGameList,
  removeGameFromList,
  getOneGameList,
} from '../../../services/gameLists.service'

interface Params {
  id: string
}

const ViewList: React.FC = () => {
  const [blocked, setBlocked] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const { id } = useParams<Params>()
  const [list, setList] = useState<GameList | null>()
  const user = useSelector((state: RootState) => state.userReducer.user)
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    getOneGameList(id).then((listResponse) => {
      setList(listResponse)
      setLoading(false)
    })
  }, [id])

  const onAddGames = () => {
    history.push('/search')
  }

  const onDeleteList = async () => {
    const mayDelete = confirm('Are you sure you want to delete this list?')
    if (mayDelete) {
      setBlocked(true)
      const success = await deleteGameList(id)
      if (success) {
        dispatch(deleteGameListAction(id))
        setList(null)
      }
    }
  }

  const onDeleteGameFromList = async (gameId: string) => {
    const mayDelete = confirm(
      'Are you sure you want to remove this game from this list?'
    )

    if (mayDelete) {
      setBlocked(true)
      const newList = await removeGameFromList(id, gameId)
      setList(newList)
      dispatch(deleteGameListItem(id, gameId))
      setBlocked(false)
    }
  }

  if (loading) return <div />

  if (!list) return <Redirect to="/" />

  return (
    <section className="px-2 md:px-5">
      <h1 className="tracking-widest text-white font-bold text-2xl uppercase py-3">
        {list.name}
      </h1>
      <div
        className={classnames(
          'flex flex-col w-full xl:flex-row flex-wrap mt-2',
          {
            hidden: list.user !== user?.user._id,
          }
        )}
      >
        <button
          disabled={blocked}
          type="button"
          onClick={onAddGames}
          className={classnames(
            'bg-blue-600 text-white p-5 w-full text-center block md:inline xl:w-1/6 uppercase font-bold text-lg',
            {
              'cursor-not-allowed opacity-50': blocked,
            }
          )}
        >
          edit
        </button>
        <button
          disabled={blocked}
          type="button"
          onClick={onDeleteList}
          className={classnames(
            'bg-red-600 mt-3 xl:mt-0 xl:ml-3 text-white p-5 w-full text-center block md:inline xl:w-1/6 uppercase font-bold text-lg',
            {
              'cursor-not-allowed opacity-50': blocked,
            }
          )}
        >
          delete
        </button>
      </div>
      <h1 className="text-white mt-10 uppercase">games on this list</h1>
      <GamesGrid onClick={onDeleteGameFromList} games={list.games} />
    </section>
  )
}

export default ViewList
