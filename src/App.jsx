import React, { useState, useEffect } from 'react';
import Profile from './components/profile';
import Result from './components/Result';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [gamedate,Setgamedate]=useState('')
  const [gamedate1,Setgamedate1]=useState('')
  const [black,Setblack]=useState('')
  const [white,Setwhite]=useState('')

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
    async function hello(){
      try{
        const resp= await fetch(`https://api.chess.com/pub/player/${input}/games/${gamedate1}`)
        const data= await resp.json()
        console.log(data)
        try{
        console.log("White",data.games[0].accuracies.white ,"Black",data.games[0].accuracies.black)
        console.log("White:",data.games[0].white ,"Black",data.games[0].black)
        Setwhite(data.games[0].white)
        Setblack(data.games[0].black)}
        catch(error){
          alert("Review not taken")
        }

      }catch(error){
        console.log("Error:",error)
      }
    }
    hello()
    
  }
  useEffect(() => {
    if (result) {
      console.log(result.name); 
    }
  }, [result]);


 function handlegames(e){
  e.preventDefault()
  async function fetching(){
    try{
      const resp=await fetch(`https://api.chess.com/pub/player/${input}/games/${gamedate1}`)
      const data= await resp.json()
      data.games.map((item,index)=>{
        console.log(item,"Index:",index)
        console.log(item.url)
        console.log("Black",item.black.result,item.black.username,item.black.rating)
        console.log("White",item.white.result,item.white.username,item.white.rating)
          
           const pgn = item.pgn;
      const dateMatch = pgn.match(/\[Date "([\d.]+)"\]/);
      const utcTimeMatch = pgn.match(/\[UTCTime "([\d:]+)"\]/);
      
      if (dateMatch && utcTimeMatch) {
        const gameDate = dateMatch[1];
        const utcTime = utcTimeMatch[1];
        
        console.log("Game Date:", gameDate);
        console.log("UTC Time:", utcTime);
      } else {
        console.log("Date or UTC Time not found");
      }
      })
    }catch(error){
      console.log("Error:",error)
    }
  }
  fetching()

 }

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
      {black &&<div>
        <Result info={black} color={'black'}/>
        <Result info={white} color={'white'}/>
      </div>}

      <div className='flex justify-center mt-10'>
        <button className='bg-green-500 hover:bg-green-600 rounded-md px-4 text-white' onClick={(e)=>{handlegames(e)}}>Fetch</button>
      </div>
    </>
  );
}

export default App;
