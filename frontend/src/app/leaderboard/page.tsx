'use client'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Constant from '../../../config.json'

const Leaderboard = () => {
  const [loading, setLoading] = useState(true)
  const [entries, setEntries] = useState<any[]>([]);
  let rank = 0;

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


      <div id="leaderboardDiv">
        <h1 className='text-7xl flex justify-center mb-8 mt-8'>Leaderboard</h1>
        <div className='flex justify-center mb-8'>
          <table className="border-collapse border border-slate-500">
              <tr>
                  <th className="border border-slate-600 p-8">Rank</th>
                  <th className="border border-slate-600 p-8">Name</th>
                  <th className="border border-slate-600 p-8">Score</th>
              </tr>
              {entries.map(entry => {
                rank += 1
              return (
              <tr key={entry._id}>
                <td className="border border-slate-600 p-6">{rank}</td>
                <td className="border border-slate-600 p-6">{entry._user}</td>
                <td className="border border-slate-600 p-6">{entry._score}</td>
              </tr>
              )
            })}
        </table>
      </div>
      <a href="/" className='flex justify-center'>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mr-6'>Back to Home</button>
      </a>
      </div>
      }
    </div>
  )
}

export default Leaderboard