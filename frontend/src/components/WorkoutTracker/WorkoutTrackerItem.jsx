import React from "react";
import gifImage from "../../gifs/workout_tracker.gif";
import "../../css/WorkoutTracker/WorkoutTracker.css";

function WorkoutTrackerItem(props) {

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
          </ul>
        </div>
      </div>
    </div>
  );
}

export default WorkoutTrackerItem;
