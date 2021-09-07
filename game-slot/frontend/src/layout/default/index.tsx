/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { StaticContext } from 'react-router'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'
import routes from '../../routes'
import Header from './Header'
import { ContentWrapper } from '../../styles'
import PrivateRoute from '../../components/PrivateRoute'
import { setGameLists } from '../../store/lists/actions'
import { getGameLists } from '../../services/gameLists.service'
import { useCurrentUser } from '../../contexts/UserContext'

const DefaultLayout: React.FC<
  RouteComponentProps<any, StaticContext, unknown>
> = () => {
  const dispatch = useDispatch()
  const { user } = useCurrentUser()

  useEffect(() => {
    if (user) getGameLists(user).then((lists) => dispatch(setGameLists(lists)))
  }, [dispatch, user])

  const getRoutes = useCallback(
    () =>
      routes.map((route, key) =>
        route.layout === '/default' ? (
          route.private ? (
            <PrivateRoute
              path={route.path}
              component={route.component}
              exact={route.exact}
              key={key}
            />
          ) : (
            <Route
              path={route.path}
              component={route.component}
              exact={route.exact}
              key={key}
            />
          )
        ) : null
      ),
    []
  )
  return (
    <>
      <Header />
      <Switch>
        <ContentWrapper>{getRoutes()}</ContentWrapper>
      </Switch>
    </>
  )
}

export default DefaultLayout
