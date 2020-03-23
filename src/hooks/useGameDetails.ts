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
            name: data[appId].data.name,
            imageUrl: data[appId].data.header_image,
          },
          developers: data[appId].data.developers,
          publishers: data[appId].data.publishers,
          description: data[appId].data.short_description,
          screenshots: data[appId].data.screenshots.map(
            (screenshot: any) => screenshot.path_full
          ),
          movies: data[appId].data.movies.map((movie: any) => movie.webm.max),
        })
      } else {
        setError(response.message)
      }

      setLoading(false)
    }

    getAppDetails()
  }, [appId, ...deps])

  return { loading, details, error }
}

export default useGameDetails
