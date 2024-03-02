import React, { useEffect, useRef } from "react";
import "./ExpenseForm.css";
import context from "../Store/Context";
import { useContext } from "react";
import { Form, Row, Col } from "react-bootstrap";
import ExpenseList from "./ExpenseList";

function ExpenseForm() {
  const userCtx = useContext(context);
  const { handleExpense } = userCtx;
  const amountInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();

  useEffect(() => {
    fetchExpense();
  }, []);

  const handleExpenseSubmit = async (event) => {
    try {
      event.preventDefault();

      const expenseSend = await fetch(
        "https://expense-auth-8a11b-default-rtdb.firebaseio.com/expense.json",
        {
          method: "POST",
          body: JSON.stringify({
            amount: amountInputRef.current.value,
            description: descriptionInputRef.current.value,
            category: categoryInputRef.current.value,
          }),
          header: {
            "content-type": "application/json",
          },
        }
      );
      let response = await expenseSend.json();
      if (expenseSend.ok) {
        alert("Data Posted Successfully");
        fetchExpense();
      } else {
        throw new Error(response.Error.message);
      }
    } catch (error) {
      alert(error);
    }

    amountInputRef.current.value = "";
    descriptionInputRef.current.value = "";
    categoryInputRef.current.value = "";
  };

  const fetchExpense = async () => {
    try {
      const expenseGet = await fetch(
        "https://expense-auth-8a11b-default-rtdb.firebaseio.com/expense.json"
      );
      if (expenseGet.ok) {
        let response = await expenseGet.json();
        if (response) {
          const expenseId = Object.keys(response);
          const transformedExpense = expenseId.map((id) => ({
            id,
            ...response[id],
          }));

          handleExpense(transformedExpense);
        }
      } else {
        let response = await expenseGet.json();
        throw new Error(response.Error.message);
      }
    } catch (error) {
      alert(error);
    }
  };

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
