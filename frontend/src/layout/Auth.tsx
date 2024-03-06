import { useLocation } from "react-router-dom"
import Quote from "../components/Quote"
import Signin from "../components/Signin"
import Signup from "../components/Signup";

const Auth = () => {
    const { pathname }  = useLocation();
    
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  h-screen">
    <div className="flex items-center justify-center">
     {pathname === "/" ? <Signin /> : <Signup /> } 
    </div>
    <div className="hidden md:block">
      <Quote />
    </div>
  </div>
  )
}

export default Auth