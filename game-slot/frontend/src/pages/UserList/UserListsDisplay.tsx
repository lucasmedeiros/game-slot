import React from 'react'
import { Link } from 'react-router-dom'
import { Grid } from '../../styles'
import ImagePlaceholder from '../../assets/img/image_placeholder.png'

interface Props {
  lists: GameList[]
  currentUser?: boolean
}

const CurrentUserLists = ({ lists, currentUser }: Props) => {
  const renderLists = (lists: GameList[]) => {
    return (
      <Grid className="p-4" min={300}>
        {lists.map((list) => {
          const [firstGame] = list.games

          return (
            <Link to={`/list/${list._id}`} key={list._id}>
              <img
                src={firstGame?.imageUrl ?? ImagePlaceholder}
                alt={`First game banner from list ${list.name}`}
                style={{
                  width: '100%',
                  height: '160px',
                  cursor: 'pointer',
                }}
              />
              <p className="uppercase text-white mt-3">{list.name}</p>
            </Link>
          )
        })}
      </Grid>
    )
  }

  return (
    <div>
      {lists.length ? renderLists(lists) : null}
      {currentUser && (
        <div className="p-2 md:p-5">
          <Link
            to="/list"
            className="bg-red-600 text-white p-3 mb-3 w-full text-center block md:inline md:w-auto uppercase font-bold"
            style={{ borderRadius: '4px' }}
          >
            create game list
          </Link>
        </div>
      )}
    </div>
  )
}

export default CurrentUserLists
