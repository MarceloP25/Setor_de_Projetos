// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7JZenvTKVMg2EWBJFirdNZhfm6ep_bVQ",
  authDomain: "setor-projetos.firebaseapp.com",
  projectId: "setor-projetos",
  storageBucket: "setor-projetos.firebasestorage.app",
  messagingSenderId: "400221572503",
  appId: "1:400221572503:web:a360e29fa6cae93403c8d2",
  measurementId: "G-6HB8T6WLXD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { app, db, storage, analytics };