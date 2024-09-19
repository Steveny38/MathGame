import {Outlet, Navigate} from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';

const ProtectedRoute = ({children, ...rest}) => {

    const auth = useContext(AuthContext)
    return ( 

        auth.user? <Outlet></Outlet> : <Navigate to="/login" ></Navigate>

     );
}
 
export default ProtectedRoute;