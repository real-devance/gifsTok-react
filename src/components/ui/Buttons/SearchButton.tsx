import { Search } from "lucide-react"

type SearchButtonProps = React.ComponentProps<'button'> & {
    className?: string;
};

function SearchButton({className = ''}: SearchButtonProps) {
  return (
    <button 
    type="submit"
    className={`bg-default-inverse ${className}`}>
        <Search className="icon-inverse" size={20}/>
    </button>
  )
}

export default SearchButton