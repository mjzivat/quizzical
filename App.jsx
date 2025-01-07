import React from "react"
import he from "he"
import { nanoid } from "nanoid"
import Start from "./components/Start"
import Quiz from "./components/Quiz"

export default function App() {
    const [game, setGame] = React.useState(false)

    function beginGame() {
        setGame(prevGame => !prevGame)
    }
    
    return (
        <main>
            {game && <Quiz />}
            {!game && <Start
                beginGame = {beginGame}
            />}
        </main>
        
    )
}