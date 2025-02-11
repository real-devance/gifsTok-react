import { useEffect, useRef } from 'react';

// Custom hook to detect clicks outside a specified element
export const useClickOutside = <T extends HTMLElement>(callback: () => void) => {
  const ref = useRef<T | null>(null); // Initialize the ref with null

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      // Check if the click is outside the referenced element
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback(); // Trigger callback if click is outside
      }
    };

    // Attach event listeners for mouse and touch events
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [callback]);

  return ref; // Return the ref to be attached to an element
};
