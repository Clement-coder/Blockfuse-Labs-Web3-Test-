'use client'
import React from 'react'

interface PlayerState {
  id: number
  x: number
  y: number
  image: string 
  name?: string
}

const Player: React.FC<PlayerState> = ({ x, y, image, name }) => {
    return (
      <div
        className="absolute transition-all duration-500 ease-in-out"
        style={{ top: `${y}%`, left: `${x}%` }}
      >
        <img src={image} alt={name} className="w-8 h-8 rounded-full" />
      </div>
    )
  }
  

export default Player
