import React from 'react'
import { useContext } from 'react';
import context from '../Store/Context';
import './Verify.css'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Verify() {
      const userCtx = useContext(context);
  const { token, userVerified } = userCtx;
  const history = useHistory()
 

 const handleVerify=async()=>{
    try{
      const verifyEmail = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC16WLga3qeg6lpO-cz_n4kblJ11vmmxJ0",{
        method:'POST',
        body:JSON.stringify({
            requestType: "VERIFY_EMAIL",
           idToken:token
        }),
        headers:{
            'content-type':'application/json'
        }
      })
      let response = await verifyEmail.json()
      if(verifyEmail.ok){
        console.log(response)
        alert('Message Send Successfully')
        userVerified()
        history.replace('/home')
      }
      else{
        throw new Error('Problem occured in verification')
      }
    }
    catch(error){
        alert(error)
    }
 }

  return (
    <>
      <div className="verify-ctn">
        <h3>Email Verification</h3>
        <div className="inner-ctn">
          <p>One Step Closer to a Secure Connection – Verify Your Email!</p>
          <button className="verify-btn" onClick={handleVerify}>
            Verify Email
          </button>
        </div>
      </div>
    </>
  );
}

export default Verify
