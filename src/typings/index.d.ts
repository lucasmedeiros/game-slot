interface RouteObject {
  name: string
  path: string
  component: React.FC
  layout: '/default' | '/login'
  exact: boolean
  private: boolean
}

interface IGame {
  name: string
  steamAppId: string
  imageUrl: string
}

interface IGameDetails {
  game: IGame
  description: string
  developers: string[]
  publishers: string[]
  screenshots?: string[]
  movies?: string[]
}

interface User {
  user: {
    _id: string
    name: string
    email: string
    __v: number
  }
  token: string
}

interface UserState {
  user: User | undefined
}

interface PaginatedResult<T> {
  data: T[]
  page: number
  pageSize: number
  prevPage: number | null
  nextPage: number | null
  total: number
  totalPages: number
}

interface SliderContextType {
  onSelectSlide: (game: IGame) => void
  currentSlide: IGame | null
  elementRef: any
}

interface IReviewButtons {
  value: RecommendationValue
}

interface HeaderProps {
  className?: string
  user: User | undefined
}

interface PaginationProps {
  result: PaginatedResult<T>
  refresh: (page: number, pageSize: number) => void
}

interface SearchResultProps {
  result: PaginatedResult<IGame>
  refresh: (page: number, pageSize: number) => void
}

interface ReviewModalProps {
  isOpen: boolean
  onClose(): void
}

interface IGameSlideProps {
  activeSlide?: IGame | null
  sectionTitle: string
}

interface GamePageHeaderProps {
  backgroundImage?: string
}

interface GridProps {
  min?: number
}

interface GamePageParams {
  id: string
}

type RecommendationValue = 'yes' | 'no' | 'meh' | undefined
