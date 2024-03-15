import React from "react";
import './Logout.css'
import { useDispatch,useSelector } from "react-redux";
import {authAction} from "../Store/auth";
import { themeAction } from "../Store/theme";
import { IoSunnyOutline} from "react-icons/io5";
import { FaRegMoon } from "react-icons/fa";

function Logout() {
 const dispatch = useDispatch()
 const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
 const mode = useSelector((state)=> state.theme.darkMode)


  const handleLogout = () => {
   dispatch(authAction.logout())
  };

  const handledarkMode =()=>{
    dispatch(themeAction.toggleDarkMode())
  }

  return (
    <>
      <div className="nav-btn">
        
          <button onClick={handledarkMode} className="themeToggle">
            {mode ? (
              <IoSunnyOutline className="themeIcon" />
            ) : (
              <FaRegMoon className="themeIcon" />
            )}
          </button>
        
        {isUserLoggedIn && (
          <button className="log-out" onClick={handleLogout}>
            LOGOUT
          </button>
        )}
      </div>
    </>
  );
}

export default Logout;
