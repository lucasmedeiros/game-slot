import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { LayoutHeader } from '../../styles'
import './Header.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header: React.FC<HeaderProps> = ({ className }) => {
  const [isExpanded, setExpanded] = useState<boolean>(false)
  const history = useHistory()

  const options = [
    {
      title: 'Profile',
      onClick: () => history.push('/'),
    },
    {
      title: 'Logout',
      onClick: () => history.push('/'),
    },
  ]

  return (
    <>
      <LayoutHeader
        className={`bg-blue-800 flex items-center justify-between flex-wrap p-4 ${className}`}
      >
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link to="/" className="font-bold text-xl">
            GAME SLOT
          </Link>
          <form>
            <input
              type="text"
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
        <div className="dropdown">
          <button
            onClick={() => setExpanded(prev => !prev)}
            className="flex items-center px-3 py-2 border rounded text-white border-white-400 hover:text-white hover:border-white"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
      </LayoutHeader>
      {isExpanded && (
        <ul className={'dropdown__list'}>
          {options.map((option, i) => {
            return (
              <li
                onClick={() => {
                  setExpanded(false)
                  option.onClick()
                }}
                key={i}
                className="dropdown__list-item"
              >
                {option.title}
              </li>
            )
          })}
        </ul>
      )}
    </>
  )
}

export default Header
