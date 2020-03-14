interface RouteObject {
  name: string
  path: string
  component: React.FC
  layout: '/default' | '/login'
}

interface IGame {
  name: string
  steamAppId: string
  imageUrl: string
}

interface SliderContextType {
  onSelectSlide: (game: IGame) => void
  currentSlide: IGame | null
  elementRef: any
}

interface IReviewButtons {
  value: RecommendationValue
}

interface HeaderProps {}

interface ReviewModalProps {
  isOpen: boolean
  onClose(): void
}

interface IGameSlideProps {
  activeSlide?: IGame | null
}

type RecommendationValue = 'yes' | 'no' | 'meh' | undefined
