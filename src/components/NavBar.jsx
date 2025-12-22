import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="bg-gray-500 text-white w-full p-5">
      <div className="max-w-5xl flex justify-between items-center mx-auto">
        <h1 className="text-2xl">
          Cloze<span className="font-bold">Encounters</span>
        </h1>
        <div className="flex gap-5 justify-center items-center">
          {/* <Link to="/">Home</Link> */}
          <Link
            to="/"
            className="bg-gray-800 text-white hover:bg-black px-6 py-2 rounded"
          >
            Play
          </Link>
          {/* <Link to="/stats">Stats</Link> */}
          <Link to="/login">Login/Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
