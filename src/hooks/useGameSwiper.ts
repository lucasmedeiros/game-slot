import { useEffect, useState } from 'react'
import Swiper from 'swiper'
import { useMediaQuery } from 'react-responsive'
import devices from '../styles/devices'

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

  const [slidesNumber, setSlidesNumber] = useState<number>(4)
  const maxMobile = useMediaQuery({ query: devices.mobileL })
  const minTablet = useMediaQuery({ query: devices.tablet })
  const minLapTop = useMediaQuery({ query: devices.laptop })

  useEffect(() => {
    if (minLapTop) {
      setSlidesNumber(4)
    } else if (minTablet) {
      setSlidesNumber(3)
    } else if (maxMobile) {
      setSlidesNumber(2)
    } else {
      setSlidesNumber(1)
    }
  }, [minTablet, minLapTop, maxMobile])

  useEffect(() => {
    new Swiper(`.${swiperContainerName}`, {
      direction: 'horizontal',
      slidesPerView: slidesNumber,
      slidesPerGroup: slidesNumber,
      spaceBetween: 10,
      navigation: {
        nextEl: `.${nextElName}`,
        prevEl: `.${prevElName}`,
      },
      loop: false,
    })
  }, [slidesNumber])

  return {
    nextElName,
    prevElName,
    swiperContainerName,
    swiperWrapperName,
  }
}

export default useGameSwiper
