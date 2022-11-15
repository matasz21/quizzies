import React, {useState, useEffect} from "react";
import Start from "./components/start";
import Questions from "./components/questions";
import { nanoid } from "nanoid";

function App() {

  const [game, setGame] = useState(false)
  const [endgame, setEndgame] = useState(false)
  const [questions, setQuestions] = useState([])
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [dummy, setDummy] = useState(false)

useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
    .then((response) => response.json())
    .then((data) => setQuestions(data.results.map((q) => {
              // eslint-disable-next-line no-array-constructor
      let allAnswers = new Array(...q.incorrect_answers, q.correct_answer)
      shuffle(allAnswers)
      allAnswers = allAnswers.map((answer) => {
        return {
          answer,
          id: nanoid(),
          isHeld:false
        }
      })
      return {
        question: q.question,
        answers: allAnswers,
        correctAnswer: q.correct_answer
      }
    })));
},[dummy]) 


function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function hold(id, name) {
  setQuestions(oldQuestions => oldQuestions.map(question => {

    const answers = question.answers.map((answer) => {
      return answer.id === id ? 
      {...answer, isHeld: !answer.isHeld} :
      {...answer, isHeld: false}
    })

    return question.question === name ?
    {...question, answers} :
    {...question}
  }))}

  function handlePlay() {
    setGame(prevGame => !prevGame)
  }

  function handleCheck() {
    // counts corrects answers and sets correctAnswers state
    questions.forEach((q) => {
      if(q.answers.forEach((a) => {
        if(a.isHeld && a.answer === q.correctAnswer){
          setCorrectAnswers(prevCorrectAnswers => prevCorrectAnswers + 1)
        }
      })){
      }
    })
    setEndgame(true)
    ending()
  }
  
  function ending() {
    if(endgame){
      // styles = {

      // }
    }
  }

  function handlePlayAgain() {
    setEndgame(false)
    setCorrectAnswers(0)
    setDummy(prevDummy => !prevDummy)
  }

    return (
    <div className="App up-right"> 
      {game ? 
      <Questions 
        questions={questions} 
        correctAnswers={correctAnswers}
        endgame={endgame}
        hold={hold} 
        handleCheck={handleCheck}
        handlePlayAgain={handlePlayAgain}
        /> : 
      <Start handlePlay={handlePlay} />}
    </div>
  );
}

export default App;