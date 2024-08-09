import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import "../../css/HydroTracker/HydroTracker.css";

function EditHydroTracker() {
  const [formData, setFormData] = useState({
    numGlassesOfWater: "",
    personalGoal: "",
  });
  const [errors, setErrors] = useState({
    numGlassesOfWater: "",
    personalGoal: "",
  });

  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await axios.get(
          `http://localhost:8080/api/hydro-track/${id}`
        );
        setFormData(result.data);
        setLoading(false);
      } catch (error) {
        setErrors((prevState) => ({
          ...prevState,
          connectionErrorFindById:
            "There was an error accessing the hydro tracker",
        }));
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

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
      await axios.post(
        `http://localhost:8080/api/hydro-track/edit/${id}`,
        formData
      );
      navigate("/hydro-track");
    } catch (error) {
      setErrors((prevState) => ({
        ...prevState,
        connectionErrorEditById: "There was an error editing the hydro tracker",
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
          {loading ? (
            <div>
              <CircularProgress />
            </div>
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
              {(errors.numGlassesOfWater || errors.personalGoal) && (
                <div className="flex flex-col items-center mt-5">
                  {errors.numGlassesOfWater && (
                    <Alert severity="error" className="mb-2">
                      {errors.numGlassesOfWater}
                    </Alert>
                  )}
                  {errors.personalGoal && (
                    <Alert severity="error" className="mb-2">
                      {errors.personalGoal}
                    </Alert>
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
                    <span>Edit Hydro Tracker</span>
                  </button>
                </div>
              </form>
            </Grid>
          )}
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

export default EditHydroTracker;
