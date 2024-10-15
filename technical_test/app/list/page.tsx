"use client";
import React, { useState, useEffect } from "react";
import "./styles.css";
export default function ListPage() {
  // Hooks
  const [todos, setTodos] = useState([]);
  const [newRecordTodo, setNewRecordToDo] = useState("");
  const [newRecordCompleted, setNewRecordCompleted] = useState("");

  // useEffect is a React Hook that lets you synchronize a component with an external system.
  useEffect(() => {
    fetch("https://dummyjson.com/todos")
      .then((res) => res.json()) // Convert to JS object
      .then((data) => {
        setTodos(data.todos);
      });
  }, []); // component mounting: when the array is empty ([]) the useEffect will run only once

  const handleDelete = async (id: any) => {
    try {
      // await -> pause execution of an async function
      const response = await fetch(`https://dummyjson.com/todos/${id}`, {
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
        {todos.map((todo) => (
          <div id="div_existingRecords" key={todo.id}>
            <textarea defaultValue={todo.id} />
            <textarea defaultValue={todo.todo} />
            <textarea defaultValue={todo.completed} />
            <textarea defaultValue={todo.userId} />
            <button>UPDATE</button>
            <button onClick={() => handleDelete(todo.id)}>DELETE</button>
          </div>
        ))}
        <div id="div_newRecord">
          <textarea disabled={true} defaultValue={"id: auto generated"} />
          <textarea
            onChange={(e) => {
              setNewRecordToDo(e.target.value);
            }}
          />
          <textarea
            onChange={(e) => {
              setNewRecordCompleted(e.target.value);
            }}
          />
          <textarea disabled={true} defaultValue={"userId: always 1"} />
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
                  // Loop over todos array to get max number of id, to create new id
                  let maxValue = 0;
                  for (let i = 0; i < todos.length; i++)
                    if (parseInt(todos[i].id) > maxValue)
                      maxValue = todos[i].id;

                  newTodo.id = maxValue + 1;
                  setTodos([...todos, newTodo]); // Makes a copy of todos and adds a new record to the array
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
