import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import Timeline from './Timeline'
import NotLoggedHome from './NotLoggedHome'

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth0()

  return (
    <section className="w-full h-full justify-center items-center">
      {isAuthenticated ? <Timeline /> : <NotLoggedHome />}
    </section>
  )
}

export default Home
