import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../services/config';
import type { Admin } from '../interfaces/Admin';
import type { SystemLog } from '../interfaces/SystemLogs';

interface LogActionParams {
  user: Admin;
  action: string;
  objectType: string;
  objectId: string;
}

export const logAction = async ({
  user,
  action,
  objectType,
  objectId
}: LogActionParams): Promise<void> => {

  const logData: SystemLog = {
    userId: user.id,
    userData: { ...user }, // snapshot do admin no momento da ação
    action,
    objectType,
    objectId,
    date: serverTimestamp()
  };

  try {
    await addDoc(collection(db, 'logs'), logData);
  } catch (error) {
    console.error('Erro ao registrar log:', error);
  }
};