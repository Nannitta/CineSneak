import { app, auth, googleProvider } from '../firebase.mjs';
import { signInWithEmailAndPassword, signInWithPopup, User, UserCredential } from 'firebase/auth';
import { getDatabase, ref, get, orderByChild, equalTo, query, Query, DataSnapshot } from 'firebase/database';
import { useUserStore } from '../src/app/store/userStore';

const db = getDatabase(app);

const loginUserWithGoogle = async () => {
  try {
    const result: UserCredential = await signInWithPopup(auth, googleProvider);
    const user: User = result.user;

    const userRef: Query = query(ref(db, 'users'), orderByChild('id'), equalTo(user.uid));
    const snapshot: DataSnapshot = await get(userRef);

    if (snapshot.exists()) {
      const userData = snapshot.val();
      const userKey: string = Object.keys(userData)[0];
      const existingUser = userData[userKey];     
      
      const token: string = await user.getIdToken();

      useUserStore.getState().setUser({
        uid: existingUser.id,
        displayName: existingUser.username,
        email: existingUser.email,
      }, token);

      localStorage.setItem('token', token);
    }
  } catch (error) {
    console.error('Error al iniciar sesión con Google', error);
  }
};

const loginUserWithUsernameAndPassword = async (username: string, password: string) => {
  try {
    const userRef: Query = query(ref(db, 'users'), orderByChild('username'), equalTo(username));
    const snapshot: DataSnapshot = await get(userRef);
    
    if (snapshot.exists()) {
      const userData = snapshot.val();
      const userKey: string = Object.keys(userData)[0];
      const existingUser = userData[userKey];
      
      if (existingUser) {
        const authUser = await signInWithEmailAndPassword(auth, existingUser.email, password);   

        const token: string = await authUser.user.getIdToken();

        useUserStore.getState().setUser({
          uid: existingUser.id,
          displayName: existingUser.username,
          email: existingUser.email
        }, token);

        localStorage.setItem('token', token);
      } 
    }
  } catch (error) {
    console.error('Error al iniciar sesión', error);
  }
};

export { loginUserWithGoogle, loginUserWithUsernameAndPassword };
