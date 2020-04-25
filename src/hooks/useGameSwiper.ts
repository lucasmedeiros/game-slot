import { useEffect } from 'react'
import Swiper from 'swiper'

const SECTION_SIZE = 4

interface GameSwiperObject {
  swiperContainerName: string
  swiperWrapperName: string
  nextElName: string
  prevElName: string
}

const useGameSwiper = (): GameSwiperObject => {
  const swiperContainerName = 'swiper-container'
  const swiperWrapperName = 'swiper-wrapper'
  const nextElName = 'swiper-button-next'
  const prevElName = 'swiper-button-prev'

  useEffect(() => {
    new Swiper(`.${swiperContainerName}`, {
      direction: 'horizontal',
      slidesPerView: SECTION_SIZE,
      slidesPerGroup: SECTION_SIZE,
      spaceBetween: 10,
      navigation: {
        nextEl: `.${nextElName}`,
        prevEl: `.${prevElName}`,
      },
    })
  }, [])

  return {
    nextElName,
    prevElName,
    swiperContainerName,
    swiperWrapperName,
  }
}

export default useGameSwiper
