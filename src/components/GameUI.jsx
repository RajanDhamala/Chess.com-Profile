import React,{useState} from "react";
import Gamelog from "./Gamelog";

export default function(){
    const currentDate = new Date();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const year = currentDate.getFullYear();
    
    const formattedDate = `${month}/${year}`;

    const [date, setDate] = useState(formattedDate);
    const handleDateChange = (newDate) => {
      setDate(newDate);}

    function handelleftclick(e){
        e.preventDefault()
    }
    function handelrightclick(){
        e.preventDefault()
    }
    
    
    return(
        <div className="bg-gray-500">
            <h1 className="text-white text-center text-2xl font-bold">Select the game</h1>
            <h1 className="text-white text-center text-2xl font-bold">{date}</h1>
            <div className="bg-black space-y-3">
    <div className=" bg-gray-700 flex justify-between rounded-md px-3 py-2 mx-3 my-2">
        <h1 className=" text-white font-semibold  ">{'Rapid'}</h1>
        <h1 className="text-white font-semibold ">{'Player1 (1238) Vs. Player2 (1232)'}</h1>
    </div>
        </div>
            
            
        <div className="flex justify-center space-x-3">
            <button className="text-white text-2xl bg-black rounded-md px-3 hover:scale-110"onClick={(e)=>handelrightclick(e)} >→</button>
            <button className="text-white text-2xl bg-black rounded-md px-3
             hover:scale-110 "onClick={(e)=>handelleftclick(e)} >←</button>
        </div>

        </div>
    )
}