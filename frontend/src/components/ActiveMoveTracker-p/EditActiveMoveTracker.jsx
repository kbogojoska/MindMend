import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import "../../css/ActiveMoveTracker/ActiveMoveTracker.css";

function EditActiveMoveTracker() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    dailySteps: "",
  });

  const [errors, setErrors] = useState({
    dailySteps: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await axios.get(
          `http://localhost:8080/api/activemove-tracker/${id}`
        );
        setFormData({
          dailySteps: result.data.dailySteps,
        });
        setLoading(false);
      } catch (error) {
        setErrors((prevState) => ({
          ...prevState,
          connectionErrorFindById:
            "There was an error accessing the active move tracker",
        }));
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.dailySteps) {
      setErrors({
        dailySteps: "Steps goal is required!",
      });
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `http://localhost:8080/api/activemove-tracker/edit/${id}`,
        formData
      );
      navigate("/activemove-tracker");
    } catch (error) {
      setErrors((prevState) => ({
        ...prevState,
        connectionErrorEditById:
          "There was an error editing the active move tracker",
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
    borderRadius: "20px", 
  }));

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
          <StyledGrid
            item
            xs={10}
            sm={10}
            md={8}
            lg={6}
            sx={{
              boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
              borderRadius: "20px",
              padding: "20px",
            }}
          >
            {errors.dailySteps && (
              <div className="d-flex justify-content-center align-items-center error-container">
                <div className="p-2 error">{errors.dailySteps}</div>
              </div>
            )}
            <form onSubmit={handleSubmit} className="input-form-container">
              <div className="input-group">
                <label htmlFor="dailySteps" className="label-for-form">
                  Steps goal:
                </label>
                <div>
                  <input
                    className="input-spaces"
                    type="number"
                    id="dailySteps"
                    name="dailySteps"
                    value={formData.dailySteps}
                    onChange={handleChange}
                    min="0"
                    max="10000"
                  />
                </div>
              </div>
              <div className="position-button">
                  <button id="add-form-button" type="submit">
                    <span>Edit Active Move Tracker</span>
                  </button>
                </div>
            </form>
          </StyledGrid>
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

export default EditActiveMoveTracker;
