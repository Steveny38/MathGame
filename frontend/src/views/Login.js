import "../styles/login.css"

import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
const Login = () => {
    
    const auth = useContext(AuthContext)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        auth.login(username, password, setError)

    }
    
    return ( 
        <div className="container_login" >
            <h1>Login</h1>
            <form className="form_login" onSubmit={handleSubmit} >
                <div className="input_login">
                    <div className="preimage_login">

                        <img className="icon_login" src={require("../icons/username-icon-png.jpg")} alt="" />
                    </div>

                    <input   placeholder="Username" type="text" value={username}  onChange={(e) =>{setUsername(e.target.value)} } />
                </div>

               <div className="input_login">
                    <div className="preimage_login">
                        <img src={require("../icons/password-icon-png.jpg")} alt="" className="icon_login" />
                    </div>
                    <input placeholder="Password" value={password} type="password" onChange={(e) =>{setPassword(e.target.value)}} />

               </div>

               <Link to="/signup"   className="button_login_2" >Sign up</Link>

                <button  className="button_login"   >Login</button>
            </form>

            {error && <div>{error}</div>}

        </div>
     );
}
 
export default Login;