const NavBar = () => {
  return (
    <div className="max-w-5xl mx-auto flex justify-between">
      <div>ClozeEncounters</div>
      <div>
        <ul className="flex gap-5">
          <li>Home</li>
          <li>Quiz</li>
          <li>Stats</li>
          <li>Settings</li>
          <li>Login/Signup</li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
