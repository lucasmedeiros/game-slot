import React, { useState } from 'react'
import Radium from 'radium'
import { Link, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { LayoutHeader } from '../../../styles'
import AvatarPlaceholder from '../../../assets/img/avatar.png'
import HeaderSearch from './HeaderSearch'
import { useAuth0 } from '@auth0/auth0-react'

import styles from './styles'

interface HeaderProps {
  className?: string
}

const userId = 0

const Header: React.FC<HeaderProps> = Radium(() => {
  const [navOpen, setNavOpen] = useState<boolean>(true)
  const history = useHistory()
  const { loginWithRedirect, logout, user } = useAuth0()

  const goToHome = () => {
    history.push('/')
  }

  return (
    <LayoutHeader>
      <div style={styles.logoContainer}>
        <button onClick={goToHome} style={styles.logoButton}>
          GAME SLOT
        </button>
      </div>

      <button
        onClick={() => setNavOpen((prev) => !prev)}
        style={styles.hamburgerButton}
      >
        <FontAwesomeIcon icon="bars" size="2x" />
      </button>

      <div
        className={`flex flex-1 m-0 p-5 items-start md:p-0 md:flex md:items-center md:relative bg-dark-900 
        ${navOpen ? 'hidden' : ''}`}
      >
        <div className="flex w-full flex-col flex-1 md:flex-row justify-between">
          <HeaderSearch className="mb-4 md:mb-0" />
          {user ? (
            <div className="flex items-center">
              <div className="flex flex-col items-end">
                <p className="text-white mr-4">
                  Hello, {user.given_name ?? 'user'}
                </p>
                <button
                  onClick={() => logout()}
                  className="text-white mr-4 text-xs hover:underline"
                >
                  Logout
                </button>
              </div>
              <div
                className="mr-5 rounded-full overflow-hidden text-white"
                style={{ width: '2.5rem', height: '2.5rem' }}
              >
                <Link
                  className="text-white bg-red-700 py-2 px-4 mr-2 rounded"
                  to={'/user/' + userId}
                >
                  <button>
                    <img src={user.picture ?? AvatarPlaceholder} alt="User" />
                  </button>
                  User Page
                </Link>
              </div>
            </div>
          ) : (
            <button
              className="text-white bg-red-700 py-2 px-4 mr-2 rounded"
              onClick={() => loginWithRedirect()}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </LayoutHeader>
  )
})

export default Header
