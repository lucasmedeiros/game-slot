/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDebounce } from '../../../hooks/useDebounce'

const HeaderSearch = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const searchDebounceValue = useDebounce(searchTerm, 500)
  const history = useHistory()

  const goToSearch = (value: string) => {
    history.push(`/search/${value.trim()}`)
  }

  useEffect(() => {
    if (searchDebounceValue) goToSearch(searchDebounceValue)
  }, [searchDebounceValue])

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    goToSearch(searchTerm)
  }

  const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <form className="flex" onSubmit={onFormSubmit}>
      <div className="flex items-center rounded ml-5 px-3 bg-gray-800 leading-tight">
        <input
          type="text"
          name="search"
          value={searchTerm}
          autoComplete="off"
          onChange={onSearchInputChange}
          style={{ minWidth: '350px' }}
          className="appearance-none placeholder-white text-white leading-tight text-lg focus:outline-none bg-gray-800"
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
      <button type="submit" className="bg-gray-800 py-2 px-5 ml-5 rounded">
        <FontAwesomeIcon icon="search" color="white" size="1x" />
      </button>
    </form>
  )
}

export default HeaderSearch
