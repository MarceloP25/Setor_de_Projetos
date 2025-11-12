import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3wPLES-clrm92-EysVwnr_quFY9MpfAo",
  authDomain: "reserva-setor-projetos.firebaseapp.com",
  projectId: "reserva-setor-projetos",
  storageBucket: "reserva-setor-projetos.firebasestorage.app",
  messagingSenderId: "792713377331",
  appId: "1:792713377331:web:c96af20fcf1ad6761a5546",
  measurementId: "G-Q3MW892XKW"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);

export { db };
