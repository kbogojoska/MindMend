import React from 'react';
import '../../css/SocialSphere/SocialSphere.css'

function SocialSphereItem(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="card-body">
            <div className='card-title p-2'>
              <h5 className="mb-1">Sphere for user: <br/></h5>
              <h5 className="text-truncate">{props.user.username}</h5>
            </div>
            <div className="card-body p-2">
              <h6 className="font-weight-bold">Activity of the day:</h6>
              <h5 className="text-muted">{props.activityOfTheDay.name}</h5>
              <p className="font-weight-bold mb-0">Description:</p>
              <p className="text-muted mb-0">{props.activityOfTheDay.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SocialSphereItem