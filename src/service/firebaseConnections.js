// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{
    getFirestore,
    collection,
    addDoc,
    doc,
    getDoc,
    getDocs,
    query,
    orderBy,
    onSnapshot,
    updateDoc,
    deleteDoc,
    serverTimestamp
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8SYA000_NWuFbht964C9G6bDg6bwXPEQ",
  authDomain: "projetapp-2f4a4.firebaseapp.com",
  projectId: "projetapp-2f4a4",
  storageBucket: "projetapp-2f4a4.firebasestorage.app",
  messagingSenderId: "467027986083",
  appId: "1:467027986083:web:c0a62daf2c341baf0ce116"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const produtosCollection = collection(db, "produtos");

export {
    db,
    produtosCollection,
    getFirestore,
    collection,
    addDoc,
    doc,
    getDoc,
    getDocs,
    query,
    orderBy,
    onSnapshot,
    updateDoc,
    deleteDoc,
    serverTimestamp

};