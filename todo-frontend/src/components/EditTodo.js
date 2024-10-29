import React, { useState } from "react";

const EditTodo = ({ todo, saveTodo }) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  return (
    <div className="todo">
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        required
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label htmlFor="description">Description:</label>
      <input
        type="text"
        id="description"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />

      <button
        id="save-todo-btn"
        onClick={() => saveTodo(todo.id, title, description)}
      >
        Save
      </button>
    </div>
  );
};

export default EditTodo;
