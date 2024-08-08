import React from "react";

export default function({gamedata}){
    
    return(
        <>
        <div className=" bg-gray-700 flex justify-between rounded-md px-3 py-2 mx-3 my-2">
        <h1 className=" text-white font-semibold  ">{gamedata.time_class}</h1>
        <h1 className="text-white font-semibold ">{`${gamedata.black.username} (${gamedata.black.rating}) Vs. ${gamedata.white.username} (${gamedata.white.rating})`}</h1>
    </div> </>
    );
}
        
