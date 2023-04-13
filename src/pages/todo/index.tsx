import { useEffect, useState } from "react";
import { collection, doc, onSnapshot, query, updateDoc, addDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { TodoTypes } from "../../types";
import useTodo from "./hooks/useTodo";

export const Todo = () => {
  const { addTodo, updateTodo, editTodo, deleteTodo, saveChanges, setTodoText, isUpdating, todoText, todos } = useTodo();

  return (
    <div>
      <h1>Todo App</h1>
      <input type="text" value={todoText} onChange={(e) => setTodoText(e.target.value)} />
      <button onClick={addTodo}>Add Todo</button>

      {
        // show todos here
        todos.map((todo: TodoTypes) => {
          return (
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }} key={todo.id}>
              <input type="checkbox" checked={todo.completed} onChange={(e) => updateTodo(todo)} />
              <p>{todo.todo_text}</p>
              <button onClick={() => deleteTodo(todo.id)}>delete</button>
              <button onClick={() => (isUpdating ? saveChanges(todo) : editTodo(todo))}>{isUpdating ? "Update" : "Edit"}</button>
            </div>
          );
        })
      }
    </div>
  );
};

export default Todo;
