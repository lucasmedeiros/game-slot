import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './App.css'

library.add(fas)

function App() {
  return (
    <main className="app">
      <section className="app-section">
        <h3>Hollow Knight: Silksong</h3>
        <form className="form">
          <div className="game-info">
            <img
              src="https://steamcdn-a.akamaihd.net/steam/apps/1030300/header.jpg"
              alt="Steam game header"
            />
          </div>
          <div className="input-wrapper">
            <textarea className="text-area" rows={6} />
            <p>Do you recommend this game?</p>
            <div className="btn-group">
              <button className="btn">
                <FontAwesomeIcon icon="thumbs-up" color="green" size="lg" />
              </button>
              <button className="btn">
                <FontAwesomeIcon icon="thumbs-down" color="red" size="lg" />
              </button>
            </div>
          </div>
        </form>
        <button className="submit">SUBMIT REVIEW</button>
      </section>
    </main>
  )
}

export default App
