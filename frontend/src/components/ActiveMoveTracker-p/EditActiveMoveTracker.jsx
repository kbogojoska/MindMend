import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import ReminderPopup from "../ReminderPopup";
import Alert from "@mui/material/Alert";
import "../../css/ActiveMoveTracker/ActiveMoveTracker.css";

function EditActiveMoveTracker() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ dailySteps: "" });
  const [errors, setErrors] = useState({ dailySteps: "", connectionErrorEditById: "" });
  const [loading, setLoading] = useState(false);
  const [showReminderPopup, setShowReminderPopup] = useState(false);
  const [selectedReminderId, setSelectedReminderId] = useState(null);
  const [reminder, setReminder] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await axios.get(`http://localhost:8080/api/activemove-tracker/${id}`);
        setFormData({ dailySteps: result.data.dailySteps });

        const username = localStorage.getItem("loggedInUser");
        if (username) {
          const userRemindersKey = `${username}_reminders`;
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
          connectionErrorFindById: "There was an error accessing the active move tracker",
        }));
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.dailySteps) {
      setErrors({ dailySteps: "Steps goal is required!" });
      return;
    }
  
    setLoading(true);
    try {
      await axios.post(`http://localhost:8080/api/activemove-tracker/edit/${id}`, formData);
  
      const username = localStorage.getItem("loggedInUser");
      if (username && reminder) {
        const userRemindersKey = `${username}_reminders`;
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
  
      navigate("/activemove-tracker");
    } catch (error) {
      setErrors((prevState) => ({
        ...prevState,
        connectionErrorEditById: "There was an error editing the active move tracker",
      }));
    } finally {
      setLoading(false);
    }
  };
  

  // Function to handle setting or editing a reminder
  const handleSetOrEditReminder = (reminderDateTime) => {
    const reminderDate = new Date(reminderDateTime);
    const now = new Date();
  
    if (reminderDate <= now) {
      console.log("Reminder time has already passed.");
      return;
    }
  
    const message = `Don't forget to reach your target goal today of ${formData.dailySteps} steps!`;
  
    // Store the reminder details in the state
    setReminder({
      id: selectedReminderId || Date.now().toString(),
      habitId: id,
      time: reminderDate.toISOString(),
      message,
    });
  };
  

  return (
    <>
      {loading ? (
        <div>
          <CircularProgress />
        </div>
      ) : !errors.connectionErrorEditById && !errors.connectionErrorFindById ? (
        <Grid container justifyContent="center" alignItems="center" mt={2} className="fade-in-content">
          <Grid item xs={10} sm={10} md={8} lg={6} sx={{ boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)", borderRadius: "20px", padding: "16px", backgroundColor: "white", margin: "16px" }}>
            {errors.dailySteps && (
              <div className="flex flex-col items-center mt-5">
                <Alert severity="error" className="mb-2">
                  {errors.dailySteps}
                </Alert>
              </div>
            )}
            <form onSubmit={handleSubmit} className="input-form-container">
              <div className="input-group">
                <label htmlFor="dailySteps" className="label-for-form">
                  Steps goal:
                </label>
                <div>
                  <input
                    className="input-spaces"
                    type="number"
                    id="dailySteps"
                    name="dailySteps"
                    value={formData.dailySteps}
                    onChange={(e) => setFormData({ ...formData, dailySteps: e.target.value })}
                    min="0"
                    max="10000"
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
                  <span>Edit Active Move Tracker</span>
                </button>
              </div>
            </form>
            {showReminderPopup && (
              <ReminderPopup
                onSetReminder={(reminderDateTime) => {
                  handleSetOrEditReminder(reminderDateTime);
                  setShowReminderPopup(false); // Close popup after setting or editing the reminder
                }}
                onClose={() => setShowReminderPopup(false)}
              />
            )}
          </Grid>
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

export default EditActiveMoveTracker;
