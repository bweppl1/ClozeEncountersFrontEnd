import { useState, useEffect } from "react";

const Question = ({ answer, cloze, spanish, english }) => {
  return (
    <div>
      <div>{answer}</div>
      <div>{cloze}</div>
      <div>{spanish}</div>
      <div>{english}</div>
    </div>
  );
};

export default Question;
