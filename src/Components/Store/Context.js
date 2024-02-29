import React from "react";

const context = React.createContext({
    token:'',
    userLoggedIn:'',
    loginUser:()=>{},
    logout:()=>{},

})

export default context