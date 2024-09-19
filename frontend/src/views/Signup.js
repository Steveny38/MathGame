import "../styles/login.css"

import { useContext, useState } from "react";

import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const auth = useContext(AuthContext)
    
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")

    

    const handleSubmit = async (e) =>{

        e.preventDefault()
        
        auth.signup(username, email, password, setError)
        

    }
    
    return ( 

        <div className="container_login">
            <h1>Signup</h1>

            <form className="form_login" onSubmit={handleSubmit} > 
                <div className="input_login">
                    <div className="preimage_login">
                        <img className="icon_login" src={require("../icons/username-icon-png.jpg")} alt="" />
                    </div>
                    <input placeholder="Username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}  />
                </div>
            

                <div className="input_login">
                    <div className="preimage_login">
                        <img className="icon_login" src={require("../icons/email-icon.png")} alt="" />
                    </div>
                    <input placeholder="Email" type="text" value={email} onChange={(e) => setEmail(e.target.value)}  />
                </div>


                <div className="input_login">
                    <div className="preimage_login">
                        <img className="icon_login" src={require("../icons/password-icon-png.jpg")} alt="" />
                    </div>
                    <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}  />
                </div>
        

                <button className="button_login_2" >Sign Up</button>

            </form>

            {error && <div>{error}</div>}

        </div>

     );
}
 
export default Signup;