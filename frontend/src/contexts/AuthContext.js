import React, {createContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()

const AuthProvider = (props) =>{
    const nav = useNavigate()
    const [user, setUser] = useState(null)

    useEffect(() =>{
        const user = JSON.parse(localStorage.getItem("user"))
    
        if(user){
            setUser(user.token)
            console.log((user))
        }
    
    }, [] )

    const login = async (username, password, setError) =>{

        try {
            const res = await fetch("/user/login-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({username: username, password:password})
            }) 
    
            const data = await res.json()
            if(res.ok){
                console.log("Success", data)
                localStorage.setItem("user", JSON.stringify(data))
                setUser(data.token)
                nav("/")
                 
            }
            else{
                setError(data.error)
                throw new Error("User does not exist")
            }
        } catch (error) {
            console.log(error)
        }

    }

    const signup = async (username, email, password, setError) => {
        try {
            const res = await fetch("/user/register", {
                method: "POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify({username: username, email:email, password:password})
            })
     

            const data = await res.json()
            
            if(res.ok){
                console.log("Success", data)
                localStorage.setItem("user", JSON.stringify(data))
                setUser(data.token)
                console.log(data.token)
                await fetch("/userStats/setup", {
                    method: "GET",
                    headers:{
                        "Authorization" : `Bearer ${data.token}`,
                        "Content-Type":"application/json"
                    },
                }).then(
                    await fetch("/data/create", {
                        method:"GET",
                        headers:{
                            "Authorization" : `Bearer ${data.token}`,
                            "Content-Type": "application/json",
                        },
                    })


                ).then(nav('/'))

    
            } else {
                setError(JSON.stringify(data))
                throw new Error("test" ,data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const logout = () =>{
        setUser(null)
        localStorage.removeItem("user")
        nav('/login')
        console.log("User logged out")
    }


    
    
    return(
        <AuthContext.Provider value={{user, login, signup, logout}}>
            {props.children}
        </AuthContext.Provider>
    )

}

export default AuthProvider;