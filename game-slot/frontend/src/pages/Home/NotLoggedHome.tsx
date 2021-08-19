import React from 'react'
import ScreenImage from '../../assets/svg/home_screen_image.svg'
import { useHistory } from 'react-router-dom'

const NotLoggedHome: React.FC = () => {
  const history = useHistory()

  const goToSearchPage = () => {
    history.push('/search')
  }

  const goToLoginPage = () => {
    history.push('/login')
  }

  return (
    <div className="flex w-full flex justify-center md:p-10 lg:mt-12">
      <article className="px-8 py-12 max-w-md mx-auto sm:max-w-xl lg:max-w-full lg:w-1/2 lg:py-24 lg:px-12">
        <div className="xl:max-w-lg xl:mx-auto">
          <img
            className="mt-6 sm:mt-8 sm:w-full lg:hidden"
            src={ScreenImage}
            alt="Home Screen details"
          />
          <h1 className="mt-6 text-3xl sm:text-5xl font-bold text-white leading-tight">
            Browse and create lists of your <br className="" />
            <span className="text-yellow-500">favorite games!</span>
          </h1>
          <p className="mt-5 text-white sm:text-xl">
            With Game Slot, you can review games you&apos;ve played on Steam,
            read other people opinions, create a personal wishlist with the
            games you&apos;re willing to play and build a lovely community of
            game lovers!
          </p>
          <div className="flex mt-5">
            <button
              onClick={goToSearchPage}
              className="p-3 w-32 md:w-56 font-bold md:text-2xl rounded bg-blue-600 text-white"
            >
              Browse now
            </button>
            <button
              onClick={goToLoginPage}
              className="p-3 w-32 md:w-56 ml-5 font-bold md:text-2xl rounded bg-red-600 text-white"
            >
              Sign in
            </button>
          </div>
        </div>
      </article>
      <div className="hidden lg:block xl:mr-20 lg:w-1/2 lg:relative">
        <img
          className="absolute inset-0 h-full w-full"
          src={ScreenImage}
          alt="Home Screen details"
        />
      </div>
    </div>
  )
}

export default NotLoggedHome
