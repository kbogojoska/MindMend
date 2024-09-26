import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import ReminderPopup from "../ReminderPopup"; 
import "../../css/WorkoutTracker/WorkoutTracker.css";

function EditWorkoutTracker({ isAdmin, user, setUser }) {
  const [formData, setFormData] = useState({
    recommendedDurationTimeInMinutes: "",
    startWorkoutTime: "",
    endWorkoutTime: "",
  });
  const [errors, setErrors] = useState({
    connectionErrorEditById: "",
    connectionErrorFindById: "",
    startWorkoutTime: "",
    endWorkoutTime: "",
  });

  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [showReminderPopup, setShowReminderPopup] = useState(false);
  const [selectedReminderId, setSelectedReminderId] = useState(null);
  const [reminder, setReminder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await axios.get(
          `http://localhost:8080/api/workout-tracker/${id}`
        );    
        if(user != null && user.username !== result.data.username && !isAdmin) {
          navigate("/workout-tracker");
        }
        setFormData(result.data);

        const username = localStorage.getItem("loggedInUser");
        if (username) {
          const userRemindersKey = `${username}_workout_reminders`;
          const storedReminders = JSON.parse(localStorage.getItem(userRemindersKey)) || [];
          const habitReminder = storedReminders.find(r => r.habitId === id);
          if (habitReminder) {
            setReminder(habitReminder);
            setSelectedReminderId(habitReminder.id);
          }
        }

        setLoading(false);
      } catch (error) {
        setErrors((prevState) => ({
          ...prevState,
          connectionErrorFindById:
            "There was an error accessing the workout tracker",
        }));
        setLoading(false);
      }
    };
    fetchData();
  }, [id, user, navigate, isAdmin]);

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
      await axios.post(
        `http://localhost:8080/api/workout-tracker/edit/${id}`, formData
      ); 

      const username = localStorage.getItem("loggedInUser");
      if (username && reminder) {
        const userRemindersKey = `${username}_workout_reminders`;
        const storedReminders = JSON.parse(localStorage.getItem(userRemindersKey)) || [];
        
        let updatedReminders;
        if (selectedReminderId) {
          updatedReminders = storedReminders.map(r =>
            r.id === selectedReminderId
              ? { ...r, time: reminder.time, message: reminder.message }
              : r
          );
        } else {
          updatedReminders = [...storedReminders, { ...reminder, habitId: id }];
        }

        localStorage.setItem(userRemindersKey, JSON.stringify(updatedReminders));
      }

      navigate("/workout-tracker");
    } catch (error) {
      setErrors((prevState) => ({
        ...prevState,
        connectionErrorEditById: "There was an error editing the workout tracker",
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

  const handleSetOrEditReminder = (reminderDateTime) => {
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
    setReminder({
      id: selectedReminderId || Date.now().toString(),
      habitId: id,
      time: reminderDate.toISOString(),
      message,
    });
    
    setTimeout(() => {
      setShowReminderPopup(false);
    }, 10000);
  };

  return (
    <>
      {loading ? (
        <div>
          <CircularProgress />
        </div>
      ) : !errors.connectionErrorEditById && !errors.connectionErrorFindById ? (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          mt={2}
          className="fade-in-content"
        >
          {loading ? (
            <div>
              <CircularProgress />
            </div>
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
                  <button 
                    id="add-form-button" 
                    type="button" 
                    onClick={() => {
                      setShowReminderPopup(true); 
                    }}
                  >
                    <span>{selectedReminderId ? "Update Reminder" : "Set Reminder"}</span>
                  </button>
                  <button id="add-form-button" type="submit">
                    <span>Edit Workout Tracker</span>
                  </button>
                </div>
              </form>
              {showReminderPopup && (
              <ReminderPopup
                onSetReminder={(reminderDateTime) => {
                  handleSetOrEditReminder(reminderDateTime);
                  setShowReminderPopup(false); 
                }}
                onClose={() => setShowReminderPopup(false)}
                initialDateTime={reminder?.time} 
              />
            )}
            </Grid>
          )}
        </Grid>
      ) : (
        <div className="d-flex justify-content-center align-items-center error-container">
          {errors.connectionErrorEditById && (
            <div className="p-2 error">{errors.connectionErrorEditById}</div>
          )}
          {errors.connectionErrorFindById && (
            <div className="p-2 error">{errors.connectionErrorFindById}</div>
          )}
        </div>
      )}
    </>
  );
}

export default EditWorkoutTracker;
