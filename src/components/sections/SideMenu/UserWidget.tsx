import { LogIn, LogOut } from 'lucide-react';
import { Link } from 'react-router';
import { useAuthStore } from '../../../store/authStore';
import { signOut } from "firebase/auth";
import { auth } from "../../../config/firebase";
import toast from 'react-hot-toast';

function UserWidget() {
  const user = useAuthStore((state) => state.user); 

  // Handles user logout
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user from Firebase
      toast.success("Logout successful"); 
    } catch (error) {
      toast.error("Something went wrong"); 
    }
  };

  return (
    <div className="px-4 py-2">
      {user.isLoggedIn ? (
        // If the user is logged in, display their email and a logout button
        <div className="flex justify-between gap-2 py-4">
          <h2 className="text-default">{user.email}</h2> {/* Display the user's email */}
          <button title="Log out" aria-label="logout" onClick={handleLogout}> {/* Logout button */}
            <LogOut className="icon" size={18} />
          </button>
        </div>
      ) : (
        // If the user is not logged in, display login/signup option
        <div className="py-4">
          <Link to="/auth/login" className="flex justify-between items-center">
            <p className="text-default text-sm">Log in / Sign Up</p> {/* Login/signup text */}
            <LogIn className="icon" size={18} /> {/* Login icon */}
          </Link>
        </div>
      )}
    </div>
  );
}

export default UserWidget;
