type ErrorMessageProps = {
  message: string; // Error message to display
  classname?: string; 
};

function ErrorMessage({ message = "", classname }: ErrorMessageProps) {
  return (
    <p className={`text-red-500 text-xs italic ${classname}`}>
      {message} {/* Render the error message */}
    </p>
  );
}

export default ErrorMessage;
