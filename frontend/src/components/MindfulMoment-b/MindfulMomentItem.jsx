import React from 'react'

function MindfulMomentItem(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="card-body">
            <div className='card-title p-2'>
              <h5 className="mb-1">Tracker for user: <br/></h5>
              <h5 className="text-truncate">{props.user.username}</h5>
            </div>
            <ul className="list-group">
                <li className="list-group-item">Start work: {props.startOfWorkShift}</li>
                <li className="list-group-item">End work: {props.endOfWorkShift}</li>
                <li className="list-group-item">Stress level: {props.stressLevel}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MindfulMomentItem