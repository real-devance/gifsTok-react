import { Link } from "react-router";

import { useTheme } from "../hooks/useTheme";

function ErrorPage() {

    useTheme();


    return (
        <div className="min-h-[100dvh] grid place-items-center bg-default">

            <div 
            className="
            w-full max-w-md p-4
            text-center grid gap-4
            rounded-lg">
            <p className="text-default text-2xl">Oops seems you lost 😕</p>
            <Link to="/" className=" max-w-md text-default-inverse bg-default-inverse rounded-md px-2 py-1 w-1/2 mx-auto">Back to Homepage</Link>
            </div>
          
        </div>
    )
}

export default ErrorPage