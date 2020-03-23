import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SearchHome: React.FC = () => {
  return (
    <div
      className="flex items-center flex-col justify-center w-full text-gray-400 text-5xl"
      style={{ minHeight: '92vh' }}
    >
      <FontAwesomeIcon icon="search" size="2x" />
      <p className="mt-5">Search for games above</p>
    </div>
  )
}

export default SearchHome
