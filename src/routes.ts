import { Home, GamePage, SearchHome, Search } from './pages'

const routes: RouteObject[] = [
  {
    name: 'Home',
    component: Home,
    path: '/',
    layout: '/default',
  },
  {
    name: 'Game',
    component: GamePage,
    path: '/game/:id',
    layout: '/default',
  },
  {
    name: 'SearchHome',
    component: SearchHome,
    path: '/search',
    layout: '/default',
  },
  {
    name: 'Search',
    component: Search,
    path: '/search/:searchTerm',
    layout: '/default',
  },
]

export default routes
