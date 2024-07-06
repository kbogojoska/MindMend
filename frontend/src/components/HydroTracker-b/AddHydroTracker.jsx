import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import "../../css/HydroTracker/HydroTracker.css";

function AddHydroTracker() {
  const [formData, setFormData] = useState({
    numGlassesOfWater: "",
    personalGoal: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    numGlassesOfWater: "",
    personalGoal: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.numGlassesOfWater || !formData.personalGoal) {
      setErrors({
        numGlassesOfWater: !formData.numGlassesOfWater
          ? "Number of glass of water is required!"
          : "",
        personalGoal: !formData.personalGoal
          ? "Setting a personal goal is required!"
          : "",
      });
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:8080/api/hydro-track/add", formData);
      navigate("/hydro-track");
    } catch (error) {
      setErrors((prevState) => ({
        ...prevState,
        connectionErrorAdd: "There was an error creating the hydro tracker",
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
              {(errors.numGlassesOfWater || errors.personalGoal) && (
                <div className="d-flex justify-content-center align-items-center error-container">
                  {errors.numGlassesOfWater && (
                    <div className="p-2 error">{errors.numGlassesOfWater}</div>
                  )}
                  {errors.personalGoal && (
                    <div className="p-2 error">{errors.personalGoal}</div>
                  )}
                </div>
              )}
              <form onSubmit={handleSubmit} className="input-form-container">
                <div className="input-group">
                  <label htmlFor="numGlassesOfWater" className="label-for-form">
                    Number of glass of water drank:
                  </label>
                  <div>
                    <input
                      className="input-spaces"
                      type="number"
                      id="numGlassesOfWater"
                      name="numGlassesOfWater"
                      value={formData.numGlassesOfWater}
                      onChange={handleChange}
                      min="0"
                      max="30"
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="personalGoal" className="label-for-form">
                    Set a personal goal for glasses to drink:
                  </label>
                  <div>
                    <input
                      className="input-spaces"
                      type="number"
                      id="personalGoal"
                      name="personalGoal"
                      value={formData.personalGoal}
                      onChange={handleChange}
                      min="0"
                      max="30"
                    />
                  </div>
                </div>
                <div className="position-button">
                  <button id="add-form-button" type="submit">
                    <span>Add Hydro Tracker</span>
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

export default AddHydroTracker;
