/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { callAPI } from '../services/request.service'

interface ObjectGameDetails {
  loading: boolean
  details: IGameDetails | undefined
  error: string | undefined
  rating: number
}

const useGameDetails = (appId: string, deps: any[] = []): ObjectGameDetails => {
  const [loading, setLoading] = useState<boolean>(true)
  const [details, setDetails] = useState<IGameDetails>()
  const [error, setError] = useState<string>()
  const [rating, setRating] = useState<number>(-1)

  useEffect(() => {
    const getAppDetails = async () => {
      setLoading(true)
      const response = await callAPI(`steam/appdetails/${appId}`, 'GET', null)

      if (response.success) {
        const { data } = response
        setDetails({
          game: {
            steamAppId: appId,
            name: data.name,
            imageUrl: data.header_image,
          },
          developers: data.developers,
          publishers: data.publishers,
          description: data.short_description,
          screenshots: data.screenshots,
          movies: data.movies,
        })
      } else {
        if (response.status === 404) setError(`Couldn't find the game :(`)
        else setError(response.message)
      }

      const responseAvgRating = await callAPI(
        `review/game/${appId}/rating`,
        'GET',
        null
      )

      if (responseAvgRating.success) {
        const { data } = responseAvgRating
        setRating(data.average)
      } else {
        setError(
          (prevState) =>
            (prevState ? `${prevState}. ` : '') + responseAvgRating.message
        )
      }

      setLoading(false)
    }

    getAppDetails()
  }, [appId, ...deps])

  return { loading, details, error, rating }
}

export default useGameDetails
