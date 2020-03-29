/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { callAPI } from '../services/request.service'
import { getUserFromLocalStorage } from '../utils'

interface LoginParams {
  email: string
  password: string
}

interface LoginInfo {
  isLoggedIn: boolean
  loggingIn: boolean
  login: (params: LoginParams) => void
  user: User | undefined
  error: string | undefined
}

const useLogin = (): LoginInfo => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    getUserFromLocalStorage() !== undefined
  )
  const [loggingIn, setLoggingIn] = useState<boolean>(false)
  const [params, setParams] = useState<LoginParams>()
  const [user, setUser] = useState<User>()
  const [error, setError] = useState<string>()

  const login = ({ email, password }: LoginParams): void => {
    setParams({ email, password })
    setLoggingIn(true)
  }

  async function handleLogin() {
    const response = await callAPI('/auth', 'POST', params)
    if (response.success) {
      setUser(response.data)
      setIsLoggedIn(true)
    } else setError(response.message)
    setLoggingIn(false)
  }

  useEffect(() => {
    if (loggingIn) handleLogin()
  }, [loggingIn])

  return { isLoggedIn, loggingIn, login, user, error }
}

export default useLogin
