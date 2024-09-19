import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/styles.module.css";
import "../styles/navbar.css"

const NavBar = () => {

    const {user, logout} = useContext(AuthContext)
    
    if(user){

    return ( 

    <div className="nav_nav">

        {user&& <> 

                <div className="left_nav">
                    <Link className="link_nav"   to="/" >Home</Link>
                    <Link className="link_nav"  to="/game" >New Game</Link>
                    <Link className="link_nav"  to="/profile" >Profile</Link>
                </div>

                <div className="right_nav">
                    <button className="logout_nav" onClick={logout} >Logout</button>
                    <h2></h2>
                </div>
               
                
                </>
                
                }

        {  !user &&   <><Link to="/login" >Login</Link>
                <Link to="/signup" >Sign Up</Link></>}
            </div>
     );}
    else {
        return(null)
    }
}
 
export default NavBar;