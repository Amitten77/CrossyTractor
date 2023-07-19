import Image from 'next/image'

export default function Home() {
  return (
    <>
      <h1 className="text-6xl flex justify-center mt-6">Crossy Tractor!!</h1>
      <div id="control-panel" className='flex justify-center mt-8'>
        <a href="game">
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded mr-6'>Play Game</button>
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
