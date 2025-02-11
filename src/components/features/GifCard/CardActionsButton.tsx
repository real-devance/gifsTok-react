import { ReactNode } from "react";

type CardActionsButtonProps = {
  icon: ReactNode; 
  label: string; 
  onClick: () => void; 
};

function CardActionsButton({ icon, label, onClick }: CardActionsButtonProps) {
  return (
    <button
      aria-label={label}
      title={label} // Tooltip on hover
      type="button"
      onClick={onClick}
      className="icon p-2 rounded-full bg-gray-400 bg-opacity-40 flex items-center justify-center"
    >
      {icon} {/* Renders the provided icon */}
    </button>
  );
}

export default CardActionsButton;
