import { createSlice } from "@reduxjs/toolkit";

const existingToken = localStorage.getItem('token')
const existingEmail = localStorage.getItem('email')


const authInitialState = {
  token:existingToken,
  userEmail:existingEmail,
  isUserLoggedIn: false,
  isUserVerified:false,
  updated:false
};

const AuthSlice = createSlice({
    name:'authentication',
    initialState:authInitialState,
    reducers:{
        login(state,action){
            state.token = action.payload
            state.isUserLoggedIn = !!state.token;
            localStorage.setItem("token", action.payload);
        
        },
        logout(state){
          state.token = null;
         state.isUserLoggedIn = false;
         localStorage.removeItem("token")
         localStorage.removeItem('email')
        },
         userVerified(state,action){
            state.isUserVerified = true
              localStorage.setItem("verified", true);

         },     
         userUpdated(state,action){
            state.updated=true
             localStorage.setItem("updated", true);
         },
         emailUpdated(state,action){
            const email = action.payload;
          let clearedEmail =email.replace(/[@.]/g, '');
          state.userEmail = clearedEmail
          localStorage.setItem('email',clearedEmail)
         }
        
       
    }
})


export const authAction = AuthSlice.actions
export default AuthSlice.reducer

