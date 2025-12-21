import { get_random_cloze } from "../services/quiz";
import { useState, useEffect } from "react";

const Quiz = () => {
  const [cloze, setCloze] = useState("");
  const [word, setWord] = useState("");
  const [wordId, setWordId] = useState(null);
  const [english, setEnglish] = useState("");
  const [spanish, setSpanish] = useState("");
  const [answer, setAnswer] = useState("");
  const [chosenWords, setChosenWords] = useState([]);

  useEffect(() => {
    const fetchClozeData = async () => {
      const cloze_data = await get_random_cloze();
      console.log(cloze_data);

      setCloze(cloze_data["cloze"]);
      setWord(cloze_data["word"]);
      setWordId(cloze_data["word_id"]);
      setEnglish(cloze_data["english"]);
      setSpanish(cloze_data["spanish"]);
      setAnswer(cloze_data["answer"]);
    };
    fetchClozeData();
  }, []);

  return (
    <div className="flex-1 max-w-5xl mx-auto">
      <div>{wordId}</div>
      <div>{word}</div>
      <div>{answer}</div>
      <div>{cloze}</div>
      <div>{spanish}</div>
      <div>{english}</div>
    </div>
  );
};

export default Quiz;
