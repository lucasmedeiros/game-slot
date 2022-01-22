import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import UserContentHeader from '../../components/UserContentHeader'
import UsersGrid from '../../components/UsersGrid'
import querystring from 'query-string'
import { callAPI } from '../../services/request.service'
import { getUserByNickname } from '../../services/users.service'

const Follows: React.FC = () => {
  const history = useHistory()
  const [users, setUsers] = useState([])
  const [user, setUser] = useState<User | undefined>()
  const goToUserPage = (userNick: string) => {
    history.push(`/user/${userNick}`)
  }
  const pathName = history.location.pathname.split('/')

  const wlist = pathName[pathName.length - 1]

  const nickname = pathName[pathName.length - 2]

  useEffect(() => {
    const getUser = async () => {
      const user = await getUserByNickname(nickname)
      setUser(user)
    }
    getUser()
    const getFollowers = async () => {
      const query = querystring.stringify({
        idUserFollower: user?._id,
      })
      const { data: followers } = await callAPI(`users?${query}`, 'GET', null)
      setUsers(followers)
    }

    const getFollowings = async () => {
      const query = querystring.stringify({
        idUserFollowing: user?._id,
      })
      const { data: followings } = await callAPI(`users?${query}`, 'GET', null)
      setUsers(followings)
    }

    wlist == 'followers' ? getFollowings() : getFollowers()
  }, [wlist, user?._id, nickname])

  return (
    <div>
      <UserContentHeader user={user} sectionContentName={wlist} />
      <UsersGrid users={users} onClick={goToUserPage} />
    </div>
  )
}

export default Follows
