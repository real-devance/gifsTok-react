import {LoadingSpinner} from "../../ui";
import GifCardList from "../../features/GifCard/GifCardList";
import GifError from "./GifError";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../../store/authStore";
import { getUserLikedGifs } from "../../../services/firebase/firestore/gifFavorites";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

function LikedGifFeed() {

  const user = useAuthStore((state) => state.user);
  const { ref, inView } = useInView();

  const { data, isLoading, isError, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["likedGifs", user.uid],
    queryFn: ({ pageParam = null }) => getUserLikedGifs(user.uid, pageParam),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage?.lastDoc ?? null,
    refetchOnWindowFocus: false,
    maxPages: 3
  });

  const GIFS = data?.pages?.flatMap((page) => page.gifs) || [];

  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if (!user) return <GifError message="Please log in to view liked GIFs" />;
  if (isError) return <GifError message="Error fetching liked GIFs 🙁" />;
  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <GifCardList gifsList={GIFS} />
      <div ref={ref}></div>
      {isFetchingNextPage && <div className="grid justify-center"><LoadingSpinner /></div>}
    </>
  );
}

export default LikedGifFeed;
