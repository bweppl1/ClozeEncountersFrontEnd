import { get_random_cloze } from "../services/quiz";
import { useState, useEffect } from "react";

const Quiz = () => {
  const [cloze, setCloze] = useState("");
  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");
  const [spanish, setSpanish] = useState("");

  useEffect(() => {
    const fetchClozeData = async () => {
      const cloze_data = await get_random_cloze();
      console.log(cloze_data);
      const random_index = Math.floor(
        Math.random() * cloze_data.sentences.length,
      );
      const random_sentence = cloze_data.sentences[random_index];

      setWord(cloze_data.word);
      setSpanish(random_sentence.spanish);
      setTranslation(random_sentence.english);
    };
    fetchClozeData();
  }, []);

  return (
    <div className="flex-1 max-w-5xl mx-auto">
      <div>{word}</div>
      <div>{spanish}</div>
      <div>{translation}</div>
    </div>
  );
};

export default Quiz;
