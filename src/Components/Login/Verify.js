
import React from "react";
import "./Verify.css";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import { authAction } from "../Store/auth";

function Verify() {
  const mode = useSelector((state) => state.theme.darkMode);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const isUserverified = localStorage.getItem("verified");
    if (isUserverified) {
      dispatch(authAction.userVerified());
      history.replace("/home");
    }
  }, []);

  const handleVerify = async () => {
    try {
      const verifyEmail = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC16WLga3qeg6lpO-cz_n4kblJ11vmmxJ0",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: token,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      let response = await verifyEmail.json();
      if (verifyEmail.ok) {
        alert("Message Send Successfully");
        dispatch(authAction.userVerified());
        history.replace("/home");
      } else {
        throw new Error("Problem occurred in verification");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div className={`verify-ctn ${mode ? "darkmode" : ""}`}>
        <h3>Email Verification</h3>
        <div className={`inner-ctn ${mode ? "darkmode" : ""}`}>
          <h2>One Step Closer to a Secure Connection – Verify Your Email!</h2>
          <button
            className={`verify-btn ${mode ? "light-text" : ""}`}
            onClick={handleVerify}
          >
            Verify Email
          </button>
        </div>
      </div>
    </>
  );
}

export default Verify;
