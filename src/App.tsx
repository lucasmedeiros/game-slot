import React, { useState } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './App.css'

library.add(fas)

function App() {
  const [recommendation, setRecommendation] = useState<RecommendationValue>()

  const onRecommendationChange = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    value: RecommendationValue
  ) => {
    e.preventDefault()
    setRecommendation(prev => (prev === value ? undefined : value))
  }

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
            <button onClick={e => onRecommendationChange(e, 'yes')}>
              <FontAwesomeIcon
                icon="thumbs-up"
                color={recommendation === 'yes' ? '#3e885b' : '#fff'}
                size="lg"
              />
            </button>
            <button onClick={e => onRecommendationChange(e, 'meh')}>
              <FontAwesomeIcon
                icon="meh"
                color={recommendation === 'meh' ? '#f8f32b' : '#fff'}
                size="lg"
              />
            </button>
            <button onClick={e => onRecommendationChange(e, 'no')}>
              <FontAwesomeIcon
                icon="thumbs-down"
                color={recommendation === 'no' ? '#bf412e' : '#fff'}
                size="lg"
              />
            </button>
          </div>
          <button className="submit">SUBMIT REVIEW</button>
        </form>
      </section>
    </main>
  )
}

export default App
