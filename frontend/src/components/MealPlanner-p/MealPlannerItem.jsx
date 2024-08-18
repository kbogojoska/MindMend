import React from "react";
import "../../css/MealPlanner/MealPlanner.css";

function MealPlannerItem(props) {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="card-body">
            <div className="card-title p-2">
              <h5 className="mb-1">
                Meal Planner for user: <br />
              </h5>
              <h5 className="text-truncate">{props.user.username}</h5>
            </div>
            <div className="card-body p-2">
              <h6 className="font-weight-bold">Recipe of the day:</h6>
              <h5 className="text-muted">{props.recipeOfTheDay.name}</h5>
              <p className="font-weight-bold mb-0">Ingredients:</p>
              <p className="text-muted mb-0">{props.recipeOfTheDay.ingredients}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlannerItem;
