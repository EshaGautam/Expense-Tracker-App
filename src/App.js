import { useContext } from 'react';
import './App.css';
import HomePage from './Components/Home/HomePage';
import Login from './Components/Login/Login';
import "bootstrap/dist/css/bootstrap.min.css";
import context from '../src/Components/Store/Context';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import Verify from './Components/Login/Verify';
import Logout from "./Components/Login/Logout";
import ExpenseForm from './Components/Expense/ExpenseForm';

function App() {
  const userCtx = useContext(context)
 const{isUserLoggedIn,verify,update}=userCtx
  return (
    <Router>
      <Logout />
      <Switch>
        <Route path="/auth">
          {isUserLoggedIn && verify ? <Redirect to="/expense" /> : <Login />}
        </Route>
        <Route path="/home">
          {isUserLoggedIn && verify ? <HomePage /> : <Redirect to="/verify" />}
        </Route>
        <Route path="/verify">
          {isUserLoggedIn ? <Verify /> : <Redirect to="/auth" />}
        </Route>
        <Route path="/expense">
          {isUserLoggedIn && update ? <ExpenseForm /> : <Redirect to="/home" />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
