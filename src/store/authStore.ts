import { create } from "zustand";

type User = {
  isLoggedIn: boolean;
  email: string;
  uid: string;
};

type AuthStore = {
  user: User;
  setUser: (user: User) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: {
    isLoggedIn: false,
    email: "",
    uid: ""
  },

  // Set user state when logged in
  setUser: (user) =>
    set({
      user: {
        isLoggedIn: true,
        email: user.email,
        uid: user.uid,
      },
    }),

  // Clear user state when logged out
  clearUser: () =>
    set({
      user: {
        isLoggedIn: false,
        email: "",
        uid: ""
      },
    }),
}));
