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
