import { createSlice } from "@reduxjs/toolkit";


const themeinitialState ={
    darkMode:localStorage.getItem('theme') || false
}

const themeSlice = createSlice({
    name:'theme',
    initialState:themeinitialState,
    reducers:{
        toggleDarkMode(state){
            state.darkMode =!state.darkMode
            localStorage.setItem('theme',state.darkMode)
        }
    }
})

export const themeAction = themeSlice.actions
export default themeSlice.reducer