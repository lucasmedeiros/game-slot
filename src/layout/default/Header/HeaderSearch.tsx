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
    <form onSubmit={goToSearch}>
      <input
        type="text"
        name="search"
        value={searchTerm}
        autoComplete="off"
        onChange={e => setSearchTerm(e.target.value)}
        style={{ minWidth: '350px' }}
        className="appearance-none rounded ml-5 py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-blue-900"
        placeholder="Browse games..."
      />
      <button type="submit" className="bg-blue-700 py-2 px-3 ml-2 rounded">
        <FontAwesomeIcon icon="search" color="white" size="1x" />
      </button>
    </form>
  )
}

export default HeaderSearch
