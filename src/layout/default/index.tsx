import React from 'react'
import { StaticContext } from 'react-router'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'
import { History } from 'history'
import routes from '../../routes'

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
      <Switch>{getRoutes()}</Switch>
    </>
  )
}

export default DefaultLayout
