
import './App.css';
import HomePage from './Components/Home/userProfile';
import Login from './Components/Login/Login';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import Verify from './Components/Login/Verify';
import Logout from "./Components/Login/Logout";
import ExpenseForm from './Components/Expense/ExpenseForm';
import { useSelector } from 'react-redux';

function App() {
const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
const verify = useSelector((state) => state.auth.isUserVerified);
const updated = useSelector((state) => state.auth.updated);
const mode = useSelector((state) => state.theme.darkMode);
  return (
    <div
      style={
        mode
          ? {
              backgroundColor: "black",
              height: "100vh",
              margin: 0,
              marginTop: 0,
              marginBottom: 0,
              overflowY: "scroll",
            }
          : { backgroundColor: "white", color: "black!" }
      }
    >
      <Router>
        <Logout />
        <Switch>
          <Route path="/auth">
                 <Login />
           </Route>
          <Route path="/verify">
            {isUserLoggedIn ? <Verify/> : <Redirect to="/auth" />}
          </Route>
          <Route path="/home">
            {isUserLoggedIn && verify ? (
              <HomePage />
            ) : (
              <Redirect to="/verify" />
            )}
          </Route>
          <Route path="/expense">
            {isUserLoggedIn && verify && updated ? (
              <ExpenseForm />
            ) : (
              <Redirect to="/home" />
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
