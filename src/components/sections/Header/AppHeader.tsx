import { Logo } from "../../ui";
import { ThemeButton, MenuButton } from "../../ui/Buttons";
import { SearchForm } from "../../features/Forms";
import { MAX_QUERY } from "../../../constant";
import { useMediaQuery } from "../../../hooks/useMediqQuery";

type HeaderProps = {
  onSidebarOpen: () => void; 
};

function AppHeader({ onSidebarOpen }: HeaderProps) {
  const isMobile = useMediaQuery(MAX_QUERY); 

  return (
    <header className="px-2 py-2 flex items-center gap-6 justify-between border-b border-zinc-400">
      {/* Logo and Menu Button (for mobile) */}
      <div className="flex gap-2 items-center">
        {isMobile && <MenuButton onClick={onSidebarOpen} />} 
        <Logo /> {/* Display the logo */}
      </div>

      {/* Search Form */}
      <div className="w-full max-w-96">
        <SearchForm /> 
      </div>

      {/* Theme Toggle Button */}
      <ThemeButton />
    </header>
  );
}

export default AppHeader;
