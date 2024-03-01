import { useContext } from 'react';
import './App.css';
import HomePage from './Components/Home/HomePage';
import Login from './Components/Login/Login';
import "bootstrap/dist/css/bootstrap.min.css";
import context from '../src/Components/Store/Context';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import Verify from './Components/Login/Verify';

function App() {
  const userCtx = useContext(context)
 const{isUserLoggedIn,verify}=userCtx
  return (
    <Router>
      <Switch>
        <Route path="/auth">
          {isUserLoggedIn ? <Redirect to="/verify" /> : <Login />}
        </Route>
        <Route path="/home">
          {isUserLoggedIn && verify ? <HomePage /> : <Redirect to="/verify" />}
        </Route>
        <Route path="/verify">
          {isUserLoggedIn ? <Verify /> : <Redirect to="/auth" />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
