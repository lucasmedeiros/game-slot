import React from 'react'
import { Grid } from '../styles'
import AvatarPlaceholder from '../assets/img/avatar.png'

interface Props {
  users: User[]
  onClick: (nickname: string) => void
}

const UsersGrid = ({ users, onClick }: Props) => (
  <Grid className="p-4" min={300}>
    {users.map((user) => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        onClick={() => onClick(user.nickname)}
        key={user._id}
      >
        <img
          style={{
            width: 128,
            borderRadius: '50%',
            marginTop: 16,
            marginBottom: 16,
            cursor: 'pointer',
          }}
          src={user.picture ?? AvatarPlaceholder}
          alt={user.nickname}
        />
        <span style={{ fontSize: 24, cursor: 'pointer' }}>{user.nickname}</span>
      </div>
    ))}
  </Grid>
)

export default UsersGrid
