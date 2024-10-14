"use client";
import React, { useState, useEffect } from "react";

export default function listPage() {
  // Hooks
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/todos")
      .then((res) => res.json()) // Convert to JS object
      .then((data) => {
        setTodos(data.todos);
      });
  });

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)", // 4 equal columns
              gap: "10px", // space between grid items
              marginBottom: "10px", // spacing between todo items
              padding: "10px",
              border: "1px solid #ccc", // border for each todo item
              borderRadius: "5px",
            }}
          >
            <p>{todo.id}</p>
            <p>{todo.todo}</p>
            <p>{todo.completed ? "Completed" : "Not Completed"}</p>
            <p>{todo.userId}</p>
            <button>DELETE</button>
          </div>
        ))}
      </ul>
    </div>
  );
}
