// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3wPLES-clrm92-EysVwnr_quFY9MpfAo",
  authDomain: "reserva-setor-projetos.firebaseapp.com",
  projectId: "reserva-setor-projetos",
  storageBucket: "reserva-setor-projetos.firebasestorage.app",
  messagingSenderId: "792713377331",
  appId: "1:792713377331:web:fd67dcd411dc840b1a5546",
  measurementId: "G-7HSDVS3YNT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { app, db, storage, analytics };