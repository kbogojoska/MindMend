import "../css/App.css";
import React, { useState, useEffect } from "react";
import { HashRouter as Router } from "react-router-dom";
import Header from "./HeaderFooter/Header";
import Footer from "./HeaderFooter/Footer";
import Body from "./Body";
import { ReactNotifications, Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

function App() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // List of habit names
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

  useEffect(() => {
    const checkReminders = () => {
      const username = localStorage.getItem("loggedInUser");
      const userRemindersKey = `${username}_reminders`;
      const remindersJSON = localStorage.getItem(userRemindersKey);
      console.log("LocalStorage content:", remindersJSON);
      
      if (!remindersJSON) {
        console.log("No reminders found in local storage.");
        return;
      }
  
      const reminders = JSON.parse(remindersJSON);
      console.log("Parsed reminders:", reminders);
  
      const now = new Date();
      reminders.forEach((reminder, index) => {
        try {
          const reminderTime = new Date(reminder.time);
          if (isNaN(reminderTime.getTime())) {
            console.error("Invalid date format:", reminder.time);
            return;
          }
  
          if (reminderTime <= now) {
            Store.addNotification({
              title: "Reminder",
              message: reminder.message,
              type: "info",
              container: "bottom-right",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 5000,
                onScreen: true
              }
            });
  
            reminders.splice(index, 1);
            localStorage.setItem(userRemindersKey, JSON.stringify(reminders));
          }
        } catch (error) {
          console.error("Error processing reminder:", reminder, error);
        }
      });
    };
  
    checkReminders();
    const interval = setInterval(checkReminders, 30000);
  
    return () => clearInterval(interval);
  }, []);
  

  return (
    <Router>
      <div className="page-container">
        {isUserAuthenticated && <ReactNotifications />}
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
