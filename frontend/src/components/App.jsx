import "../css/App.css";
import React, { useState } from "react";
import { HashRouter as Router } from "react-router-dom";
import Header from "./HeaderFooter/Header";
import Footer from "./HeaderFooter/Footer";
import Body from "./Body";

function App() {

  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // make it a map so its easier
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
      <div className="page-container">
        {isUserAuthenticated && <Header habits={habitNames} />}        
        <div className="content-wrap">
          <Body
            isLogged={isUserAuthenticated}
            setIsLogged={setIsUserAuthenticated}
            isAdmin={isAdmin}
            setIsAdmin={setIsAdmin}
          />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
