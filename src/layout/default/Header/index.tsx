import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { LayoutHeader } from '../../../styles'
import AvatarPlaceholder from '../../../assets/img/avatar.png'
import HeaderSearch from './HeaderSearch'
import useAuth from '../../../hooks/useAuth'
import { deleteUser } from '../../../store/user/actions'

interface HeaderProps {
  className?: string
  user: User | undefined
}

const Header: React.FC<HeaderProps> = ({ className, user }) => {
  const { logout } = useAuth()
  const dispatch = useDispatch()
  const history = useHistory()

  const onLogout = () => {
    logout()
    dispatch(deleteUser())
    history.push('/')
  }

  return (
    <LayoutHeader
      className={`bg-pink-800 flex items-center justify-between flex-wrap p-4 ${className}`}
    >
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link to="/" className="font-bold text-xl">
          GAME SLOT
        </Link>
        <HeaderSearch />
      </div>

      {user ? (
        <div className="flex items-center">
          <div className="flex flex-col items-end">
            <p className="text-white mr-4">Olá, {user.user.name}</p>
            <button
              onClick={onLogout}
              className="text-white mr-4 text-xs hover:underline"
            >
              Sair
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
          className="text-white bg-pink-900 py-2 px-4 mr-2 rounded"
          to="/login"
        >
          Login
        </Link>
      )}
    </LayoutHeader>
  )
}

export default Header
