import { useContext } from 'react';
import './App.css';
import HomePage from './Components/Home/HomePage';
import Login from './Components/Login/Login';
import "bootstrap/dist/css/bootstrap.min.css";
import context from '../src/Components/Store/Context';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from 'react-router-dom';

function App() {
  const userCtx = useContext(context)
 const{isUserLoggedIn}=userCtx
  return (
    <Router>
      <Switch>
        <Route path="/auth">
          {isUserLoggedIn ? <Redirect to="/home" /> : <Login />}
        </Route>
        <Route path="/home">
          {isUserLoggedIn ? <HomePage /> : <Redirect to="/auth" />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
