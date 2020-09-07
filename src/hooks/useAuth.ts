import { useState, useEffect } from 'react'
import { callAPI } from '../services/request.service'
import {
  getFromLocalStorage,
  addToLocalStorage,
  removeFromLocalStorage,
} from '../utils'

interface LoginParams {
  email: string
  password: string
}

export interface AuthInfo {
  isLoggedIn: boolean
  loggingIn: boolean
  user: User | undefined
  error: string | undefined
  login: (params: LoginParams) => void
  logout: () => void
}

const useAuth = (): AuthInfo => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    getFromLocalStorage('user') !== undefined
  )
  const [loggingIn, setLoggingIn] = useState<boolean>(false)
  const [params, setParams] = useState<LoginParams>()
  const [user, setUser] = useState<User>()
  const [error, setError] = useState<string>()

  const logout = () => {
    removeFromLocalStorage('user')
    setUser(undefined)
  }

  const login = ({ email, password }: LoginParams): void => {
    setParams({ email, password })
    setLoggingIn(true)
  }

  const handleLogin = async () => {
    const response = await callAPI('auth', 'POST', params)
    const { data, success, message } = response
    if (success) {
      addToLocalStorage('user', data)
      setUser(data)
      setIsLoggedIn(true)
    } else setError(message)
    setLoggingIn(false)
  }

  useEffect(() => {
    if (loggingIn) handleLogin()
  }, [loggingIn])

  return { isLoggedIn, loggingIn, user, error, login, logout }
}

export default useAuth
