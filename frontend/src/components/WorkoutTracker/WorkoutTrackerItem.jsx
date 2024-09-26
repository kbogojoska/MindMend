import React, { useEffect } from "react";
import gifImage from "../../gifs/workout_tracker.gif";
import "../../css/WorkoutTracker/WorkoutTracker.css";

function WorkoutTrackerItem(props) {
  // const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem("loggedInUser");
    if (username) {
      // const userRemindersKey = `${username}_workout_reminders`;
      // const storedReminders = JSON.parse(localStorage.getItem(userRemindersKey)) || [];
      // setReminders(storedReminders);
    }
  }, []);

  // const getReminderForWorkouts = (startWorkoutTime) => {
  //   const reminder = reminders.find(r => r.message.includes(`Start at ${startWorkoutTime}`));
  //   return reminder ? reminder.time : null;
  // };

  return (
    <div className="item-container flex justify-center">
      <img src={gifImage} alt="Gym" className="rounded-gif" />
      <div className="tracker-container">
        <div className="card-body">
          <div className="card-title p-2">
            <h5 className="mb-1">
              Tracker for user: {props.user.username}
            </h5>
          </div>
          <ul className="list-group mx-2">
            <li className="list-group-item">Start of workout time: {props.startWorkoutTime}</li>
            <li className="list-group-item">
              Recommended workout duration in minutes: {props.recommendedDurationTimeInMinutes}
            </li>
            <li className="list-group-item">
              End of workout time: {props.endWorkoutTime}
            </li>
            {/* <li className="list-group-item">
              Reminder: {getReminderForWorkouts(props.startWorkoutTime) 
                ? `${new Date(getReminderForWorkouts(props.startWorkoutTime)).toLocaleString()}` 
                : 'No reminder set'}
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default WorkoutTrackerItem;
