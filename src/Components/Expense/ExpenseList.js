
import './ExpenseList.css'
import { Accordion } from 'react-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import { expenseAction } from '../Store/expense';

function ExpenseList(props) {

  const dispatch = useDispatch()
  const expenses = useSelector((state) => state.expense.expense);
    const email = useSelector((state) => state.auth.userEmail);

  const handleEditExpense = (id) => {
    props.editExpense(id);
  };

  const handleDeleteExpense = async(id) => {
    try{
      const deleteRequest = await fetch(
        `https://expense-5d5dc-default-rtdb.firebaseio.com/expense/${email}/${id}.json`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        }
      );
      let response = await deleteRequest.json()
      if(deleteRequest.ok){
       dispatch(expenseAction.deleteExpense(id));
       props.fetchExpense()
      }
      else{
        throw new Error(response.Error)
      }
    }
    catch(error){
      alert(error)
    }
    
  };
 
  const expenseItem =
    expenses && expenses.length > 0 ? (
      expenses.map((expense) => (
        <div key={expense.id} className="list">
          <span>{expense.amount}</span>
          <span>{expense.description}</span>
          <span>{expense.category}</span>
          <span>
            <button className="extra-btn" onClick={()=>handleEditExpense(expense.id)} >Edit</button>
          </span>
          <span>
            <button className="extra-btn" onClick={()=>{ handleDeleteExpense(expense.id)} }>Delete</button>
          </span>
        </div>
      ))
    ) : (
      <p>NO EXPENSE MADE!</p>
    );



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