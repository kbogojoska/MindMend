import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import ReminderPopup from "../ReminderPopup";
import "../../css/SmokingTracker/SmokingTracker.css";

function AddSmokingTracker() {
  const [formData, setFormData] = useState({
    cigarettesPerDay: "",
    maxCigarettesPerDay: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    cigarettesPerDay: "",
    maxCigarettesPerDay: "",
    connectionErrorAdd: "",
  });
  const [showReminderPopup, setShowReminderPopup] = useState(false);
  const [reminder, setReminder] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.cigarettesPerDay || !formData.maxCigarettesPerDay) {
      setErrors({
        cigarettesPerDay: !formData.cigarettesPerDay
          ? "Number of cigarettes is required"
          : "",
        maxCigarettesPerDay: !formData.maxCigarettesPerDay
          ? "Max cigarettes per day is required"
          : "",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/smoking-tracker/add",
        formData
      );
      const habitId = response.data.id.toString(); 

      if (reminder) {
        const username = localStorage.getItem("loggedInUser");
        if (username) {
          const userRemindersKey = `${username}_smoking_reminders`;
          const reminders = JSON.parse(localStorage.getItem(userRemindersKey)) || [];

          reminders.push({ ...reminder, habitId });
          localStorage.setItem(userRemindersKey, JSON.stringify(reminders));
        }
      }

      navigate("/smoking-tracker");
    } catch (error) {
      setErrors((prevState) => ({
        ...prevState,
        connectionErrorAdd: "There was an error creating the smoking tracker",
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
    const now = new Date();

    if (reminderDate <= now) {
      console.log("Reminder time has already passed.");
      return;
    }

    const message = `Don't forget to monitor your smoking habit! Smoked: ${formData.cigarettesPerDay} cigarettes, Max: ${formData.maxCigarettesPerDay} cigarettes.`;

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
        <Grid container justifyContent="center" alignItems="center" mt={2} className="fade-in-content">
          {loading ? (
            <CircularProgress />
          ) : (
            <Grid
              item
              xs={10}
              sm={10}
              md={8}
              lg={6}
              sx={{ boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)", borderRadius: "20px", padding: "16px", backgroundColor: "white", margin: "16px" }}
            >
              {(errors.cigarettesPerDay || errors.maxCigarettesPerDay) && (
                <div className="flex flex-col items-center mt-5">
                  {errors.cigarettesPerDay && <Alert severity="error" className="mb-2">{errors.cigarettesPerDay}</Alert>}
                  {errors.maxCigarettesPerDay && <Alert severity="error" className="mb-2">{errors.maxCigarettesPerDay}</Alert>}
                </div>
              )}
              <form onSubmit={handleSubmit} className="input-form-container">
                <div className="input-group">
                  <label htmlFor="cigarettesPerDay" className="label-for-form">Number of cigarettes smoked today:</label>
                  <div>
                    <input
                      className="input-spaces"
                      type="number"
                      id="cigarettesPerDay"
                      name="cigarettesPerDay"
                      value={formData.cigarettesPerDay}
                      onChange={handleChange}
                      min="0"
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="maxCigarettesPerDay" className="label-for-form">Max cigarettes per day goal:</label>
                  <div>
                    <input
                      className="input-spaces"
                      type="number"
                      id="maxCigarettesPerDay"
                      name="maxCigarettesPerDay"
                      value={formData.maxCigarettesPerDay}
                      onChange={handleChange}
                      min="0"
                    />
                  </div>
                </div>
                <div className="position-button">
                  <button id="add-form-button" type="button" onClick={handleOpenReminderPopup}>
                    <span>Set Reminder</span>
                  </button>
                  <button id="add-form-button" type="submit">
                    <span>Add Smoking Tracker</span>
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
          {errors.connectionErrorAdd && <div className="p-2 error">{errors.connectionErrorAdd}</div>}
        </div>
      )}
    </>
  );
}

export default AddSmokingTracker;
