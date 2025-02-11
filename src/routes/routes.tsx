import { createBrowserRouter } from "react-router";
import { GifFeedPage } from "../layout/app/pages";
import ErrorPage from "../layout/ErrorPage";

import AuthLayout from "../layout/auth/AuthLayout";
import AppLayout from "../layout/app/AppLayout";

import ProtectedRoute from "./ProtectedRoute";
import { LoadingSpinner } from "../components/ui";
import { lazy, Suspense } from "react";

// Lazy loading components for authentication and pages
const LoginPage = lazy(() => import("../layout/auth/pages").then(module => ({ default: module.LoginPage })));
const ProfilePage = lazy(() => import("../layout/auth/pages").then(module => ({ default: module.ProfilePage })));
const SignUpPage = lazy(() => import("../layout/auth/pages").then(module => ({ default: module.SignUpPage })));
const LikedGifPage = lazy(() => import("../layout/app/pages").then(module => ({ default: module.LikedGifPage })));


// Create a browser router with route configurations
export const router = createBrowserRouter([
  {
    path: "/", // Main route
    element: <AppLayout />, // Layout for the app
    children: [
      {
        index: true, // Default route for the home page
        element: <GifFeedPage />, // Main feed page
      },
      {
        path: "search", // Search route
        element: <GifFeedPage />, // Search results page
      },
      {
        path: "liked", // Liked GIFs route
        element: (
          // ProtectedRoute ensures only logged-in users can access this page
          <ProtectedRoute shouldBeLoggedIn={true}>
            <Suspense fallback={<div className="self-center mx-auto"><LoadingSpinner/></div>}>
              <LikedGifPage /> {/* Lazy-loaded LikedGifPage */}
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "trending", // Trending GIFs route
        element: <GifFeedPage />, // Trending page
      },
    ],
    errorElement: <ErrorPage />, // Error handling page if route fails
  },
  {
    path: "/auth", // Auth routes
    element: <AuthLayout />, // Layout for authentication pages
    children: [
      {
        path: "login", // Login route
        element: (
          // ProtectedRoute ensures that logged-in users can't access login page
          <ProtectedRoute shouldBeLoggedIn={false}>
            <Suspense fallback={<div className="self-center mx-auto"><LoadingSpinner/></div>}>
              <LoginPage /> {/* Lazy-loaded LoginPage */}
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "signup", // Sign-up route
        element: (
          <ProtectedRoute shouldBeLoggedIn={false}> {/* Prevents logged-in users from accessing */}
            <Suspense fallback={<div className="self-center mx-auto"><LoadingSpinner/></div>}>
              <SignUpPage /> {/* Lazy-loaded SignUpPage */}
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: "profile", // Profile route for the logged-in user
        element: (
          // ProtectedRoute ensures only logged-in users can access the profile page
          <ProtectedRoute shouldBeLoggedIn={true}>
            <Suspense fallback={<div className="self-center mx-auto"><LoadingSpinner/></div>}>
              <ProfilePage /> {/* Lazy-loaded ProfilePage */}
            </Suspense>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
