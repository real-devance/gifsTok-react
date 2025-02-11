import AppHeader from "../../components/sections/Header/AppHeader";
import SideMenu from "../../components/sections/SideMenu";
import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import { useMediaQuery } from "../../hooks/useMediqQuery";
import { MAX_QUERY } from "../../constant";
import Toast from "../../components/ui/Toaster";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

// Initialize QueryClient for React Query state management
const queryClient = new QueryClient();

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false); 
  const isMobile = useMediaQuery(MAX_QUERY); 

  // Handle sidebar toggle on mobile screens: Close if mobile, open if desktop
  useEffect(() => {
    setSidebarOpen(!isMobile); 
  }, [isMobile]);

  return (
    <QueryClientProvider client={queryClient}> 
      <div className="min-h-dvh max-h-dvh grid grid-rows-[auto_1fr] overflow-hidden bg-default">

        {/* Header with button to toggle sidebar visibility */}
        <AppHeader onSidebarOpen={() => setSidebarOpen(!sidebarOpen)} />

        <main className={`flex ${isMobile && "relative"} flex-row overflow-auto`}>
          {/* Render sidebar if it's open and the screen is not mobile */}
          {sidebarOpen && <SideMenu onClose={() => setSidebarOpen(!sidebarOpen)} />}

          {/* Render the nested routes from the outlet */}
          <Outlet />
        </main>
      
        {/* Display toast notifications */}
        <Toast />
      </div>
    </QueryClientProvider>
  );
}

export default AppLayout;
