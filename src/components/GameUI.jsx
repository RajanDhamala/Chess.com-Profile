import React,{useState,useEffect} from "react";
import Gamelog from "./Gamelog";

export default function(){

    const currentDate = new Date();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    const formattedDate = `${year}/${month}`;
    const [date, setDate] = useState(formattedDate);
    const [apibataako,Setapibataako]=useState('')
    
    const handleDateChange = (newDate) => {
      setDate(newDate);
    }
    const handleLeftClick = (e) => {
      e.preventDefault();
      let [currentYear, currentMonth] = date.split('/').map(Number);
      if (currentMonth === 1) {
        currentMonth = 12;
        currentYear -= 1;
      } else {
        currentMonth -= 1;
      }
      const newDate = `${currentYear}/${String(currentMonth).padStart(2, '0')}`;
      handleDateChange(newDate);
    }
    
    const handleRightClick = (e) => {
      e.preventDefault();
      let [currentYear, currentMonth] = date.split('/').map(Number);
      if (currentMonth === 12) {
        currentMonth = 1;
        currentYear += 1;
      } else {
        currentMonth += 1;
      }
      const newDate = `${currentYear}/${String(currentMonth).padStart(2, '0')}`;
      handleDateChange(newDate);
    }

    const handlefetch=(e)=>{
        e.preventDefault()
        console.log(date)
        if (input==''){
          alert("please enter username")
        }
        async function getresp(){
        try{
        const resp= await fetch(`https://api.chess.com/pub/player/${input}/games/${date}`)
        const data=await resp.json() 
        console.log(data)
        if (data.games.length==0){
          alert("Games not found")
        }

        Setapibataako(data)
        console.log(data.games[0].time_class)
        }catch(error){
            console.log("Error ",error)
        }
    }
    getresp()
    }

    useEffect(() => {
      if (apibataako && apibataako.games && apibataako.games.length > 0) {
          console.log("Updated Time Class in Effect: ", apibataako.games[0].time_class);
      }
  }, [apibataako,]);

  const [input,Setinput]=useState('')
  
  function handleinput(e){
    Setinput(e.target.value)
  }
  function handlesearch(e){
    e.preventDefault()
  }
    
    return(
        <>
        <section className="my-5">
        <form class="max-w-md mx-auto">   
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="hikaru/NbcWala" required value={input} onChange={(e)=>{handleinput(e)}} />
        <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={(e)=>{handlesearch(e)}}>Search</button>
    </div>
</form>
        </section>
        <div className="bg-gray-500">
            <h1 className="text-white text-center text-2xl font-bold">Select the game</h1>
            <h1 className="text-white text-center text-2xl font-bold">{date}</h1>
            <div className="bg-black space-y-3">
            <div className="overflow-y-scroll md:max-h-96 max-h-60">
    {apibataako && apibataako.games && apibataako.games.length > 0 && 
        apibataako.games.slice().reverse().map((game, index) => (
            <Gamelog key={index} gamedata={game} />
        ))
    }
</div>
        </div>
        <div className="flex justify-center space-x-3 mt-3">
            <button className="text-white text-2xl bg-black rounded-md px-3 hover:scale-110"onClick={(e)=>handleLeftClick(e)} >←</button>
            <button className="text-white text-2xl bg-black rounded-md px-3
             hover:scale-110 "onClick={(e)=>handleRightClick(e)} >→</button>
        </div>
        <div className="flex justify-center mt-3">
            <button className="text-white text-md bg-blue-500 hover:bg-blue-600 rounded-md px-2 py-1 mb-5 font-semibold" onClick={(e)=>{handlefetch(e)}}>Fetch Games</button>
        </div>
        </div>
        </>
    )
}