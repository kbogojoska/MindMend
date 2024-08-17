import React from 'react';

function ActiveMoveTrackerItem(props) {
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
              {/* {props.activitySuggestions.map((element, index) => ( */}
                <li className="list-group-item">
                    <p className='mb-0'>Daily Steps Goal: {props.dailySteps}</p>
                </li>
              {/* ))} */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActiveMoveTrackerItem