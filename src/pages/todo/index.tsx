import { useEffect, useState } from "react";
import { collection, doc, onSnapshot, query, updateDoc, addDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { TodoTypes } from "../../types";
import useTodo from "./hooks/useTodo";

export const Todo = () => {
  const { addTodo, updateTodo, editTodo, deleteTodo, saveChanges, setTodoText, isUpdating, todoText, todos } = useTodo();

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col">
      <div className="container mx-auto mt-10 mb-20">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded shadow-lg py-4 px-8">
            <div className="flex items-center mb-4">
              <input
                className="border rounded py-2 px-3 w-full mr-4 text-gray-800"
                type="text"
                placeholder="Enter a new task..."
              />
              <button className="px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-white focus:outline-none">Add</button>
            </div>
            <ul>
              <li className="flex items-center justify-between py-2 border-b border-gray-300">
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-gray-800">Task 1</span>
                </div>
                <div className="flex items-center">
                  <button className="px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-600 text-white focus:outline-none mr-2">
                    Edit
                  </button>
                  <button className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white focus:outline-none">Delete</button>
                </div>
              </li>
              <li className="flex items-center justify-between py-2 border-b border-gray-300">
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-gray-800">Task 2</span>
                </div>
                <div className="flex items-center">
                  <button className="px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-600 text-white focus:outline-none mr-2">
                    Edit
                  </button>
                  <button className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white focus:outline-none">Delete</button>
                </div>
              </li>
              <li className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-gray-800">Task 3</span>
                </div>
                <div className="flex items-center">
                  <button className="px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-600 text-white focus:outline-none mr-2">
                    Edit
                  </button>
                  <button className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white focus:outline-none">Delete</button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    // <div>
    //   <p className="text-3xl">Todo App</p>
    //   <input
    //     type="text"
    //     value={todoText}
    //     onChange={(e) => setTodoText(e.target.value)}
    //     className="shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    //   />
    //   <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={addTodo}>
    //     Add Todo
    //   </button>

    //   {todos.map((todo: TodoTypes) => {
    //     return (
    //       <div
    //         className={`flex items-center justify-between w-1/3 p-2 border-2 border-gray-300 rounded-md ${
    //           todo.completed ? "bg-green-200" : "bg-red-200"
    //         }`}
    //         key={todo.id}
    //       >
    //         <input className="mr-2" type="checkbox" checked={todo.completed} onChange={(e) => updateTodo(todo)} />
    //         <p className="text-2xl">{todo.todo_text}</p>
    //         <button
    //           className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    //           onClick={() => deleteTodo(todo.id)}
    //         >
    //           delete
    //         </button>
    //         <button
    //           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    //           onClick={() => (isUpdating ? saveChanges(todo) : editTodo(todo))}
    //         >
    //           {isUpdating ? "Update" : "Edit"}
    //         </button>
    //       </div>
    //     );
    //   })}
    // </div>
  );
};

export default Todo;
