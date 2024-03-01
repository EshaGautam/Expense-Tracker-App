import React from "react";
import { Button } from "react-bootstrap";
import { useContext } from "react";
import context from "../Store/Context";
import './Logout.css'

function Logout() {
  const userCtx = useContext(context);
  const { isUserLoggedIn, logoutUser } = userCtx;

  const handleLogout = () => {
   logoutUser()
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
