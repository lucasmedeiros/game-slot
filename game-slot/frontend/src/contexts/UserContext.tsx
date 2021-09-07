import React, { createContext, useContext, useState } from 'react'

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

  const setUser = (_user: User | undefined) => {
    _setUser(_user)
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
