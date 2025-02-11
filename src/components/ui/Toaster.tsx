import { Toaster } from 'react-hot-toast';
import { useThemeStore } from '../../store/themeStore';

function Toast() {
  const theme = useThemeStore((state) => state.theme); // Get the current theme from the Zustand store

  return (
    <Toaster
      toastOptions={{
        style: {
          // Set background color based on the current theme
          background: theme === 'light' ? 'black' : 'white',
          // Set text color based on the current theme
          color: theme === 'light' ? 'white' : 'black',
          padding: '4px 8px', // Padding for the toast
          fontSize: '1rem', // Font size of the toast message
        },
      }}
    />
  );
}

export default Toast;
