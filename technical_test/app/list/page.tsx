"use client";
import React, { useState, useEffect } from "react";

export default function ListPage() {
  // Hooks
  const [todos, setTodos] = useState([]);
  const [newRecordTodo, setNewRecordToDo] = useState("");
  const [newRecordCompleted, setNewRecordCompleted] = useState(0);

  // Fetch the list of todos only once when the component mounts
  useEffect(() => {
    fetch("https://dummyjson.com/todos")
      .then((res) => res.json()) // Convert to JS object
      .then((data) => {
        setTodos(data.todos);
      });
  }, []); // Empty dependency array to run only on mount

  // Handle Delete Function
  const handleDelete = async (id: any) => {
    try {
      const response = await fetch(`https://dummyjson.com/todos/${id}`, {
        // await -> pause execution of an async function
        method: "DELETE",
      });
      const result = await response.json();

      // Update state to remove the deleted item from the UI
      setTodos(todos.filter((todo) => todo.id !== id));

      console.log("Deleted:", result);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
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
          <textarea disabled={true} />
          <textarea
            onChange={(e) => {
              setNewRecordToDo(e.target.value);
            }}
          />
          <textarea
            onChange={(e) => {
              setNewRecordCompleted(e.target.value ? 1 : 0);
            }}
          />
          <textarea disabled={true} />
          <button
            onClick={() => {
              fetch("https://dummyjson.com/todos/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  todo: newRecordTodo,
                  completed: newRecordCompleted,
                  userId: 1,
                }),
              })
                .then((res) => res.json())
                .then((newTodo) => {
                  setTodos([...todos, newTodo]); // Add new todo to the state
                  console.log("New todo added:", newTodo);
                });
            }}
          >
            ADD
          </button>
        </div>
      </ul>
    </div>
  );
}
