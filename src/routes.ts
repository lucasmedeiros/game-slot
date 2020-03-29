import { Home, GamePage, Search } from './pages'

const routes: RouteObject[] = [
  {
    name: 'Home',
    component: Home,
    path: '/',
    layout: '/default',
    exact: true,
    private: false,
  },
  {
    name: 'Game',
    component: GamePage,
    path: '/game/:id',
    layout: '/default',
    exact: true,
    private: false,
  },
  {
    name: 'SearchHome',
    component: Search,
    path: '/search',
    layout: '/default',
    exact: true,
    private: false,
  },
  {
    name: 'Search',
    component: Search,
    path: '/search/:searchTerm',
    layout: '/default',
    exact: true,
    private: false,
  },
]

export default routes
