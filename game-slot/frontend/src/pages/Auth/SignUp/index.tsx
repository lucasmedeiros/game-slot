import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import classnames from 'classnames'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
import { signup } from '../../../services/auth.service'

const Login: React.FC = () => {
  const user = useSelector((state: RootState) => state.userReducer.user)
  const [submissionError, setSubmissionError] = useState<string>()
  const [signingUp, setSigningUp] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [nameError, setNameError] = useState<string>('')
  const [usernameError, setUsernameError] = useState<string>('')
  const [passError, setPassError] = useState<string>('')
  const [confirmPassError, setConfirmPassError] = useState<string>('')

  useEffect(() => {
    if (name) setNameError('')
    if (username) setUsernameError('')
    if (password) setPassError('')
    if (confirmPassword) setConfirmPassError('')
  }, [username, password, confirmPassword, name])

  const validateInputs = () => {
    if (!name.trim()) setNameError(`'Name' is required`)
    if (!username.trim()) setUsernameError(`'Username' is required`)
    if (!password.trim()) setPassError(`'Password' is required`)
    if (!confirmPassword.trim())
      setConfirmPassError(`'Confirm password' is required`)
  }

  const clear = () => {
    setName('')
    setUsername('')
    setPassword('')
    setConfirmPassword('')
  }

  const onLogin = async (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()
    if (!signingUp) {
      validateInputs()

      if (username && password) {
        setSigningUp(true)
        const response = await signup({
          name,
          email: username,
          password,
          confirmPassword,
        })

        if (!response.success) setSubmissionError(response.message)
        else clear()

        setSuccess(response.success)
        setSigningUp(false)
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
            htmlFor="name"
          >
            Name
          </label>
          <input
            className={classnames(
              'shadow appearance-none border border-dark-500 rounded placeholder-dark-300 w-full py-2 px-3 text-white leading-tight focus:outline-none bg-dark-600',
              {
                'border-red-600': !!nameError,
              }
            )}
            id="name"
            type="text"
            autoComplete="none"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && (
            <p className="text-red-500 text-xs italic mt-2">{nameError}</p>
          )}
        </div>
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
            placeholder="johndoe739"
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
            className={classnames(
              'shadow appearance-none border border-dark-500 rounded w-full placeholder-dark-300 py-2 px-3 text-white leading-tight focus:outline-none bg-dark-600',
              {
                'border-red-600': !!passError,
              }
            )}
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
        <div className="mb-6">
          <label
            className="block text-gray-200 text-sm font-bold mb-2 uppercase"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            className={classnames(
              'shadow appearance-none border border-dark-500 rounded w-full placeholder-dark-300 py-2 px-3 text-white mb-3 leading-tight focus:outline-none bg-dark-600',
              {
                'border-red-600': !!confirmPassError,
              }
            )}
            id="confirmPassword"
            type="password"
            placeholder="********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {confirmPassError && (
            <p className="text-red-500 text-xs italic">{confirmPassError}</p>
          )}
        </div>
        {(!!submissionError || success) && (
          <p
            className={classnames('mb-4 text-xs italic', {
              'text-red-500': !!submissionError,
              'text-green-300': success,
            })}
          >
            {submissionError ?? 'Conta criada com sucesso!'}
          </p>
        )}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <button
            onClick={onLogin}
            className={`bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              signingUp ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'
            }`}
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </section>
  ) : (
    <Redirect to="/" />
  )
}

export default Login
