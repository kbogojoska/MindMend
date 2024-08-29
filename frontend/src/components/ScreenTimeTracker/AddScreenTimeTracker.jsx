import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import "../../css/ScreenTimeTracker/ScreenTimeTracker.css";

function AddScreenTimeTracker() {
  const [formData, setFormData] = useState({
    workTimeStart: "",
    workTimeEnd: "",
    nextBreakTime: "",
    endOfBreakTime: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    connectionErrorAdd: "",
    workTimeStart: "",
    workTimeEnd: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.workTimeStart || !formData.workTimeEnd) {
      setErrors({
        workTimeStart: !formData.workTimeStart
          ? "Work start time is required!"
          : "",
        workTimeEnd: !formData.workTimeEnd ? "Work end time is required!" : "",
      });
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        "http://localhost:8080/api/screen-tracker/add",
        formData
      );
      navigate("/screen-tracker");
    } catch (error) {
      setErrors((prevState) => ({
        ...prevState,
        connectionErrorAdd: "There was an error creating the screen tracker",
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
                    Work start time:
                  </label>
                  <div>
                    <input
                      className="input-spaces"
                      type="time"
                      id="workTimeStart"
                      name="workTimeStart"
                      value={formData.workTimeStart}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="workTimeEnd" className="label-for-form">
                    Work end time:
                  </label>
                  <div>
                    <input
                      className="input-spaces"
                      type="time"
                      id="workTimeEnd"
                      name="workTimeEnd"
                      value={formData.workTimeEnd}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="position-button">
                  <button id="add-form-button" type="submit">
                    <span>Add Screen Tracker</span>
                  </button>
                </div>
              </form>
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

export default AddScreenTimeTracker;
