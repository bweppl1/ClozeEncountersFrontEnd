import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="max-w-5xl mx-auto flex justify-between">
      <div>ClozeEncounters</div>
      <div className="flex gap-5">
        <Link to="/">Home</Link>
        <Link to="/quiz">Quiz</Link>
        <Link to="/stats">Stats</Link>
        <Link to="/settings">Settings</Link>
        <Link to="/login">Login/Signup</Link>
      </div>
    </div>
  );
};

export default NavBar;
