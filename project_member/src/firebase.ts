import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBehMijkLX65MIyBuPjNJHHnjbO5FuibGc",
  authDomain: "formstorprojifsudestemgrp.firebaseapp.com",
  projectId: "formstorprojifsudestemgrp",
  storageBucket: "formstorprojifsudestemgrp.firebasestorage.app",
  messagingSenderId: "220072432792",
  appId: "1:220072432792:web:0df01bb0980472181aeced",
  measurementId: "G-3MLWLTN7GH"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
