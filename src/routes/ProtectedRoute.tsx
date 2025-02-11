import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '../store/authStore'; // Store for user authentication state

type ProtectedRouteProps = {
  children: ReactNode;
  shouldBeLoggedIn: boolean; // true for logged-in routes, false for logged-out routes
};

function ProtectedRoute({ children, shouldBeLoggedIn }: ProtectedRouteProps) {
  const { isLoggedIn: userLoggedIn } = useAuthStore((state) => state.user); 
  const navigate = useNavigate();

  useEffect(() => {
    if (shouldBeLoggedIn && !userLoggedIn) {
      // Redirect to login if the route requires a logged-in user
      navigate('/auth/login');
    } else if (!shouldBeLoggedIn && userLoggedIn) {
      // Redirect to home if the route requires the user to be logged out
      navigate('/');
    }
  }, [shouldBeLoggedIn, userLoggedIn, navigate]);

  if (shouldBeLoggedIn !== userLoggedIn) {
    return null; // Wait for the redirection before rendering the children
  }

  return <>{children}</>; // Show children if the condition is met
}

export default ProtectedRoute;
