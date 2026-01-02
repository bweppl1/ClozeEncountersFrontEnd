// import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import PlayScreen from "./pages/PlayScreen";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <BrowserRouter>
        <AuthProvider>
          <NavBar />
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={<PlayScreen />} />
            {/* <Route path="/quiz" element={<PlayScreen />} /> */}
            <Route element={<PrivateRoute />}>
              <Route path="/stats" element={<Stats />} />
            </Route>
            {/* <Route path="/settings" element={<Settings />} /> */}
            <Route path="/login" element={<Login />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
