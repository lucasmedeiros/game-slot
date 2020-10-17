/* eslint-disable @typescript-eslint/no-empty-function */
import '@testing-library/jest-dom/extend-expect'
import React, { PropsWithChildren } from 'react'
import { render as rtlRender, cleanup, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'

import AddToListModal from '../AddToListModal'
import { gameListReducer, GameListState } from '../../../store/lists/reducers'

const game: IGame = {
  imageUrl: 'https://steamcdn-a.akamaihd.net/steam/apps/10/header.jpg',
  name: 'Counter-Strike',
  steamAppId: '10',
}

const list: GameList = {
  games: [],
  name: 'Game List',
  _id: '1',
  user: '10',
  __v: 0,
}

const list2: GameList = {
  games: [],
  name: 'Game List 2',
  _id: '2',
  user: '10',
  __v: 0,
}

const initialListState: GameListState = {
  gameLists: [list, list2],
}

const fakeReducer = combineReducers({
  gameListReducer,
})

function render(component: JSX.Element) {
  const store = createStore(fakeReducer, { gameListReducer: initialListState })
  function Wrapper({ children }: PropsWithChildren<unknown>) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(component, {
    wrapper: Wrapper,
  })
}

afterEach(() => {
  cleanup()
})

describe('tests for modal for adding a game to list', function () {
  it('should correctly render the modal', function () {
    const { getByTestId } = render(
      <AddToListModal isOpen onClose={() => {}} game={game} />
    )
    const gameTitle = getByTestId('game-title')
    const gameImage = getByTestId('game-image')
    const gameSelect = getByTestId('game-select')
    const gameButton = getByTestId('game-submit-button')

    expect(gameTitle.textContent).toBe(game.name)
    expect(gameImage).toBeInTheDocument()
    expect(gameImage).toHaveProperty('src', game.imageUrl)
    expect(gameSelect).toBeInTheDocument()
    expect(gameButton).toBeInTheDocument()
    expect(gameButton.textContent).toBe('ADD GAME')
  })

  it('should correctly select item from the list', function () {
    const { getByTestId, getAllByTestId } = render(
      <AddToListModal isOpen onClose={() => {}} game={game} />
    )
    const gameSelect = getByTestId('game-select')
    const [option1, option2] = getAllByTestId(
      'game-list-options'
    ) as HTMLOptionElement[]

    expect(option1.selected).toBeFalsy()
    expect(option2.selected).toBeFalsy()

    fireEvent.change(gameSelect, {
      target: { value: list._id },
    })

    expect(option1.selected).toBeTruthy()
    expect(option2.selected).toBeFalsy()

    fireEvent.change(gameSelect, {
      target: { value: list2._id },
    })

    expect(option1.selected).toBeFalsy()
    expect(option2.selected).toBeTruthy()
  })
})
