import { getUserIdByEmail } from 'database/user';
import { app } from '../firebase.mjs';
import { getDatabase, ref, update, get, DatabaseReference, DataSnapshot, remove } from 'firebase/database';
import { Favorite, Favorites } from '@/types/types';

const db = getDatabase(app);

const addFavorites = async (email: string, favoriteId: number, title: string, img: string, type: string) => {
  const userKey: string | undefined = await getUserIdByEmail(email);  
  const favoriteRef: DatabaseReference = ref(db, `/users/${userKey}/favorites`);
  
  try {
    const snapshot: DataSnapshot = await get(favoriteRef);
    const existingFavorites = snapshot.exists() ? snapshot.val() : {};

    const newFavorite: Favorite = {
      id: favoriteId,
      title: title,
      img: img,
      type: type
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

const getFavorites = async (email: string): Promise<Favorite[]> => {
  const userKey: string | undefined = await getUserIdByEmail(email);
  const favoriteRef: DatabaseReference = ref(db, `/users/${userKey}/favorites`);

  try {
    const snapshot: DataSnapshot = await get(favoriteRef);
    const existingFavorites: Favorites = snapshot.exists() ? snapshot.val() : {};    

    const favoriteEntries: Favorite[] = Object.entries(existingFavorites).map((media) => {
      const entries: Favorite = media[1];
      
      return entries;
    });
    
    return favoriteEntries;
  } catch (error) { 
    console.error('Error al obetener los favoritos:', error);
    return [];
  }
};

const deleteFavorites = async (email: string, id: number) => {
  const userKey: string | undefined = await getUserIdByEmail(email);
  const favoriteRef: DatabaseReference = ref(db, `/users/${userKey}/favorites/${id}`);

  try {
    const snapshot: DataSnapshot = await get(favoriteRef);
    if (snapshot.exists()) {
      await remove(favoriteRef);
    }
  } catch (error) {
    console.error('Error al eliminar de favoritos:', error);
  }
};

export { addFavorites, getFavorites, deleteFavorites };