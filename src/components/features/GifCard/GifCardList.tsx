import { GifItem } from "../../../models/models"
import GifCard from "./GifCard"
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../../store/authStore";
import { getLikedGifByIds } from "../../../services/firebase/firestore/gifFavorites";


type GifCardListProps = {
    gifsList: GifItem[], // The list of GIFs to display
}


function GifCardList({ gifsList }: GifCardListProps) {

  const user = useAuthStore((state) => state.user) 

  // Fetch liked GIFs from the database using React Query
  const { data } = useQuery({
    queryKey: ['gifLiked', gifsList.map(gif => gif.id)], // Unique query key based on gif IDs
    queryFn: () => {
      if (!user?.uid || gifsList.length === 0) return; 
      return getLikedGifByIds(user.uid, gifsList.map(gif => gif.id)); 
    },
    enabled: !!user?.uid && gifsList.length > 0, 
    refetchOnWindowFocus: false, 
  });

  // Convert the liked GIFs data into an object for easier lookup
  const likedGifs = data?.reduce((acc, curr) => {
    acc[curr] = true;
    return acc;
  }, {} as { [key: string]: boolean }) || {};


  // Display a message when there are no GIFs available
  if (gifsList.length <= 0) {
    return (
      <h1 className="text-center text-2xl text-default">Sorry No Gifs available 🙁</h1>
    )
  }

  return (
    <div className="w-full snap-y grid gap-5">
      {gifsList.map((gif: GifItem) => (
        <GifCard
          key={`${gif.id}-${Boolean(likedGifs[gif.id])}`} // Use gif id and liked status as key
          id={gif.id}
          media_formats={gif.media_formats}
          content_description={gif.content_description}
          isLiked={Boolean(likedGifs[gif.id])} 
        />
      ))}
    </div>
  )
}

export default GifCardList;
