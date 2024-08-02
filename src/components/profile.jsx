import React,{useState} from "react";

function Profile({result}){

return(
    <>
    <div className="bg-gray-300">
    <div className="flex flex-col items-center mx-auto container py-2">
    <img src="https://images.chesscomfiles.com/uploads/v1/user/15448422.88c010c1.200x200o.3c5619f5441e.png" className="w-20" />
    <h1 className="text-lg font-bold mt-2 text-center">{'GM'} {'Hikaru Nakamura'}</h1>
    <p className="text-wrap text-center text-lg font-semibold">Location:{'United America'} {'florida'}</p>
    <p className="text-1xl font-semibold">Followers:{'1207807'}</p>
    <p className="text-1xl font-semibold">Last Online:{'12314'}</p>
    <p className="text-1xl font-semibold">Player id{''}</p>
    <a href={"https://www.chess.com/member/Hikaru"} target="_blank" className="underline text-blue-600 font-semibold">Player Profile</a>

    </div></div>
    </>

)}

export default Profile