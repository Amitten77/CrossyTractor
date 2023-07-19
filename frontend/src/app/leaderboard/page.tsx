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

const leaderboardStyles = {
  fontFamily: 'VT323', // Use the 'VT323' font from Google Fonts
  fontSize: '16px',
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
      <p>Loading...</p> : 


      <div id="leaderboardDiv" style={leaderboardStyles}>
        <h1 className='text-7xl flex justify-center mb-8 mt-8'>Leaderboard</h1>
        <div className='flex justify-center mb-8'>
          <table className="border-collapse border border-slate-500">
              <tr>
                  <th className="border-2 border-black p-6">Rank</th>
                  <th className="border-2 border-black ...">Name</th>
                  <th className="border-2 border-black ...">Score</th>
              </tr>
              {entries.map(entry => {
                rank += 1
              return (
              <tr key={entry._id}>
                <td className="border-2 border-black p-7">{rank}</td>
                <td className="border-2 border-black p-7">{entry._user}</td>
                <td className="border-2 border-black p-7">{entry._score}</td>
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
