import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import ReminderPopup from "../ReminderPopup"; 
import "../../css/SmokingTracker/SmokingTracker.css";

function EditSmokingTracker({ isAdmin, user, setUser }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cigarettesPerDay: "",
    maxCigarettesPerDay: "",
  });

  const [errors, setErrors] = useState({
    cigarettesPerDay: "",
    maxCigarettesPerDay: "",
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
        const result = await axios.get(
          `http://localhost:8080/api/smoking-tracker/${id}`
        );
        if (user != null && user.username !== result.data.username && !isAdmin) {
          navigate("/smoking-tracker");
        }
        setFormData(result.data);

        const username = localStorage.getItem("loggedInUser");
        if (username) {
          const userRemindersKey = `${username}_smoking_reminders`;
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
          connectionErrorFindById: "There was an error accessing the smoking tracker",
        }));
        setLoading(false);
      }
    };
    fetchData();
  }, [id, user, navigate, isAdmin]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.cigarettesPerDay || !formData.maxCigarettesPerDay) {
      setErrors({
        cigarettesPerDay: !formData.cigarettesPerDay
          ? "Number of cigarettes per day is required!"
          : "",
        maxCigarettesPerDay: !formData.maxCigarettesPerDay
          ? "Setting a smoking limit is required!"
          : "",
        connectionErrorEditById: "",
        connectionErrorFindById: "",
      });
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `http://localhost:8080/api/smoking-tracker/edit/${id}`,
        formData
      );

      const username = localStorage.getItem("loggedInUser");
      if (username && reminder) {
        const userRemindersKey = `${username}_smoking_reminders`;
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

      navigate("/smoking-tracker");
    } catch (error) {
      setErrors((prevState) => ({
        ...prevState,
        connectionErrorEditById: "There was an error editing the smoking tracker",
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
    const now = new Date();

    if (reminderDate <= now) {
      console.log("Reminder time has already passed.");
      return;
    }

    const message = `Don't forget to monitor your smoking habit! Smoked: ${formData.cigarettesPerDay} cigarettes, Max: ${formData.maxCigarettesPerDay} cigarettes.`;

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
            {(errors.cigarettesPerDay || errors.maxCigarettesPerDay) && (
              <div className="flex flex-col items-center mt-5">
                {errors.cigarettesPerDay && (
                  <Alert severity="error" className="mb-2">
                    {errors.cigarettesPerDay}
                  </Alert>
                )}
                {errors.maxCigarettesPerDay && (
                  <Alert severity="error" className="mb-2">
                    {errors.maxCigarettesPerDay}
                  </Alert>
                )}
              </div>
            )}
            <form onSubmit={handleSubmit} className="input-form-container">
              <div className="input-group">
                <label htmlFor="cigarettesPerDay" className="label-for-form">
                  Number of cigarettes per day:
                </label>
                <div>
                  <input
                    className="input-spaces"
                    type="number"
                    id="cigarettesPerDay"
                    name="cigarettesPerDay"
                    value={formData.cigarettesPerDay}
                    onChange={handleChange}
                    min="0"
                    max="30"
                  />
                </div>
              </div>
              <div className="input-group">
                <label
                  htmlFor="maxCigarettesPerDay"
                  className="label-for-form"
                >
                  Set a smoking limit per day:
                </label>
                <div>
                  <input
                    className="input-spaces"
                    type="number"
                    id="maxCigarettesPerDay"
                    name="maxCigarettesPerDay"
                    value={formData.maxCigarettesPerDay}
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
                  <span>Edit Smoking Tracker</span>
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

export default EditSmokingTracker;
