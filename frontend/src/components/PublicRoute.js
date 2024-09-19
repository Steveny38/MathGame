import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import {Outlet, Navigate} from 'react-router-dom'

const PublicRoute = ({children, ...rest}) => {
    
    const {user} = useContext(AuthContext)
    
    return ( 
      
        !user? <Outlet></Outlet> : <Navigate to="/" ></Navigate>

     );
}
 
export default PublicRoute;