import React, { useEffect, useState } from 'react';
import gifImage from '../../gifs/active_tracker.gif'; 
import '../../css/ActiveMoveTracker/ActiveMoveTracker.css';

function ActiveMoveTrackerItem(props) {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem("loggedInUser");
    if (username) {
      const userRemindersKey = `${username}_active_reminders`;
      const storedReminders = JSON.parse(localStorage.getItem(userRemindersKey)) || [];
      setReminders(storedReminders);
    }
  }, []);

  const getReminderForDailySteps = (dailySteps) => {
    const reminder = reminders.find(r => r.message.includes(`${dailySteps} steps`));
    return reminder ? reminder.time : null;
  };

  return (
    <div className="item-container">
      <img src={gifImage} alt="Active Move Tracker" className="rounded-gif" />
      <div className="tracker-container">
        <div className="card-body">
          <div className='card-title p-2'>
            <h5 className="mb-1">Active Move Tracker for user: {props.user.username}</h5>
          </div>
          <ul className="list-group activity-list">
            <li className="list-group-item">
              Daily Steps Goal: {props.dailySteps}
            </li>
            <li className="list-group-item">
              Reminder: {getReminderForDailySteps(props.dailySteps) 
                ? `${new Date(getReminderForDailySteps(props.dailySteps)).toLocaleString()}` 
                : 'No reminder set'}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ActiveMoveTrackerItem;
