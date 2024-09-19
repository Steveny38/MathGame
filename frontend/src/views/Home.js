import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
// import "../styles/styles.css"
import "../styles/home.css"
import { useNavigate } from "react-router-dom";
const Home = () => {
     
    const [load, setLoad] = useState(true)
    const {userInfo} = useContext(UserContext)
     
    const nav = useNavigate()
    setTimeout(() => {
       setLoad(false)
    }, 1000);
    
    if(!userInfo ||load ){
        return(
            <div className="container_home">
             <div className="loader"></div>
            </div>
         )
    }
    
    return ( <div className="home_home">
        <h1 className="title_home">Welcome {userInfo.username}</h1>
        
        <div className="options_container_home">
            <div onClick={() => {
                nav("/game")
            }} className="options_home">
                <h2 className="options_title_home">Daily Challenge</h2>
                <p className="description_home">New brain teaser daily</p>
            </div>
            <div onClick={() => {
                nav("/game")
            }} className="options_home">
                <h2 className="options_title_home">Quick Play</h2>
                <p className="description_home">10 questions 10 seconds</p>
            </div>
            <div onClick={() => {
                nav("/game")
            }} className="options_home">
                <h2 className="options_title_home">Choose your level</h2>
                <p className="description_home">Easy - Hard</p>
            </div>
            <div className="options_home">
                <h2 className="options_title_home">Top Minds</h2>
                {/* <p className="description_home">       <li>👑 Alex - 1250 pts</li>
                        <li>🥈 Sam - 1100 pts</li>
                        <li>🥉 You - 950 pts</li></p> */}
            </div>


        </div>


    </div> );
}
 
export default Home;