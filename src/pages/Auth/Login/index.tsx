import React, { useEffect, useState } from 'react'
import { Redirect, Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../../store/user/actions'
import { RootState } from '../../../store'
import { login } from '../../../services/auth.service'

const Login: React.FC = () => {
  const user = useSelector((state: RootState) => state.userReducer.user)
  const [submissionError, setSubmissionError] = useState<string>()
  const [loggingIn, setLoggingIn] = useState<boolean>(false)
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [usernameError, setUsernameError] = useState<string>('')
  const [passError, setPassError] = useState<string>('')
  const dispatch = useDispatch()
  const location = useLocation<DefaultLocation>()

  useEffect(() => {
    if (username) setUsernameError('')
    if (password) setPassError('')
  }, [username, password])

  const validateInputs = () => {
    if (!username) setUsernameError(`'Username' is required`)
    if (!password) setPassError(`'Password' is required`)
  }

  const onLogin = async (e: any) => {
    e.preventDefault()
    if (!loggingIn) {
      validateInputs()

      if (username && password) {
        setLoggingIn(true)
        const response = await login({ email: username, password })
        if (response.success) {
          dispatch(setUser(response.data))
        } else {
          setSubmissionError(response.message)
        }
        setLoggingIn(false)
      }
    }
  }

  return !user ? (
    <section className="w-full h-full flex items-center justify-center">
      <form
        className="bg-dark-700 w-full mt-5 mx-3 md:mx-0 md:w-1/2 px-3 py-2 md:px-8 md:py-6 rounded-lg"
        onSubmit={onLogin}
      >
        <div className="mb-6">
          <label
            className="block text-gray-200 text-sm font-bold mb-2 uppercase"
            htmlFor="email"
          >
            Username
          </label>
          <input
            className={`shadow appearance-none border ${
              usernameError ? 'border-red-600' : ''
            } border-dark-500 rounded placeholder-dark-300 w-full py-2 px-3 text-white leading-tight focus:outline-none bg-dark-600`}
            id="email"
            type="text"
            autoComplete="none"
            placeholder="johndoe@example.com"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {usernameError && (
            <p className="text-red-500 text-xs italic mt-2">{usernameError}</p>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-200 text-sm font-bold mb-2 uppercase"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className={`shadow appearance-none border ${
              passError ? 'border-red-600' : ''
            } border-dark-500 rounded w-full placeholder-dark-300 py-2 px-3 text-white mb-3 leading-tight focus:outline-none bg-dark-600`}
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passError && (
            <p className="text-red-500 text-xs italic">{passError}</p>
          )}
        </div>
        {submissionError && (
          <p className="text-red-500 mb-4 text-xs italic">{submissionError}</p>
        )}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <button
            onClick={onLogin}
            className={`bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              loggingIn ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'
            }`}
            type="submit"
          >
            Sign In
          </button>
          <Link
            className="inline-block mt-3 md:mt-0 align-baseline font-bold text-sm text-white hover:text-blue-400"
            to="/new/account"
          >
            Create account
          </Link>
        </div>
      </form>
    </section>
  ) : (
    <Redirect to={location.state?.from ?? '/'} />
  )
}

export default Login
