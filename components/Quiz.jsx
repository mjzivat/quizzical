import React from "react"
import Question from "./Question"
import he from "he"
import { nanoid } from "nanoid"

export default function Quiz() {
    const [trivia, setTrivia] = React.useState([])
    const [formData, setFormData] = React.useState({})
    const [correctAnswers, setCorrectAnswers] = React.useState({})
    const [quizSubmitted, setQuizSubmitted] = React.useState(false)
    
    React.useEffect(()=> {
        fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
            .then(res => res.json())
            .then(data => {
                let allTrivia = data.results
                allTrivia = allTrivia.map(triv => {
                    const id = nanoid()
                    const question = he.decode(triv.question)
                    const correctAnswer = he.decode(triv.correct_answer)
                    const incorrectAnswers = triv.incorrect_answers.map(he.decode)

                    let allAnswers = incorrectAnswers.toSpliced((incorrectAnswers.length+1) * Math.random() | 0, 0, correctAnswer)
                    
                    return {
                        // ...triv, 
                        id: id,
                        question: question,
                        allAnswers: allAnswers,
                        correctAnswer: correctAnswer,
                    }
                })
                setTrivia(allTrivia)
                
                let trivFormData = {} 
                const trivFormDataArray = allTrivia.map(data => {
                    const dataName = data.id
                    return {
                            [dataName]: "",
                        }
                    })
                trivFormData = Object.assign(trivFormData, ...trivFormDataArray)
                setFormData(trivFormData)
                
                let correctAnswerObj = {}
                const correctAnswerArray = allTrivia.map(data => {
                    return {
                        [data.id] : data.correctAnswer
                    }
                })
                correctAnswerObj = Object.assign(correctAnswerObj, ...correctAnswerArray)
                setCorrectAnswers(correctAnswerObj)
            })
    }, [])
    
    
    function handleChange(event) {
        const { name, value, checked, correct } = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
            
        })
    }
    
    function handleSubmit(event) {
        event.preventDefault()
        setQuizSubmitted(true)
    }
    
    const questionEls = trivia.map(item => {
        const allAnswers = item.allAnswers
        const answerArray = allAnswers.map(answer => {
                    const id = nanoid()
                    return { 
                    id: id,
                    value: answer,
                    isCorrect: answer===item.correctAnswer ? "true" : undefined,
                    }
                })
                
        
        return (
            <Question
                key={item.id}
                id={item.id}
                questText={item.question}
                answerArray={answerArray}
                handleChange={handleChange}
                correctAnswers={correctAnswers}
                selectedAnswers={formData}
                quizSubmitted={quizSubmitted}
            />
        )
    })

    
    return (
        <form onSubmit={handleSubmit}>
            {questionEls}
            <button>Check Answers</button>
        </form>
        
        
    )
}
