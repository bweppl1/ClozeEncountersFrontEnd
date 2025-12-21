import { get_random_cloze } from "../services/quiz";
import { useState, useEffect } from "react";
import Question from "../components/Question";

const PlayScreen = () => {
  const [cloze, setCloze] = useState("");
  const [word, setWord] = useState("");
  const [wordId, setWordId] = useState(null);
  const [english, setEnglish] = useState("");
  const [spanish, setSpanish] = useState("");
  const [answer, setAnswer] = useState("");
  const [chosenWords, setChosenWords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClozeData = async () => {
      setIsLoading(true);
      try {
        const cloze_data = await get_random_cloze();
        console.log(cloze_data);

        setCloze(cloze_data["cloze"]);
        setWord(cloze_data["word"]);
        setWordId(cloze_data["word_id"]);
        setEnglish(cloze_data["english"]);
        setSpanish(cloze_data["spanish"]);
        setAnswer(cloze_data["answer"]);
      } catch (error) {
        console.error("Issue with cloze fetchL: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchClozeData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex-1 max-w-5xl mx-auto">
      <Question
        answer={answer}
        cloze={cloze}
        english={english}
        spanish={spanish}
      />
    </div>
  );
};

export default PlayScreen;
