import { Link } from "react-router";

function Logo() {
  return (
    <Link
      to="/" // Redirect to the homepage when the logo is clicked
      className="text-xl sm:text-2xl md:text-3xl text-default font-bold" 
    >
      GifsTok
    </Link>
  );
}

export default Logo;
