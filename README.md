# How To Intigrate react into Node Project using webpack

Hello Everyone , In this blog we will learn how to add intigrate React into nodejs project. we will gone use node, express, mysql, React in this blog.
To prepare backend you can check my blog (link). backend will be exact same, we will start from intigrating react into existing backend node project.
so without westing time let's get started

1st step: setup react project into views folder

first of all to set up react we will use webpack to build and for that we will user laravel-mix library, i know i know you have question why laravel-mix and not using webpack directly. so answer is laravel-mix handles webpack very efficiently and we don't need to learn webpack deeply.

now create on package.json file and add following code

{
"name": "front",
"version": "1.0.0",
"description": "",
"scripts": {
"dev": "webpack --progress --config=node_modules/laravel-mix/setup/webpack.config.js",
"development": "cross-env process.env.section=front NODE_ENV=development node_modules/webpack/bin/webpack.js --progress --config=node_modules/laravel-mix/setup/webpack.config.js",
"watch": "npm run development -- --watch",
"watch-poll": "npm run watch -- --watch-poll",
"hot": "cross-env process.env.section=front NODE_ENV=development node_modules/webpack-dev-server/bin/webpack-dev-server.js --inline --hot --config=node_modules/laravel-mix/setup/webpack.config.js",
"prod": "npm run production",
"production": "cross-env process.env.section=front NODE_ENV=production node_modules/webpack/bin/webpack.js --no-progress --config=node_modules/laravel-mix/setup/webpack.config.js"
},
"author": "",
"license": "ISC",
"devDependencies": {
"@babel/preset-react": "^7.13.13",
"cross-env": "^7.0.3",
"laravel-mix": "^6.0.5",
"react": "^17.0.1",
"react-dom": "^17.0.1"
}
}

2nd setp: install requried dependencies

now add required dependencies for react router, axios etc.

npm install axios lodash react-router-dom bootstrap --save

3rd step : make changes in pug file and backend

all apis which are not start from /api will be call at one place for that we have to add following code to app.js file

'app.use(/^(?:(?!._\.\w+).)_$/, indexRouter);' (take this from actual file)

change in index.js routes file
routes\index.js

var express = require("express");
var router = express.Router();

/_ GET home page. _/
router.get("/", function (req, res, next) {
res.render("index", { title: "Express" });
});

module.exports = router;

change in index.pub file in views
views\index.pug

