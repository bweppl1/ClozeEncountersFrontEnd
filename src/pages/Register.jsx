import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const auth = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.email !== "" && input.password !== "") {
      // Update to ensure valid email is input later**
      auth.loginAction(input, "register");
      setError("");
      console.log(`Input: ${input.email} and ${input.password}`); // debug
    } else {
      setError("Please enter an E-mail and Password.");
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex-1 max-w-5xl mx-auto">
      <div className="bg-gray-200 min-w-100 rounded my-25 p-6 gap-5">
        <h1 className="text-2xl mx-auto">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <label htmlFor="user-email">Email:</label>
          <input
            type="email"
            name="email"
            placeholder="example@hotmail.com"
            onChange={handleInput}
            className="bg-white p-2 rounded"
          />
          <label htmlFor="user-password">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={handleInput}
            className="bg-white p-2 rounded"
          />
          <button className="btn-primary">Submit</button>
        </form>
        {error && <span className="mx-auto">{error}</span>}
      </div>
    </div>
  );
};

export default Login;
