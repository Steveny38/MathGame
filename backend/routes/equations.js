const express = require("express")
const nerdamer = require("nerdamer")

const router = express.Router()


function numGen(max , times, random){
    const numbers = []

    if(random){
        x = Math.random() * (times - 3)

        count = Math.floor(x + 3)
    } else { count = times}



    for(let i = 0; i< count; i++) {
        numbers.push(Math.floor(Math.random() * max ))
    }
    return numbers

}

router.get("/test", (req, res) =>{

    res.send({"message": "TEST"})

})

router.post("/addition", (req, res) => {

    const difficulty = req.body.difficulty
    let expression = []
    switch (difficulty) {
      
        case "Easy":
            numbers = numGen(11, 2)
            res.status(200).send(
                { "equation": `${numbers[0]} + ${numbers[1]}`,
                  "numbers": numbers,
                  "solution": nerdamer(numbers[0]).add(numbers[1]).toString()
                }
            )
            break;

        case "Medium":
            numbers = numGen(51, 4, true)
            
            expression = numbers.join("+")
            res.status(200).send({
                equation: expression,
                numbers: numbers,
                solution: nerdamer(expression).evaluate().toString()
            })

            break;

        case "Hard":
            numbers = numGen(101, 5, true)
            expression = numbers.join("+")
            res.status(200).send({
                equation: expression,
                numbers,
                solution: nerdamer(expression).evaluate().toString()
            })
    
        default:
            break;
    }


    


})

router.post("/subtraction", (req, res) =>{

    difficulty = req.body.difficulty
    
    switch(difficulty) {

        case "Easy":
            numbers = numGen(11, 2)
            expression = numbers.join("-")

            res.status(200).send(
                {equation: expression,
                numbers : numbers,
                solution: nerdamer(expression).evaluate().toString()
            })
            break;
        case "Medium":
            numbers = numGen(51, 4, true)
            expression = numbers.join("-")

            res.status(200).send(
                {equation: expression,
                numbers : numbers,
                solution: nerdamer(expression).evaluate().toString()
            })
            break;        

        case "Hard":
            numbers = numGen(101, 5, true)
            expression = numbers.join("-")

            res.status(200).send(
                {equation: expression,
                numbers : numbers,
                solution: nerdamer(expression).evaluate().toString()
            })
            break;



    }

})
 


module.exports = router;