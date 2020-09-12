import React from 'react'
import { Route, Redirect, RouteProps, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

const PrivateRoute: React.FC<RouteProps> = ({ component, ...rest }) => {
  const user = useSelector((state: RootState) => state.userReducer.user)
  const location = useLocation()

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          React.createElement(component ? component : () => <></>, props)
        ) : (
          <Redirect to={{ pathname: '/', state: { from: location } }} />
        )
      }
    />
  )
}

export default PrivateRoute
