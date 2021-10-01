import React from 'react'
import { Link } from 'react-router-dom'
import AvatarPlaceholder from '../assets/img/avatar.png'

interface Props {
  user: User
  sectionContentName: string
}

const UserContentHeader = ({ user, sectionContentName }: Props) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        margin: '0 0 2em 0',
        padding: '0 1rem 1rem 1rem',
        borderBottom: '1px solid #27292c',
      }}
    >
      <Link
        style={{
          width: '2.5rem',
          height: '2.5rem',
          cursor: 'pointer',
        }}
        to={`/user/${user.nickname}`}
      >
        <img
          style={{ borderRadius: '50%' }}
          src={user.picture ?? AvatarPlaceholder}
          alt="User"
        />
      </Link>
      <p style={{ marginLeft: '1em', fontSize: '20px' }}>
        {user.nickname}&apos;s {sectionContentName}
      </p>
    </div>
  )
}

export default UserContentHeader
