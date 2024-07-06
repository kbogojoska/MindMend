import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import "../../css/SleepTracker/SleepTracker.css";

function AddSleepTracker() {
  const [formData, setFormData] = useState({
    recommendedSleepTime: "",
    wakeUpTime: "",
    bedTime: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    connectionErrorAdd: "",
    wakeUpTime: "",
    bedTime: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.wakeUpTime || !formData.bedTime) {
      setErrors({
        wakeUpTime: !formData.wakeUpTime ? "Wake-up time is required!" : "",
        bedTime: !formData.bedTime ? "Bed time is required!" : "",
      });
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:8080/api/sleep-tracker/add", formData);
      navigate("/sleep-tracker");
    } catch (error) {
      setErrors((prevState) => ({
        ...prevState,
        connectionErrorAdd: "There was an error creating the sleep tracker",
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

  const StyledGrid = styled(Grid)(({ theme }) => ({
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    boxShadow: theme.shadows[3],
  }));

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
          <StyledGrid
            item
            xs={10}
            sm={10}
            md={8}
            lg={6}
            sx={{
              boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
              borderRadius: "20px",
            }}
          >
            {(errors.wakeUpTime || errors.bedTime) && (
              <div className="d-flex justify-content-center align-items-center error-container">
                {errors.wakeUpTime && (
                  <div className="error">{errors.wakeUpTime}</div>
                )}
                {errors.bedTime && (
                  <div className="error">{errors.bedTime}</div>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} className="input-form-container">
              <div className="input-group">
                <label
                  htmlFor="recommendedSleepTime"
                  className="label-for-form"
                >
                  Recommended sleep time (in hours):
                </label>
                <div>
                  <input
                    className="input-spaces"
                    type="number"
                    id="recommendedSleepTime"
                    name="recommendedSleepTime"
                    value={formData.recommendedSleepTime}
                    onChange={handleChange}
                    min="0"
                    max="24"
                  />
                </div>
              </div>
              <div className="input-group">
                <label htmlFor="wakeUpTime" className="label-for-form">
                  Wake-up time:
                </label>
                <div>
                  <input
                    className="input-spaces"
                    type="time"
                    id="wakeUpTime"
                    name="wakeUpTime"
                    value={formData.wakeUpTime}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="input-group">
                <label htmlFor="bedTime" className="label-for-form">
                  Bed time:
                </label>
                <div>
                  <input
                    className="input-spaces"
                    type="time"
                    id="bedTime"
                    name="bedTime"
                    value={formData.bedTime}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="position-button">
                <button id="add-form-button" type="submit">
                  <span>Add Sleep Tracker</span>
                </button>
              </div>
            </form>
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

export default AddSleepTracker;
