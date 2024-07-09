import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import "../../css/MealPlanner/MealPlanner.css";

function AddMealPlanner() {
  const [formData, setFormData] = useState({
    recipes: [],
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    recipes: "",
    connectionErrorAdd: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.recipes.length === 0) {
      setErrors({
        recipes: "At least one recipe is required",
      });
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:8080/api/meal-planner/add", formData);
      navigate("/meal-planner");
    } catch (error) {
      setErrors((prevState) => ({
        ...prevState,
        connectionErrorAdd: "There was an error creating the meal planner",
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
              {errors.recipes && (
                <div className="d-flex justify-content-center align-items-center error-container">
                  <div className="p-2 error">{errors.recipes}</div>
                </div>
              )}
              <form onSubmit={handleSubmit} className="input-form-container">
                <div className="input-group">
                  <label htmlFor="recipes" className="label-for-form">
                    Recipes:
                  </label>
                  <div>
                    {/* Assuming a select or multi-select component for recipes */}
                    <input
                      className="input-spaces"
                      type="text"
                      id="recipes"
                      name="recipes"
                      value={formData.recipes}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="position-button">
                  <button id="add-form-button" type="submit">
                    <span>Add Meal Planner</span>
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

export default AddMealPlanner;
