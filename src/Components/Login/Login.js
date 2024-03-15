import React, { useEffect, useState } from "react";
import "./Login.css";
import { useRef } from "react";
import { Form, FloatingLabel, Button, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { authAction } from "../Store/auth";

function Login() {
  const dispatch = useDispatch()
  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");
  const confirmPasswordInputRef = useRef("");
  const [signUp, setSignup] = useState(false);
  const [forgetPass, setForgetPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();



  useEffect(() => {
      const tokenInStorage = localStorage.getItem('token')
      if(tokenInStorage){
      dispatch(authAction.login(tokenInStorage));
      history.replace('/verify')
      }
    }
  , []);

  const setToggle = () => {
    setSignup((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    try {
      event.preventDefault();

      let url;
      if (signUp) {
        const password = passwordInputRef.current
          ? passwordInputRef.current.value
          : "";
        const confirmPassword = confirmPasswordInputRef.current
          ? confirmPasswordInputRef.current.value
          : "";

        if (password !== confirmPassword) {
          alert("Confirm Password Not Matched");
          return;
        }
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC16WLga3qeg6lpO-cz_n4kblJ11vmmxJ0";
      } else {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC16WLga3qeg6lpO-cz_n4kblJ11vmmxJ0";
      }

      const sendData = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: emailInputRef.current.value,
          password: passwordInputRef.current.value,
          returnSecureToken: true,
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      let response = await sendData.json();
 
      if (sendData.ok) {
        console.log("User has successfully signed up");
         dispatch(authAction.login(response.idToken));
         dispatch(authAction.emailUpdated(response.email));
          history.replace("/verify");
      } else {
        throw new Error(response.error.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleForgotPassword = () => {
    setForgetPass((prevState) => !prevState);
  };

  const handleChangePass = async (event) => {
    try {
      setLoading(true);
      event.preventDefault();

      const sendRequest = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC16WLga3qeg6lpO-cz_n4kblJ11vmmxJ0",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: emailInputRef.current.value,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      let response = await sendRequest.json();
      if (sendRequest.ok) {
        setLoading(false)
        alert("sending request to the email...");
      } else {
        throw new Error("something went wrong",response.error.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      {forgetPass ? (
        <div className='form-style'>
          <h3 style={{ "margin-left": "10%", "margin-bottom": "3rem" }}>
            Forget Password
          </h3>
          <span style={{ "margin-top": "5%" }}>
            Enter email which you have registered!
          </span>
          <Form className="form-div" onSubmit={handleChangePass}>
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-3"
              style={{ "margin-top": "0.5rem" }}
            >
              <Form.Control
                type="email"
                placeholder="name@example.com"
                ref={emailInputRef}
                required
              />
            </FloatingLabel>

            <Button type="submit" variant="success" className="login-btn">
              {!loading ? "Send Link" : <Spinner animation="border" />}
            </Button>

            {forgetPass ? (
              <button
                className="forget-btn-toggle"
                onClick={handleForgotPassword}
              >
                Already have an account?Login
              </button>
            ) : (
              ""
            )}
          </Form>
        </div>
      ) : (
        <>
          <div className="form-style">
            <h3>{signUp ? "Sign Up" : "Login"}</h3>
            <Form className="form-div" onSubmit={submitHandler}>
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  ref={emailInputRef}
                  required
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingPassword"
                label="Password"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  placeholder="Password"
                  ref={passwordInputRef}
                  required
                />
              </FloatingLabel>
              {signUp && (
                <FloatingLabel
                  controlId="floatingPassword"
                  label="Confirm-Password"
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    placeholder="Confirm-Password"
                    ref={confirmPasswordInputRef}
                    required
                  />
                </FloatingLabel>
              )}
              <Button
                type="submit"
                variant="success"
                className={`${signUp ? "login-btn" : "signin-btn"}`}
              >
                {signUp ? "SignUp" : "Login"}
              </Button>
              {!signUp ? (
                <button className="forget-btn" onClick={handleForgotPassword}>
                  Forgot Password
                </button>
              ) : (
                ""
              )}
            </Form>
          </div>
          <div className="ctn">
            <Button
              variant="outline-secondary"
              className="toggle-btn"
              onClick={setToggle}
            >
              {signUp
                ? "Have an account?Login"
                : "Don't have an account?Signup"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Login;
