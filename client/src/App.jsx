import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AISearchPage from "./pages/AISearchPage";
import "./App.css";

const App = () => {
  
  return (
    <Router>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ai-search" element={<AISearchPage />} />
      </Routes>
    </Router>
  );
};

export default App;
