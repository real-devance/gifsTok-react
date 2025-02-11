import { GifItem } from "../../../models/models"; // Model of Gif Item
import { collection, doc, setDoc, getDocs, getDoc, deleteDoc, query, where, limit, startAfter } from "firebase/firestore";
import { db } from "../../../config/firebase";



// Adds a GIF to the liked collection if it doesn't already exist
const likeGif = async (gifData: GifItem, userId: string, gifId: string): Promise<void> => {
  const gifRef = doc(db, "gifFavorites", userId, "gifs", gifId);

  try {
    const gifSnapshot = await getDoc(gifRef);
    // If GIF is not already liked, add it
    if (!gifSnapshot.exists()) {
      await setDoc(gifRef, gifData);
      console.log("GIF added to likes");
    } else {
      console.log("GIF already liked");
    }
  } catch (error) {
    console.error("Error liking GIF:", error);
    throw new Error("Error liking the GIF");
  }
};


// Function to remove a liked GIF from the user's collection
const unlikeGif = async (userId: string, gifId: string): Promise<void> => {
  const gifRef = doc(db, "gifFavorites", userId, "gifs", gifId);

  try {
    await deleteDoc(gifRef);
    console.log(`GIF removed from liked GIFs`);
  } catch (error) {
    console.error("Error unliking GIF:", error);
    throw new Error("Error unliking the GIF");
  }
};



// Checks if a specific GIF is liked by the user
const isGifLiked = async (userId: string, gifId: string): Promise<boolean> => {
  const gifRef = doc(db, "gifFavorites", userId, "gifs", gifId);

  try {
    const gifSnap = await getDoc(gifRef);
    return gifSnap.exists(); // Return true if the GIF is liked, else false
  } catch (error) {
    console.error("Error checking liked GIF:", error);
    return false;  // Return false in case of error
  }
};



// Retrieves all liked GIFs for a user, supports pagination with lastDoc
const getUserLikedGifs = async (userId: string, lastDoc: number | null = null): Promise<{ gifs: any[], lastDoc: any }> => {
  if (!userId) return { gifs: [], lastDoc: null }; // Return empty if no userId

  try {
    const gifsRef = collection(db, "gifFavorites", userId, "gifs");
    let q = query(gifsRef, limit(10)); // Default limit to 10 GIFs

    if (lastDoc) {
      q = query(gifsRef, startAfter(lastDoc), limit(10)); // Apply pagination if lastDoc is provided
    }

    const querySnapshot = await getDocs(q);
    const gifs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return {
      gifs, // Return the fetched GIFs
      lastDoc: querySnapshot.docs.length > 0 ? querySnapshot.docs[querySnapshot.docs.length - 1] : null // Return the last document for pagination
    };

  } catch (error) {
    console.error("Error fetching liked GIFs:", error);
    throw new Error("Error fetching liked GIFs.");
  }
};



// Finds which GIFs from a list are already liked by the user
const getLikedGifByIds = async (userId: string, gifIds: string[]): Promise<string[]> => {
  if (gifIds.length === 0) return []; // Return early if no IDs

  try {
    const gifsRef = collection(db, "gifFavorites", userId, "gifs");
    const q = query(gifsRef, where("id", "in", gifIds)); // Fetch all in one query
    const querySnap = await getDocs(q);

    // Extract the liked GIF IDs from the query snapshot
    const likedGifIds = querySnap.docs.map((doc) => doc.id);
    return likedGifIds; // Return the liked GIFs' IDs

  } catch (error) {
    console.error("Error checking liked GIFs:", error);
    throw new Error("Error checking liked GIFs.");
  }
};


export { likeGif, isGifLiked, getUserLikedGifs, unlikeGif, getLikedGifByIds };
