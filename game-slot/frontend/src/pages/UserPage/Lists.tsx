import React, { useEffect, useState } from 'react'
import Radium from 'radium'
import { useHistory } from 'react-router-dom'
import ImagePlaceholder from '../../assets/img/image_placeholder.png'
import { callAPI } from '../../services/request.service'
import More from './More'
import devices from '../../styles/devices'

const DEFAULT_LENGTH = 3

interface List {
  list: GameList
}

const ListItem = Radium(function ({ list }: List) {
  const [firstGame] = list.games
  const history = useHistory()
  const goToListPage = (id: string) => {
    history.push(`/list/${id}`)
  }

  return (
    <div
      style={
        {
          display: 'flex',
          padding: '10px 0px',
          flexWrap: 'wrap',
          justifyContent: 'start',
          alignItems: 'center',
          textAlign: 'center',
          width: '300px',
          [`@media ${devices.tablet}`]: {
            padding: '0 30px 10px 0',
            alignItems: 'start',
            flexDirection: 'row',
          },
        } as Radium.StyleProps['rules']
      }
    >
      <img
        src={firstGame?.imageUrl ?? ImagePlaceholder}
        alt={`First game banner from list ${list.name}`}
        onClick={() => goToListPage(list._id)}
        style={{
          width: '100%',
          height: '160px',
          cursor: 'pointer',
        }}
      />
      <div
        style={{
          fontSize: '16px',
          marginTop: '16px',
          textTransform: 'uppercase',
        }}
      >
        {list.name}
      </div>
    </div>
  )
})

interface ListsProps {
  id: string
  nickname: string
}

function Lists({ nickname, id: userId }: ListsProps) {
  const [lists, setLists] = useState<GameList[] | undefined>()

  useEffect(() => {
    const getUserLists = async () => {
      const { data } = await callAPI(`list/user/${userId}`, 'GET', null)
      setLists(data)
    }

    getUserLists()
  }, [userId])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginTop: '30px',
        marginBottom: '30px',
        width: '100%',
        alignItems: 'center',
        flexWrap: 'wrap',
        [`@media ${devices.tablet}`]: {
          alignItems: 'start',
          flexDirection: 'row',
        },
      }}
    >
      {lists?.length ? (
        <>
          {lists.slice(0, DEFAULT_LENGTH).map((list) => (
            <ListItem list={list} key={list._id} />
          ))}
          {lists.length > 3 && <More type="list" nickname={nickname} />}
        </>
      ) : (
        <div>No lists to show</div>
      )}
    </div>
  )
}

export default Radium(Lists)
