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
        onClick={() => onClick(user.nickname)}
        key={user._id}
        className="cursor-pointer shadow"
      >
        <img
          src={user.picture ?? AvatarPlaceholder}
          onError={(e: any) => {
            e.target.onerror = null
            e.target.src = AvatarPlaceholder
          }}
          alt={user.nickname}
        />
      </div>
    ))}
  </Grid>
)

export default UsersGrid
