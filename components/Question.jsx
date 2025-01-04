import React from "react"
import { nanoid } from "nanoid"
import he from "he"

export default function Question(props) {
    
    // const correct = new Boolean()
    const correctAnswers = props.correctAnswers
    const answerArray = props.answerArray
    const selectedAnswers = props.selectedAnswers
    const quizSubmitted = props.quizSubmitted
    
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
        }
        
        return (
            <div key={answer.id} className="answer">
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
    
    
    // console.log(isCorrect)
    // console.log(formData)
    
    return (
        <div key={props.id}>
            <h3>{props.questText}</h3>
            <div className="answer-container">
                {answerEls}
            </div>
            
        </div>
    )
    
}

// <p
                //     id={nanoid()}
                //     // key={answer.id}
                //     className="answer"
                //     onClick={props.selectAnswer}
                // >
                // {answer}
                // </p>
            