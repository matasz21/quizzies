import React from "react";

function Start(props) {
  return (
  <div className="start">
        <h1>Quizzical</h1>
        <h6>Let's test your knowledge!</h6>
        <button onClick={props.handlePlay}>Start quiz</button>
  </div>
  );
}

export default Start;
