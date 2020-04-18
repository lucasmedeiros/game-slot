import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const HeaderSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')

  const history = useHistory()

  const goToSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    history.push(`/search/${searchTerm.trim()}`)
  }

  return (
    <form className="flex" onSubmit={goToSearch}>
      <div className="flex items-center rounded ml-5 py-2 px-3 bg-blue-900 leading-tight">
        <input
          type="text"
          name="search"
          value={searchTerm}
          autoComplete="off"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ minWidth: '350px' }}
          className="appearance-none text-white leading-tight text-lg focus:outline-none bg-blue-900"
          placeholder="Browse games..."
        />
        <button
          onClick={() => setSearchTerm('')}
          className={`flex-shrink-0 border-transparent border-4 focus:outline-none text-white py-1 px-2 ${
            !searchTerm ? 'opacity-0 cursor-default' : 'opacity-100'
          }`}
          type="button"
        >
          <FontAwesomeIcon icon="times-circle" />
        </button>
      </div>
      <button type="submit" className="bg-blue-700 py-2 px-5 ml-5 rounded">
        <FontAwesomeIcon icon="search" color="white" size="1x" />
      </button>
    </form>
  )
}

export default HeaderSearch
