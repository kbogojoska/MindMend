import React, { useEffect, useState } from 'react';
import '../../css/ActiveMoveTracker/ActiveMoveTracker.css';

function ActiveMoveTrackerItem(props) {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem("loggedInUser");
    if (username) {
      const userRemindersKey = `${username}_reminders`;
      const storedReminders = JSON.parse(localStorage.getItem(userRemindersKey)) || [];
      setReminders(storedReminders);
    }
  }, []);

  const getReminderForDailySteps = (dailySteps) => {
    const reminder = reminders.find(r => r.message.includes(`${dailySteps} steps`));
    return reminder ? reminder.time : null;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="card-body">
            <div className='card-title p-2'>
              <h5 className="mb-1">Active Move Tracker for user: <br/></h5>
              <h5 className="text-truncate">{props.user.username}</h5>
            </div>
            <ul className="list-group activity-list">
              {props.activitySuggestions.map((element, index) => (
                <li className="list-group-item" key={index}>
                  <p className='mb-0'>Daily Steps Goal: {element.dailySteps}</p>
                  <p className='mb-0'>
                    Reminder: {getReminderForDailySteps(element.dailySteps) 
                      ? `Reminder set for ${new Date(getReminderForDailySteps(element.dailySteps)).toLocaleString()}` 
                      : 'No reminder set'}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActiveMoveTrackerItem;
