import { TrendingUp, User, Heart } from 'lucide-react';
import MenuItem from './MenuItem';
import UserWidget from './UserWidget';
import Overlay from './Overlay';
import { useAuthStore } from '../../../store/authStore';
import { useMediaQuery } from '../../../hooks/useMediqQuery';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { MAX_QUERY } from '../../../constant';

type SideMenuProps = {
  onClose: () => void; // Function to close the side menu
};

// Predefined menu items
const menuItems = [
  { name: 'Trending', to: 'trending', icon: <TrendingUp size={20} /> },
  { name: 'Liked', to: 'liked', icon: <Heart size={20} /> },
  { name: 'Profile', to: 'auth/profile', icon: <User size={20} /> },
];

function SideMenu({ onClose }: SideMenuProps) {
  const isMobile = useMediaQuery(MAX_QUERY); // Detect if the screen is mobile
  const ref = useClickOutside(onClose); // Close the side menu when clicked outside
  const { isLoggedIn } = useAuthStore((state) => state.user); // Get the user's login status from the auth store

  // Filter menu items based on the user's login status
  const filteredMenuItems = menuItems.filter((item) =>
    isLoggedIn ? true : item.name !== 'Liked' && item.name !== 'Profile'
  );

  return (
    <>
      {isMobile && <Overlay />} {/* Show overlay for mobile screens */}

      <aside
        className={`border-r border-slate-400 w-full max-w-72 grid grid-rows-[1fr_auto] h-full ${isMobile ? 'absolute inset-0 bg-default z-50' : ''
          }`}
        ref={isMobile ? ref : undefined} // Close menu when clicked outside on mobile
      >
        <nav className="px-2 py-4">
          <ul className="space-y-4">
            {filteredMenuItems.map((item) => (
              <li key={item.name}>
                <MenuItem itemName={item.name} icon={item.icon} to={item.to} /> 
              </li>
            ))}
          </ul>
        </nav>

        <UserWidget /> {/* Display user widget for login/logout functionality */}
      </aside>
    </>
  );
}

export default SideMenu;
