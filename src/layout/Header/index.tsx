import React from 'react'
import { Link } from 'react-router-dom'
import { LayoutHeader } from '../../styles'
import AvatarPlaceholder from '../../assets/img/avatar.png'
import HeaderSearch from './HeaderSearch'

const Header: React.FC<HeaderProps> = ({ className }) => (
  <LayoutHeader
    className={`bg-blue-800 flex items-center justify-between flex-wrap p-4 ${className}`}
  >
    <div className="flex items-center flex-shrink-0 text-white mr-6">
      <Link to="/" className="font-bold text-xl">
        GAME SLOT
      </Link>
      <HeaderSearch />
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
)

export default Header
