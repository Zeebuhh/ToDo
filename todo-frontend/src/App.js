import { useState, useEffect } from "react";
import "./App.css";
import AddTodo from "./components/AddTodo";
import TodoItem from "./components/TodoItem";
import EditTodo from "./components/EditTodo";

function App() {
  const [todos, setTodos] = useState([]);
  const [editingTodoId, setEditingTodoId] = useState("");

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

  function editTodo(id) {
    setEditingTodoId(id);
  }

  function saveTodo(id, updatedTitle, updatedDescription) {
    const updatedTodo = {
      id: id,
      title: updatedTitle,
      description: updatedDescription,
      completed: false,
    };

    fetch(`http://localhost:8080/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    })
      .then(() => {
        setTodos((prev) =>
          prev.map((todo) => (todo.id === id ? updatedTodo : todo))
        );
        setEditingTodoId("");
      })
      .catch((error) => console.error("Fehler beim Speichern:", error));
  }

  function handleCheckbox(id) {
    const updatedTodo = todos.find((todo) => todo.id === id);
    if (updatedTodo) {
      updatedTodo.completed = true;

      fetch(`http://localhost:8080/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      })
        .then(() => {
          setTodos((prev) =>
            prev.map((todo) => (todo.id === id ? updatedTodo : todo))
          );

          setTimeout(() => {
            deleteTodo(id);
          }, 5000);
        })
        .catch((error) => console.error("Fehler beim Speichern:", error));
    }
  }

  return (
    <div className="App">
      <h1>Todo App</h1>
      {todos.map((todo) =>
        editingTodoId === todo.id ? (
          <EditTodo key={todo.id} todo={todo} saveTodo={saveTodo} />
        ) : (
          <TodoItem
            key={todo.id}
            todo={todo}
            editTodo={editTodo}
            deleteTodo={deleteTodo}
            handleCheckbox={handleCheckbox}
          />
        )
      )}
      <AddTodo addTodo={addTodo} />
    </div>
  );
}

export default App;
