interface IGame {
  name: string
  steamAppId: string
  imageUrl: string
}

type RecommendationValue = 'yes' | 'no' | 'meh' | undefined
