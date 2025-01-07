import React from "react"

export default function Start(props) {
    return (
        <div className="start">
            <h1>Quizzical!</h1>
            <button onClick={props.beginGame}>New Game</button>
        </div>
    )
}