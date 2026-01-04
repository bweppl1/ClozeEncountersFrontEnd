import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  return (
    <div className="bg-gray-500 text-white w-full p-5">
      <div className="max-w-5xl flex justify-between items-center mx-auto">
        <Link to="/" className="text-2xl">
          Cloze<span className="font-bold">Encounters</span>
        </Link>
        <div className="flex gap-5 justify-center items-center">
          {/* <Link to="/">Home</Link> */}
          <Link to="/" className="nav-link">
            Play
          </Link>

          {auth.user ? (
            <Link to="/stats" className="nav-link font-black">
              {auth.user.email}
            </Link>
          ) : (
            <Link to="/login" className="nav-link">
              Login
            </Link>
          )}
          {!auth.user && (
            <Link to="/register" className="nav-link">
              Register
            </Link>
          )}

          {auth.user && (
            <button
              className="nav-link"
              onClick={() => auth.logOut()}
              navigate="/"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
