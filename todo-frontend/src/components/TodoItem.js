import React from "react";

const TodoItem = ({ todo, editTodo, deleteTodo, handleCheckbox }) => {
  return (
    <div className="todo" key={todo.id}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => handleCheckbox(todo.id)}
      />
      <p className="todo-title">{todo.title}</p>
      <p className="todo-description">{todo.description}</p>
      <p className="todo-completed">{todo.completed && "done"}</p>

      <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
        Delete
      </button>

      <button className="edit-btn" onClick={() => editTodo(todo.id)}>
        Edit
      </button>
    </div>
  );
};

export default TodoItem;
