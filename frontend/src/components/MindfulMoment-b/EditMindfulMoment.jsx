import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import ReminderPopup from "../ReminderPopup"; 
import "../../css/MindfulMoment/MindfulMoment.css";

function EditMindfulMoment({ isAdmin, user, setUser }) {
  const [formData, setFormData] = useState({
    startOfWorkShift: "",
    endOfWorkShift: "",
    stressLevel: "",
  });
  const [errors, setErrors] = useState({
    connectionErrorEditById: "",
    connectionErrorFindById: "",
    startOfWorkShift: "",
    endOfWorkShift: "",
    stressLevel: "",
    stressLevelFromZeroToFour: "",
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
          `http://localhost:8080/api/mindful-moment/${id}`
        );     
        if(user != null && user.username !== result.data.username && !isAdmin) {
          navigate("/drinking-tracker");
        }
        setFormData(result.data);
        setLoading(false);
        
        const username = localStorage.getItem("loggedInUser");
        if (username) {
          const userRemindersKey = `${username}_mindful_reminders`;
          const storedReminders = JSON.parse(localStorage.getItem(userRemindersKey)) || [];
          const habitReminder = storedReminders.find(r => r.habitId === id);
          if (habitReminder) {
            setReminder(habitReminder);
            setSelectedReminderId(habitReminder.id);
          }
        }
      } catch (error) {
        setErrors((prevState) => ({
          ...prevState,
          connectionErrorFindById:
            "There was an error accessing the mindful moment",
        }));
        setLoading(false);
      }
    };
    fetchData();
  }, [id, user, navigate, isAdmin]);

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
        `http://localhost:8080/api/mindful-moment/edit/${id}`,
        formData
      );

      const username = localStorage.getItem("loggedInUser");
      if (username && reminder) {
        const userRemindersKey = `${username}_mindful_reminders`;
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

      navigate("/mindful-moment");
    } catch (error) {
      setErrors((prevState) => ({
        ...prevState,
        connectionErrorEditById:
          "There was an error editing the mindful moment",
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

    const message = `Don't forget to manage your stress level! Stress Level: ${formData.stressLevel}.`;

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
                  <span>Edit Mindful Moment</span>
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
        <div>
          <Alert severity="error">
            {errors.connectionErrorEditById || errors.connectionErrorFindById}
          </Alert>
        </div>
      )}
    </>
  );
}

export default EditMindfulMoment;
