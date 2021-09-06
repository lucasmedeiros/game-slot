import {
  Home,
  GamePage,
  Search,
  Login,
  NewList,
  ViewList,
  SignUp,
  UserPage,
} from './pages'
import { UserList } from './pages/UserList'
import { UserReviews } from './pages/UserReviews'

interface RouteObject {
  name: string
  path: string
  component: React.FC
  layout: '/default' | '/login'
  exact: boolean
  private: boolean
}

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
  {
    name: 'Login',
    component: Login,
    path: '/login',
    layout: '/default',
    exact: true,
    private: false,
  },
  {
    name: 'NewList',
    component: NewList,
    path: '/list',
    layout: '/default',
    exact: true,
    private: true,
  },
  {
    name: 'ViewList',
    component: ViewList,
    path: '/list/:id',
    layout: '/default',
    exact: true,
    private: false,
  },
  {
    name: 'SignUp',
    component: SignUp,
    path: '/new/account',
    layout: '/default',
    exact: true,
    private: false,
  },
  {
    name: 'UserPage',
    component: UserPage,
    path: '/user/:id',
    layout: '/default',
    exact: true,
    private: false,
  },
  {
    name: 'UserList',
    component: UserList,
    path: '/user/:id/lists',
    layout: '/default',
    exact: true,
    private: false,
  },
  {
    name: 'UserReviews',
    component: UserReviews,
    path: '/user/:id/reviews',
    layout: '/default',
    exact: true,
    private: false,
  },
]

export default routes
