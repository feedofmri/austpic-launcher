import { useState, useEffect } from 'react'
import './App.css'
import logo from './assets/logo/austpic-logo-light.png'

function App() {
  const [countdown, setCountdown] = useState(10)
  const [showRocket, setShowRocket] = useState(false)
  const [stars, setStars] = useState([])
  const [shootingStars, setShootingStars] = useState([])

  useEffect(() => {
    // Create stars
    const newStars = []
    const colors = ['white', '#2BA8A1', '#4ECDC4', '#45B7D1', '#3dc4bc']

    for (let i = 0; i < 150; i++) {
      const size = Math.random()
      let sizeClass = 'small'
      if (size >= 0.5 && size < 0.8) sizeClass = 'medium'
      else if (size >= 0.8) sizeClass = 'large'

      const isColored = Math.random() > 0.85

      newStars.push({
        id: i,
        sizeClass,
        color: isColored ? colors[Math.floor(Math.random() * colors.length)] : 'white',
        isColored,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 2 + Math.random() * 3
      })
    }
    setStars(newStars)

    // Create shooting stars
    const newShootingStars = []
    for (let i = 0; i < 3; i++) {
      newShootingStars.push({
        id: i,
        left: Math.random() * 50,
        top: Math.random() * 50,
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 2
      })
    }
    setShootingStars(newShootingStars)
  }, [])

  useEffect(() => {
    if (countdown > 0 && !showRocket) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0) {
      setShowRocket(true)
      setTimeout(() => {
        window.location.href = 'https://austpic.com'
      }, 3500)
    }
  }, [countdown, showRocket])

  return (
    <div className="app-container">
      {/* Stars Backgrounds */}
      <div className="stars">
        {stars.map(star => (
          <div
            key={star.id}
            className={`star ${star.sizeClass} ${star.isColored ? 'colored' : ''}`}
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
              color: star.color
            }}
          />
        ))}
        {shootingStars.map(star => (
          <div
            key={`shooting-${star.id}`}
            className="shooting-star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`
            }}
          />
        ))}
      </div>

      {/* Countdown Container */}
      {!showRocket && (
        <div className="countdown-container">
          <img src={logo} alt="AustPic Logo" className="austpic-logo" />
          <div className="countdown-text">Launching in...</div>
          <div className="countdown-number" data-number={countdown} key={countdown}>
            {countdown}
          </div>
        </div>
      )}

      {/* Rocket Container */}
      {showRocket && (
        <div className="rocket-container">
          <div className="launch-text">LIFT OFF!</div>
          <div className="rocket">
            <div className="rocket-nose"></div>
            <div className="rocket-body">
              <div className="rocket-window"></div>
              <div className="rocket-fin left"></div>
              <div className="rocket-fin right"></div>
            </div>
            <div className="flames">
              <div className="flame"></div>
              <div className="flame"></div>
              <div className="flame"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

