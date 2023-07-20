'use client'
import { useState } from 'react';
import './newbg.css';
import * as PIXI from 'pixi.js';
import { get } from 'http';
import { start } from 'repl';
import random from 'random'


export default function Home() {
  const [name, setName] = useState<string>("Player")

  const handleOnClick = () => {
    const playerId = random.int(0, 1000000)
    localStorage.setItem('name', name);
    localStorage.setItem('playerId', playerId.toString())
    const audio = document.getElementById('audio') as HTMLVideoElement
    if (audio) {
      audio.play()
    }
  }

  const handleInputChange = (e: any) => {
    setName(e.target.value);
  }

  const buttonStyle1 = {
    color: "#000000",
    backgroundColor: "#ffde00",
    fontSize: "22px",
    border: "6px solid #000000",
    borderRadius: "8px",
    padding: "15px 50px",
    cursor: "pointer",
    position: 'fixed', /* Use 'fixed' to position the container relative to the viewport */
    bottom: '20px', /* Adjust the distance from the bottom of the screen */
    left: '50%', /* Center the container horizontally */
    transform: 'translateX(-150%)',
    fontFamily: 'Courier, monospace', // Use the 'VT323' font from Google Fonts
  };

  const buttonStyle2 = {
    color: "#000000",
    backgroundColor: "#ffde00",
    fontSize: "22px",
    border: "6px solid #000000",
    borderRadius: "8px",
    padding: "15px 50px",
    cursor: "pointer",
    position: 'fixed', /* Use 'fixed' to position the container relative to the viewport */
    bottom: '20px', /* Adjust the distance from the bottom of the screen */
    left: '50%', /* Center the container horizontally */
    transform: 'translateX(-10%)',
    fontFamily: 'Courier, monospace', // Use the 'VT323' font from Google Fonts
  };


  const inputStyle = {
    position: "absolute",
    left: "25%",
    top: "82%"
  }

  return (
    <div className='HomeScreen'>
      {/* <h1 className="text-6xl flex justify-center mt-6">Crossy Tractor!!</h1> */}
      {/* <h2>What is your name?</h2> */}
      <input className="w-6/12 object-bottom shadow justify-center appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" style={inputStyle} type="text" placeholder="Enter Your Name" onChange={handleInputChange}/>
      <div id="control-panel" className='flex justify-center mt-8'>
        <a href="game">
          <button id="GM" style={buttonStyle1} onClick={handleOnClick}>Play Game</button>
        </a>
        <a href="leaderboard">
          <button id="LDBD" style={buttonStyle2} onClick={() => {
            const audio = document.getElementById('audio') as HTMLVideoElement
            if (audio) {
              audio.play()
            }
          }}>Check out Leaderboard</button>
        </a>
        {/* <a href="endGame">
          <button id="EGM" style={buttonStyle2} onClick={() => {
            const audio = document.getElementById('audio') as HTMLVideoElement
            if (audio) {
              audio.play()
            }
          }}>End Screen</button>
        </a> */}
      </div>
    </div>
  )
}
