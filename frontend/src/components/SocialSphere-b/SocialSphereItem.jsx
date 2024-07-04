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
            <ul className="list-group activity-list">
              {props.activitySuggestions.map((element, index) => (
                <li className="list-group-item" key={index}>
                    <p className='mb-0'>Activity: {element.name}</p>
                    <p className='mb-0'>Description: {element.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SocialSphereItem