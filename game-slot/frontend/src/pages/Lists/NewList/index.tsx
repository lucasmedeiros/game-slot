import React, { useState } from 'react'
import classnames from 'classnames'
import { useDispatch } from 'react-redux'
import { createGameList } from '../../../services/gameLists.service'
import { createGameList as createGameListAction } from '../../../store/lists/actions'
import { useHistory } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { useCurrentUser } from '../../../contexts/UserContext'

const NewList: React.FC = () => {
  const [blocked, setBlocked] = useState<boolean>(false)
  const [listName, setListName] = useState<string>('')
  const dispatch = useDispatch()
  const history = useHistory()
  const { getAccessTokenSilently } = useAuth0()
  const { user } = useCurrentUser()

  const onCreateList = async (e: React.FormEvent<any>) => {
    e.preventDefault()
    if (listName.trim() && !blocked && user?._id) {
      setBlocked(true)
      const token = await getAccessTokenSilently()
      const list = await createGameList(listName, user._id, token)
      dispatch(createGameListAction(list))
      history.push(`/user/${user.nickname}/lists`)
    }
  }

  return (
    <section onSubmit={onCreateList} className="p-2 md:p-5">
      <form className="w-full mt-5 md:mx-0 px-3 py-2 md:px-8 md:py-6">
        <label
          className="block text-gray-200 font-bold mb-2 uppercase"
          htmlFor="list-name"
        >
          List name
        </label>
        <input
          id="list-name"
          placeholder="Example: favorite games"
          autoComplete="off"
          className="mb-4 placeholder-dark-300 shadow-xl appearance-none rounded w-full py-5 px-3 text-gray-400 leading-tight focus:outline-none bg-dark-600 text-xl border border-dark-800"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
        />
        <button
          disabled={blocked}
          type="submit"
          onClick={onCreateList}
          style={{ width: '150px', borderRadius: '4px', margin: '1rem 0' }}
          className={classnames(
            'bg-red-700 text-white p-3 mb-3 w-full text-center block md:inline md:w-auto uppercase font-bold',
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
