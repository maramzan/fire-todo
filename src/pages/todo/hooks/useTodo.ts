import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../config/firebase";
import { TodoTypes } from "../../../types";

const useTodo = () => {
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState<string>("");
  const [editTaskId, setEditTaskId] = useState<string>("");
  const [showError, setShowError] = useState(false);

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
      if (todoText === "") {
        setShowError(true);
        return;
      }
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
  const saveChanges = async () => {
    const response = await updateDoc(doc(db, "fire-todos", editTaskId), {
      todo_text: todoText,
      updatedAt: new Date().toString(),
    });
    console.log(response);
    setTodoText("");
    setEditTaskId("");
    setIsUpdating(false);
  };

  const editTodo = (todo: TodoTypes) => {
    setIsUpdating(true);
    setTodoText(todo.todo_text);
    setEditTaskId(todo.id);
  };

  const deleteTodo = async () => {
    await deleteDoc(doc(db, "fire-todos", deleteTaskId));
    setDeleteTaskId("");
  };

  const handleConfirmDelete = () => {
    if (deleteTaskId !== "") {
      deleteTodo();
    }
  };

  const handleCancelDelete = () => {
    setDeleteTaskId("");
  };

  return {
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
  };
};

export default useTodo;
