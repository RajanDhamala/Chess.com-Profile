import React,{useState,useEffect } from 'react'
import Profile from './components/profile'

function App() {
  const[input,Setinput]=useState('')
  const [result,Setresult]=useState()

  const handelclick = function(e) {
    e.preventDefault();
    Playerprofile();
  };
  
  async function Playerprofile() {
    try {
      const data1 = await fetch(`https://api.chess.com/pub/player/${input}`);
      const data = await data1.json();
      Setresult(data)
      console.log(result)
    } catch (error) {
      console.log('Error', error);
    }
  }
  

  return (
    <>
<section>
  <div className='p-5 grid gap-3 grid-cols-2 '>
    <div className='flex justify-center'>
    <label className='text-2xl font-semibold text-center  mx-auto container'>Enter Username</label></div>
    <div className='flex justify-center'>
      <input type="text" className='bg-gray-400 rounded-md text-black text-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 delay-100 px-3 py-1 mx-auto container font-sans placeholder:text-black placeholder:opacity-40 placeholder:font-bold' value={input} onChange={(e)=>Setinput(e.target.value)} placeholder='tinku/hikaru'/>
    </div>
    <div className='flex justify-center col-span-2'>
      <button className='rounded-md bg-green-500 hover:bg-green-600 px-2 text-white container mx-auto py-1 font-semibold' onClick={(e)=>handelclick(e)}>Search</button>
    </div>
  </div>
</section>
  <Profile Result={result}/>
    </>
  )
}

export default App
