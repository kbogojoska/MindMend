import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { FaPlus, FaTrash } from "react-icons/fa6";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import MealPlannerItem from "./MealPlannerItem";
import "../../css/MealPlanner/MealPlanner.css";

function MealPlanner() {
  const [axiosData, setAxiosData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    connectionErrorLoadingData: "",
    connectionErrorOnDelete: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    loadMealPlanners();
  }, []);

  const loadMealPlanners = async () => {
    setLoading(true);
    try {
      const result = await axios.get("http://localhost:8080/api/meal-planner");
      setAxiosData(result.data);
    } catch (error) {
      setErrors((prevState) => ({
        ...prevState,
        connectionErrorLoadingData:
          "There was an error loading the meal planners",
      }));
    } finally {
      setLoading(false);
    }
  };

  const StyledGrid = styled(Grid)(({ theme }) => ({
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    boxShadow: theme.shadows[3]
  }));

  const handleAdd = () => {
    navigate(`/meal-planner/add`);
  };

  // const handleEdit = (id) => {
  //   navigate(`/meal-planner/edit/${id}`);
  // };

  const handleDelete = async (id, event) => {
    event.stopPropagation();
    setLoading(true);
    try {
      await axios.post(
        `http://localhost:8080/api/meal-planner/delete/${id}`
      );
      loadMealPlanners();
    } catch (error) {
      setErrors((prevState) => ({
        ...prevState,
        connectionErrorOnDelete:
          "There was an error deleting the meal planner",
      }));
    } finally {
      setLoading(false);
    }
  };

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
      ) : errors.connectionErrorLoadingData ||
        errors.connectionErrorOnDelete ? (
        <div className="d-flex justify-content-center align-items-center error-container">
          {errors.connectionErrorLoadingData && (
            <div className="p-2 error">{errors.connectionErrorLoadingData}</div>
          )}
          {errors.connectionErrorOnDelete && (
            <div className="p-2 error">{errors.connectionErrorOnDelete}</div>
          )}
        </div>
      ) : (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          mt={2}
          className="fade-in-content"
        >
          <StyledGrid
            item
            xs={10}
            sm={10}
            md={12}
            lg={12}
            sx={{
              boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
              borderRadius: "20px",
            }}
          >
            <Grid
              container
              justifyContent={`${axiosData.length === 0 ? "center" : "right"}`}
              sx={{
                paddingLeft: `${axiosData.length === 0 ? "2.5rem" : null}`,
              }}
            >
              <div id="add-btn" onClick={() => handleAdd()}>
                <span className="crud-button-text unselectable">
                  <FaPlus size={20} className="unselectable" />
                </span>
              </div>
            </Grid>
            {axiosData.length === 0 && (
              <div className="justify-content-center align-items-center m-2">
                <h5>
                  There are currently no Meal Planners. Create one using the plus
                  sign!
                </h5>
              </div>
            )}
            <Grid
              container
              justifyContent="space-evenly"
              alignItems="center"
              alignContent="space-evenly"
            >
              {axiosData.map((mealPlanner, index) => (
                <Grid
                  item
                  xs={12}
                  sm={10}
                  md={5}
                  lg={3}
                  key={index}
                  p={2}
                  sx={{
                    boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
                    margin: "7px 7px 20px 7px",
                    borderRadius: "20px",
                    minWidth: "250px",
                  }}
                >
                  <MealPlannerItem
                    user={mealPlanner}
                    recipeOfTheDay={mealPlanner.recipeOfTheDay}
                  />
                  <div id="edit-delete-container">
                    {/* <div
                      className="edit-delete-btn"
                      onClick={() => handleEdit(mealPlanner.id)}
                    >
                      <span className="crud-button-text unselectable">
                        <FaPenToSquare size={18} className="unselectable" />
                      </span>
                    </div> */}
                    <div
                      className="edit-delete-btn"
                      onClick={(event) => handleDelete(mealPlanner.id, event)}
                    >
                      <span className="crud-button-text unselectable">
                        <FaTrash size={18} className="unselectable" />
                      </span>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          </StyledGrid>
        </Grid>
      )}
    </div>
  );
}

export default MealPlanner;
