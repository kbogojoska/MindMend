import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import "../../css/SmokingTracker/SmokingTracker.css";

function AddSmokingTracker() {
  const [formData, setFormData] = useState({
    cigarettesPerDay: "",
    maxCigarettesPerDay: "", // New state for max cigarettes per day goal
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    cigarettesPerDay: "",
    maxCigarettesPerDay: "", // New state for errors related to max cigarettes per day
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.cigarettesPerDay || !formData.maxCigarettesPerDay) {
      setErrors({
        cigarettesPerDay: !formData.cigarettesPerDay ? "Number of cigarettes is required" : "",
        maxCigarettesPerDay: !formData.maxCigarettesPerDay ? "Max cigarettes per day is required" : "",
      });
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:8080/api/smoking-tracker/add", formData);
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
              {errors.cigarettesPerDay || errors.maxCigarettesPerDay ? (
                <div className="d-flex justify-content-center align-items-center error-container">
                  {errors.cigarettesPerDay && (
                    <div className="p-2 error">{errors.cigarettesPerDay}</div>
                  )}
                  {errors.maxCigarettesPerDay && (
                    <div className="p-2 error">{errors.maxCigarettesPerDay}</div>
                  )}
                </div>
              ) : null}
              <form onSubmit={handleSubmit} className="input-form-container">
                <div className="input-group">
                  <label htmlFor="cigarettesPerDay" className="label-for-form">
                    Number of cigarettes smoked today:
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
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="maxCigarettesPerDay" className="label-for-form">
                    Max cigarettes per day goal:
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
                    />
                  </div>
                </div>
                <div className="position-button">
                  <button id="add-form-button" type="submit">
                    <span>Add Smoking Tracker</span>
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

export default AddSmokingTracker;
