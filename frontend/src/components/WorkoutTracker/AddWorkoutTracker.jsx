import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import ReminderPopup from "../ReminderPopup";
import "../../css/WorkoutTracker/WorkoutTracker.css";

function AddWorkoutTracker() {
  const [formData, setFormData] = useState({
    recommendedDurationTimeInMinutes: "",
    startWorkoutTime: "",
    endWorkoutTime: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    connectionErrorAdd: "",
    startWorkoutTime: "",
    endWorkoutTime: "",
  });
  const [showReminderPopup, setShowReminderPopup] = useState(false);
  const [reminder, setReminder] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.startWorkoutTime || !formData.endWorkoutTime) {
      setErrors({
        startWorkoutTime: !formData.startWorkoutTime ? "Start time is required!" : "",
        endWorkoutTime: !formData.endWorkoutTime ? "End time is required!" : "",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/api/workout-tracker/add", formData);
      
      const habitId = response.data.id.toString(); 
  
      if (reminder) {
        const username = localStorage.getItem("loggedInUser");
        if (username) {
          const userRemindersKey = `${username}_workout_reminders`;
          const reminders = JSON.parse(localStorage.getItem(userRemindersKey)) || [];

          reminders.push({ ...reminder, habitId });
          localStorage.setItem(userRemindersKey, JSON.stringify(reminders));
        }
      }
      
      navigate("/workout-tracker");
    } catch (error) {
      setErrors((prevState) => ({
        ...prevState,
        connectionErrorAdd: "There was an error creating the workout tracker",
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  const handleSetReminder = (reminderDateTime) => {
    const reminderDate = new Date(reminderDateTime);
    if (isNaN(reminderDate.getTime())) {
      console.error("Invalid reminder date/time");
      return;
    }
    
    const now = new Date();
    if (reminderDate <= now) {
      console.log("Reminder time has already passed.");
      return;
    }
    
    const message = `Don't forget to reach your target goal today of ${formData.recommendedDurationTimeInMinutes} minutes of exercise!`;
    setReminder({ id: Date.now().toString(), time: reminderDate.toISOString(), message });
    console.log("Reminder prepared:", { id: Date.now().toString(), time: reminderDate.toISOString(), message });
  };

  const handleOpenReminderPopup = () => {
    setShowReminderPopup(true);
  };

  const handleCloseReminderPopup = () => {
    setShowReminderPopup(false);
  };

  return (
    <>
      {!errors.connectionErrorAdd ? (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          mt={2}
          className="fade-in-content"
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <Grid
              item
              xs={10}
              sm={10}
              md={8}
              lg={6}
              sx={{
                boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
                borderRadius: "20px",
                padding: "16px",
                backgroundColor: "white",
                margin: "16px",
              }}
            >
              {(errors.startWorkoutTime || errors.endWorkoutTime) && (
                <div className="flex flex-col items-center mt-5">
                  {errors.startWorkoutTime && (
                    <Alert severity="error" className="mb-2">
                      {errors.startWorkoutTime}
                    </Alert>
                  )}
                  {errors.endWorkoutTime && (
                    <Alert severity="error" className="mb-2">
                      {errors.endWorkoutTime}
                    </Alert>
                  )}
                </div>
              )}

              <form onSubmit={handleSubmit} className="input-form-container">
                <div className="input-group">
                  <label
                    htmlFor="recommendedDurationTimeInMinutes"
                    className="label-for-form"
                  >
                    Recommended workout duration time (in minutes):
                  </label>
                  <div>
                    <input
                      className="input-spaces"
                      type="number"
                      id="recommendedDurationTimeInMinutes"
                      name="recommendedDurationTimeInMinutes"
                      value={formData.recommendedDurationTimeInMinutes}
                      onChange={handleChange}
                      min="0"
                      max="300"
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="startWorkoutTime" className="label-for-form">
                    Workout start time:
                  </label>
                  <div>
                    <input
                      className="input-spaces"
                      type="time"
                      id="startWorkoutTime"
                      name="startWorkoutTime"
                      value={formData.startWorkoutTime}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="endWorkoutTime" className="label-for-form">
                    Workout end time:
                  </label>
                  <div>
                    <input
                      className="input-spaces"
                      type="time"
                      id="endWorkoutTime"
                      name="endWorkoutTime"
                      value={formData.endWorkoutTime}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="position-button">
                  <button id="add-form-button" type="button" onClick={handleOpenReminderPopup}>
                    <span>Set Reminder</span>
                  </button>
                  <button id="add-form-button" type="submit">
                    <span>Add Workout Tracker</span>
                  </button>
                </div>
              </form>
              {showReminderPopup && (
                <ReminderPopup
                  onSetReminder={handleSetReminder}
                  onClose={handleCloseReminderPopup}
                />
              )}
            </Grid>
          )}
        </Grid>
      ) : (
        <div className="d-flex justify-content-center align-items-center error-container">
          {errors.connectionErrorAdd && (
            <div className="p-2 error">{errors.connectionErrorAdd}</div>
          )}
        </div>
      )}
    </>
  );
}

export default AddWorkoutTracker;
