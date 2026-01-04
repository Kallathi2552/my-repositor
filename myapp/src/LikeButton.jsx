import React, { useState, useEffect } from 'react'
import './LikeButton.css'  // <-- import CSS file

const LikeButton = () => {
  const [likes, setLikes] = useState(() => {
    const saved = localStorage.getItem('likes')
    return saved ? parseInt(saved) : 0
  })
  const [hearts, setHearts] = useState([])

  const handleClick = () => {
    const newLikes = likes + 1
    setLikes(newLikes)
    localStorage.setItem('likes', newLikes)

    const id = Date.now()
    setHearts((prev) => [...prev, { id, left: Math.random() * 40 - 20 }])
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== id))
    }, 600)
  }

  useEffect(() => {
    const handleStorage = () => {
      const saved = localStorage.getItem('likes')
      if (saved) setLikes(parseInt(saved))
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  return (
    <div className="like-btn-container">
      <button className="like-btn" onClick={handleClick}>
        ❤️ {likes}
      </button>

      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="heart-particle"
          style={{ left: `calc(50% + ${heart.left}px)` }}
        >
          ❤️
        </span>
      ))}
    </div>
  )
}

export default LikeButton