doctype html
html
head
title= title
link(rel='stylesheet', href='/stylesheets/style.css')
link(rel='stylesheet', href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap')
body
#root
script(src="/static/js/index.js")

4th step : setup base react files

first lets create one index.js file and add following code
views\src\index.js

import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
export default function Index() {
return <App />;
}
ReactDOM.render(<Index />, document.getElementById("root"));

create app.js file
views\src\app.js

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

create Todos.js file
views\src\components\Todos.js

import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import axios from "axios";

export default class Todos extends Component {
constructor(props) {
super(props);

    this.state = { todos: [] };

}

componentDidMount() {
this.getTodos();
}
getTodos() {
axios.get("http://localhost:3000/api/todo/").then((response) => {
this.setState(() => {
return { todos: response.data };
});
});
}
deletetodo(id) {
axios.delete(`http://localhost:3000/api/todo/${id}`).then((response) => {
this.getTodos();
});
}
render() {
return (

<div>
<h2 className="text-center">Todos List</h2>

        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.todos.map((todo, index) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.name}</td>
                <td>{todo.category}</td>
                <td>{todo.startDate}</td>
                <td>{todo.endDate}</td>
                <td>
                  <div className="btn-group" role="group">
                    <Link to={"edit/" + todo.id} className="btn btn-success">
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => this.deletetodo(todo.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

}
}

create new CreateTodos.js
views\src\components\CreateTodos.js

import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default class CreateTodos extends Component {
constructor(props) {
super(props);

    this.state = {
      name: "",
      category: "",
      startDate: "",
      endDate: "",
      redirect: false,
    };
    this.OnChangeHandler = this.OnChangeHandler.bind(this);
    this.addTodo = this.addTodo.bind(this);

}
addTodo(event) {
event.preventDefault();
axios
.post("http://localhost:3000/api/todo", this.state)
.then((response) => this.setState({ redirect: true }))
.catch((err) => console.log(err))
.finally(() => console.log("done"));
}
OnChangeHandler(event) {
console.log(event);
let nam = event.target.name;
let val = event.target.value;
this.setState({ [nam]: val });
}
render() {
if (this.state.redirect) {
return <Redirect to="/" />;
}
return (

<div>
<h3 className="text-center">Create Todo</h3>
<div className="row">
<div className="col-md-6">
<form onSubmit={this.addTodo}>
<div className="form-group">
<label>Name</label>
<input
                  type="text"
                  name="name"
                  value={this.state.name}
                  className="form-control"
                  onChange={this.OnChangeHandler}
                />
</div>
<div className="form-group">
<label>Category</label>
<select
                  className="form-control"
                  name="category"
                  value={this.state.category}
                  onChange={this.OnChangeHandler}
                >
<option value="">Please Select Category</option>
<option value="New">New</option>
<option value="Inporgress">Inporgress</option>
<option value="QA">QA</option>
<option value="Completed">Completed</option>
</select>
</div>
<div className="form-group">
<label>Name</label>
<input
                  type="date"
                  value={this.state.startDate}
                  onChange={this.OnChangeHandler}
                  className="form-control"
                  name="startDate"
                />
</div>
<div className="form-group">
<label>Name</label>
<input
                  type="date"
                  value={this.state.endDate}
                  onChange={this.OnChangeHandler}
                  className="form-control"
                  name="endDate"
                />
</div>
<button type="submit" className="btn btn-primary">
Create
</button>
</form>
</div>
</div>
</div>
);
}
}

create EditTodos.js file
views\src\components\EditTodos.js

import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default class CreateTodos extends Component {
constructor(props) {
super(props);

    this.state = {
      name: "",
      category: "",
      start_date: "",
      end_date: "",
      redirect: false,
    };
    this.OnChangeHandler = this.OnChangeHandler.bind(this);
    this.addTodo = this.addTodo.bind(this);

}
componentDidMount() {
this.getTodo(this.props.match.params.id);
}
getTodo(id) {
axios.get(`http://localhost:3000/api/todo/${id}`).then((response) => {
this.setState(() => {
return {
id: response.data.id,
name: response.data.name,
category: response.data.category,
start_date: response.data.start_date,
end_date: response.data.end_date,
redirect: false,
};
});
});
}
addTodo(event) {
event.preventDefault();
axios
.put(`http://localhost:3000/api/todo/${this.state.id}`, this.state)
.then((response) => this.setState({ redirect: true }))
.catch((err) => console.log(err))
.finally(() => console.log("done"));
}
OnChangeHandler(event) {
console.log(event);
let nam = event.target.name;
let val = event.target.value;
this.setState({ [nam]: val });
}
render() {
if (this.state.redirect) {
return <Redirect to="/" />;
}
return (

<div>
<h3 className="text-center">Edit Todo</h3>
<div className="row">
<div className="col-md-6">
<form onSubmit={this.addTodo}>
<div className="form-group">
<label>Name</label>
<input
                  type="text"
                  name="name"
                  value={this.state.name}
                  className="form-control"
                  onChange={this.OnChangeHandler}
                />
</div>
<div className="form-group">
<label>Category</label>
<select
                  className="form-control"
                  name="category"
                  value={this.state.category}
                  onChange={this.OnChangeHandler}
                >
<option value="">Please Select Category</option>
<option value="New">New</option>
<option value="Inporgress">Inporgress</option>
<option value="QA">QA</option>
<option value="Completed">Completed</option>
</select>
</div>
<div className="form-group">
<label>Name</label>
<input
                  type="date"
                  value={this.state.start_date}
                  onChange={this.OnChangeHandler}
                  className="form-control"
                  name="start_date"
                />
</div>
<div className="form-group">
<label>Name</label>
<input
                  type="date"
                  value={this.state.end_date}
                  onChange={this.OnChangeHandler}
                  className="form-control"
                  name="end_date"
                />
</div>
<button type="submit" className="btn btn-primary">
Create
</button>
</form>
</div>
</div>
</div>
);
}
}

thats for it for this blog. If you have any query hit me on my social media or you can mail me on learning@dreamseekerinfotech.com
