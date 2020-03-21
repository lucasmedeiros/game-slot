/* eslint-disable no-extend-native */
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ClipLoader } from 'react-spinners'
import { useHistory } from 'react-router'
import { Button } from '../../styles'
import useGameDetails from '../../hooks/useGameDetails'
import './Content.scss'
import { arrayUnique, getRandomItemFromArray, preLoadImage } from '../../utils'

const Content = ({ game, onClose }: { game: IGame; onClose: () => void }) => {
  const history = useHistory()
  const { details, loading } = useGameDetails(game.steamAppId, [game])
  const [loadingImage, setLoadingImage] = useState<boolean>(true)
  const [image, setImage] = useState<string>()

  useEffect(() => {
    if (details?.screenshots)
      setImage(getRandomItemFromArray(details.screenshots))
  }, [details])

  useEffect(() => {
    if (image) {
      preLoadImage(image).then(res => setLoadingImage(!res))
    }
  }, [image])

  const goToGamePage = (id: string) => history.push(`game/${id}`)

  return (
    <div className="content">
      <div className="content__background">
        <div className="content__background__shadow" />
        <div
          className="content__background__image"
          style={{
            backgroundImage: loadingImage ? 'none' : `url(${image})`,
            backgroundColor: 'black',
          }}
        />
      </div>
      <div className="content__area">
        <div className="content__area__container">
          <div className="content__title">
            {loading ? '' : details?.game.name}
          </div>
          <div className="content__info">
            {loading ? (
              <div className="w-full flex justify-center items-center">
                <ClipLoader size={100} color="white" />
              </div>
            ) : (
              <>
                <p>{details?.description}</p>
                <p className="text-blue-400 py-4">
                  {arrayUnique(
                    details?.developers.concat(details?.publishers)
                  ).join(', ')}
                </p>
                <div className="flex text-white items-center py-4">
                  <p>
                    <FontAwesomeIcon icon="thumbs-up" size="xs" />
                  </p>
                  <p className="px-3">10</p>
                  <p className="pr-3">•</p>
                  <p>
                    <FontAwesomeIcon icon="thumbs-down" size="xs" />
                  </p>
                  <p className="px-3">2</p>
                </div>
              </>
            )}
          </div>
          <Button
            className="bg-blue-700 shadow-md hover:bg-blue-500 text-white font-bold py-3 px-4 mt-3 rounded focus:outline-none"
            type="button"
            onClick={() => goToGamePage(game.steamAppId)}
          >
            VIEW
          </Button>
        </div>
        <button className="content__close" onClick={onClose}>
          <FontAwesomeIcon icon="times" color="white" size="2x" />
        </button>
      </div>
    </div>
  )
}

export default Content
