import { Link } from "react-router"; 

type MenuItemProps = {
  to: string;            
  itemName: string;      
  icon: React.ReactNode; 
};

function MenuItem({ itemName, icon, to }: MenuItemProps) {
  return (
    <Link
      to={`/${to}`} // Links to the specified 'to' path
      className="text-default flex items-center gap-2 p-1 rounded-md hover:bg-gray-300 hover:text-gray-700"
    >
      {icon} {itemName} {/* Display icon and item name side by side */}
    </Link>
  );
}

export default MenuItem;
