import { Outlet } from "react-router"

import AuthHeader from "../../components/sections/Header/AuthHeader"

import Toast from "../../components/ui/Toaster"


function AuthLayout() {

  return (
    <div className={`h-[100dvh] grid grid-rows-[auto_1fr] overflow-auto bg-default`}>

    <AuthHeader />
    
    <main className={`flex relative px-4`}>
        <Outlet />
    </main>

    <Toast/>

    
    </div>
  )
}

export default AuthLayout;