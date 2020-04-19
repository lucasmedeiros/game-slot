import React from 'react'
import { useSelector } from 'react-redux'
import { StaticContext, Redirect } from 'react-router'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'
import { History } from 'history'
import routes from '../../routes'
import Header from './Header'
import { ContentWrapper } from '../../styles'
import { RootState } from '../../store'
import PrivateRoute from '../../components/PrivateRoute'

const DefaultLayout: React.FC<RouteComponentProps<
  any,
  StaticContext,
  History.PoorMansUnknown
>> = () => {
  const user = useSelector((state: RootState) => state.userReducer.user)

  const getRoutes = () =>
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
    )
  return (
    <>
      <Header user={user} />
      <ContentWrapper>
        <Switch>
          {getRoutes()}
          <Redirect from="*" to="/" />
        </Switch>
      </ContentWrapper>
    </>
  )
}

export default DefaultLayout