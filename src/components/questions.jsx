import React from "react";
import he from "he";

function Questions({ questions, hold, handleCheck, correctAnswers, endgame, handlePlayAgain, isLoading}) {

    const questionsElement = questions.map((item, key) => {

        const buttonsElement = item.answers.map((answer, key) => {
            function styles() {
                if (!endgame) {
                    if (answer.isHeld === true) {
                        return "is-held"
                    }
                } else {
                    if (answer.isHeld === true && (answer.answer === item.correctAnswer)) {
                        return "is-held"
                    } else if (answer.isHeld && (answer.answer !== item.correctAnswer)) {
                        return "is-wrong"
                    } else if (!answer.isHeld && (answer.answer === item.correctAnswer)) {
                        return "is-held"
                    }
                    else {
                        return "is-blank"
                    }
                }
            }
            return (
                <button className={styles()} id={key} onClick={() => hold(answer.id, item.question)}>{he.decode(answer.answer)}</button>
            )
        })

        return (
            <div className="question" id={key}>
                <h3>{he.decode(item.question)}</h3>
                <div className="answers">
                    {buttonsElement}
                </div>
                <div className="line"></div>
            </div>
        )
    })

    // console.log(questions === [])
    return (
        <div className="box">
            {isLoading ? 
            <div className="spinner-container">
                <div className="loading-spinner"></div>
            </div> :
            questionsElement}
            <div className="button-container">
                {endgame ?
                    <div className="play-again">
                        <h3>You scored {correctAnswers}/5 answers</h3>
                        <button onClick={handlePlayAgain}>Play again</button>
                    </div> :
                    <button onClick={handleCheck}>Check answers</button>
                }
            </div>
        </div>);
}

export default Questions;
