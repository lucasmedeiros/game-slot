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
  toggleModal(): void
}

type RecommendationValue = 'yes' | 'no' | 'meh' | undefined
