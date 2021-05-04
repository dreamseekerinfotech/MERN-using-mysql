import "bootstrap/dist/css/bootstrap.css";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import Todos from "./components/Todos";
import CreateTodos from "./components/CreateTodos";
import EditTodos from "./components/EditTodos";
export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <nav className="navbar navbar-expand-lg">
            <div className="collapse navbar-collapse">
              <div className="navbar-nav">
                <Link to="/" className="nav-item nav-link">
                  Todos
                </Link>
                <Link to="/create" className="nav-item nav-link">
                  Create Todo
                </Link>
              </div>
            </div>
          </nav>

          <Switch>
            <Route exact path="/" component={Todos} />
            <Route path="/create" component={CreateTodos} />
            <Route path="/edit/:id" component={EditTodos} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
