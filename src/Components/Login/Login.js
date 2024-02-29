import React, { useState } from "react";
import "./Login.css";
import { useRef } from "react";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import context from "../Store/Context";
import { useContext } from "react";
import { useHistory } from "react-router-dom";

function Login() {
  const userCtx = useContext(context);
  const { loginUser } = userCtx;
  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");
  const confirmPasswordInputRef = useRef("");
  const [signUp, setSignup] = useState(true);
  const history = useHistory();
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
        loginUser(response.idToken);
        history.replace("/home");
      } else {
        throw new Error(response.error.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
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
            <a
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              forgot Password
            </a>
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
          {signUp ? "Have an account?Login" : "Don't have an account?Signup"}
        </Button>
      </div>
    </>
  );
}

export default Login;
