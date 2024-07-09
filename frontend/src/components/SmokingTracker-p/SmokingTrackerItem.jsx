import React from "react";
import "../../css/SmokingTracker/SmokingTracker.css";

function SmokingTrackerItem(props) {
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
              <li className="list-group-item">
                Number of cigarettes smoked today: {props.cigarettesPerDay}
              </li>
              <li className="list-group-item">
                Smoking goal for today: {props.maxCigarettesPerDay}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SmokingTrackerItem;
