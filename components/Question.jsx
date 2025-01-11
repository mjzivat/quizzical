import React from "react"
import { nanoid } from "nanoid"
import he from "he"

export default function Question(props) {
    
    // const correct = new Boolean()
    const correctAnswers = props.correctAnswers
    const answerArray = props.answerArray
    const selectedAnswers = props.selectedAnswers
    const quizSubmitted = props.quizSubmitted
    // const correctSelected = props.correctSelected
    const addCorrectSelected = props.addCorrectSelected
    
    const answerEls = answerArray.map(answer => {
        const name = props.id
        const value = he.decode(answer.value)
        const selected = selectedAnswers[name]===value
        const correct = correctAnswers[name]===value
        
        let backgroundColor = '';
        let border = '';
        let fontColor = ''; 
        let opacity = '';
            

        if (quizSubmitted && (correct || selected)) {
            backgroundColor = correct ? '#94D7A2' : '#F8BCBC'
        } else if (selected) {
            backgroundColor = '#D6DBF5'
        } else {
            backgroundColor = '#FFF'
        }
        
        return (
            <div key={answer.id}>
                <input 
                    type="radio"
                    id={answer.id}
                    name={name}
                    value={value}
                    checked={selectedAnswers[name]===value}
                    onChange={props.handleChange}
                />
                <label htmlFor={answer.id} className="radio-label" style={{ backgroundColor, opacity, border }}>{answer.value}</label>
            </div>
        )
    })

    
    return (
        <div className="question-container" key={props.id}>
            <h3>{props.questText}</h3>
            <div className="answer-container">
                {answerEls}
            </div>
            
        </div>
    )
    
}