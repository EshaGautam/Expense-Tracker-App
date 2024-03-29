

import React, { useEffect, useRef } from "react";
import "./userProfile.css";
import { Form, Modal } from "react-bootstrap";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../Store/auth";

function HomePage() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);
  const nameRef = useRef("");
  const urlRef = useRef("");
  const history = useHistory();

  useEffect(() => {
    const existingData = localStorage.getItem("userData");
    const initialData = JSON.parse(existingData);
 
    if (existingData) {
      setData(initialData);
    
    }
  }, []);
 useEffect(()=>{
  const updatedKey = localStorage.getItem("updated");
  if(updatedKey){
  dispatch(authAction.userUpdated());
  history.replace("/expense");
  }
 },[])

  const update = (data) => {
    localStorage.setItem("userData", JSON.stringify(data));
    setData(data);
  };

  function handleClose() {
    return setShow(false);
  }

  function handleShow() {
    return setShow(true);
  }

  const updateDetails = async (event) => {
    try {
      event.preventDefault();
      const updatedData = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC16WLga3qeg6lpO-cz_n4kblJ11vmmxJ0",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
            displayName: nameRef.current.value,
            photoUrl: urlRef.current.value,
            returnSecureToken: true,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      let response = await updatedData.json();
      if (updatedData.ok) {
        alert("Profile Updated");
        update(response);
        dispatch(authAction.userUpdated());
        history.replace("/expense");
      } else {
        throw new Error(
          "Problem in updating profile",
          response.error.message
        );
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <div className={`main ${darkMode ? "darkmode" : ""}`}>
        {!show ? (
          <p className="welcome-text">welcome to expense tracker</p>
        ) : (
          <p className="quote-text">Winner never quits,Quitter never wins</p>
        )}
        <div>
          <button
            variant="primary"
            onClick={handleShow}
            className="toggle-text-btn"
          >
            {!show ? (
              <p>Your Profile is incomplete! Click here to complete</p>
            ) : (
              <p>
                A complete profile has higher chances to land a job!
                <span>Complete Now!</span>
              </p>
            )}
          </button>

          <Modal show={show} onHide={handleClose} className="contact-form">
            <Modal.Header closeButton>
              <Modal.Title>Contact Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={updateDetails}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Full Name:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="enter full name"
                    autoFocus
                    ref={nameRef}
                    defaultValue={data ? data.displayName : ""}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Profile Photo URL:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="enter url"
                    autoFocus
                    ref={urlRef}
                    defaultValue={data ? data.photoUrl : ""}
                    pattern="https?://.+"
                  />
                </Form.Group>
                <button
                  type="submit"
                  variant="primary"
                  onClick={handleClose}
                  className="Btn"
                >
                  Update
                </button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default HomePage;
