import React,{useState,useEffect} from "react";

function Profile({result}){
    const [country,Setcountry]=useState('')
let data3='';
async function Country(){
    try{
        const data5= await fetch(result.country)
        data3=await data5.json()
        Setcountry(data3.name)
        console.log(data3.name)
    }catch(error){
        console.log('Error',error)
    }
    return data3
}
const thulomah='text-2xl'

useEffect(()=>{
        Country()
   
},[result.name])
    
    const formatNumber = (number) => {
  return number.toLocaleString();
};

    const getDate = (timestamp) => {
        return new Date(timestamp * 1000).toLocaleString();
      };

    if (!result){
        return null;
    }
    return(
        <>
    <div className="flex flex-col items-center mx-auto container py-2 bg-gray-300 ">
    <img src={result.avatar || 'https://static.thenounproject.com/png/55168-200.png'} className="w-20" />
    <h1 className="text-lg font-bold mt-2 text-center md:text-2xl md:text-center">{result.title} {result.name}</h1>
    <p className="text-wrap text-center text-lg font-semibold md:text-2xl md:text-center">Location:{country} {result.location}</p>
    <p className="text-1xl font-semibold md:text-2xl md:text-center">Followers:{ formatNumber(result.followers)}</p>
    <p className="text-1xl font-semibold md:text-2xl md:text-center">Last Online:{getDate(result.last_online)}</p>
    <p className="text-1xl font-semibold md:text-2xl md:text-center">Player id:{result.player_id}</p>
    <a href={result.url} target="_blank" className="underline text-blue-600 font-semibold">Player Profile</a>

    </div>
    </>
)}

export default Profile