import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import ReminderPopup from "../ReminderPopup"; 
import "../../css/HydroTracker/HydroTracker.css";

function EditHydroTracker({ isAdmin, user, setUser }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    numGlassesOfWater: "",
    personalGoal: "",
  });

  const [errors, setErrors] = useState({
    numGlassesOfWater: "",
    personalGoal: "",
    connectionErrorEditById: "",
    connectionErrorFindById: "",
  });

  const [loading, setLoading] = useState(false);
  const [showReminderPopup, setShowReminderPopup] = useState(false);
  const [selectedReminderId, setSelectedReminderId] = useState(null);
  const [reminder, setReminder] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await axios.get(`http://localhost:8080/api/hydro-track/${id}`);
        if (user != null && user.username !== result.data.username && !isAdmin) {
          navigate("/hydro-track");
        }
        setFormData({
          numGlassesOfWater: result.data.numGlassesOfWater,
          personalGoal: result.data.personalGoal,
        });

        const username = localStorage.getItem("loggedInUser");
        if (username) {
          const userRemindersKey = `${username}_hydro_reminders`;
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
          connectionErrorFindById: "There was an error accessing the hydro tracker",
        }));
        setLoading(false);
      }
    };
    fetchData();
  }, [id, user, navigate, isAdmin]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.numGlassesOfWater || !formData.personalGoal) {
      setErrors({
        numGlassesOfWater: !formData.numGlassesOfWater ? "Number of glasses of water is required!" : "",
        personalGoal: !formData.personalGoal ? "Setting a personal goal is required!" : "",
        connectionErrorEditById: "",
        connectionErrorFindById: "",
      });
      return;
    }

    setLoading(true);
    try {
      await axios.post(`http://localhost:8080/api/hydro-track/edit/${id}`, formData);

      const username = localStorage.getItem("loggedInUser");
      if (username && reminder) {
        const userRemindersKey = `${username}_hydro_reminders`;
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

      navigate("/hydro-track");
    } catch (error) {
      setErrors((prevState) => ({
        ...prevState,
        connectionErrorEditById: "There was an error editing the hydro tracker",
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: parseInt(value, 10),
    }));
    setErrors((prevState) => ({
      ...prevState,
      [name]: "",
    }));
  };

  const handleSetOrEditReminder = (reminderDateTime) => {
    const reminderDate = new Date(reminderDateTime);
    const now = new Date();

    if (reminderDate <= now) {
      console.log("Reminder time has already passed.");
      return;
    }

    const message = `Don't forget to drink water! Goal: ${formData.personalGoal} glasses.`;

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
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          mt={2}
          className="fade-in-content"
        >
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
            {(errors.numGlassesOfWater || errors.personalGoal) && (
              <div className="flex flex-col items-center mt-5">
                {errors.numGlassesOfWater && (
                  <Alert severity="error" className="mb-2">
                    {errors.numGlassesOfWater}
                  </Alert>
                )}
                {errors.personalGoal && (
                  <Alert severity="error" className="mb-2">
                    {errors.personalGoal}
                  </Alert>
                )}
              </div>
            )}
            <form onSubmit={handleSubmit} className="input-form-container">
              <div className="input-group">
                <label htmlFor="numGlassesOfWater" className="label-for-form">
                  Number of glasses of water drank:
                </label>
                <div>
                  <input
                    className="input-spaces"
                    type="number"
                    id="numGlassesOfWater"
                    name="numGlassesOfWater"
                    value={formData.numGlassesOfWater}
                    onChange={handleChange}
                    min="0"
                    max="30"
                  />
                </div>
              </div>
              <div className="input-group">
                <label htmlFor="personalGoal" className="label-for-form">
                  Set a personal goal for glasses to drink:
                </label>
                <div>
                  <input
                    className="input-spaces"
                    type="number"
                    id="personalGoal"
                    name="personalGoal"
                    value={formData.personalGoal}
                    onChange={handleChange}
                    min="0"
                    max="30"
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
                  <span>Edit Hydro Tracker</span>
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

export default EditHydroTracker;
