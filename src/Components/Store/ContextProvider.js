import React, { useEffect, useState } from "react";
import context from "./Context";




function ContextProvider(props) {
const existingToken = localStorage.getItem('token')

const[token,setToken] =useState(existingToken)
const [verify, setVerify] = useState(false);
const [update,setUpdate] = useState(false)
const[expenses,setExpenses] = useState([])


const isUserLoggedIn = !!token;

const handleExpense=(expenseMade)=>{
  setExpenses(expenseMade);
  
}
const handleDelete =async(id)=>{
   try{
      const deleteRequest = await fetch(
        `https://expense-auth-8a11b-default-rtdb.firebaseio.com/expense/${id}.json`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if(deleteRequest.ok){
         const updatedExpense = expenses.filter((expense)=>expense.id !==id)
         setExpenses(updatedExpense)
      }
      else{
         let response = await deleteRequest.json()
         throw new Error(response.error.message)
      }
   }
   catch(error){
      alert(error)
   }
  
}


const userVerified=()=>{
   setVerify(true)
   localStorage.setItem('verified',true)
 
}

const userUpdated=()=>{
   setUpdate(true)
   localStorage.setItem('updated',true)
 
}

const loginUser=(tokenId)=>{
    setToken(tokenId)
    localStorage.setItem('token',tokenId)
}
const logoutUser =()=>{
setToken(null)
localStorage.removeItem('token')
// localStorage.clear()

}



const userContext = {
  token,
  isUserLoggedIn,
  loginUser,
  verify,
  userVerified,
  logoutUser,
  userUpdated,
  update,
  handleExpense,
  expenses,
  handleDelete,

};


  return (
    
    <context.Provider value={userContext}>{props.children}</context.Provider>
  )
}

export default ContextProvider