import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../../hooks/useTheme';

// ThemeButton component to toggle between light and dark modes
function ThemeButton() {

  const { theme, toggleTheme } = useTheme(); // Access theme state and toggle function

  return (
    <button
      aria-label={theme === 'dark' ? "Switch to Light Theme" : "Switch to Dark Theme"} // Dynamically update the aria-label based on the current theme
      title={theme === 'dark' ? "Switch to Light Theme" : "Switch to Dark Theme"} // Tooltip to show on hover
      type="button" 
      className="p-2
       hover:bg-gray-200
       dark:hover:bg-gray-400
        rounded-md" 
      onClick={toggleTheme} // Trigger the toggleTheme function when button is clicked
    >
      {theme === 'dark' ? 
        <Sun className="icon" size={22}/> 
        : 
        <Moon className="icon" size={22}/>} 
    </button>
  );
}

export default ThemeButton;
