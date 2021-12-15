import React, { Fragment, Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-notifications-component/dist/theme.css";
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from "./store";
import {Provider} from "react-redux"
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import ReactNotification from "react-notifications-component";
import { NotificationContainer } from "react-notifications"

import { setCurrentUser, logoutUser } from "./actions/authActions";

import PrivateRoute from "./components/private-route/PrivateRoute";
import './App.css';
import Register from './components/register'
import  Login from './components/login'
import Dashboard from './components/dashboard'


if (localStorage.token) {
	const token = localStorage.jwtToken;
	setAuthToken(token);
	const decoded = jwt_decode(token);
	store.dispatch(setCurrentUser(decoded));
	const currentTime = Date.now() / 1000;
	if (decoded.exp < currentTime) {
		store.dispatch(logoutUser());
		window.location.href = "./Login";
	}
}


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <NotificationContainer/>
						<Router basename={'/'}>
              <Switch>
									<Route exact path='/Signup' component={Register} />
									<Route exact path="/activate/:id" component={Login} />
									<Route exact path="/Login" component={Login} />
                  <Switch>
										<PrivateRoute exact path='/Dashboard' component={Dashboard} />
                  </Switch>
              </Switch>
            </Router>
				</Provider>

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
