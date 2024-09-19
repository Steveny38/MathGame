import { useContext, useEffect, useRef,useState } from "react";
import '../styles/game.css'
import GameButton from "../components/GameButton";
import GameEnd from "../components/GameEnd";
import { AuthContext } from "../contexts/AuthContext";

const GamePage = () => {
    console.log("RENDER")

    const auth = useContext(AuthContext)

    const [equation, setEquation] = useState(null)
    const [answer, setAnswer] = useState("")
    const [points, setPoints] = useState(0)
    const [streak, setStreak] = useState(0)
    const [incorrect, setIncorrect] = useState(0)
    const [correct, setCorrect] = useState(0)
    const [difficulty, setDifficulty] = useState("Easy")
    const [operation, setOperation] = useState("Addition")
    const [start, setStart] = useState(false) //false
    const [timer, setTimer] = useState("0:10")
    const [skips, setSkips] = useState(0)
    const [remainTime, setRemainTime] = useState(-1)
    const [isActive, setActive] = useState(false)
    const [finish, setFinish] = useState(false) //false


    const diff = ["Easy", "Medium", "Hard"]

    const ops = ["Addition", "Subtraction", "Multiplication", "Division"]

    const time = ["0:10", "0:30", "1:00"]

    const answer_input = useRef(null)
  
    const formatTime = (secs) => {
        const minutes = Math.floor(secs / 60);
        const seconds = secs % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      };

    useEffect(() => {
        let timerId;
    
        if (isActive && remainTime > 0) {
          timerId = setInterval(() => {
            setRemainTime((prevSeconds) => prevSeconds - 1);
          }, 1000);
        } else if( remainTime === 0){
                gameFinish()
             }
    
       
        return () => clearInterval(timerId);
      }, [isActive, remainTime]);


    const startGame = (e) =>{
        e.preventDefault()
        setStart(true)
        generate(difficulty, operation)
        switch (timer) {
            case "0:10":
                setRemainTime(10)
                break;
            case "0:30":
                setRemainTime(30)
                break;
            case "1:00":
                setRemainTime(60)
                break;
        
            default:
                break;
        }

    }

    const gameFinish = async  () => {
        setEquation(null)
        setFinish(true)

        await fetch("/userStats/gameend", {
            method: "POST",
            headers:{
                'Authorization': `Bearer ${auth.user}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({points:points, streak: streak,correct:correct, incorrect: incorrect, difficulty: difficulty, skips: skips, recentGame: {
                time: timer,
                incorrect: incorrect,
                correct: correct,
                difficulty: difficulty,
                operation: operation,
                skips: skips,
                streak: streak,

            } })
        })

        console.log("Finish")
    }

    const newGame = () => {

        setEquation(null)
        setAnswer("")
        setPoints(0)
        setStreak(0)
        setIncorrect(0)
        setDifficulty("Easy")
        setOperation("Addition")
        setStart(false)
        setTimer("0:10")
        setSkips(0)
        setRemainTime(0)
        setActive(false)
        setFinish(false)
        //Reset states
        console.log("New Game")


    }

    const generate = async (diff, ops) =>{
        const data = await fetch(`/equations/${ops}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                
            },
            body:JSON.stringify({
                difficulty:`${diff}`
            })})
        const res = await data.json()
 
        setEquation(res)


        
    }

    const handleAnswer = () =>{
        if(answer === equation.solution){
            setPoints(points + 10)
            setStreak(streak + 1)
            setCorrect(correct + 1)
            setAnswer("")
            answer_input.current.focus()
            generate(difficulty, operation)
        }else {
            setStreak(0)
            setIncorrect(incorrect+1)
            console.log("Incorrect Answer!")
        }
    }

    const handleKeyDown = (e) =>{
        if(e.key === "Enter"){
            handleAnswer()
        }
    }

    const handleSkip = () => {
        setSkips(skips + 1)
        generate(difficulty, operation)
    }

    
        
        

    

 

    if(!start){
        return ( <>
            <form onSubmit={startGame} className="container_game">
                <div className="difficulty_game">
                    <h2 className="label_game">
                        Difficulty
                    </h2>
                    <div className="difficulty_container_game">

                        {diff.map((rating) => {
                            return(
                                <GameButton  setFunction={setDifficulty}  value = {rating} stateVal={difficulty} nameClass={"difficulty_level_game"} >
                                </GameButton>
                            )
                        })}
    
                    </div>

                </div>
                <div className="timer_game">
                    <h2 className="label_game">Time Limit</h2>
                    <div className="time_container_game">
                        {time.map((times) => {
                            return(<GameButton   value={times} setFunction={setTimer} stateVal={timer} nameClass={"time_level_game"}  ></GameButton>)
                        })}
                    </div>
                </div>

                <div className="operation_game">
                    <h2 className="label_game">
                        Operation
                    </h2>
                    <div className="ops_container_game">
                        
                        {ops.map((rating) => {
                            return(
                                <GameButton  setFunction={setOperation}  value = {rating} stateVal={operation} nameClass={"ops_level_game"} > 
                                </GameButton>
                            )
                        })}
                    </div>


           


                </div>
                <div style={{textAlign:"right"}} >
                    <button className="startButton_game" > Start </button>

                </div>
            </form>
            
        </> );
    } 
    
    if(equation)    {
        return(
            <div className="background">
                <div className="container_start_game">
                    <div className="score_game">Score: {points}</div>
                    
                    <div className="equation_game">
                        {equation.equation}
                    </div>
                        <input onFocus={() => {setActive(true)}} ref={answer_input} onKeyDown={handleKeyDown} value={answer} onChange={(e) => {setAnswer(e.target.value)}} className="answer_game" type="text" />

              

                    <div className="bottom_game">

                        <button onClick={handleAnswer} className="button_game">Solve!</button>

                        <div className="stats_game">
                            <div className="strek_game bot">Streak :🔥🔥🔥</div>
                            <div className="timer_game bot">⏱️ {formatTime(remainTime)}  </div>
                        </div>

                        <button onClick={handleSkip} className="skip_game">
                            Skip This One
                        </button>
                        <div className="footer_game">
                            Solved: {points} | Skipped: {skips} | Incorrect: {incorrect} 
                        </div>
                    </div>

                </div>

            
            </div>
        );
    }
    if(finish){return (<GameEnd score={points} diff={difficulty} time={timer} newGame={newGame} ></GameEnd>);}
    
    else{
        return(
            <div className="container_home">
             <div className="loader"></div>
            </div>
         )
    }

}
 
export default GamePage;