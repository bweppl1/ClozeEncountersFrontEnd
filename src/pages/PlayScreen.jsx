import { get_random_cloze } from "../services/quiz";
import { useState, useRef, useEffect } from "react";
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
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [round, setRound] = useState(1);
  const [maxRounds, setMaxRounds] = useState(3);
  const [guess, setGuess] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const inputRef = useRef(null);

  const handleCheckAnswer = (answer, guess) => {
    const clean_guess = guess.toLowerCase();
    if (clean_guess === answer) {
      setIsCorrect(true);
      const newCorrectCount = correctAnswers + 1;
      setCorrectAnswers(newCorrectCount);
    }
    setIsAnswered(true);
    // Next Round Tasks
    setTimeout(() => {
      setIsAnswered(false);
      setIsCorrect(false);
      const nextRound = round + 1;
      setRound(nextRound);
      setGuess("");
      if (round === maxRounds) {
        setIsGameOver(true);
      }
      fetchClozeData();
    }, 2000);
  };

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
      console.error("Issue with cloze fetch: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchClozeData();
  // }, [round]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [cloze]);

  useEffect(() => {
    fetchClozeData();
  }, []);

  // Using enter to submit
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCheckAnswer(answer, guess);
    }
  };

  const reloadPage = () => {
    window.location.reload();
  };

  if (isLoading) {
    return <div className="flex-1">Loading...</div>;
  }

  if (isGameOver) {
    return (
      <div className="flex-1 justify-center my-5 mx-auto w-5xl rounded text-center flex flex-col gap-5">
        <h1 className="text-5xl bold">Game Over</h1>
        <span>
          Correct Answers: {correctAnswers} / {maxRounds}
        </span>
        <span>Accuracy: {Math.floor((correctAnswers / maxRounds) * 100)}%</span>
        <button
          className="bg-black text-white cursor-pointer rounded py-2 px-6 mx-auto"
          onClick={reloadPage}
        >
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-5xl w-full mx-auto p-5">
      <div className="mx-auto text-center">
        Round {round} / {maxRounds}
      </div>
      {isAnswered ? (
        <Question english={english} spanish={spanish} />
      ) : (
        <Question english={english} spanish={cloze} />
      )}

      {/* Player Input */}
      <div className="flex flex-col gap-5">
        <input
          ref={inputRef}
          type="text"
          placeholder="respuesta"
          className="bg-gray-500 text-white mx-auto rounded py-2 px-6 w-200"
          value={guess}
          onKeyDown={handleKeyDown}
          onChange={(e) => setGuess(e.target.value)}
        />
        {/* Submit button */}
        <button
          onClick={() => handleCheckAnswer(answer, guess)}
          className="bg-black text-white cursor-pointer rounded py-2 px-6 mx-auto"
        >
          Submit
        </button>
      </div>

      {/* Result Window */}
      {isAnswered && (
        <div className="mx-auto text-center p-5">
          {isCorrect ? (
            <span className="text-green-500">Correct</span>
          ) : (
            <span className="text-red-500">Wrong</span>
          )}
        </div>
      )}
    </div>
  );
};

export default PlayScreen;
