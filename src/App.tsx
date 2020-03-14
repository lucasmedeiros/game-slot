import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import DefaultLayout from './layout/default'

library.add(fas)

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="" render={props => <DefaultLayout {...props} />} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
