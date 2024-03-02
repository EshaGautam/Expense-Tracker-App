import React, { useRef } from "react";
import "./ExpenseForm.css";
import context from "../Store/Context";
import { useContext } from "react";
import { Form, Row, Col } from "react-bootstrap";
import ExpenseList from "./ExpenseList";


function ExpenseForm() {

     const userCtx = useContext(context);
     const { handleExpense } = userCtx;
     const amountInputRef = useRef()
     const descriptionInputRef = useRef()
     const categoryInputRef = useRef()
    
   

  const handleExpenseSubmit =(event)=>{
    event.preventDefault()
    const expenseMade ={
      id:Math.random(),
      amount:amountInputRef.current.value,
      description:descriptionInputRef.current.value,
      category:categoryInputRef.current.value
    }
    handleExpense(expenseMade) 
 
  amountInputRef.current.value=""
descriptionInputRef.current.value=""
categoryInputRef.current.value=""

  }




  return (
    <>
      <div className="expense-form">
        <h3>Expense Form</h3>
        <Form onSubmit={handleExpenseSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label className="label">Amount</Form.Label>
              <Form.Control
                type="text"
                className="expense-input"
                ref={amountInputRef}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label className="label">Description</Form.Label>
              <Form.Control
                className="expense-input"
                type="text"
                ref={descriptionInputRef}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label className="label">Category</Form.Label>
              <Form.Select
                defaultValue="Choose..."
                className="expense-input"
                ref={categoryInputRef}
              >
                <option>Choose...</option>
                <option value="movie">Movie</option>
                <option value="food">Food</option>
                <option value="travel">Travel</option>
                <option value="fuel">Fuel</option>
                <option value="personal care">Personal Care</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <button type="submit" className="expense-btn">
            Submit
          </button>
        </Form>
      </div>
      <div>
        <ExpenseList />
      </div>
    </>
  );
}

export default ExpenseForm;
