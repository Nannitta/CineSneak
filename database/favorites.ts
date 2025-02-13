import { getUserIdByEmail } from 'database/user';
import { app } from '../firebase.mjs';
import { getDatabase, ref, update, get, DatabaseReference, DataSnapshot } from 'firebase/database';
import { Favorite } from '@/types/types';

const db = getDatabase(app);

const addFavorites = async (email: string, favoriteId: number, title: string, img: string, ownType: string) => {
  const userKey: string | undefined = await getUserIdByEmail(email);
  const favoriteRef: DatabaseReference = ref(db, `/users/${userKey}/favorites`);
  
  try {
    const snapshot: DataSnapshot = await get(favoriteRef);
    const existingFavorites = snapshot.exists() ? snapshot.val() : {};

    const newFavorite: Favorite = {
      id: favoriteId,
      title: title,
      img: img,
      type: ownType
    };

    const newKey: string = favoriteId.toString();
    const updatedFavorites = {
      ...existingFavorites,
      [newKey]: newFavorite
    };

    const updates: any = {};
    updates[`/users/${userKey}/favorites`] = updatedFavorites;

    return update(ref(db), updates);
  } catch (error) {
    console.error('Error al actualizar los favoritos:', error);
  }
};

const getFavoritesMovies = async (email: string) => {
  const userKey: string | undefined = await getUserIdByEmail(email);
  const favoriteRef: DatabaseReference = ref(db, `/users/${userKey}/favorites`);

  try {
    const snapshot: DataSnapshot = await get(favoriteRef);
    const existingFavorites = snapshot.exists() ? snapshot.val() : {};
   
    return existingFavorites;
  } catch (error) { 
    console.error('Error al obetener los favoritos:', error);
  }

};

const deleteFavorites = async (id: number) => {

};

export { addFavorites, getFavoritesMovies };