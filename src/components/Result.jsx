import React, { useState,useEffect } from "react";

export default function({info,color}){
    const [url,Seturl]=useState('')
    async function geturl(){
        try{
           const resp=await fetch(info['@id'])
           const data=await resp.json()
           console.log(data)
           console.log(data.url)
           Seturl(data.url)
        }
        catch(error){
            console.log("Error Url",error)
        }
    }
useEffect(()=>{
    if (info['@id']) {
        geturl();}
},[info])
    return(
        <div className=' mt-5 '>
            <h1 className="text-center text-lg font-semibold">Piece:{color}</h1>
          <h1 className="text-center text-lg font-semibold">Username:{info.username}</h1>
          <h1 className="text-center text-lg font-semibold">Rating:{info.rating}</h1>
          <h1 className="text-center text-lg font-semibold">Result:{info.result}</h1>
          <div className="flex justify-center">
          <a href={url || "not found"} className=" text-lg underline text-blue-500" target="_blank">userProfile</a></div>
      </div>
    )
}