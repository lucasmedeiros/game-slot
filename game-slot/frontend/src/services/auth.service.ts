import { callAPI } from './request.service'
import { addToLocalStorage, removeFromLocalStorage } from '../utils'

export interface LoginParams {
  email: string
  password: string
}

export type SignUpParams = LoginParams & {
  confirmPassword: string
  name: string
}

export const login = async (params: LoginParams) => {
  const { success, data, message } = await callAPI('auth', 'POST', params)

  if (success) addToLocalStorage('user', data)

  return { success, data, message }
}

export const signup = async (params: SignUpParams) => {
  const { data, success, message } = await callAPI(
    'auth/signup',
    'POST',
    params
  )

  return { success, data, message }
}

export const logout = () => {
  removeFromLocalStorage('user')
}
