import React, { useEffect, useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'

const Login: React.FC = () => {
  const { isLoggedIn, loggingIn, error, login } = useAuth()
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [usernameError, setUsernameError] = useState<string>('')
  const [passError, setPassError] = useState<string>('')

  useEffect(() => {
    if (username) setUsernameError('')
    if (password) setPassError('')
  }, [username, password])

  const validateInputs = () => {
    if (!username) setUsernameError(`'Username' is required`)
    if (!password) setPassError(`'Password' is required`)
  }

  const onLogin = (e: any) => {
    e.preventDefault()
    if (!loggingIn) {
      validateInputs()

      if (username && password) {
        login({ email: username, password })
      }
    }
  }

  return !isLoggedIn ? (
    <section className="w-full h-full flex items-center justify-center">
      <form
        className="bg-dark-700 w-full mt-5 mx-3 md:mx-0 md:w-1/2 px-3 py-2 md:px-8 md:py-6 rounded-lg"
        onSubmit={onLogin}
      >
        <div className="mb-6">
          <label
            className="block text-gray-200 text-sm font-bold mb-2 uppercase"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className={`shadow appearance-none border ${
              usernameError ? 'border-red-600' : ''
            } border-dark-500 rounded placeholder-dark-300 w-full py-2 px-3 text-white leading-tight focus:outline-none bg-dark-600`}
            id="username"
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
        {error && <p className="text-red-500 mb-4 text-xs italic">{error}</p>}
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
    <Redirect to="/" />
  )
}

export default Login
