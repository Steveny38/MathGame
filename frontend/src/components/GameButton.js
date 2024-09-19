import { useEffect, useRef } from "react";
import '../styles/game.css'

const GameButton = ({setFunction, value, stateVal, nameClass }) => {

    
    
    const buttonRef = useRef(null)
    useEffect(() =>{
        if(value == stateVal){
            buttonRef.current.classList.add("Active")
        } else {
            buttonRef.current.classList.remove("Active")
        }
    },[stateVal])
 

    return ( <div className={nameClass} onClick={() => setFunction(value)} ref={buttonRef} >
        {value}
    </div>  );
}
 
export default GameButton;