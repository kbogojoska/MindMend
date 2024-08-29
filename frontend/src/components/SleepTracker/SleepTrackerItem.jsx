import React from "react";
import gifImage from "../../gifs/sleep_tracker.gif";
import "../../css/SleepTracker/SleepTracker.css"; 

function SleepTrackerItem(props) {
  return (
    <div className="item-container flex justify-center">
        <img src={gifImage} alt="Animated Clock" className="rounded-gif" />
      <div className="tracker-container">
        <div className="card-body">
          <div className="card-title p-2">
            <h5 className="mb-1">
              Tracker for user: {props.user.username}
            </h5>
          </div>
          <ul className="list-group mx-2">
            <li className="list-group-item">Bedtime: {props.bedTime}</li>
            <li className="list-group-item">
              Recommended sleep time: {props.recommendedSleepTime}
            </li>
            <li className="list-group-item">
              Wake up time: {props.wakeUpTime}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SleepTrackerItem;
