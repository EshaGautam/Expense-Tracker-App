import React from "react";
import "./Login.css";
import { useRef } from "react";
import { Form, FloatingLabel, Button } from "react-bootstrap";
function Login() {
  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");
  const confirmPasswordInputRef = useRef("");

  const userLogin = async () => {
    try {
      const password = passwordInputRef.current.value;
      const confirmPassword = confirmPasswordInputRef.current.value;

      if (password !== confirmPassword) {
        alert("Confirm Password Not Matched");
        return;
      }

      const sendData = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC16WLga3qeg6lpO-cz_n4kblJ11vmmxJ0",
        {
          method: "POST",
          body: JSON.stringify({
            email: emailInputRef.current.value,
            password: passwordInputRef.current.value,
            returnSecureToken: true,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      let response = await sendData.json();
      console.log(response);
      console.log(sendData);
      if (sendData.ok) {
        console.log("User has successfully signed up");git branch -M main
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
        <h3>Sign Up</h3>
        <Form className="form-div">
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
          <Button variant="success" className="login-btn" onClick={userLogin}>
            Sign Up
          </Button>
        </Form>
      </div>
      <div className="ctn">
        <Button variant="outline-secondary" className="toggle-btn">
          Have an account?Login
        </Button>
      </div>
    </>
  );
}

export default Login;
