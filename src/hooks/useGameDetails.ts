/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { callAPI } from '../services/request.service'

interface ObjectGameDetails {
  loading: boolean
  details: IGameDetails | undefined
  error: string | undefined
}

const useGameDetails = (appId: string, deps: any[] = []): ObjectGameDetails => {
  const [loading, setLoading] = useState<boolean>(true)
  const [details, setDetails] = useState<IGameDetails>()
  const [error, setError] = useState<string>()

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

      setLoading(false)
    }

    getAppDetails()
  }, [appId, ...deps])

  return { loading, details, error }
}

export default useGameDetails
