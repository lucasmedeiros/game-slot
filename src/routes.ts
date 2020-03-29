import { Home, GamePage, Search } from './pages'

const routes: RouteObject[] = [
  {
    name: 'Home',
    component: Home,
    path: '/',
    layout: '/default',
    exact: true,
  },
  {
    name: 'Game',
    component: GamePage,
    path: '/game/:id',
    layout: '/default',
    exact: true,
  },
  {
    name: 'SearchHome',
    component: Search,
    path: '/search',
    layout: '/default',
    exact: true,
  },
  {
    name: 'Search',
    component: Search,
    path: '/search/:searchTerm',
    layout: '/default',
    exact: true,
  },
]

export default routes
