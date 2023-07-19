'use client'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Constant from '../../../config.json'

const Leaderboard = () => {
  const [loading, setLoading] = useState(true)
  const [entries, setEntries] = useState<any[]>([]);

  useEffect(() => {
    fetch(Constant.backendURL + "/leaderboard")
      .then((res) => 
        res.json()
      )
      .then((data) => {
        setEntries(data)
        setLoading(false)
        console.log(data)
      });
  }, []);
  return (
    <div>
      {loading ? 
      <p>Loading...</p> : 
      <div>
        {entries.map(entry => {
        console.log(entry)
        return (
        <div key={entry._id}>
          <p>{entry._user}</p>
          <p>{entry._score}</p>
        </div>
        )
      })}
      <a href="/">
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mr-6'>Back to Home</button>
      </a>
      </div>
      }
    </div>
  )
}

export default Leaderboard