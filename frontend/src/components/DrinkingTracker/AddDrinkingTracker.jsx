import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import ReminderPopup from "../ReminderPopup";
import "../../css/DrinkingTracker/DrinkingTracker.css";

function AddDrinkingTracker() {
  const [formData, setFormData] = useState({
    numOfDrinks: "",
    maxDrinks: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    numOfDrinks: "",
    maxDrinks: "",
    connectionErrorAdd: "",
  });
  const [showReminderPopup, setShowReminderPopup] = useState(false);
  const [reminder, setReminder] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.numOfDrinks || !formData.maxDrinks) {
      setErrors({
        ...errors,
        numOfDrinks: !formData.numOfDrinks ? "Number of drinks is required!" : "",
        maxDrinks: !formData.maxDrinks ? "Setting a maximum drinks is required!" : "",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/api/drinking-tracker/add", formData);
      const habitId = response.data.id.toString(); 

      if (reminder) {
        const username = localStorage.getItem("loggedInUser");
        if (username) {
          const userRemindersKey = `${username}_drink_reminders`;
          const reminders = JSON.parse(localStorage.getItem(userRemindersKey)) || [];

          reminders.push({ ...reminder, habitId });
          localStorage.setItem(userRemindersKey, JSON.stringify(reminders));
        }
      }

      navigate("/drinking-tracker");
    } catch (error) {
      setErrors((prevState) => ({
        ...prevState,
        connectionErrorAdd: "There was an error creating the drinking tracker",
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

    const message = `Don't forget to limit yourself to ${formData.maxDrinks} drinks today!`;

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
              {(errors.numOfDrinks || errors.maxDrinks) && (
                <div className="flex flex-col items-center mt-5">
                  {errors.numOfDrinks && <Alert severity="error" className="mb-2">{errors.numOfDrinks}</Alert>}
                  {errors.maxDrinks && <Alert severity="error" className="mb-2">{errors.maxDrinks}</Alert>}
                </div>
              )}
              <form onSubmit={handleSubmit} className="input-form-container">
                <div className="input-group">
                  <label htmlFor="numOfDrinks" className="label-for-form">Number of drinks:</label>
                  <div>
                    <input
                      className="input-spaces"
                      type="number"
                      id="numOfDrinks"
                      name="numOfDrinks"
                      value={formData.numOfDrinks}
                      onChange={handleChange}
                      min="0"
                      max="30"
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="maxDrinks" className="label-for-form">Maximum drinks:</label>
                  <div>
                    <input
                      className="input-spaces"
                      type="number"
                      id="maxDrinks"
                      name="maxDrinks"
                      value={formData.maxDrinks}
                      onChange={handleChange}
                      min="0"
                      max="30"
                    />
                  </div>
                </div>
                <div className="position-button">
                  <button id="add-form-button" type="button" onClick={handleOpenReminderPopup}>
                    <span>Set Reminder</span>
                  </button>
                  <button id="add-form-button" type="submit">
                    <span>Add Drinking Tracker</span>
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

export default AddDrinkingTracker;
