import { signInWithPopup, createUserWithEmailAndPassword, User, UserCredential } from 'firebase/auth';
import { getDatabase, ref, set, push, ThenableReference } from 'firebase/database';
import { app, auth, googleProvider } from '../firebase.mjs';

const db = getDatabase(app);

const saveUserInDb = async (user: any) => {
  try {
    const newUserRef: ThenableReference = push(ref(db, 'users/'));
    
    await set(newUserRef, {
      username: user.displayName,
      email: user.email,
      id: user.uid
    });
  } catch (error) {
    console.error('Error al guardar el usuario en la base de datos');
  }
};

const registerUserWithgoogle = async () => {
  try {
    const result: UserCredential = await signInWithPopup(auth, googleProvider);
    const user: User = result.user;

    await saveUserInDb(user);
  } catch (error) {
    console.error('Error al iniciar sesión con Google');
  }
};

const registerUserWithPassAndEmail = async (email: string, password: string, username: string) => {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user: User = userCredential.user;

    await saveUserInDb({
      displayName: username,
      email: user.email,
      uid: user.uid
    });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
  }
};

export { registerUserWithgoogle, registerUserWithPassAndEmail };

