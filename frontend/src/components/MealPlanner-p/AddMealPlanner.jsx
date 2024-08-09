import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
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
              {errors.recipes && (
                <div className="flex flex-col items-center mt-5">
                  {errors.recipes && (
                    <Alert severity="error" className="mb-2">
                      {errors.recipes}
                    </Alert>
                  )}
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

export default AddMealPlanner;
