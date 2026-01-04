import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [token, setToken] = useState(localStorage.getItem("site") || "");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const API_BASE = "http://localhost:8000";

  useEffect(() => {
    const storedToken = localStorage.getItem("site");
    if (storedToken) {
      findUserWithToken(storedToken);
    }
    setLoading(false);
  }, []);

  // log user in, or register, depending on transactionType
  const loginAction = async (user_data, transactionType) => {
    console.log(`DEBUG user data loginAction: ${user_data}`);
    try {
      const response = await fetch(`${API_BASE}/auth/${transactionType}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user_data),
      });
      const res = await response.json();
      if (res.user_data) {
        setUser(res.user_data);
        setToken(res.token);
        localStorage.setItem("site", res.token);
        navigate("/stats");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err.message);
      // need better error messaging
    }
    setLoading(false);
  };

  // log user out, reset states
  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
    setLoading(false);
  };

  // verify user with token
  const findUserWithToken = async (storedToken) => {
    console.log(`DEBUG finding user with token: ${storedToken}`);
    try {
      const response = await fetch(`${API_BASE}/users/me`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      if (response.ok) {
        const user_data = await response.json();
        setUser(user_data);
        setToken(storedToken);
      } else {
        localStorage.removeItem("site");
      }
    } catch (err) {
      console.error(err.message);
      // need better error messaging here too
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="w-full text-center">Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{ user, token, loginAction, logOut, findUserWithToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
