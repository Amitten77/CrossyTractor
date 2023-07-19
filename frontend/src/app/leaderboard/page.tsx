'use client'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Constant from '../../../config.json'

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
        <button id="returnHome" style={buttonStyles}>Back to Home</button>
      </a>
      </div>
      }
    </div>
  )
}

export default Leaderboard