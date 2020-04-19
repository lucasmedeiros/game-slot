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

interface PaginatedResult<T> {
  docs: T[]
  page: number
  limit: number
  prevPage: number
  nextPage: number | null
  totalDocs: number
  totalPages: number
}

interface SliderContextType {
  onSelectSlide: (game: IGame) => void
  currentSlide: IGame | null
  elementRef: any
}

type RecommendationValue = 'yes' | 'no' | 'meh' | undefined
