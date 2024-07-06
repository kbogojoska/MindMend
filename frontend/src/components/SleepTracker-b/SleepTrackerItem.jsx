import React from "react";

function SleepTrackerItem(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="card-body">
            <div className="card-title p-2">
              <h5 className="mb-1">
                Tracker for user: <br />
              </h5>
              <h5 className="text-truncate">{props.user.username}</h5>
            </div>
            <ul className="list-group">
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
    </div>
  );
}

export default SleepTrackerItem;
