import { useState, useEffect } from "react";

import "./App.css";
import AddTodo from "./components/AddTodo";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/todos")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTodos(data);
      });
  }, []);

  function addTodo(newTodo) {
    setTodos((prev) => [...prev, newTodo]);
  }

  function deleteTodo(id) {
    fetch(`http://localhost:8080/api/todos/${id}`, { method: "DELETE" })
      .then(() => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
      })
      .catch((error) => console.error("Fehler beim Löschen:", error));
  }

  return (
    <div className="App">
      <h1>Todo App</h1>
      {todos.map((todo) => (
        <div className="todo" key={todo.id}>
          <p className="todo-title">{todo.title}</p>
          <p className="todo-description">{todo.description}</p>
          <p className="todo-completed">{todo.completed && "done"}</p>
          <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
            Delete
          </button>
        </div>
      ))}
      <AddTodo addTodo={addTodo} />
    </div>
  );
}

export default App;
