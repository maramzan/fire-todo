import { getAuth } from "firebase/auth";
// config firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyANkNFzU1-YynyE01Vb1GOQkallhJzNo-0",
  authDomain: "fire-todo-77016.firebaseapp.com",
  projectId: "fire-todo-77016",
  storageBucket: "fire-todo-77016.appspot.com",
  messagingSenderId: "929859770786",
  appId: "1:929859770786:web:846fca0e29d94f3a08bafb",
};

const auth = getAuth();
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
