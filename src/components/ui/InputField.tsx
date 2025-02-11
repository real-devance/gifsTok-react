import React, { forwardRef, useId } from "react";

// Define the props for the InputField component
type InputFieldProps = React.ComponentProps<"input"> & {
  label?: string; 
  labelClassName?: string; 
  placeholder?: string; 
  className?: string; 
};

// Create the InputField component using forwardRef
const InputField = forwardRef<HTMLInputElement, InputFieldProps>((
  {
    label, // Label for the input
    type = "text", // Default type is "text"
    placeholder = "Enter text", // Default placeholder text
    className = "", // Default className for additional styling
    labelClassName = "", // Default label className
    ...props // Other props passed to the input
  },
  ref // Ref passed to the input element
) => {

  const inputId = useId(); // Generate a unique id for input and label association

  return (
    <>
      {label && (
        // Conditionally render the label if it's provided
        <label
          htmlFor={inputId}  // Associate the label with the input using the unique id
          className={`text-sm font-medium text-default ${labelClassName}`} // Label styling with optional custom class
        >
          {label} {/* Display the label text */}
        </label>
      )}

      <input
        ref={ref} // Forward the ref to the input element
        id={inputId} // Use the generated unique id for the input
        type={type} // Input type, default is "text"
        placeholder={placeholder} // Placeholder text for the input
        className={`px-2 py-1 
          border-default
          bg-default
          placeholder-gray-500
          placeholder:tracking-widest
          rounded-md
          text-default
          text-sm md:text-base
          ${className}`} 
        {...props} // Pass down any other props to the input
      />
    </>
  );
});

export default InputField;
