import React, { useState } from 'react'
import Modal, { ModalProps } from '../../components/Modal'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import { addGameToList } from '../../services/gameLists.service'
import { addItemToList } from '../../store/lists/actions'

type Props = ModalProps & { game: IGame | undefined }

const AddToListModal: React.FC<Props> = ({ isOpen, onClose, game }) => {
  const lists = useSelector(
    (state: RootState) => state.gameListReducer.gameLists
  )
  const dispatch = useDispatch()
  const [listId, setListId] = useState<string>('')
  const [submiting, setSubmiting] = useState<boolean>(false)

  const onSubmitClick = async () => {
    if (game && listId) {
      setSubmiting(true)
      await addGameToList(game, listId)
      dispatch(addItemToList(listId, game))
      setSubmiting(false)
      onClose()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <section className="flex justify-center items-center flex-col w-full h-full">
        <div className="w-full h-full flex items-center justify-center flex-col md:w-1/2 px-3 mb-6 md:mb-0">
          <h1
            data-testid="game-title"
            className="text-2xl mb-2 text-white font-bold uppercase"
          >
            {game?.name}
          </h1>
          <img
            data-testid="game-image"
            src={game?.imageUrl}
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
          <button
            data-testid="game-submit-button"
            className={`w-full mt-2 md:w-auto bg-blue-900 shadow-lg hover:bg-blue-800 text-white font-bold py-3 px-4 rounded focus:outline-none text-xl md:text-3xl ${
              submiting ? 'cursor-not-allowed opacity-25' : ''
            }`}
            disabled={submiting}
            onClick={onSubmitClick}
          >
            ADD GAME
          </button>
        </div>
      </section>
    </Modal>
  )
}

export default AddToListModal
