'use client'
import { useState } from 'react';
import * as PIXI from 'pixi.js';
import { get } from 'http';
import { start } from 'repl';
import random from 'random'

// import Constant from '../../../config.json'

export default function Home() {
  const [name, setName] = useState<string>("Player")

  const handleOnClick = () => {
    const playerId = random.int(0, 1000000)
    localStorage.setItem('name', name);
    localStorage.setItem('playerId', playerId.toString())
  }

  const handleInputChange = (e: any) => {
    setName(e.target.value);
  }

  const buttonStyles = {
    color: "#000000",
    backgroundColor: "#ffde00",
    fontSize: "22px",
    border: "6px solid #000000",
    borderRadius: "8px",
    padding: "15px 50px",
    cursor: "pointer",
    fontFace: "OCR A Std, monospace"
  };

  return (
    <div className="bg-url('/path/to/your/image.jpg')">
      <h1 className="text-6xl flex justify-center mt-6">Crossy Tractor!!</h1>
      <h2>What is your name?</h2>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Your Name" onChange={handleInputChange}/>
      <div id="control-panel" className='flex justify-center mt-8'>
        <a href="game">
          <button id="GM" style={buttonStyles} onClick={handleOnClick}>Play Game</button>
        </a>
        <a href="leaderboard">
          <button id="LDBD" style={buttonStyles}>Check out Leaderboard</button>
        </a>
        <a href="endGame">
          <button id="EGM" style={buttonStyles}>End Screen</button>
        </a>
      </div>
    </div>
  )
}
