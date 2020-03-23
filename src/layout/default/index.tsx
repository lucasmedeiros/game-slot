import React from 'react'
import { StaticContext, Redirect } from 'react-router'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'
import { History } from 'history'
import routes from '../../routes'
import Header from '../Header'
import { ContentWrapper } from '../../styles'

const DefaultLayout: React.FC<RouteComponentProps<
  any,
  StaticContext,
  History.PoorMansUnknown
>> = () => {
  const getRoutes = () =>
    routes.map((route, key) =>
      route.layout === '/default' ? (
        <Route path={route.path} component={route.component} exact key={key} />
      ) : null
    )
  return (
    <>
      <Header />
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
