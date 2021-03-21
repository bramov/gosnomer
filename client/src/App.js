import './App.css';
import React, { useState } from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import {createBrowserHistory} from 'history';
import Login from "./components/Login/Login";
import Carousel from "./components/Carousel/Carousel";
import useToken from "./hooks/useToken";

function App() {
  const history = createBrowserHistory();
  const { token, setToken } = useToken();
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          { token ? <Carousel /> : <Redirect to="/login" component={Login}/>}
        </Route>
        <Route exact path="/login">
          { !token ? <Login history={history} setToken={setToken} /> : <Carousel/> }
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
