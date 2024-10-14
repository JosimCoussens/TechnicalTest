"use client";
import React, { useState, useEffect } from "react";

export default function ListPage() {
  // Hooks
  const [todos, setTodos] = useState([]);
  const [newRecordTodo, setNewRecordToDo] = useState();
  const [newRecordCompleted, setNewRecordCompleted] = useState();
  const [newRecordUserId, setNewRecordUserId] = useState();

  // Fetch the list of todos only once when the component mounts
  useEffect(() => {
    fetch("https://dummyjson.com/todos")
      .then((res) => res.json()) // Convert to JS object
      .then((data) => {
        setTodos(data.todos);
      });
  }, []); // Empty dependency array to run only on mount

  const handleDelete = (id: any) => {
    fetch(`https://dummyjson.com/todos/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
  };

  return (
    <div>
      <h1>Todo List</h1>
      <ul>
        {Array.isArray(todos) && todos.length > 0 ? (
          todos.map((todo) => (
            <div
              key={todo.id}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(6, 1fr)",
                gap: "10px",
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                backgroundColor: "lightgray",
              }}
            >
              <textarea id="ta_id" defaultValue={todo.id} />
              <textarea id="ta_todo" defaultValue={todo.todo} />
              <textarea id="ta_completed" defaultValue={todo.completed} />
              <textarea id="ta_userid" defaultValue={todo.userId} />
              <button>UPDATE</button>
              <button onClick={() => handleDelete(todo.id)}>DELETE</button>
            </div>
          ))
        ) : (
          <p>No todos available.</p>
        )}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: "10px",
            marginBottom: "10px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "lightblue",
          }}
        >
          <textarea disabled="true" value="leave empty" />
          <textarea
            onChange={(e) => {
              setNewRecordToDo({ todo: e.target.value });
            }}
          />
          <textarea
            onChange={(e) => {
              setNewRecordCompleted({ completed: e.target.value ? 1 : 0 });
            }}
          />
          <textarea
            onChange={(e) => {
              setNewRecordUserId({ userId: e.target.value });
            }}
          />
          <button
            onClick={() => {
              fetch("https://dummyjson.com/todos/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  todo: newRecordTodo,
                  completed: newRecordCompleted,
                  userId: newRecordUserId,
                }),
              })
                .then((res) => res.json())
                .then(console.log);
            }}
          >
            ADD
          </button>
        </div>
      </ul>
    </div>
  );
}
