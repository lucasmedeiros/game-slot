/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Fragment } from 'react'
import { Route, Redirect, RouteProps, useLocation } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'

const PrivateRoute: React.FC<RouteProps> = ({ component, ...rest }) => {
  const { user, isLoading } = useAuth0()
  const location = useLocation()

  if (isLoading) return <Fragment />

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          React.createElement(component as any, props as any)
        ) : (
          <Redirect to={{ pathname: '/', state: { from: location } }} />
        )
      }
    />
  )
}

export default PrivateRoute
