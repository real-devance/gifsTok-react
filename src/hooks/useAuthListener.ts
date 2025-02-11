import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useAuthStore } from "../store/authStore";
import { auth } from "../config/firebase";

const useAuthListener = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          isLoggedIn: true,
          email: user.email || "",
          uid: user.uid,
        });
      } else {
        clearUser();
      }
    });

    return unsubscribe; // Cleanup listener on unmount
  }, []); // No dependencies needed

};

export default useAuthListener;
