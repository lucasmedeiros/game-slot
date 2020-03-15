import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LayoutHeader } from '../../styles'
import AvatarPlaceholder from '../../assets/img/avatar.png'

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const history = useHistory()

  const goToSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchTerm.trim()) history.push(`/search/${searchTerm.trim()}`)
    else setSearchTerm('')
  }

  return (
    <>
      <LayoutHeader
        className={`bg-blue-800 flex items-center justify-between flex-wrap p-4 ${className}`}
      >
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link to="/" className="font-bold text-xl">
            GAME SLOT
          </Link>
          <form onSubmit={goToSearch}>
            <input
              type="text"
              name="search"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="appearance-none rounded ml-5 py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline bg-blue-900"
              placeholder="Pesquisar..."
            />
            <button
              type="submit"
              className="bg-blue-700 py-2 px-3 ml-2 rounded"
            >
              <FontAwesomeIcon icon="search" color="white" size="1x" />
            </button>
          </form>
        </div>
        <div
          className="mr-5 rounded-full overflow-hidden text-white"
          style={{ width: '2.5rem', height: '2.5rem' }}
        >
          <button>
            <img src={AvatarPlaceholder} alt="User" />
          </button>
        </div>
      </LayoutHeader>
    </>
  )
}

export default Header
