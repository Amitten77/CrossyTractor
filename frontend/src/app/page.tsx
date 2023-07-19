'use client'
import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState<string>("Player")

  const handleOnClick = () => {
    localStorage.setItem('name', name);
  }

  const handleInputChange = (e: any) => {
    setName(e.target.value);
  }


  return (
    <>
      <h1 className="text-6xl flex justify-center mt-6">Crossy Tractor!!</h1>
      <h2>What is your name?</h2>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Your Name" onChange={handleInputChange}/>
      <div id="control-panel" className='flex justify-center mt-8'>
        <a href="game">
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mr-6' onClick={handleOnClick}>Play Game</button>
        </a>
        <a href="leaderboard">
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'>Check out Leaderboard</button>
        </a>
        <a href="endGame">
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'>End Screen</button>
        </a>
      </div>
    </>
  )
}
