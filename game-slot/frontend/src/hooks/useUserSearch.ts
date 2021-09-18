/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import querystring from 'query-string'
import { callAPI } from '../services/request.service'

interface ObjectUserSearch {
  loading: boolean
  searchResult: User[] | undefined
  error: string | undefined
}

const useUserSearch = (
  searchTerm: string,
  deps: any[] = []
): ObjectUserSearch => {
  const [loading, setLoading] = useState<boolean>(true)
  const [searchResult, setSearchResult] = useState<User[]>()
  const [error, setError] = useState<string>()

  const getSearchResults = async () => {
    const query = querystring.stringify({
      nickname: searchTerm,
    })
    const response = await callAPI(`users?${query}`, 'GET', null)

    if (response.success) {
      const { data } = response
      setSearchResult(data)
    } else {
      if (response.status === 404) setError('0 results match your search')
      else setError(response.message)
    }

    setLoading(false)
  }
  useEffect(() => {
    getSearchResults()
  }, [searchTerm, ...deps])

  return { loading, searchResult, error }
}

export default useUserSearch
