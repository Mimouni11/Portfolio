'use client'

import React, { useState, useEffect, CSSProperties } from 'react'

export interface BackgroundSceneProps {
  beamCount?: number
}

const BackgroundScene: React.FC<BackgroundSceneProps> = ({ beamCount = 60 }) => {
  const [beams, setBeams] = useState<Array<{ id: number; style: CSSProperties }>>([])

  useEffect(() => {
    const generated = Array.from({ length: beamCount }).map((_, i) => {
      const riseDur = Math.random() * 2 + 4
      const fadeDur = riseDur

      return {
        id: i,
        style: {
          left: `${Math.random() * 100}%`,
          width: `${Math.floor(Math.random() * 2) + 1}px`,
          animationDelay: `${Math.random() * 6}s`,
          animationDuration: `${riseDur}s, ${fadeDur}s`,
        },
      }
    })
    setBeams(generated)
  }, [beamCount])

  return (
    <div className="scene" role="img" aria-label="Animated aurora background">
      {/* 3-D perspective receding floor grid */}
      <div className="floor-grid" />
      {/* Bright glow line at floor level */}
      <div className="floor" />
      {/* Upward bloom from centre */}
      <div className="floor-bloom" />
      {/* Central column */}
      <div className="main-column" />
      {/* Rising beams */}
      <div className="light-stream-container">
        {beams.map((beam) => (
          <div key={beam.id} className="light-beam" style={beam.style} />
        ))}
      </div>
    </div>
  )
}

export default BackgroundScene
