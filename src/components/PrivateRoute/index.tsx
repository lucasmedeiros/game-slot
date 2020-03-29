import React from 'react'
import { Route, Redirect, RouteProps, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const PrivateRoute: React.FC<RouteProps> = ({ component, ...rest }) => {
  const { isLoggedIn } = useAuth()
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
