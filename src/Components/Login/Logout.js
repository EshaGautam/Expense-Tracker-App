import React from "react";
import { Button } from "react-bootstrap";
import './Logout.css'
import { useDispatch,useSelector } from "react-redux";
import {authAction} from "../Store/auth";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Logout() {
 const dispatch = useDispatch()
 const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);


  const handleLogout = () => {
   dispatch(authAction.logout())
  };

  return (
    <div className="log-out">
      {isUserLoggedIn && (
        <Button variant="dark" onClick={handleLogout}>
          LOGOUT
        </Button>
      )}
    </div>
  );
}

export default Logout;
