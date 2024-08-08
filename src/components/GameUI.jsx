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
        async function getresp(){
        try{
        const resp= await fetch(`https://api.chess.com/pub/player/NbcWala/games/${date}`)
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
  }, [apibataako]);
    
    return(
        <>
        
        <div className="bg-gray-500">
            <h1 className="text-white text-center text-2xl font-bold">Select the game</h1>
            <h1 className="text-white text-center text-2xl font-bold">{date}</h1>
            <div className="bg-black space-y-3">
            <div className="overflow-y-scroll md:max-h-96 max-h-60">
            {apibataako && apibataako.games && apibataako.games.length > 0 && 
              apibataako.games.map((game,index)=>(
                <Gamelog key={index} gamedata={game}/>
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