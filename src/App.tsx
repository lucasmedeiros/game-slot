import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './App.css'

library.add(fas)

function App() {
  return (
    <main className="app">
      <button className="close">
        <FontAwesomeIcon icon="times" color="white" size="lg" />
      </button>
      <section className="app-section">
        <form className="form">
          <h3>Hollow Knight: Silksong</h3>
          <textarea
            placeholder="Review this game"
            className="text-area"
            rows={6}
          />
          <p>Do you recommend this game?</p>
          <div className="btn-group">
            <button>
              <FontAwesomeIcon icon="thumbs-up" color="#3e885b" size="lg" />
            </button>
            <button>
              <FontAwesomeIcon icon="meh" color="#f8f32b" size="lg" />
            </button>
            <button>
              <FontAwesomeIcon icon="thumbs-down" color="#bf412e" size="lg" />
            </button>
          </div>
          <button className="submit">SUBMIT REVIEW</button>
        </form>
      </section>
    </main>
  )
}

export default App
