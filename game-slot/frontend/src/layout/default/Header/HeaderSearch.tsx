/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, memo } from 'react'
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface HeaderSearchProps {
  className?: string
}

const HeaderSearch: React.FC<HeaderSearchProps> = ({ className }) => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const history = useHistory()

  const goToSearch = (value: string) => {
    history.push(`/search/${value.trim()}`)
  }

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    goToSearch(searchTerm)
  }

  const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <form className={`flex ${className}`} onSubmit={onFormSubmit}>
      <div className="flex items-center rounded px-3 bg-dark-600 leading-tight">
        <input
          type="text"
          name="search"
          value={searchTerm}
          autoComplete="off"
          onChange={onSearchInputChange}
          className="appearance-none placeholder-white text-white leading-tight text-lg focus:outline-none bg-dark-600 w-64"
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
      <button
        type="submit"
        className="bg-red-700 py-2 px-5 ml-5 rounded hidden md:block"
      >
        <FontAwesomeIcon icon="search" color="white" size="1x" />
      </button>
    </form>
  )
}

export default memo(HeaderSearch)
