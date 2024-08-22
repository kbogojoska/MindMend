import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import ReminderPopup from "../ReminderPopup";
import "../../css/MindfulMoment/MindfulMoment.css";

function AddMindfulMoment() {
  const [formData, setFormData] = useState({
    startOfWorkShift: "",
    endOfWorkShift: "",
    stressLevel: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    connectionErrorAdd: "",
    startOfWorkShift: "",
    endOfWorkShift: "",
    stressLevel: "",
    stressLevelFromZeroToFour: "",
  });
  const [showReminderPopup, setShowReminderPopup] = useState(false);
  const [reminder, setReminder] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.startOfWorkShift ||
      !formData.endOfWorkShift ||
      !formData.stressLevel ||
      parseInt(formData.stressLevel) < 0 ||
      parseInt(formData.stressLevel) > 4
    ) {
      setErrors({
        startOfWorkShift: !formData.startOfWorkShift
          ? "Start of shift time is required!"
          : "",
        endOfWorkShift: !formData.endOfWorkShift
          ? "End of shift time is required!"
          : "",
        stressLevel: !formData.stressLevel ? "Stress level is required!" : "",
        stressLevelFromZeroToFour:
          parseInt(formData.stressLevel) < 0 ||
          parseInt(formData.stressLevel) > 4
            ? "Stress level needs to be from 0 to 4!"
            : "",
      });
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        "http://localhost:8080/api/mindful-moment/add",
        formData
      );

      if (reminder) {
        const username = localStorage.getItem("loggedInUser");
        if (username) {
          const userRemindersKey = `${username}_mindful_reminders`;
          const reminders = JSON.parse(localStorage.getItem(userRemindersKey)) || [];

          reminders.push({ ...reminder, habitId: Date.now().toString() });
          localStorage.setItem(userRemindersKey, JSON.stringify(reminders));
        }
      }

      navigate("/mindful-moment");
    } catch (error) {
      setErrors((prevState) => ({
        ...prevState,
        connectionErrorAdd: "There was an error creating the mindful moment",
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

    const message = `Don't forget to focus on your mindful moment! Stress Level: ${formData.stressLevel}`;

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
              {(errors.startOfWorkShift ||
                errors.endOfWorkShift ||
                errors.stressLevel ||
                errors.stressLevelFromZeroToFour) && (
                <div className="flex flex-col items-center mt-5">
                  {errors.startOfWorkShift && (
                    <Alert severity="error" className="mb-2">
                      {errors.startOfWorkShift}
                    </Alert>
                  )}
                  {errors.endOfWorkShift && (
                    <Alert severity="error" className="mb-2">
                      {errors.endOfWorkShift}
                    </Alert>
                  )}
                  {errors.stressLevel && (
                    <Alert severity="error" className="mb-2">
                      {errors.stressLevel}
                    </Alert>
                  )}
                  {errors.stressLevelFromZeroToFour && (
                    <Alert severity="error" className="mb-2">
                      {errors.stressLevelFromZeroToFour}
                    </Alert>
                  )}
                </div>
              )}
              <form onSubmit={handleSubmit} className="input-form-container">
                <div className="input-group">
                  <label htmlFor="startOfWorkShift" className="label-for-form">
                    Start of work shift:
                  </label>
                  <div>
                    <input
                      className="input-spaces"
                      type="time"
                      id="startOfWorkShift"
                      name="startOfWorkShift"
                      value={formData.startOfWorkShift}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="endOfWorkShift" className="label-for-form">
                    End of work shift:
                  </label>
                  <div>
                    <input
                      className="input-spaces"
                      type="time"
                      id="endOfWorkShift"
                      name="endOfWorkShift"
                      value={formData.endOfWorkShift}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="stressLevel" className="label-for-form">
                    Stress level (from 0 to 4):
                  </label>
                  <div>
                    <input
                      className="input-spaces"
                      type="number"
                      id="stressLevel"
                      name="stressLevel"
                      value={formData.stressLevel}
                      onChange={handleChange}
                      step="0.1"
                      min="0"
                      max="4"
                    />
                  </div>
                </div>
                <div className="position-button">
                  <button id="add-form-button" type="button" onClick={handleOpenReminderPopup}>
                    <span>Set Reminder</span>
                  </button>
                  <button id="add-form-button" type="submit">
                    <span>Add Mindful Moment</span>
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

export default AddMindfulMoment;
