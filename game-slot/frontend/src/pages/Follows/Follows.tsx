import React from 'react'
import { useHistory } from 'react-router-dom'
import UserContentHeader from '../../components/UserContentHeader'
import UsersGrid from '../../components/UsersGrid'
import { useCurrentUser } from '../../contexts/UserContext'

const Follows: React.FC = () => {
  const { user } = useCurrentUser()
  const history = useHistory()
  const goToUserPage = (userNick: string) => {
    history.push(`/user/${userNick}`)
  }

  const pathName = history.location.pathname.split('/')

  console.log(pathName[pathName.length - 1])

  const wlist = pathName[pathName.length - 1]

  // const a = wlist == 'followers' ? user?.followers : user?.followings

  return (
    <div>
      <UserContentHeader user={user} sectionContentName={wlist} />
      <UsersGrid users={[]} onClick={goToUserPage} />
    </div>
  )
}

export default Follows
