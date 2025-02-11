import React from 'react';

// Define the props for the SubmitButton component
type SubmitButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  buttonText?: string; 
  className?: string;  
};

// SubmitButton functional component
function SubmitButton({ buttonText = "Submit", className = '', ...props }: SubmitButtonProps) {
  return (
    <button
      type="submit" // Button type is submit for forms
      className={`text-default-inverse font-semibold text-sm md:text-base
        border-none
        bg-default-inverse
        hover:bg-gray-800 dark:hover:bg-gray-200
        p-1 rounded-lg
        ${className}`} 
      {...props} // Spread the remaining props (like onClick, disabled, etc.)
    >
      {buttonText} {/* Display buttonText inside the button */}
    </button>
  );
}

export default SubmitButton;
