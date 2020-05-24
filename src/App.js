import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import { Container } from "@material-ui/core";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Container maxWidth="md">
        <Router>
          <Switch>
            <Route exact path="/" render={() => <Home />} />
          </Switch>
        </Router>
      </Container>
    </div>
  );
}

export default App;
