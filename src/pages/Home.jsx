import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex-1">
      {/* Hero Banner */}
      <div className="w-full bg-gray-300 flex p-6">
        <div className="w-1/2 p-5">
          <h3 className="text-xl">Hero</h3>
          <h1 className="text-5xl">ClozeEnounters</h1>
          <p>
            Quickly acquire the mot common vocabulary so you can emerse yourself
            in content that interests you.
          </p>
        </div>
        <div>Hero Image</div>
      </div>
      {/* Body */}
      <div className="w-full flex p-6 h-100">
        <div className="w-1/2">
          Absolute beginners should start with the top 10 most common words.
          Increase your vocabulary range as you consistently achieve high
          scores. Once you ares successful with the top 500 most common Spanish
          words, you're ready to immerse yourself in content that interests you!
        </div>
        <div className="bg-gray-300 w-1/2 flex text-center justify-center">
          <Link
            to="/quiz"
            className="bg-black rounded px-6 py-2 m-auto text-white"
          >
            Play Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
