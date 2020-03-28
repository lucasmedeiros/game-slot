import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import DefaultLayout from './layout/default'
import { store } from './store'

library.add(fas)

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="" render={props => <DefaultLayout {...props} />} />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
}

export default App
