import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';

import PageNotFound from './Components/Page/PageNotFound'
import HomePage from './Components/Page/HomePage'

function App() {
  return (
	<Router>
	  <Switch>
		<Route exact path="/" >
		<HomePage />
		</Route>
		<Route>
		<PageNotFound />
		</Route>
	  </Switch>
	</Router>
  );
}

export default App;
