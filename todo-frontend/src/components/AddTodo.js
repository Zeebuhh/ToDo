import React from "react";
import { useState } from "react";

const AddTodo = ({ addTodo }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleAddTodo(e) {
    e.preventDefault();

    const newTodo = {
      title: title,
      description: description,
      completed: false,
    };

    fetch("http://localhost:8080/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    })
      .then((res) => res.json())
      .then((savedTodo) => {
        addTodo(savedTodo);
      })
      .catch((error) =>
        console.error("Fehler beim Hinzufügen des Todos:", error)
      );

    setTitle("");
    setDescription("");
  }

  return (
    <form className="AddTodo" onSubmit={handleAddTodo}>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        required
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        placeholder="Feed the cat"
      ></input>

      <label htmlFor="description">Description:</label>
      <input
        type="text"
        id="description"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        placeholder="...feed tuna and fill up the water too."
      ></input>

      <button type="submit" id="add-todo-btn">
        Add
      </button>
    </form>
  );
};

export default AddTodo;
