import { get_words } from "../services/stats";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

const Stats = () => {
  const [words, setWords] = useState([]);

  const auth = useAuth();

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
    <div className="flex-1 md:w-5xl mx-auto">
      <div className="bg-gray-200 p-5 my-2 rounded">
        {" "}
        <h1 className="text-4xl">Stats</h1>
        <h3 className="font-black">Player: {auth.user.email}</h3>
      </div>
    </div>
  );
};

export default Stats;
