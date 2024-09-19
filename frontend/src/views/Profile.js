import { useContext, useEffect, useRef, useState } from "react"
import "../styles/profile.css"
import { AuthContext } from "../contexts/AuthContext"

const Profile = () => {

    const [comp, setComp] = useState(true)
    const [user, setUser] = useState(null)
    const auth = useContext(AuthContext)

    const over = useRef(null)
    const perf = useRef(null)
    
    useEffect(() => {
        fetch("/userStats/get", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${auth.user}`,
                "Content-Type":"application/json"
            }
        }).then((data) => data.json()).then((res) => setUser(res))



    }, [auth.user])

    const handleClick= (value) => {
        setComp(value);
        if(value === true){
            over.current.classList.add("active_")
            perf.current.classList.remove("active_")
        }
        else if (value === false){
            perf.current.classList.add("active_")
            over.current.classList.remove("active_")
        }
    }

    if(!user){
        return(
            <div className="container_home">
             <div className="loader"></div>
            </div>
         )
    }
    if(user){

    console.log(user)

    const renders = [
        {title: "Games Played", value: user.easyGames + user.medGames + user.hardGames, icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNsb2NrIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIvPjxwb2x5bGluZSBwb2ludHM9IjEyIDYgMTIgMTIgMTYgMTQiLz48L3N2Zz4="},
        {title: "Total Points", value: user.points, icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWF3YXJkIj48cGF0aCBkPSJtMTUuNDc3IDEyLjg5IDEuNTE1IDguNTI2YS41LjUgMCAwIDEtLjgxLjQ3bC0zLjU4LTIuNjg3YTEgMSAwIDAgMC0xLjE5NyAwbC0zLjU4NiAyLjY4NmEuNS41IDAgMCAxLS44MS0uNDY5bDEuNTE0LTguNTI2Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSI4IiByPSI2Ii8+PC9zdmc+"},
        {title: "Correct Answers", value: user.numCorrect, icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNpcmNsZS1jaGVjay1iaWciPjxwYXRoIGQ9Ik0yMS44MDEgMTBBMTAgMTAgMCAxIDEgMTcgMy4zMzUiLz48cGF0aCBkPSJtOSAxMSAzIDNMMjIgNCIvPjwvc3ZnPg=="},
        {title: "Incorrect Answers", value: user.numIncorrect, icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNpcmNsZS14Ij48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIvPjxwYXRoIGQ9Im0xNSA5LTYgNiIvPjxwYXRoIGQ9Im05IDkgNiA2Ii8+PC9zdmc+"},
        {title: "Skips Used", value: user.skipsUsed, icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNraXAtZm9yd2FyZCI+PHBvbHlnb24gcG9pbnRzPSI1IDQgMTUgMTIgNSAyMCA1IDQiLz48bGluZSB4MT0iMTkiIHgyPSIxOSIgeTE9IjUiIHkyPSIxOSIvPjwvc3ZnPg=="},
        {title: "Max Streak", value: user.maxStreak, icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWZsYW1lIj48cGF0aCBkPSJNOC41IDE0LjVBMi41IDIuNSAwIDAgMCAxMSAxMmMwLTEuMzgtLjUtMi0xLTMtMS4wNzItMi4xNDMtLjIyNC00LjA1NCAyLTYgLjUgMi41IDIgNC45IDQgNi41IDIgMS42IDMgMy41IDMgNS41YTcgNyAwIDEgMS0xNCAwYzAtMS4xNTMuNDMzLTIuMjk0IDEtM2EyLjUgMi41IDAgMCAwIDIuNSAyLjV6Ii8+PC9zdmc+"},


    ]

    const summary = [
    {title: "Total Games Played:", value: user.easyGames + user.medGames + user.hardGames},
    {title: "Easy Games:", value: user.easyGames},
    {title: "Medium Games:", value: user.medGames},
    {title: "Hard Games:", value: user.hardGames},
    {title: "Correct Answers:", value: user.numCorrect},
    {title: "Incorrect Answers:", value: user.numIncorrect},
    {title: "Accuracy (%):", value: (Math.round((user.numCorrect/(user.numCorrect + user.numIncorrect)) * 1000 )/10)},
    {title: "Average Points per Game:", value:Math.round((user.points/(user.easyGames + user.medGames + user.hardGames)))  }

    ]


    return (
      
        <div className="profile_container">
            <div className="profile_head">
                <div ref={over} onClick={() => handleClick(true)} className="profile_selector active_ ">
                    <div className="profile_text">Overview</div>
                    <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tcmlnaHQiPjxwYXRoIGQ9Im05IDE4IDYtNi02LTYiLz48L3N2Zz4=" alt="" className="profile_carrot" />
                </div>
                <div ref={perf} onClick={() => handleClick(false)} className="profile_selector ">
                    <div className="profile_text">Performance</div>
                    <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tcmlnaHQiPjxwYXRoIGQ9Im05IDE4IDYtNi02LTYiLz48L3N2Zz4=" alt="" className="profile_carrot" />
                </div>
              
            </div>
            <div className="profile_component">
                {comp ?
                
                <div className="profile_overview" >
                    <h1 className="profile_overview_title" >Overview</h1>
                    <div className="profile_info_container">
                        <h2>User Information</h2>

                        <div className="profile_info">
                            <img className="profile_info_icon" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXVzZXIiPjxwYXRoIGQ9Ik0xOSAyMXYtMmE0IDQgMCAwIDAtNC00SDlhNCA0IDAgMCAwLTQgNHYyIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSI3IiByPSI0Ii8+PC9zdmc+" alt="" />
                            <div className="profile_userpass">{user.username}</div>
                        </div>
                        <div className="profile_info">
                            <img className="profile_info_icon" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLW1haWwiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIxNiIgeD0iMiIgeT0iNCIgcng9IjIiLz48cGF0aCBkPSJtMjIgNy04Ljk3IDUuN2ExLjk0IDEuOTQgMCAwIDEtMi4wNiAwTDIgNyIvPjwvc3ZnPg==" alt="" />
                            <div className="profile_userpass">{user.email}</div>
                        </div>

                    </div>
                    
                    {renders.map(function(card){
                        return(
                            <div className="profile_overview_card" key={card.title} >

                                <img className="profile_overview_card_icon" src={card.icon} alt="" />
                                <div className="profile_overview_card_text_container">
                                    <div className="profile_overview_card_title">{card.title}</div>
                                    <div className="profile_overview_card_text">{card.value}</div>
                                </div>
                            </div>
                        )
                    })}

                </div> 
                
                :
                
                <div className="profile_performance" >
                    <div className="profile_performance_title">Performance</div>

                    <div className="profile_performance_container">
                    

                        <div className="profile_summary_content">
                        <div className="profile_summary">
                            Profile Summary
                        </div>
                            {summary.map(function(content){
                                return(
                                    <div key={content.title} className="profile_summary_item">
                                        <div className="profile_sum_title">{content.title}</div>
                                        <div className="profile_sum_value">{content.value}</div>
                                    </div>
                                )
                            })}
                        </div>
                        
                        <div className="profile_sum_recent">
                            
                            {user.recentGame && <div className="profile_recent_game">
                                <div className="profile_recent">Recent Performance</div>

                                <div className="profile_rg">
                                    <div className="profile_rg_title">Operation:</div>
                                    <div className="profile_rg_value">{user.recentGame.operation}</div>
                                </div>
                                <div className="profile_rg">
                                    <div className="profile_rg_title">Difficulty:</div>
                                    <div className="profile_rg_value">{user.recentGame.difficulty}</div>
                                </div>
                                <div className="profile_rg">
                                    <div className="profile_rg_title">Time Limit:</div>
                                    <div className="profile_rg_value">{user.recentGame.time}</div>
                                </div>
                                <div className="profile_rg">
                                    <div className="profile_rg_title">Correct Answers:</div>
                                    <div className="profile_rg_value">{user.recentGame.correct}</div>
                                </div>
                                <div className="profile_rg">
                                    <div className="profile_rg_title">Incorrect Answers:</div>
                                    <div className="profile_rg_value">{user.recentGame.incorrect}</div>
                                </div>
                                <div className="profile_rg">
                                    <div className="profile_rg_title">Skips Used:</div>
                                    <div className="profile_rg_value">{user.recentGame.skips}</div>
                                </div>
                                <div className="profile_rg">
                                    <div className="profile_rg_title">Max Streak:</div>
                                    <div className="profile_rg_value">{user.recentGame.streak}</div>
                                </div>

                                </div>}

                            {!user.recentGame && <div className="profile_recent_game_null" >No Recent Game</div>}

                        </div>

                    </div>
                </div> }
            </div>

        </div>
        
     
    );
    }


}
 
export default Profile;