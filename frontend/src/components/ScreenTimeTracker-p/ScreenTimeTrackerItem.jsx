import React from "react";
import gifImage from "../../gifs/screen_tracker.gif"; 
import "../../css/ScreenTimeTracker/ScreenTimeTracker.css"; 

function ScreenTimeTrackerItem(props) {
  return (
    <div className="item-container flex justify-center">
      <img src={gifImage} alt="Screen Time Tracker" className="rounded-gif" />
      <div className="tracker-container">
        <div className="card-body">
          <div className="card-title p-2 mx-2">
            <h5 className="mb-1">Tracker for user: {props.user.username}</h5>
          </div>
          <ul className="list-group activity-list">
            <li className="list-group-item">Work Time Start: {props.workTimeStart}</li>
            <li className="list-group-item">Work Time End: {props.workTimeEnd}</li>
            <li className="list-group-item">Next Break Time: {props.nextBreakTime}</li>
            <li className="list-group-item">End Of Break Time: {props.endOfBreakTime}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ScreenTimeTrackerItem;
