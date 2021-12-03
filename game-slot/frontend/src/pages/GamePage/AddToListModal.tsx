import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import { addGameToList } from '../../services/gameLists.service'
import { addItemToList } from '../../store/lists/actions'
import { useAuth0 } from '@auth0/auth0-react'
import { useCurrentUser } from '../../contexts/UserContext'
import { useParams } from 'react-router-dom'
import useGameDetails from '../../hooks/useGameDetails'
import { ClipLoader } from 'react-spinners'
import GamePageNotFound from './GamePageNotFound'
import { useHistory } from 'react-router'
interface PageParams {
  id: string
}

interface InternalPageProps {
  game: IGame
}

const AddListPage = (props: InternalPageProps) => {
  const lists = useSelector(
    (state: RootState) => state.gameListReducer.gameLists
  )
  const dispatch = useDispatch()
  const [listId, setListId] = useState<string>('')
  const [submiting, setSubmiting] = useState<boolean>(false)
  const { getAccessTokenSilently } = useAuth0()
  const { user } = useCurrentUser()
  const history = useHistory()

  const onSubmitClick = async () => {
    if (game && listId && user) {
      setSubmiting(true)
      const token = await getAccessTokenSilently()
      await addGameToList(game, listId, user._id, token)
      dispatch(addItemToList(listId, game))
      setSubmiting(false)
      history.goBack()
    }
  }

  const { game } = props
  return (
    <section className="flex justify-center items-center flex-col w-full h-full mt-20">
      <div className="w-full h-full flex items-center justify-center flex-col md:w-1/2 px-3 mb-6 md:mb-0">
        <h1
          data-testid="game-title"
          className="text-2xl mb-2 text-white font-bold uppercase"
        >
          {game.name}
        </h1>
        <img
          data-testid="game-image"
          src={game.imageUrl}
          alt="Game header"
          className="mb-2 md:mb-4 max-w-xs md:max-w-lg"
        />
        <label
          className="block uppercase tracking-wide text-white text-sm font-bold mb-2"
          htmlFor="listSelect"
        >
          Select game list
        </label>
        <div className="relative w-full">
          <select
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 md:text-xl"
            id="listSelect"
            data-testid="game-select"
            value={listId}
            onChange={(e) => setListId(e.target.value)}
          >
            <option value="">-</option>
            {lists.map((list) => (
              <option
                data-testid="game-list-options"
                key={list._id}
                value={list._id}
              >
                {list.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        <div className="w-full mt-2 md:w-auto">
          <button
            data-testid="game-submit-button"
            className={`mr-2 w-full mt-2 md:w-auto bg-red-600 shadow-lg hover:bg-red-800 text-white font-bold py-3 px-4 rounded focus:outline-none text-xl md:text-xl ${
              submiting ? 'cursor-not-allowed opacity-25' : ''
            }`}
            disabled={submiting}
            onClick={() => {
              history.push('/list')
            }}
          >
            CREATE LIST
          </button>

          <button
            data-testid="game-submit-button"
            className={`w-full mt-2 md:w-auto bg-blue-600 shadow-lg hover:bg-blue-800 text-white font-bold py-3 px-4 rounded focus:outline-none text-xl md:text-xl ${
              submiting ? 'cursor-not-allowed opacity-25' : ''
            }`}
            disabled={submiting}
            onClick={onSubmitClick}
          >
            ADD GAME
          </button>
        </div>
      </div>
    </section>
  )
}

const AddToListPage = () => {
  const { id } = useParams<PageParams>()
  const { details, loading: loadingDetails, error } = useGameDetails(id)
  const game = details?.game

  function render() {
    if (loadingDetails) {
      return <ClipLoader size={50} color="white" />
    } else {
      if (error) {
        return <GamePageNotFound error={error} />
      } else if (game) {
        return <AddListPage game={game} />
      }
    }
  }

  return <div>{render()}</div>
}

export default AddToListPage
