import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import "../../css/ScreenTimeTracker/ScreenTimeTracker.css";

function EditScreenTimeTracker({ isAdmin, user, setUser }) {
  const [formData, setFormData] = useState({
    workTimeStart: "",
    workTimeEnd: "",
  });

  const [errors, setErrors] = useState({
    connectionErrorEditById: "",
    connectionErrorFindById: "",
    workTimeStart: "",
    workTimeEnd: "",
  });

  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await axios.get(
          `http://localhost:8080/api/screen-tracker/${id}`
        );
        if (user != null && user.username !== result.data.username && !isAdmin) {
          navigate("/screen-tracker");
        }
        setFormData({
          workTimeStart: result.data.workTimeStart,
          workTimeEnd: result.data.workTimeEnd,
        });
        setLoading(false);
      } catch (error) {
        setErrors((prevState) => ({
          ...prevState,
          connectionErrorFindById:
            "There was an error accessing the screen time tracker",
        }));
        setLoading(false);
      }
    };
    fetchData();
  }, [id, user, navigate, isAdmin]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.workTimeStart || !formData.workTimeEnd) {
      setErrors({
        workTimeStart: !formData.workTimeStart
          ? "Work time start is required!"
          : "",
        workTimeEnd: !formData.workTimeEnd ? "Work time end is required!" : "",
        connectionErrorEditById: "",
        connectionErrorFindById: "",
      });
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `http://localhost:8080/api/screen-tracker/edit/${id}`,
        formData
      );

      const reminders = [];
      const reminderMinutesBefore = 10; 

      const getReminderTime = (timeStr) => {
        const [hours, minutes] = timeStr.split(':');
        const now = new Date();
        const reminderTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes - reminderMinutesBefore, 0, 0);

        if (reminderTime < now) {
          reminderTime.setDate(reminderTime.getDate() + 1);
        }
        return reminderTime;
      };

      const workTimeStartReminder = getReminderTime(formData.workTimeStart);
      const workTimeEndReminder = getReminderTime(formData.workTimeEnd);

      reminders.push({
        time: workTimeStartReminder.toISOString(),
        message: "Reminder: Your work time is about to start.",
      });

      reminders.push({
        time: workTimeEndReminder.toISOString(),
        message: "Reminder: Your work time is about to end.",
      });

      localStorage.setItem(`${user.username}_screen_time_reminders`, JSON.stringify(reminders));

      navigate("/screen-tracker");
    } catch (error) {
      setErrors((prevState) => ({
        ...prevState,
        connectionErrorEditById:
          "There was an error editing the screen time tracker",
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
      connectionErrorEditById: "",
      connectionErrorFindById: "",
    }));
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
            {(errors.workTimeStart || errors.workTimeEnd) && (
              <div className="flex flex-col items-center mt-5">
                {errors.workTimeStart && (
                  <Alert severity="error" className="mb-2">
                    {errors.workTimeStart}
                  </Alert>
                )}
                {errors.workTimeEnd && (
                  <Alert severity="error" className="mb-2">
                    {errors.workTimeEnd}
                  </Alert>
                )}
              </div>
            )}
            <form onSubmit={handleSubmit} className="input-form-container">
              <div className="input-group">
                <label htmlFor="workTimeStart" className="label-for-form">
                  Work time start:
                </label>
                <div>
                  <input
                    className="input-spaces"
                    type="time"
                    id="workTimeStart"
                    name="workTimeStart"
                    value={formData.workTimeStart}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.workTimeStart && (
                  <div className="p-2 error">{errors.workTimeStart}</div>
                )}
              </div>
              <div className="input-group">
                <label htmlFor="workTimeEnd" className="label-for-form">
                  Work time end:
                </label>
                <div>
                  <input
                    className="input-spaces"
                    type="time"
                    id="workTimeEnd"
                    name="workTimeEnd"
                    value={formData.workTimeEnd}
                    onChange={handleChange}
                    required
                  />
                </div>
                {errors.workTimeEnd && (
                  <div className="p-2 error">{errors.workTimeEnd}</div>
                )}
              </div>
              <div className="position-button">
                <button id="add-form-button" type="submit">
                  <span>Edit Screen Time Tracker</span>
                </button>
              </div>
            </form>
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

export default EditScreenTimeTracker;
