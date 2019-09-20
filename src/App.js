import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import ListItem from "./components/listItem";
import { toast } from "react-toastify";
import {
  getTodos,
  postTodo,
  putTodo,
  deleteTodo
} from "./services/todoService";
import logo from "./logo.svg";
import loadingGif from "./loader.gif";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      newTodo: "",
      editing: false,
      editingIndex: -1,
      notification: "",
      todos: [],
      loading: true
    };
  }

  async componentDidMount() {
    const { data } = await getTodos();
    this.setState({ todos: data, loading: false });
  }

  async componentDidUpdate(prevProps, prevState) {
    const { data } = await getTodos();
    this.setState({ todos: data });
    toast.warn("something has changed");
  }

  handleChange = e => {
    this.setState({ newTodo: e.target.value });
  };
  handleKeyDown = e => {
    if (e.keyCode === 13 && this.state.newTodo.length > 5) {
      const newId = this.generateNewId();
      this.state.editing ? this.editTodo() : this.addTodoToList(newId);
    }
  };
  handleAddToDo = () => {
    const newId = this.generateNewId();
    this.addTodoToList(newId);
  };

  handleDelete = async todo => {
    this.setState({ loading: true });
    const originalTodos = this.state.todos;
    const todos = originalTodos.filter(f => f.id !== todo.id);
    console.log(todos);
    this.setState({ todos, loading: false });

    try {
      await deleteTodo(todo.id);
      this.alert("ToDo deleted Successfully");
      toast.success("todo deleted successfully");
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This todo deleted before.");
        this.setState({ todos: originalTodos });
      }
    }
  };
  handleUpdate = todo => {
    this.setState({ loading: true });
    const index = this.state.todos.findIndex(i => i.id === todo.id);
    this.setState({
      editing: true,
      newTodo: todo.name,
      editingIndex: index,
      loading: false
    });
  };

  async addTodoToList(newId) {
    this.setState({ loading: true });
    const newTodo = { id: newId, name: this.state.newTodo };
    await postTodo(newTodo);
    // const todos = [...this.state.todos];
    // todos.push(newTodo);
    this.setState({
      newTodo: "",
      loading: false
    });
    this.alert("ToDo Created Successfully");
    toast.success("new todo added to list");
  }

  generateNewId() {
    return this.state.todos.length !== 0
      ? this.state.todos.sort((a, b) => (a.id > b.id ? 1 : -1))[
          this.state.todos.length - 1
        ].id + 1
      : 1;
  }
  editTodo = async () => {
    const todo = this.state.todos[this.state.editingIndex];
    todo.name = this.state.newTodo;
    await putTodo(todo);
    this.setState({
      editing: false,
      newTodo: "",
      editingIndex: -1
    });
    this.alert("ToDo Updated Successfully");
    toast.success("ToDo Updated Successfully");
  };

  alert = notification => {
    this.setState({ notification });

    setTimeout(() => {
      this.setState({ notification: "" });
    }, 3000);
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <div className="App">
          <header className="App-header">
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
          </header>

          <div className="container">
            {this.state.notification && (
              <div className="alert alert-success mt-2">
                <p className="text-center">{this.state.notification}</p>
              </div>
            )}

            <input
              onKeyDown={this.handleKeyDown}
              onChange={this.handleChange}
              name="todo"
              value={this.state.newTodo}
              placeholder="add new todos..."
              type="text"
              className="form-control my-4"
            />
            <button
              onClick={this.state.editing ? this.editTodo : this.handleAddToDo}
              className="btn btn-info form-control mb-3"
              disabled={this.state.newTodo.length < 5}
            >
              {this.state.editing ? "Edit" : "Add"}
            </button>
            {this.state.loading && <img src={loadingGif} />}
            {!this.state.editing && (
              <ul className="list-group">
                {this.state.todos.map(todo => {
                  return (
                    <ListItem
                      key={todo.id}
                      onDelete={() => this.handleDelete(todo)}
                      onUpdate={() => this.handleUpdate(todo)}
                      data={todo}
                    />
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
