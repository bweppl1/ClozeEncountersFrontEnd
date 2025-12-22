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
  const [quizMode, setQuizMode] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [round, setRound] = useState(1);
  const [maxRounds, setMaxRounds] = useState(3);
  const [guess, setGuess] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const inputRef = useRef(null);

  // Check answer logic
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
      if (round >= maxRounds) {
        setIsGameOver(true);
      }
      fetchClozeData();
    }, 2000);
  };

  // Fetch all data for the quiz
  const fetchClozeData = async () => {
    setIsLoading(true);
    try {
      const max_id = quizMode;
      const cloze_data = await get_random_cloze(max_id);
      console.log(cloze_data);

      setCloze(cloze_data["cloze"]);
      setWord(cloze_data["word"]);
      setWordId(cloze_data["word_id"]);
      setEnglish(cloze_data["english"]);
      setSpanish(cloze_data["spanish"]);
      setAnswer(cloze_data["answer"]);

      // debug
      console.log(`Word ID: ${cloze_data["word_id"]}`);
    } catch (error) {
      console.error("Issue with cloze fetch: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Focus user input for user quality of life
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [cloze]);

  // Render initial cloze
  useEffect(() => {
    fetchClozeData();
  }, []);

  // Refetch cloze if mode changes
  useEffect(() => {
    fetchClozeData();
  }, [quizMode]);

  // Using enter to submit
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCheckAnswer(answer, guess);
    }
  };

  // Temp function to restart quiz
  const reloadPage = () => {
    window.location.reload();
  };

  // Give time for data to be fetched before rendering page
  if (isLoading) {
    return <div className="flex-1">Loading...</div>;
  }

  // End game screen
  if (isGameOver) {
    return (
      <div className="flex-1 py-25 mx-auto text-center flex flex-col gap-5">
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
      {/* Settings bar */}
      <div className="max-w-5xl bg-gray-500 rounded text-white flex items-center px-2 py-2 my-2">
        <h3 className="font-bold px-5">Most Common Words</h3>
        <ul className="flex gap-5">
          <li onClick={() => setQuizMode(10)} className="cursor-pointer">
            Top 10
          </li>
          <li onClick={() => setQuizMode(50)} className="cursor-pointer">
            Top 50
          </li>
          <li onClick={() => setQuizMode(100)} className="cursor-pointer">
            Top 100
          </li>
        </ul>
      </div>
      <div className="mx-auto text-center">
        Round {round} / {maxRounds}
      </div>
      {/* Cloze display */}
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
          className="focus:outline-0 bg-gray-500 min-w-100 text-white mx-auto rounded py-2 px-6"
          value={guess}
          onKeyDown={handleKeyDown}
          onChange={(e) => setGuess(e.target.value)}
        />
        {/* Submit button */}
        <button
          onClick={() => handleCheckAnswer(answer, guess)}
          className="bg-gray-800 hover:bg-black text-white cursor-pointer rounded py-2 px-6 mx-auto"
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
