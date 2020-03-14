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

interface IReviewButtons {
  value: RecommendationValue
}

interface ReviewModalProps {
  isOpen: boolean
  onClose(): void
}

interface HeaderProps {}

type RecommendationValue = 'yes' | 'no' | 'meh' | undefined
