/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import querystring from 'query-string'
import { callAPI } from '../services/request.service'

interface ObjectGameSearch {
  loading: boolean
  searchResult: IGame[]
  error: string | undefined
}

const useGameSearch = (
  searchTerm: string,
  deps: any[] = []
): ObjectGameSearch => {
  const [loading, setLoading] = useState<boolean>(true)
  const [searchResult, setSearchResult] = useState<IGame[]>([])
  const [error, setError] = useState<string>()

  useEffect(() => {
    const getSearchResults = async () => {
      const query = querystring.stringify({ search: searchTerm })
      const response = await callAPI(`steam/find?${query}`, 'GET', null)

      if (response.success) {
        const { data } = response
        setSearchResult(data)
      } else {
        if (response.status === 404) setError('0 results match your search')
        else setError(response.message)
      }

      setLoading(false)
    }

    getSearchResults()
  }, [searchTerm, ...deps])

  return { loading, searchResult, error }
}

export default useGameSearch
