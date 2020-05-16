import React, { useState } from 'react'
import classnames from 'classnames'
import { useDispatch } from 'react-redux'
import { createGameList } from '../../../services/gameLists.service'
import { createGameList as createGameListAction } from '../../../store/lists/actions'
import { useHistory } from 'react-router-dom'

const NewList: React.FC = () => {
  const [blocked, setBlocked] = useState<boolean>(false)
  const [listName, setListName] = useState<string>('')
  const dispatch = useDispatch()
  const history = useHistory()

  const onCreateList = async (e: React.FormEvent<any>) => {
    e.preventDefault()
    if (listName && !blocked) {
      setBlocked(true)
      const list = await createGameList(listName)
      dispatch(createGameListAction(list))
      history.push('/')
    }
  }

  return (
    <section onSubmit={onCreateList} className="p-2 md:p-5">
      <form className="w-full mt-5 md:mx-0 px-3 py-2 md:px-8 md:py-6">
        <label
          className="block text-gray-200 text-xl font-bold mb-2 uppercase"
          htmlFor="list-name"
        >
          List name
        </label>
        <input
          id="list-name"
          placeholder="The list name"
          autoComplete="off"
          className="mb-4 placeholder-dark-300 shadow-xl appearance-none rounded w-full py-5 px-3 text-gray-400 leading-tight focus:outline-none bg-dark-600 text-xl md:text-2xl border border-dark-800"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
        />
        <button
          disabled={blocked}
          type="submit"
          onClick={onCreateList}
          className={classnames(
            'mt-2 bg-red-600 text-white p-5 w-full text-center block md:inline xl:w-1/12 uppercase font-bold text-lg',
            {
              'opacity-50 cursor-not-allowed': blocked,
            }
          )}
        >
          submit
        </button>
      </form>
    </section>
  )
}

export default NewList
