import GifCardList from "../../features/GifCard/GifCardList";
import {LoadingSpinner} from "../../ui";
import GifError from "./GifError";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { getTrendingGifs, getSearchGifs } from "../../../services/apis/tenor/tenor";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

function GifFeed() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query") || "";

  const { data, isLoading, isError, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [searchQuery ? `searchGifs-${searchQuery}` : "trendingGifs"],
    queryFn: ({ pageParam = "" }) => {
      return searchQuery ? getSearchGifs(searchQuery, pageParam) : getTrendingGifs(pageParam);
    },
    initialPageParam: "",
    getNextPageParam: (lastPage) => lastPage?.next ?? "",
    refetchOnWindowFocus: false,
    maxPages: 3
  });

  const GIFS = data?.pages?.flatMap((page) => page.results) || [];

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  if (isLoading) return <div className="grid justify-center"><LoadingSpinner /></div>;

  if (isError) return <GifError message="Error fetching liked GIFs 🙁" />;

  return (
    <>
      <GifCardList gifsList={GIFS} />
      <div ref={ref}></div>
      {isFetchingNextPage && <div className="grid justify-center"><LoadingSpinner /></div>}
    </>
  );
}

export default GifFeed;
