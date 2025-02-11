import { Menu } from 'lucide-react';

type MenuButtonProps = {
  onClick: () => void; 
};

function MenuButton({ onClick }: MenuButtonProps) {
  return (
    <button 
    aria-label="menu"
    type="button" 
    title='menu' 
    onClick={onClick}>
        <Menu className="icon" size={20} />
    </button>
  );
}

export default MenuButton;
