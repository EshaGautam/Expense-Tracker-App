import React, { useState } from "react";
import context from "./Context";



function ContextProvider(props) {
const existingToken = localStorage.getItem('token')
const[token,setToken] =useState(existingToken)

const isUserLoggedIn = !!token;

const loginUser=(tokenId)=>{
    setToken(tokenId)
    localStorage.setItem('token',tokenId)
}


const userContext = {
    token,
    isUserLoggedIn,
    loginUser,
    
}


  return (
    
    <context.Provider value={userContext}>{props.children}</context.Provider>
  )
}

export default ContextProvider