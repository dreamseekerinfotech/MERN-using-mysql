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
