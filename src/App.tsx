import { useEffect, useState } from "react";
import { collection, doc, onSnapshot, query, updateDoc, addDoc } from "firebase/firestore";
import { db } from "./config/firebase";
import "firebase/firestore";

interface TodoTypes {
  todo_text: string;
  completed: boolean;
  id: string;
}

function App() {
  // react todo from firebase here
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "fire-todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todoArr: any = [];
      querySnapshot.forEach((doc) => {
        todoArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todoArr);
    });
    return () => unsubscribe();
  }, []);

  const addTodo = async (e: { preventDefault: () => void }) => {
    // add todo to firebase here
    try {
      e.preventDefault();
      await addDoc(collection(db, "fire-todos"), {
        todo_text: todoText,
        completed: false,
        createdAt: new Date().toString(),
        updatedAt: "",
      });
      setTodoText("");
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const updateTodo = async (todo: TodoTypes) => {
    console.log(todo.id);
    // update todo to firebase here
    const response = await updateDoc(doc(db, "fire-todos", todo.id), {
      completed: !todo.completed,
      updatedAt: new Date().toString(),
    });
  };

  const saveChanges = async (todo: TodoTypes) => {
    // edit todo from firebase here
    setTodoText(todo.todo_text);
    const response = await updateDoc(doc(db, "fire-todos", todo.id), {
      todo_text: todoText,
      updatedAt: new Date().toString(),
    });
    setTodoText("");
    setIsUpdating(false);
  };

  const editTodo = (todo: TodoTypes) => {
    // edit todo from firebase here
    setIsUpdating(true);
    setTodoText(todo.todo_text);
  };

  const deleteTodo = () => {
    // delete todo from firebase here
  };

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
              <button onClick={deleteTodo}>delete</button>
              <button onClick={() => (isUpdating ? saveChanges(todo) : editTodo(todo))}>{isUpdating ? "Update" : "Edit"}</button>
            </div>
          );
        })
      }
    </div>
  );
}

export default App;
