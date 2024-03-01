import React, { useEffect, useState } from "react";
import context from "./Context";



function ContextProvider(props) {
const existingToken = localStorage.getItem('token')
const isUserverified = localStorage.getItem('verified')
const[token,setToken] =useState(existingToken)
const [verify, setVerify] = useState(isUserverified);


const isUserLoggedIn = !!token;

const userVerified=()=>{
   setVerify(true)
   localStorage.setItem('verified',true)
 
}

const loginUser=(tokenId)=>{
    setToken(tokenId)
    localStorage.setItem('token',tokenId)
}


const userContext = {
    token,
    isUserLoggedIn,
    loginUser,
    verify,
    userVerified
   
    
}


  return (
    
    <context.Provider value={userContext}>{props.children}</context.Provider>
  )
}

export default ContextProvider