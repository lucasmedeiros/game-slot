/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import querystring from 'query-string'
import { callAPI } from '../services/request.service'

interface ObjectGameSearch {
  loading: boolean
  searchResult: PaginatedResult<IGame> | undefined
  error: string | undefined
  update: (page?: number, limit?: number) => void
}

const useGameSearch = (
  searchTerm: string,
  deps: any[] = []
): ObjectGameSearch => {
  const [loading, setLoading] = useState<boolean>(true)
  const [searchResult, setSearchResult] = useState<PaginatedResult<IGame>>()
  const [error, setError] = useState<string>()

  const getSearchResults = async (page: number = 1, limit: number = 15) => {
    const query = querystring.stringify({
      search: searchTerm,
      page,
      limit,
    })
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

  const update = (page?: number, limit?: number) => {
    setLoading(true)
    getSearchResults(page, limit)
  }

  useEffect(() => {
    getSearchResults()
  }, [searchTerm, ...deps])

  return { loading, searchResult, error, update }
}

export default useGameSearch
