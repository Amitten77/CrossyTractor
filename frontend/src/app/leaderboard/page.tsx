'use client'
import React from 'react'
import { useEffect } from 'react';
import './ldbd.css';
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

const leaderboardStyles = {
  fontFamily: 'Courier, monospace', // Use the 'VT323' font from Google Fonts
  fontSize: '16px',
  // backgroundColor: "#ffde00",
  // fontWeight: 'bold',
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
      <h1 className='text-black text-9xl'>Loading...</h1> : 


      <div id="leaderboardDiv" style={leaderboardStyles} className='text-black'>
        <h1 className='text-7xl flex justify-center mb-12 mt-12'></h1>
        <h1 className='text-7xl flex justify-center mb-12 mt-12'></h1>
        <h1 className='text-7xl flex justify-center mb-12 mt-12'></h1>
        <div className='flex justify-center mb-8'>
          <table className="border-collapse border border-slate-500">
              <tr>
                  <th className="border-2 bg-lime-200 border-black p-3">Rank</th>
                  <th className="border-2 bg-lime-200 border-black ...">Name</th>
                  <th className="border-2 bg-lime-200 border-black ...">Score</th>
              </tr>
              {entries.map(entry => {
                rank += 1
                if (rank < 7) {
              return (
              <tr key={entry._id}>
                <td className="border-2 bg-lime-200 border-black p-5">{rank}</td>
                <td className="border-2 bg-lime-200 border-black p-5">{entry._user}</td>
                <td className="border-2 bg-lime-200 border-black p-5">{entry._score}</td>
              </tr>
              )
                }
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



// import React from 'react';

// const leaderboardData = [
//   { _id: 1, _user: 'Player 1', _score: 100 },
//   { _id: 2, _user: 'Player 2', _score: 80 },
//   { _id: 3, _user: 'Player 3', _score: 60 },
// ];

// const Leaderboard = () => {
//   let rank = 0;

//   const buttonStyles = {
//     // Add your button styles here if needed
//   };

//   return (
//     <div id="leaderboardDiv">
//       <h1 className="text-4xl font-bold text-center mb-8 mt-8">Leaderboard</h1>
//       <div className="flex justify-center mb-8">
//         <table className="border-collapse border border-slate-500">
//           <thead>
//             <tr>
//               <th className="border border-slate-600 p-4 font-bold">Rank</th>
//               <th className="border border-slate-600 p-4 font-bold">Name</th>
//               <th className="border border-slate-600 p-4 font-bold">Score</th>
//             </tr>
//           </thead>
//           <tbody>
//             {leaderboardData.map((entry) => {
//               rank += 1;
//               return (
//                 <tr key={entry._id}>
//                   <td className="border border-slate-600 p-4">{rank}</td>
//                   <td className="border border-slate-600 p-4">{entry._user}</td>
//                   <td className="border border-slate-600 p-4">{entry._score}</td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//       <div className="flex justify-center">
//         <a href="/">
//           <button style={buttonStyles}>Back to Home</button>
//         </a>
//       </div>
//     </div>
//   );
// };

// export default Leaderboard;
