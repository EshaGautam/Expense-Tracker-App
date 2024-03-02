
import './ExpenseList.css'
import context from "../Store/Context";
import { useContext } from "react";

import { Accordion } from 'react-bootstrap';

function ExpenseList() {
  const userCtx = useContext(context);
  const { expenses } = userCtx;

 
  const expenseItem = expenses.length>0?(expenses.map((expense) => (
    <div key={expense.id} className="list">
        <span>{expense.amount}</span>
        <span>{expense.description}</span>
        <span>{expense.category}</span>
    </div>
  ))):(<p>NO EXPENSE MADE!</p>)



  return (
    <div>
      <Accordion defaultActiveKey={["0"]} alwaysOpen className="expense-ctn">
        <Accordion.Item eventKey="0">
          <Accordion.Header className="expense-head">
            <span>SEE YOUR EXPENSE</span>
          </Accordion.Header>
          <Accordion.Body >{expenseItem}</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default ExpenseList