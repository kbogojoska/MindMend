import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
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
      await axios.post("http://localhost:8080/api/drinking-tracker/add", formData);
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
              {(errors.numOfDrinks || errors.maxDrinks) && (
                <div className="d-flex justify-content-center align-items-center error-container">
                  {errors.numOfDrinks && (
                    <div className="p-2 error">{errors.numOfDrinks}</div>
                  )}
                  {errors.maxDrinks && (
                    <div className="p-2 error">{errors.maxDrinks}</div>
                  )}
                </div>
              )}
              <form onSubmit={handleSubmit} className="input-form-container">
                <div className="input-group">
                  <label htmlFor="numOfDrinks" className="label-for-form">
                    Number of drinks:
                  </label>
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
                  <label htmlFor="maxDrinks" className="label-for-form">
                    Maximum drinks:
                  </label>
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
                  <button id="add-form-button" type="submit">
                    <span>Add Drinking Tracker</span>
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

export default AddDrinkingTracker;
