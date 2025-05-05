'use client'
import React, { useEffect, useState } from 'react'
import Player from './Player'
import Ball from './Ball'
import io from 'socket.io-client'

const socket = io("YOUR_SOCKET_SERVER_URL") 

interface PlayerState {
  id: number
  x: number
  y: number
  image: string
  name: string
}

const dummyImages = [
  '/players/6.jpeg',
  '/players/p1.jpeg',
  '/players/p2.jpeg',
  '/players/p3.jpeg',
  '/players/p4.jpeg',
  '/players/p5.jpeg',
  '/players/p6.jpeg',
  '/players/p6.jpeg',
  '/players/p9.jpeg',
  '/players/p10.jpeg',
]

interface Event {
  type: 'goal' | 'foul' | 'substitution'
  player: string
  time: string
}

const Pitch: React.FC = () => {
  const [players, setPlayers] = useState<PlayerState[]>([])
  const [ballPosition, setBallPosition] = useState({ x: 50, y: 50 })
  const [events, setEvents] = useState<Event[]>([]) 
  const [score, setScore] = useState({ teamA: 0, teamB: 0 })

  useEffect(() => {
    const initialPlayers: PlayerState[] = []
    for (let i = 0; i < 10; i++) {
      initialPlayers.push({
        id: i + 1,
        name: `P${i + 1}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        image: dummyImages[i % dummyImages.length],
      })
    }
    setPlayers(initialPlayers)
    socket.emit("initialPlayers", initialPlayers) 
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayers(prev =>
        prev.map(p => ({
          ...p,
          x: Math.min(95, Math.max(5, p.x + (Math.random() * 10 - 5))),
          y: Math.min(95, Math.max(5, p.y + (Math.random() * 10 - 5))),
        }))
      )
      setBallPosition(prev => ({
        x: Math.min(95, Math.max(5, prev.x + (Math.random() * 10 - 5))),
        y: Math.min(95, Math.max(5, prev.y + (Math.random() * 10 - 5))),
      }))
      socket.emit("updatePlayers", players) 
      socket.emit("updateBall", ballPosition) 
    }, 1000)

    return () => clearInterval(interval)
  }, [players, ballPosition])

  useEffect(() => {
    socket.on("playerUpdate", (updatedPlayers: PlayerState[]) => {
      setPlayers(updatedPlayers)
    })
    socket.on("ballUpdate", (updatedBallPosition: { x: number, y: number }) => {
      setBallPosition(updatedBallPosition)
    })
    socket.on("newEvent", (event: Event) => {
      setEvents(prev => [...prev, event])
    })
    socket.on("scoreUpdate", (updatedScore: { teamA: number, teamB: number }) => {
      setScore(updatedScore) 
    })

    return () => {
      socket.off("playerUpdate")
      socket.off("ballUpdate")
      socket.off("newEvent")
      socket.off("scoreUpdate")
    }
  }, [])

  useEffect(() => {
    const eventInterval = setInterval(() => {
      const eventTypes: Event['type'][] = ['goal', 'foul', 'substitution']
      const randomEvent = eventTypes[Math.floor(Math.random() * eventTypes.length)]
      const randomPlayer = `P${Math.floor(Math.random() * 10) + 1}`
      const currentTime = new Date().toLocaleTimeString()

      setEvents(prev => [
        ...prev,
        { type: randomEvent, player: randomPlayer, time: currentTime },
      ])
      socket.emit("event", { type: randomEvent, player: randomPlayer, time: currentTime })

      if (randomEvent === 'goal') {
        const isTeamA = Math.random() < 0.5 
        if (isTeamA) {
          setScore(prev => ({ ...prev, teamA: prev.teamA + 1 }))
          socket.emit("scoreUpdate", { teamA: score.teamA + 1, teamB: score.teamB })
        } else {
          setScore(prev => ({ ...prev, teamB: prev.teamB + 1 }))
          socket.emit("scoreUpdate", { teamA: score.teamA, teamB: score.teamB + 1 })
        }
      }
    }, 5000) 

    return () => clearInterval(eventInterval)
  }, [score])

  return (
 
        <div className="w-full h-[80vh] bg-green-600 relative rounded-lg overflow-hidden border-4 border-white">
          {/* Center Line */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[2px] h-full bg-white opacity-60 z-10"></div>
      
          {/* Center Circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-white rounded-full opacity-80 z-10"></div>
      
          {/* Center Dot */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full z-10"></div>
      
          {/* Scoreboard */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-xl font-bold z-20">
            <p>Team A: {score.teamA} - Team B: {score.teamB}</p>
          </div>
      
          {/* Ball */}
          <Ball x={ballPosition.x} y={ballPosition.y} />
      
          {/* Players */}
          {players.map((player) => (
            <Player key={player.id} {...player} />
          ))}
      
       
          {events.map((event, index) => (
            <div
              key={index}
              className="absolute text-white text-xs sm:text-sm z-20"
              style={{
                top: `${Math.random() * 90}%`,
                left: `${Math.random() * 90}%`,
              }}
            >
              <span className="bg-black bg-opacity-50 text-white px-1 py-0.5 rounded-md opacity-80">
                {`${event.type.toUpperCase()} by ${event.player} at ${event.time}`}
              </span>
            </div>
          ))}
        </div>
      
      
  )
}

export default Pitch
