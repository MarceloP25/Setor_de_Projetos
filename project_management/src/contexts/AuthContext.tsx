import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../services/config';
import type { Admin } from '../interfaces/Admin';

interface AuthContextType {
  user: Admin | null;
  firebaseUid: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Admin | null>(null);
  const [firebaseUid, setFirebaseUid] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeFirestore: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {

      if (firebaseUser) {
        setFirebaseUid(firebaseUser.uid);

        const docRef = doc(db, 'administradores', firebaseUser.uid);

        unsubscribeFirestore = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            const adminData = docSnap.data() as Admin;
            setUser(adminData);
          } else {
            setUser(null);
          }
          setLoading(false);
        });

      } else {
        setUser(null);
        setFirebaseUid(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeFirestore) unsubscribeFirestore();
    };
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, firebaseUid, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};