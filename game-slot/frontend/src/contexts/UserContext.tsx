import { useAuth0 } from '@auth0/auth0-react'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { callAPI } from '../services/request.service'

interface UserContextProps {
  user: User | undefined
  setUser: (user: User | undefined) => void
}

const initialValues: UserContextProps = {
  user: undefined,
  setUser: () => undefined,
}

const UserContext = createContext<UserContextProps>(initialValues)

export const useCurrentUser = () => useContext(UserContext)

const UserContextProvider: React.FC = ({ children }) => {
  const [user, _setUser] = useState<User | undefined>(initialValues.user)
  const { getAccessTokenSilently, user: userAuth } = useAuth0()

  const setUser = (_user: User | undefined) => {
    _setUser(_user)
  }

  useEffect(() => {
    if (userAuth)
      getAccessTokenSilently()
        .then(async (token) => {
          const response = await callAPI(
            'auth',
            'POST',
            { name: userAuth?.name, email: userAuth?.email },
            token
          )
          return response
        })
        .then((response) => setUser(response.data.user))
  }, [getAccessTokenSilently, userAuth])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
