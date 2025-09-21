// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyC3wPLES-clrm92-EysVwnr_quFY9MpfAo",
    authDomain: "reserva-setor-projetos.firebaseapp.com",
    projectId: "reserva-setor-projetos",
    storageBucket: "reserva-setor-projetos.firebasestorage.app",
    messagingSenderId: "792713377331",
    appId: "1:792713377331:web:c96af20fcf1ad6761a5546",
    measurementId: "G-Q3MW892XKW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);