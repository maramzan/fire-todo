import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../config/firebase";
import { TodoTypes } from "../../../types";

const useTodo = () => {
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

  const deleteTodo = async (id: string) => {
    // delete todo from firebase here
    await deleteDoc(doc(db, "fire-todos", id));
  };

  return {
    addTodo,
    updateTodo,
    editTodo,
    deleteTodo,
    saveChanges,
    setTodoText,
    isUpdating,
    todoText,
    todos,
  };
};

export default useTodo;
