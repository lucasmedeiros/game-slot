/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react'
import { useParams, Redirect, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import classnames from 'classnames'
import {
  deleteGameList as deleteGameListAction,
  deleteGameListItem,
} from '../../../store/lists/actions'
import {
  deleteGameList,
  getOneGameList,
  removeGameFromList,
  updateGameList,
} from '../../../services/gameLists.service'
import { useCurrentUser } from '../../../contexts/UserContext'
import { useAuth0 } from '@auth0/auth0-react'
import GamesGridList from '../../../components/GamesGridList'

interface Params {
  id: string
}

const ViewList: React.FC = () => {
  const [blocked, setBlocked] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const { id } = useParams<Params>()
  const [list, setList] = useState<GameList | null>(null)
  const { user } = useCurrentUser()
  const dispatch = useDispatch()
  const { getAccessTokenSilently } = useAuth0()
  const [editing, setEditing] = useState<boolean>(false)
  const history = useHistory()

  useEffect(() => {
    getOneGameList(id).then((listResponse) => {
      setList(listResponse)
      setLoading(false)
    })
  }, [id])

  const onSave = async () => {
    const mayUpdate = confirm('Are you sure you want to edit this list?')
    if (mayUpdate && user && list) {
      const token = await getAccessTokenSilently()
      await updateGameList(user._id, list, token)
    }
  }

  const onDeleteList = async () => {
    const mayDelete = confirm('Are you sure you want to delete this list?')
    if (mayDelete && user) {
      setBlocked(true)
      const token = await getAccessTokenSilently()
      const success = await deleteGameList(id, user._id, token)
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

    if (mayDelete && user) {
      setBlocked(true)
      const token = await getAccessTokenSilently()
      const newList = await removeGameFromList(id, gameId, user._id, token)
      setList(newList)
      dispatch(deleteGameListItem(id, gameId))
      setBlocked(false)
    }
  }

  const goToGamePage = (id: string) => {
    history.push(`/game/${id}`)
  }

  const onChangeListName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setList(list ? { ...list, name: e.target.value } : null)
  }

  if (loading) return <div />

  if (!list) return <Redirect to="/" />

  return (
    <section className="px-2 md:px-5">
      <input
        style={{
          color: 'white',
          fontWeight: 600,
          backgroundColor: editing ? '#36383B' : '#1D1F22',
          textTransform: 'uppercase',
          fontSize: 24,
          paddingTop: 12,
          paddingBottom: 12,
          paddingLeft: 16,
          letterSpacing: 1.6,
        }}
        value={list.name}
        disabled={!editing}
        onChange={onChangeListName}
      />
      <div
        className={classnames(
          'flex flex-col w-full xl:flex-row flex-wrap mt-2',
          {
            hidden: list.user !== user?._id,
          }
        )}
      >
        <button
          disabled={blocked}
          type="button"
          onClick={() => {
            setEditing(!editing)
            editing && onSave()
          }}
          style={{ backgroundColor: editing ? 'green' : 'blue' }}
          className={classnames(
            'bg-blue-600 text-white p-5 w-full text-center block md:inline xl:w-1/6 uppercase font-bold text-lg',
            {
              'cursor-not-allowed opacity-50': blocked,
            }
          )}
        >
          {editing ? 'Save' : 'Edit'}
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
          Delete
        </button>
      </div>
      <h1 className="text-white mt-10 uppercase">games on this list</h1>
      <GamesGridList
        onClick={goToGamePage}
        games={list.games}
        toDelete={onDeleteGameFromList}
      />
    </section>
  )
}

export default ViewList
