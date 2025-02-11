import { GifItem } from "../../../models/models";
import CardActionBar from "./CardActionBar";
import toast from "react-hot-toast";
import { useState } from "react";
import { useAuthStore } from "../../../store/authStore";
import { likeGif, isGifLiked, unlikeGif } from "../../../services/firebase/firestore/gifFavorites";
import { downloadGif } from "../../../utils/downloadGif";
import useCopyToClipboard from "../../../hooks/useCopyToClipboard";

type GifCardProps = GifItem & {
  isLiked: boolean; 
};

function GifCard({ id, content_description, media_formats, isLiked }: GifCardProps) {
  const [liked, setLiked] = useState(isLiked); 
  const user = useAuthStore((state) => state.user); 
  const { copyToClipboard } = useCopyToClipboard(); 

  // Handles liking or unliking a GIF
  const handleLike = async () => {
    if (!user?.uid) {
      toast.error("Please log in to like GIFs"); // Show error if the user is not logged in
      return;
    }

    try {
      const isAlreadyLiked = await isGifLiked(user.uid, id); // Check if the GIF is already liked

      if (isAlreadyLiked) {
        await unlikeGif(user.uid, id); // Remove from likes if already liked
        setLiked(false); // Update the like state
        toast.success("GIF removed from your likes"); // Show success message
      } else {
        await likeGif({ id, content_description, media_formats }, user.uid, id); // Add to likes if not liked
        setLiked(true); // Update the like state
        toast.success("GIF added to your likes"); // Show success message
      }
    } catch (error) {
      toast.error("An error occurred. Please try again"); 
    }
  };

  // Handles sharing a GIF link
  const handleShare = async () => {
    try {
      if (!media_formats?.gif?.url) {
        toast.error("No shareable link available"); // Show error if there's no shareable link
        return;
      }

      const copied = await copyToClipboard(media_formats.gif.url); 
      copied ? toast.success("GIF link copied to clipboard!") : toast.error("Failed to copy GIF link"); 
    } catch (error) {
      toast.error("An error occurred while copying the link."); 
    }
  };

  // Handles downloading a GIF
  const handleDownload = async () => {
    try {
      if (!media_formats?.gif?.url) {
        toast.error("No downloadable GIF available."); // Show error if no downloadable link
        return;
      }

      await downloadGif(media_formats.gif.url, `${content_description || "gif"}.gif`); // Download the GIF
      toast.success("GIF downloaded successfully!"); // Show success message
    } catch (error) {
      toast.error("Failed to download GIF. Please try again"); // Show error message in case of failure
    }
  };


  return (
    <div
      className="w-full h-[20rem] max-w-md border-default mx-auto 
      flex justify-center bg-gray-100 dark:bg-gray-600 bg-opacity-20 
      dark:bg-opacity-20 rounded-lg relative"
    >
      {/* Ensure GIF URL exists before rendering */}
      {media_formats?.tinywebm?.url ? (
        <video autoPlay loop muted playsInline
        id={id}
        className="h-auto w-auto">
        <source src={media_formats.tinywebm.url} type="video/webm" /> 
        <p className="text-center text-gray-500">{content_description} || "GIF"</p>
        </video>
      ) : (
        <p className="text-center text-gray-500">GIF not available</p> // Show a placeholder if the GIF is not available
      )}

      {/* Action buttons for Like, Share, Download */}
      <div className="absolute right-2 bottom-8">
        <CardActionBar isLiked={liked} onLike={handleLike} onShare={handleShare} onDownload={handleDownload} />
      </div>
    </div>
  );
}

export default GifCard;
