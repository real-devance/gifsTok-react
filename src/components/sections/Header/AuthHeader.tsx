import { Logo } from "../../ui";
import { ThemeButton } from "../../ui/Buttons";

function AuthHeader() {
  return (
    <header className="px-2 py-2 md:py-4 flex items-center justify-between gap-2 border-b border-zinc-400">
      {/* Logo */}
      <Logo /> 

      {/* Theme Toggle Button */}
      <ThemeButton /> 
    </header>
  );
}

export default AuthHeader;
