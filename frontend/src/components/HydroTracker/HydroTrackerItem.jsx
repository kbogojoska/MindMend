import React, { useEffect, useState } from "react";
import gifImage from "../../gifs/hydro_tracker.gif"; 
import "../../css/HydroTracker/HydroTracker.css"; 

function HydroTrackerItem(props) {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem("loggedInUser");
    if (username) {
      const userRemindersKey = `${username}_hydro_reminders`;
      const storedReminders = JSON.parse(localStorage.getItem(userRemindersKey)) || [];
      setReminders(storedReminders);
    }
  }, []);

  const getReminderForGlasses = (personalGoal) => {
    const reminder = reminders.find(r => r.message.includes(`Goal: ${personalGoal} glasses.`));
    return reminder ? reminder.time : null;
  };

  return (
    <div className="item-container flex justify-center">
      <img src={gifImage} alt="Animated Water Glass" className="rounded-gif" />
      <div className="tracker-container">
        <div className="card-body">
          <div className="card-title p-2">
            <h5 className="mb-1">Tracker for user: {props.user.username}</h5>
          </div>
          <ul className="list-group activity-list mx-2">
            <li className="list-group-item">Glasses drank: {props.glassesDrank}</li>
            <li className="list-group-item">Personal goal: {props.personalGoal}</li>
            <li className="list-group-item">
              Reminder: {getReminderForGlasses(props.personalGoal)
                ? `${new Date(getReminderForGlasses(props.personalGoal)).toLocaleString()}`
                : 'No reminder set'}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HydroTrackerItem;
