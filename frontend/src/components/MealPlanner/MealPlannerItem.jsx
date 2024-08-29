import React, { useEffect, useState } from "react";
import gifImage from "../../gifs/meal-planner.gif"; 
import "../../css/MealPlanner/MealPlanner.css";

function MealPlannerItem(props) {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem("loggedInUser");
    if (username) {
      const userRemindersKey = `${username}_meal_reminders`;
      const storedReminders = JSON.parse(localStorage.getItem(userRemindersKey)) || [];
      const existingReminder = storedReminders.find(r => r.message.includes(props.recipeOfTheDay.name));

      const now = new Date();
      const reminderTime = new Date();
      reminderTime.setHours(12, 0, 0, 0); 

      if (now > reminderTime) {
        reminderTime.setDate(reminderTime.getDate() + 1);
      }

      if (!existingReminder) {
        const newReminder = {
          id: `${props.recipeOfTheDay.name}_${now.getTime()}`, 
          message: `Reminder: Don't forget your meal plan for ${props.recipeOfTheDay.name}.`,
          time: reminderTime.toISOString(), 
        };
        
        const updatedReminders = [...storedReminders, newReminder];
        localStorage.setItem(userRemindersKey, JSON.stringify(updatedReminders));
        setReminders(updatedReminders);
      } else {
        setReminders(storedReminders);
      }
    }
  }, [props.recipeOfTheDay.name]);

  const getReminderForMeal = (recipeName) => {
    const reminder = reminders.find(r => r.message.includes(recipeName));
    return reminder ? reminder.time : null;
  };

  return (
    <div className="item-container flex justify-center">
      <img src={gifImage} alt="Animated Meal Planner" className="rounded-gif" />
      <div className="tracker-container">
        <div className="card-body">
          <div className="card-title p-2 mx-2">
            <h5 className="mb-1">Meal Planner for user: {props.user.username}</h5>
          </div>
          <div className="card-body p-2">
            <h6 className="font-weight-bold">Recipe of the day:</h6>
            <h5 className="text-muted">{props.recipeOfTheDay.name}</h5>
            <p className="font-weight-bold mb-0">Ingredients:</p>
            <p className="text-muted">{props.recipeOfTheDay.ingredients}</p>
            <p className="font-weight-bold mb-0">Reminder:</p>
            <p className="text-muted mb-0">{getReminderForMeal(props.recipeOfTheDay.name)
                ? `${new Date(getReminderForMeal(props.recipeOfTheDay.name)).toLocaleString()}`
                : 'No reminder set'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MealPlannerItem;
