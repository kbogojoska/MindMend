import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import "../../css/MealPlanner/MealPlanner.css";

function EditMealPlanner() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    recipes: [],
  });

  const [errors, setErrors] = useState({
    recipes: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await axios.get(
          `http://localhost:8080/api/meal-planner/${id}`
        );
        setFormData({
          recipes: result.data.recipes,
        });
        setLoading(false);
      } catch (error) {
        setErrors((prevState) => ({
          ...prevState,
          connectionErrorFindById:
            "There was an error accessing the meal planner",
        }));
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

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
      await axios.post(
        `http://localhost:8080/api/meal-planner/edit/${id}`,
        formData
      );
      navigate("/meal-planner");
    } catch (error) {
      setErrors((prevState) => ({
        ...prevState,
        connectionErrorEditById: "There was an error editing the meal planner",
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
                <button id="edit-form-button" type="submit">
                  <span>Edit Meal Planner</span>
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

export default EditMealPlanner;
