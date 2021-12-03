import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import ImagePlaceholder from '../../assets/img/image_placeholder.png'
import { callAPI } from '../../services/request.service'
import More from './More'

const DEFAULT_LENGTH = 3

interface List {
  list: GameList
}

function ListItem({ list }: List) {
  const [firstGame] = list.games
  const history = useHistory()
  const goToListPage = (id: string) => {
    history.push(`/list/${id}`)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '10px 30px 10px 0',
        justifyContent: 'start',
        alignItems: 'center',
        textAlign: 'center',
        width: '300px',
      }}
    >
      <img
        src={firstGame?.imageUrl ?? ImagePlaceholder}
        alt={`First game banner from list ${list.name}`}
        onClick={() => goToListPage(list._id)}
        style={{
          width: '250px',
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
}

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
        marginTop: '30px',
        marginBottom: '30px',
      }}
    >
      {lists?.length ? (
        <>
          {lists.slice(0, DEFAULT_LENGTH).map((list) => (
            <ListItem list={list} key={list._id} />
          ))}
          <More type="list" nickname={nickname} />
        </>
      ) : (
        <div>No lists to show</div>
      )}
    </div>
  )
}

export default Lists
