import React, { useEffect, useState } from "react";
import gifImage from "../../gifs/drink-tracker.gif"; 
import "../../css/DrinkingTracker/DrinkingTracker.css"; 

function DrinkingTrackerItem(props) {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem("loggedInUser");
    if (username) {
      const userRemindersKey = `${username}_drink_reminders`;
      const storedReminders = JSON.parse(localStorage.getItem(userRemindersKey)) || [];
      setReminders(storedReminders);
    }
  }, []);

  const getReminderForDrinkLimit = (numOfDrinks) => {
    const reminder = reminders.find(r => r.message.includes(`${numOfDrinks} drinks`));
    return reminder ? reminder.time : null;
  };

  return (
    <div className="item-container">
      <img src={gifImage} alt="Animated Drink" className="rounded-gif" />
      <div className="tracker-container">
        <div className="card-body">
          <div className="card-title p-2">
            <h5 className="mb-1">
              Tracker for user: {props.user.username}
            </h5>
          </div>
          <ul className="list-group">
            <li className="list-group-item">
              Number of drinks taken today: {props.numOfDrinks}
            </li>
            <li className="list-group-item">
              Drink limit: {props.maxDrinks}
            </li>
            <li className="list-group-item">
              Reminder: {getReminderForDrinkLimit(props.numOfDrinks)
                ? `${new Date(getReminderForDrinkLimit(props.numOfDrinks)).toLocaleString()}`
                : 'No reminder set'}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DrinkingTrackerItem;
