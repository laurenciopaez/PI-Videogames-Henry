import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";
import React from "react";
import LandingPage from "./components/LandingPage";
import HomePage from "./components/HomePage";
import FormPage from './components/FormPage'

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
        <Route path="/create">
            <FormPage />
          </Route>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>

        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
