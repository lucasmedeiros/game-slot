import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import DefaultLayout from './layout/default'
import { store } from './store'
import { Auth0Provider } from '@auth0/auth0-react'
import Radium from 'radium'

const { StyleRoot } = Radium

library.add(fas)

const providerConfig = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN ?? '',
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID ?? '',
  redirectUri: window.location.origin,
  scope: 'read:current_user',
}

const App: React.FC = () => {
  return (
    <StyleRoot>
      <Provider store={store}>
        <Auth0Provider {...providerConfig}>
          <BrowserRouter>
            <Switch>
              <Route path="" render={(props) => <DefaultLayout {...props} />} />
            </Switch>
          </BrowserRouter>
        </Auth0Provider>
      </Provider>
    </StyleRoot>
  )
}

export default App
