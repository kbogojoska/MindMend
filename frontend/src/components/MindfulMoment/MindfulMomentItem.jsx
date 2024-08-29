import React, { useEffect, useState } from "react";
import gifImage from '../../gifs/mindful_tracker.gif'; 
import '../../css/MindfulMoment/MindfulMoment.css';

function MindfulMomentItem(props) {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem("loggedInUser");
    if (username) {
      const userRemindersKey = `${username}_mindful_reminders`;
      const storedReminders = JSON.parse(localStorage.getItem(userRemindersKey)) || [];
      setReminders(storedReminders);
    }
  }, []);

  const getReminderForStressLevel = () => {
    const reminder = reminders.find(r => r.message.includes(`stress`));
    return reminder ? reminder.time : null;
  };

  return (
    <div className="item-container flex justify-center">
      <img src={gifImage} alt="Mindful Moment Tracker" className="rounded-gif" />
      <div className="tracker-container">
        <div className="card-body">
          <div className='card-title p-2'>
            <h5 className="mb-1">Tracker for user: {props.user.username}</h5>
          </div>
          <ul className="list-group mx-2">
            <li className="list-group-item">Start work: {props.startOfWorkShift}</li>
            <li className="list-group-item">End work: {props.endOfWorkShift}</li>
            <li className="list-group-item">Stress level: {props.stressLevel}</li>
            <li className="list-group-item">
              Reminder: {getReminderForStressLevel()
                ? `${new Date(getReminderForStressLevel()).toLocaleString()}`
                : 'No reminder set'}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MindfulMomentItem;
