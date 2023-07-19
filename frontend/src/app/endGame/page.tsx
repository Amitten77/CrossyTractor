"use client";

import React, { useState, useEffect } from 'react';
import Constant from '../../../config.json'

// const leaderboardData = [
//   { name: 'Player 1', score: 100 },
//   { name: 'Player 2', score: 80 },
//   { name: 'Player 3', score: 60 },
// ];

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

const endGame = () => {
  const [notAdded, setNotAdded] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [name, setName] = useState<string>("Player");
  const [score, setScore] = useState<string>("0");

  useEffect(() => {
    // Perform localStorage action
    const storedName = localStorage.getItem('name');
    const storedScore = localStorage.getItem('score');
    console.log(storedName);
    console.log(storedScore);
    if (storedName) {
      setName(storedName)
    }
    if (storedScore) {
      setScore(storedScore)
    }
    setLoading(false);
  }, [])

  const handleLeaderboard = () => {
    if (notAdded) {
    fetch(Constant.backendURL + "/leaderboard", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "_user": name,
        "_score": parseInt(score)
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Write operation successful:', data);
      })
      .catch((error) => {
        console.error('Error occurred during write operation:', error);
      });
      setNotAdded(false);
    }
  }


  return (
    <div>
      { loading ? <p>Loading....</p> :
      // <div className="endgame-container">
        <div className="endgame-container">
        <h1 className='text-6xl flex justify-center mt-6'>Game Over!</h1>
        <p>{name}, your score is: {score}</p>
        <button id="addLeaderboard" style={buttonStyles} onClick={handleLeaderboard}>Add to Leaderboard</button>
        <a href="/">
          <button id="Restart" style={buttonStyles} >Back to Home</button>
        </a>
        <a href="leaderboard">
          <button id="LDBD" style={buttonStyles} >Check out Leaderboard</button>
        </a>
      </div>
      }
    </div>
  );
};

export default endGame;