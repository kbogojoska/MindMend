import React from 'react'

function HydroTrackerItem(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="card-body">
            <div className='card-title p-2'>
              <h5 className="mb-1">Tracker for user: <br/></h5>
              <h5 className="text-truncate">{props.user.username}</h5>
            </div>
            <ul className="list-group activity-list">
              <li className="list-group-item">Glasses drank: {props.glassesDrank}</li>
              <li className="list-group-item">Personal goal: {props.personalGoal}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HydroTrackerItem