import React, { useState, useEffect } from 'react';
import Profile from './components/profile';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [gamedate,Setgamedate]=useState('')
  const [gamedate1,Setgamedate1]=useState('')

  const handleClick = (e) => {
    e.preventDefault();
    PlayerProfile();
  };

  async function PlayerProfile() {
    try {
      const response = await fetch(`https://api.chess.com/pub/player/${input}`);
      const data = await response.json();
      setResult(data);
      console.log(data); 
    } catch (error) {
      console.log('Error', error);
    }
  }

  function inputdate (e){
    e.preventDefault();
    const selectedDate=e.target.value
    const [year, month] = selectedDate.split('-');
    console.log(`${year}/${month}`)
    Setgamedate1(`${year}/${month}`)
  }

  const games=(e)=>{
    e.preventDefault()
    fetch(`https://api.chess.com/pub/player/NbcWala/games/${gamedate1}`)
    .then((response)=>response.json())
    .then((data)=>console.log(data))
    .catch((error)=>console.log('Error',error))
  }

  useEffect(() => {
    if (result) {
      console.log(result.name); 
    }
  }, [result]);

  return (
    <>
      <section>
        <div className='p-5 grid gap-3 grid-cols-2 '>
          <div className='flex justify-center'>
            <label className='text-2xl font-semibold text-center  mx-auto container'>Enter Username</label>
          </div>
          <div className='flex justify-center'>
            <input
              type="text"
              className='bg-gray-400 rounded-md text-black text-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 delay-100 px-3 py-1 mx-auto container font-sans placeholder:text-black placeholder:opacity-40 placeholder:font-bold'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='tinku/hikaru'
            />
          </div>
          <div className='flex justify-center col-span-2'>
            <button
              className='rounded-md bg-green-500 hover:bg-green-600 px-2 text-white container mx-auto py-1 font-semibold'
              onClick={(e) => handleClick(e)}
            >
              Search
            </button>
          </div>
        </div>
      </section>
      {result && <Profile result={result} />}

      <div className='flex justify-center gap-3'>
      <input type="date" className='bg-gray-200' value={gamedate} onChange={(e)=>{inputdate(e)}} />
      <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={(e)=>games(e)}>Get games</button>
      </div>
    </>
  );
}

export default App;
