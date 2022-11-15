import React from "react";
import he from "he";

function Questions({questions, hold, handleCheck, correctAnswers, endgame, handlePlayAgain}) {

    const questionsElement = questions.map((item, key) => {

        const buttonsElement = item.answers.map((answer, key) => {
            return (
                <button className={answer.isHeld ? "is-held" : null} id={key} onClick={() => hold(answer.id, item.question) }>{he.decode(answer.answer)}</button>
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

  return (
  <div className="box">
        {questionsElement}
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
