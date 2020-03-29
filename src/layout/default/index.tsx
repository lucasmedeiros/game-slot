import React from 'react'
import { useSelector } from 'react-redux'
import { StaticContext, Redirect } from 'react-router'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'
import { History } from 'history'
import routes from '../../routes'
import Header from './Header'
import { ContentWrapper } from '../../styles'
import { RootState } from '../../store'

const DefaultLayout: React.FC<RouteComponentProps<
  any,
  StaticContext,
  History.PoorMansUnknown
>> = () => {
  const user = useSelector((state: RootState) => state.userReducer.user)

  console.log(user)

  // useEffect(() => console.log(user), [user])

  // const login = () => {
  //   dispatch(
  //     setUser({
  //       token: 'asasas',
  //       user: {
  //         __v: 0,
  //         _id: '',
  //         email: '',
  //         name: '',
  //       },
  //     })
  //   )
  // }

  const getRoutes = () =>
    routes.map((route, key) =>
      route.layout === '/default' ? (
        <Route
          path={route.path}
          component={route.component}
          exact={route.exact}
          key={key}
        />
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
