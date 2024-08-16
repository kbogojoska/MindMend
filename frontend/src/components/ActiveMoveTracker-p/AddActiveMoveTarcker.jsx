import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import ReminderPopup from "../ReminderPopup";
import "../../css/ActiveMoveTracker/ActiveMoveTracker.css";

function AddActiveMoveTracker() {
  const [formData, setFormData] = useState({ dailySteps: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ dailySteps: "", connectionErrorAdd: "" });
  const [showReminderPopup, setShowReminderPopup] = useState(false);
  const [reminder, setReminder] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.dailySteps) {
      setErrors({ dailySteps: "Daily steps goal is required" });
      return;
    }

    setLoading(true);
    try {
      // Save the habit first
      const response = await axios.post("http://localhost:8080/api/activemove-tracker/add", {
        formData,
      });

      const habitId = response.data.id.toString(); // Assuming the API returns the saved habit ID

      if (reminder) {
        const username = localStorage.getItem("loggedInUser");
        if (username) {
          const userRemindersKey = `${username}_reminders`;
          const reminders = JSON.parse(localStorage.getItem(userRemindersKey)) || [];

          // Associate reminder with the saved habit ID
          reminders.push({ ...reminder, habitId });
          localStorage.setItem(userRemindersKey, JSON.stringify(reminders));
        }
      }

      navigate("/activemove-tracker");
    } catch (error) {
      setErrors((prevState) => ({
        ...prevState,
        connectionErrorAdd: "There was an error creating the active move tracker",
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

    const message = `Don't forget to reach your target goal today of ${formData.dailySteps} steps!`;

    // Temporarily store the reminder with a unique ID
    setReminder({ time: reminderDate.toISOString(), message });
    console.log("Reminder prepared:", { time: reminderDate.toISOString(), message });
  };

  const handleOpenReminderPopup = () => {
    setShowReminderPopup(true);
  };

  const handleCloseReminderPopup = () => {
    setShowReminderPopup(false);
  };

  const StyledGrid = styled(Grid)(({ theme }) => ({
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    boxShadow: theme.shadows[3],
  }));

  return (
    <>
      {!errors.connectionErrorAdd ? (
        <Grid container justifyContent="center" alignItems="center" mt={2} className="fade-in-content">
          {loading ? (
            <CircularProgress />
          ) : (
            <StyledGrid
              item
              xs={10}
              sm={10}
              md={8}
              lg={6}
              sx={{ boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)", borderRadius: "20px" }}
            >
              {errors.dailySteps && (
                <div className="d-flex justify-content-center align-items-center error-container">
                  <div className="p-2 error">{errors.dailySteps}</div>
                </div>
              )}
              <form onSubmit={handleSubmit} className="input-form-container">
                <div className="input-group">
                  <label htmlFor="dailySteps" className="label-for-form">
                    Daily steps goal:
                  </label>
                  <div>
                    <input
                      className="input-spaces"
                      type="number"
                      id="dailySteps"
                      name="dailySteps"
                      value={formData.dailySteps}
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
                    <span>Add Active Move Tracker</span>
                  </button>
                </div>
              </form>
              {showReminderPopup && (
                <ReminderPopup
                  onSetReminder={handleSetReminder}
                  onClose={handleCloseReminderPopup}
                />
              )}
            </StyledGrid>
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

export default AddActiveMoveTracker;
