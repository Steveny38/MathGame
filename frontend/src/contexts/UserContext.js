import { createContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useState } from "react";
import { useContext } from "react";


export const UserContext = createContext()

const UserProvider = (props) =>{


    const {user} = useContext(AuthContext)

    const [userInfo, setUserInfo] = useState(null)
    

    useEffect(() =>{
             
            fetch("/data/", {
                method:"GET",
                headers: {
                    'Authorization': `Bearer ${user}`,
                    'Content-Type': 'application/json'
                }
            }).then((data) => data.json()).then((res) => {
                console.log(user)
                console.log(res)    
                setUserInfo(res)})

          


           
        }, [user])
    
    


    return(
        <UserContext.Provider value={{userInfo}}>
            {props.children}
        </UserContext.Provider>
    )
}



export default UserProvider