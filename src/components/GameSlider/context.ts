import React from 'react'

const SliderContext = React.createContext<SliderContextType>({
  currentSlide: null,
  elementRef: null,
  onSelectSlide: (game: IGame) => game,
})

export default SliderContext
