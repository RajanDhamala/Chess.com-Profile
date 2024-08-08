import React,{useState} from "react";

export default function Gamelist(){

    const [input,Setinput]=useState('')
    const [gamedate,Setgamedate]=useState('2024/08')
    const [gamedate1,Setgamedate1]=useState('')

    function handleinput(e){
        Setinput(e.target.value)
    }

    function handlesearch(e){
        e.preventDefault()
        console.log(input)
    }

    function inputdate (e){
        e.preventDefault();
        const selectedDate=e.target.value
        const [year, month] = selectedDate.split('-');
        console.log(`${year}/${month}`)
        Setgamedate1(`${year}/${month}`)
      }
    
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


return(
    <>
    <div>
        
<form className="max-w-md mx-auto mt-5">   
    <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-200 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="hikaru/NbcWala" required onChange={(e)=>handleinput(e)} value={input}/>
        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={(e)=>handlesearch(e)}>Search</button>
    </div>
</form>
    </div>

    <div className="mt-5">
    <div className='flex justify-center gap-3'>
      <input type="date" className='bg-gray-200 rounded-md' value={gamedate} onChange={(e)=>{inputdate(e)}}  />
      <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={(e)=>handlegames(e)}>Get games</button>
      </div>
    </div>
    </>
)}