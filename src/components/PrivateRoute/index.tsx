import React from 'react'
import { Route, Redirect, RouteProps, useLocation } from 'react-router-dom'
import useLogin from '../../hooks/useLogin'

const PrivateRoute: React.FC<RouteProps> = ({ component, ...rest }) => {
  const { isLoggedIn } = useLogin()
  const location = useLocation()

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          React.createElement(component ? component : () => <></>, props)
        ) : (
          <Redirect to={{ pathname: '/', state: { from: location } }} />
        )
      }
    />
  )
}

export default PrivateRoute
