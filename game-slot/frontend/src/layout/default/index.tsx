import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { StaticContext, Redirect } from 'react-router'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'
import routes from '../../routes'
import Header from './Header'
import { ContentWrapper } from '../../styles'
import { RootState } from '../../store'
import PrivateRoute from '../../components/PrivateRoute'
import { setGameLists } from '../../store/lists/actions'
import { getGameLists } from '../../services/gameLists.service'

const DefaultLayout: React.FC<RouteComponentProps<
  any,
  StaticContext,
  unknown
>> = () => {
  const user = useSelector((state: RootState) => state.userReducer.user)
  const dispatch = useDispatch()
  useEffect(() => {
    getGameLists(user?.user).then((lists) => dispatch(setGameLists(lists)))
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
      <Header user={user} />
      <Switch>
        <ContentWrapper>
          {getRoutes()}
          <Redirect from="*" to="/" />
        </ContentWrapper>
      </Switch>
    </>
  )
}

export default DefaultLayout
