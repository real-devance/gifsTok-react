import { useState, useEffect } from 'react';

// Custom hook to check if a media query matches
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false); // Track if the query matches

  useEffect(() => {
    const media = window.matchMedia(query); // Create a media query match object
    const updateMatch = () => setMatches(media.matches); // Update the match status

    updateMatch(); // Check initial match status
    media.addEventListener('change', updateMatch); // Listen for changes to match status

    // Cleanup event listener on unmount
    return () => {
      media.removeEventListener('change', updateMatch);
    };
  }, [query]); // Re-run effect if query changes

  return matches; 
};
