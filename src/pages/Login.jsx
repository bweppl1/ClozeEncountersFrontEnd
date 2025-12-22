const Login = () => {
  return (
    <div className="flex-1 max-w-5xl mx-auto">
      <div className="bg-gray-200 min-w-100 rounded my-25 p-6 flex flex-col gap-5">
        <h1 className="mx-auto font-bold">Login / Sign-up</h1>
        <span className="text-red-500 mx-auto">*** Not Implemented ***</span>
        <h3 className="flex justify-center gap-5">
          Username:{" "}
          <input
            type="text"
            id="email"
            className="bg-gray-500 text-white rounded"
          />
        </h3>
        <h3 className="flex justify-center gap-5">
          Password:{" "}
          <input
            type="text"
            id="password"
            className="bg-gray-500 text-white rounded"
          />
        </h3>
        <button className="bg-gray-800 text-white cursor-pointer px-6 py-2 mx-auto rounded hover:bg-black">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Login;
