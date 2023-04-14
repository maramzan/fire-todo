import { TodoTypes } from "../../types";
import useTodo from "./hooks/useTodo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export const Todo = () => {
  const {
    addTodo,
    editTodo,
    updateTodo,
    saveChanges,
    setTodoText,
    setShowError,
    setDeleteTaskId,
    handleCancelDelete,
    handleConfirmDelete,
    todos,
    todoText,
    showError,
    isUpdating,
    deleteTaskId,
  } = useTodo();

  return (
    <>
      <div className="min-h-screen bg-gray-200 flex flex-col">
        <div className="container mx-auto mt-10 mb-20">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded shadow-lg py-4 px-8">
              <div className="flex items-center mb-2">
                <input
                  value={todoText}
                  onChange={(e) => {
                    setTodoText(e.target.value);
                    setShowError(false);
                  }}
                  className="border rounded py-2 px-3 w-full mr-4 text-gray-800"
                  type="text"
                  placeholder="Enter a new task..."
                />
                <button
                  className="px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-white focus:outline-none"
                  onClick={isUpdating ? saveChanges : addTodo}
                >
                  {isUpdating ? "Update" : "Add"}
                </button>
              </div>
              {showError && <div className="text-red-500 text-sm mb-2">Please enter a task</div>}

              {todos.map((todo: TodoTypes) => {
                return (
                  <div
                    key={todo.id}
                    className={`flex items-center justify-between py-2 px-2 border-b-2  last:border-b-0
                  ${todo.completed && "bg-green-200"}
                  `}
                  >
                    <div className="flex items-center">
                      <input type="checkbox" className="mr-2" checked={todo.completed} onChange={(e) => updateTodo(todo)} />
                      <span
                        className={`text-gray-800 
                    ${todo.completed && "line-through"}
                    `}
                      >
                        {todo.todo_text}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => editTodo(todo)}
                        className="px-4 py-2 rounded bg-yellow-500 hover:bg-yellow-600 text-white focus:outline-none mr-2"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => setDeleteTaskId(todo.id)}
                        className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white focus:outline-none"
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {deleteTaskId !== "" && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded shadow-lg py-4 px-8">
            <p className="text-lg font-bold mb-4">Are you sure you want to delete this task?</p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 rounded bg-gray-500 hover:bg-gray-600 text-white focus:outline-none mr-2"
                onClick={handleCancelDelete}
              >
                No
              </button>
              <button
                className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white focus:outline-none "
                onClick={handleConfirmDelete}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Todo;
