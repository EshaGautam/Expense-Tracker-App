import React, { useEffect, useRef, useState } from "react";

import { Form, Row, Col } from "react-bootstrap";
import ExpenseList from "./ExpenseList";
import { expenseAction } from "../Store/expense";
import { useDispatch, useSelector } from "react-redux";
import "./ExpenseForm.css";

function ExpenseForm() {
  document.body.style.backgroundColor="pink"
 const [totalExpense, setTotalExpense] = useState(0);
  const [editInput,setEditInput]=useState({})
  const amountInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();
  const dispatch = useDispatch()
  const expenses = useSelector((state)=>state.expense.expense)
  const email = useSelector((state) => state.auth.userEmail);

  useEffect(() => {
    fetchExpense();
  }, []);

   useEffect(() => {
     amountInputRef.current.value = editInput.amount || "";
     descriptionInputRef.current.value = editInput.description || "";
     categoryInputRef.current.value = editInput.category || "";
   }, [editInput]);


 useEffect(() => {
   const calculatedTotalExpense = expenses.reduce(
     (total, expense) => total + expense.amount + 0,
     0
   );
    setTotalExpense(calculatedTotalExpense);
 }, [expenses]);


  const handleExpenseSubmit = async (event) => {
    try {
      event.preventDefault();

      if (editInput.id) {
        const expenseUpdate = await fetch(
          `https://expense-5d5dc-default-rtdb.firebaseio.com/expense/${email}/${editInput.id}.json`,
          {
            method: "PUT",
            body: JSON.stringify({
              amount: amountInputRef.current.value,
              description: descriptionInputRef.current.value,
              category: categoryInputRef.current.value,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (expenseUpdate.ok) {
          alert("Expense Updated Successfully");
          fetchExpense();
          setEditInput({}); 
        } else {
          throw new Error("Failed to update expense");
        }
      }
       else {
       
        const expenseSend = await fetch(
          `https://expense-5d5dc-default-rtdb.firebaseio.com/expense/${email}.json`,
          {
            method: "POST",
            body: JSON.stringify({
              amount: amountInputRef.current.value,
              description: descriptionInputRef.current.value,
              category: categoryInputRef.current.value,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        let response = await expenseSend.json();
        if (expenseSend.ok) {
          fetchExpense();
        } else {
          throw new Error(response.Error.message);
        }
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
        `https://expense-5d5dc-default-rtdb.firebaseio.com/expense/${email}.json`
      );
      if (expenseGet.ok) {
        let response = await expenseGet.json();
        if (response) {
          const expenseId = Object.keys(response);
          const transformedExpense = expenseId.map((id) => ({
            id,
            ...response[id],
          }));
         dispatch(expenseAction.addExpense(transformedExpense))
        }
      } else {
        let response = await expenseGet.json();
        throw new Error(response.Error.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  const editRequest = async(id)=>{
    let editExpense = expenses.find((expense)=>expense.id === id)
    setEditInput({...editExpense})
     
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
                defaultValue={editInput.amount}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label className="label">Description</Form.Label>
              <Form.Control
                className="expense-input"
                type="text"
                ref={descriptionInputRef}
                defaultValue={editInput.description}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label className="label">Category</Form.Label>
              <Form.Select
                defaultValue={editInput && editInput.category}
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
          <button
            type="submit"
            className={`${totalExpense > 10000 ? "premium" : "expense-btn"}`}
          >
            {totalExpense > 10000 ? "Activate Premium" : "Submit"}
          </button>
        </Form>
      </div>
      <div>
        <ExpenseList fetchExpense={fetchExpense} editExpense={editRequest} />
      </div>
    </>
  );
}

export default ExpenseForm;
