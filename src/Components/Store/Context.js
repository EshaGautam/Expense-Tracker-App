import React from "react";

const context = React.createContext({
    token:'',
    userLoggedIn:'',
    login:()=>{},
    logout:()=>{},

})

export default context