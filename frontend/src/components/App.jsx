import "../css/App.css";
import React from "react";
import { HashRouter as Router } from "react-router-dom";
import Header from "./HeaderFooter/Header";
import Footer from "./HeaderFooter/Footer";
import Body from "./Body";

function App() {
  const habitNames = [
    "sleep-tracker",
    "mindful-moment",
    "hydro-track",
    "social-sphere",
    "drinking-tracker",
    "smoking-tracker",
    "meal-planner",
    "activemove-tracker",
    "screentime-tracker",
  ];

  return (
    <Router>
      <div>
        <Header habits={habitNames} />
        <Body />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
