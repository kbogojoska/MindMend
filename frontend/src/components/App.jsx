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
  
  const [user, setUser] = useState({
    userId: "",
    username: ""
  });

  const habitNames = [
    "sleep-tracker",
    "mindful-moment",
    "hydro-track",
    "social-sphere",
    "drinking-tracker",
    "smoking-tracker",
    "meal-planner",
    "activemove-tracker",
    "screen-tracker",
    "workout-tracker",
  ];

  useEffect(() => {
    const checkReminders = () => {
      const username = localStorage.getItem("loggedInUser");
      
      if (!username) {
        console.log("No user logged in.");
        return;
      }
  
      const reminderKeys = [
        `${username}_active_reminders`,
        `${username}_drink_reminders`,
        `${username}_hydro_reminders`,
        `${username}_mindful_reminders`,
        `${username}_smoking_reminders`,
        `${username}_sleep_reminders`,
        `${username}_screen_time_reminders`,
        `${username}_meal_reminders`,
        `${username}_social_reminders`,
        `${username}_workout_reminders`,
      ];
  
      reminderKeys.forEach(userRemindersKey => {
        const remindersJSON = localStorage.getItem(userRemindersKey);
        console.log("LocalStorage content for key", userRemindersKey, ":", remindersJSON);
        
        if (!remindersJSON) {
          console.log(`No reminders found in local storage for key ${userRemindersKey}.`);
          return;
        }
    
        const reminders = JSON.parse(remindersJSON);
        console.log("Parsed reminders for key", userRemindersKey, ":", reminders);
    
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
            user={user}
            setUser={setUser}
          />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
