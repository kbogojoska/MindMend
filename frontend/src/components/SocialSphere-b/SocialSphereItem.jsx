import React, { useEffect, useState } from 'react';
import '../../css/SocialSphere/SocialSphere.css';
import reminderGif from '../../gifs/social-sphere.gif'; // Ensure the path is correct to where your GIF is located

function SocialSphereItem(props) {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem("loggedInUser");
    if (username) {
      const userRemindersKey = `${username}_social_reminders`;
      const storedReminders = JSON.parse(localStorage.getItem(userRemindersKey)) || [];

      const existingReminder = storedReminders.find(r => r.message.includes(props.activityOfTheDay.name));

      const now = new Date();
      const reminderTime = new Date();
      reminderTime.setHours(13, 0, 0, 0);

      if (now > reminderTime) {
        reminderTime.setDate(reminderTime.getDate() + 1);
      }

      if (!existingReminder) {
        const newReminder = {
          id: `${props.activityOfTheDay.name}_${now.getTime()}`, 
          message: `Reminder: Don't forget your social activity "${props.activityOfTheDay.name}".`,
          time: reminderTime.toISOString(), 
        };

        const updatedReminders = [...storedReminders, newReminder];
        localStorage.setItem(userRemindersKey, JSON.stringify(updatedReminders));
        setReminders(updatedReminders);
      } else {
        setReminders(storedReminders);
      }
    }
  }, [props.activityOfTheDay.name]);

  const getReminderForActivity = (activityName) => {
    const reminder = reminders.find(r => r.message.includes(activityName));
    return reminder ? reminder.time : null;
  };

  return (
    <div className="item-container">
      <img src={reminderGif} alt="Reminder" className="rounded-gif" />
      <div className="tracker-container">
        <div className="card-body">
          <div className="card-title p-2">
            <h5 className="mb-1">Sphere for user: {props.user.username}</h5>
          </div>
          <div className="card-body p-2">
            <h6 className="font-weight-bold">Activity of the day:</h6>
            <h5 className="text-muted">{props.activityOfTheDay.name}</h5>
            <p className="font-weight-bold mb-0">Description:</p>
            <p className="text-muted">{props.activityOfTheDay.description}</p>
            <p className="font-weight-bold mb-0">Reminder:</p>
            <p className="text-muted mb-0">
              {getReminderForActivity(props.activityOfTheDay.name)
                ? `${new Date(getReminderForActivity(props.activityOfTheDay.name)).toLocaleString()}`
                : 'No reminder set'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SocialSphereItem;
