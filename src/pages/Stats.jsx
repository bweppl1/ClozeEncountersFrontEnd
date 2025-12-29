import { get_words } from "../services/stats";
import { useState, useEffect } from "react";

const Stats = () => {
  const [words, setWords] = useState([]);

  // Fetch all words on page render
  useEffect(() => {
    const fetchWords = async () => {
      const word_data = await get_words();
      setWords(word_data);
    };
    fetchWords();
  }, []);

  console.log(`words data: ${words}`);
  return (
    <div className="flex-1 max-w-5xl mx-auto">
      <div className="bg-gray-200 p-2 mx-auto my-2">Stats Data</div>
    </div>
  );
};

export default Stats;
