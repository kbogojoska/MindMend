import React from 'react';
import '../../css/MealPlanner/MealPlanner.css'

function MealPlannerItem(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="card-body">
            <div className='card-title p-2'>
              <h5 className="mb-1">Meal Planner for user: <br/></h5>
              <h5 className="text-truncate">{props.user.username}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MealPlannerItem