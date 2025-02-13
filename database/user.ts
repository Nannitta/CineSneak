import { app } from '../firebase.mjs';
import { DatabaseReference, DataSnapshot, get, getDatabase, ref } from 'firebase/database';

const db = getDatabase(app);

const getUserIdByEmail = async (email: string) => {
  const usersRef: DatabaseReference = ref(db, '/users');
  
  try {
    const snapshot: DataSnapshot = await get(usersRef);
    const users = snapshot.val();
    
    for (const userKey in users) {
      if (users[userKey].email === email) {
        return userKey;
      }
    }
    
    throw new Error('Usuario no encontrado');
  } catch (error) {
    console.error('Error al obtener el userKey:', error);
  }
};

export { getUserIdByEmail };