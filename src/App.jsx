import { useState } from "react";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <NavBar />
      <BrowserRouter>
        <Home />
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
