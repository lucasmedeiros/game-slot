import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LayoutHeader } from '../../../styles'
import AvatarPlaceholder from '../../../assets/img/avatar.png'
import HeaderSearch from './HeaderSearch'
import { deleteUser } from '../../../store/user/actions'
import { logout } from '../../../services/auth.service'

interface HeaderProps {
  className?: string
  user: User | undefined
}

const Header: React.FC<HeaderProps> = ({ className, user }) => {
  const [navOpen, setNavOpen] = useState<boolean>(true)
  const dispatch = useDispatch()
  const history = useHistory()

  const onLogout = () => {
    logout()
    dispatch(deleteUser())
  }

  const goToHome = () => {
    history.push('/')
  }

  return (
    <LayoutHeader
      className={`bg-dark-900 flex items-center justify-between flex-wrap p-2 ${className}`}
    >
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <button onClick={goToHome} className="font-bold text-2xl md:text-xl">
          GAME SLOT
        </button>
      </div>

      <button
        onClick={() => setNavOpen((prev) => !prev)}
        className="text-white mr-2 md:hidden"
      >
        <FontAwesomeIcon icon="bars" size="2x" />
      </button>

      <div
        className={`flex flex-1 m-0 p-5 items-start md:p-0 md:flex md:items-center md:relative bg-dark-900 ${
          navOpen ? 'hidden' : ''
        }`}
      >
        <div className="flex w-full flex-col flex-1 md:flex-row justify-between">
          <HeaderSearch className="mb-4 md:mb-0" />
          {user ? (
            <div className="flex items-center">
              <div className="flex flex-col items-end">
                <p className="text-white mr-4">
                  Hello, {user.user.name.split(' ')[0]}
                </p>
                <button
                  onClick={onLogout}
                  className="text-white mr-4 text-xs hover:underline"
                >
                  Logout
                </button>
              </div>
              <div
                className="mr-5 rounded-full overflow-hidden text-white"
                style={{ width: '2.5rem', height: '2.5rem' }}
              >
                <button>
                  <img src={AvatarPlaceholder} alt="User" />
                </button>
              </div>
            </div>
          ) : (
            <Link
              className="text-white bg-red-700 py-2 px-4 mr-2 rounded"
              to="/login"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </LayoutHeader>
  )
}

export default Header
