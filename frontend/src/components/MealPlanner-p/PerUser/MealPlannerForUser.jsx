import React, { useState, useEffect, useCallback } from "react";
import Grid from "@mui/material/Grid";
import axios from "axios";
// import { FaPenToSquare } from "react-icons/fa6";
import MealPlannerItem from "../MealPlannerItem";
import "../../../css/BodyElementsFade.css";
import "../../../css/MealPlanner/MealPlanner.css";
// import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

function MealPlannerForUser({ user, setUser }) {
  const [axiosData, setAxiosData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    connectionErrorLoadingData: "",
  });
  // const navigate = useNavigate();

  const loadMealPlanner = useCallback(async () => {
    setLoading(true);
    try {
      const result = await axios.get(
        `http://localhost:8080/api/meal-planner/user/${user.userId}`
      );
      console.log("htfu: " + result.data);
      setAxiosData(result.data);
    } catch (error) {
      setErrors((prevState) => ({
        ...prevState,
        connectionErrorLoadingData:
          "There was an error loading the meal planner",
      }));
    } finally {
      setLoading(false);
    }
  }, [user.userId]);

  useEffect(() => {
    loadMealPlanner();
  }, [loadMealPlanner]);

  // const handleEdit = (id) => {
  //   navigate(`/meal-planner/edit/${id}`);
  // };

  return (
    <div>
      <div className="fade-in-title">
        <h1 className="text-center">Meal Planner</h1>
        <p className="text-center">Plan your meals with recipes here.</p>
      </div>
      {loading ? (
        <Grid container justifyContent="center" alignItems="center" mt={4}>
          <CircularProgress />
        </Grid>
      ) : errors.connectionErrorLoadingData ? (
        <div className="d-flex justify-content-center align-items-center error-container">
          {errors.connectionErrorLoadingData && (
            <div className="p-2 error">{errors.connectionErrorLoadingData}</div>
          )}
        </div>
      ) : (
        axiosData && axiosData.id && (
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
            md={12}
            lg={12}
            sx={{
              boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
              borderRadius: "20px",
              padding: "16px",
              backgroundColor: "white",
              margin: "16px",
            }}
          >
            <Grid
              container
              justifyContent="space-evenly"
              alignItems="center"
              alignContent="space-evenly"
            >
              <Grid
                item
                xs={12}
                sm={10}
                md={6}
                lg={6}
                p={2}
                sx={{
                  boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
                  margin: "7px 7px 20px 7px",
                  borderRadius: "20px",
                  minWidth: "250px",
                }}
              >
                <MealPlannerItem
                  user={axiosData}
                  recipeOfTheDay={axiosData.recipeOfTheDay}
                />
                {/* <div id="edit-delete-container">
                  <div
                    className="edit-delete-btn"
                    onClick={() => handleEdit(axiosData.id)}
                  >
                    <span className="crud-button-text unselectable">
                      <FaPenToSquare size={18} className="unselectable" />
                    </span>
                  </div>
                </div> */}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        )
      )}
    </div>
  );
}

export default MealPlannerForUser;
