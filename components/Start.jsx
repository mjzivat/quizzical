import React from "react"

export default function Start(props) {
    return (
        <div className="start">
            <h1>Quizzical</h1>
            <button onClick={props.toggleGame}>Start Quiz</button>
        </div>
    )
}