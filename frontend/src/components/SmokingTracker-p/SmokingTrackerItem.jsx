import React, { useEffect, useState } from "react";
import gifImage from "../../gifs/smoking-tracker.gif"; 
import "../../css/SmokingTracker/SmokingTracker.css"; 

function SmokingTrackerItem(props) {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem("loggedInUser");
    if (username) {
      const userRemindersKey = `${username}_smoking_reminders`;
      const storedReminders = JSON.parse(localStorage.getItem(userRemindersKey)) || [];
      setReminders(storedReminders);
    }
  }, []);

  const getReminderForSmokingGoal = (cigarettesPerDay) => {
    const reminder = reminders.find(r =>
      r.message.includes(`${cigarettesPerDay} cigarettes,`)
    );
    return reminder ? reminder.time : null;
  };

  return (
    <div className="item-container">
      <img src={gifImage} alt="Animated Cigarette" className="rounded-gif" />
      <div className="tracker-container">
        <div className="card-body">
          <div className="card-title p-2">
            <h5 className="mb-1">Tracker for user: {props.user.username}</h5>
          </div>
          <ul className="list-group activity-list">
            <li className="list-group-item">
              Number of cigarettes smoked today: {props.cigarettesPerDay}
            </li>
            <li className="list-group-item">
              Smoking goal for today: {props.maxCigarettesPerDay}
            </li>
            <li className="list-group-item">
              Reminder: {getReminderForSmokingGoal(props.cigarettesPerDay)
                ? `${new Date(getReminderForSmokingGoal(props.cigarettesPerDay)).toLocaleString()}`
                : 'No reminder set'}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SmokingTrackerItem;
