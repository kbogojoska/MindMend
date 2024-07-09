import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import "../../css/SmokingTracker/SmokingTracker.css";

function EditSmokingTracker() {
  const [formData, setFormData] = useState({
    cigarettesPerDay: "",
    maxCigarettesPerDay:"",
  });
  const [errors, setErrors] = useState({
    cigarettesPerDay: "",
    maxCigarettesPerDay: "",
  });

  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await axios.get(
          `http://localhost:8080/api/smoking-tracker/${id}`
        );
        setFormData(result.data);
        setLoading(false);
      } catch (error) {
        setErrors((prevState) => ({
          ...prevState,
          connectionErrorFindById: "There was an error accessing the smoking tracker",
        }));
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.cigarettesPerDay || !formData.maxCigarettesPerDay) {
      setErrors({
        cigarettesPerDay: !formData.cigarettesPerDay
          ? "Number of glass of water is required!"
          : "",
        maxCigarettesPerDay: !formData.maxCigarettesPerDay
          ? "Setting a personal goal is required!"
          : "",
      });
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `http://localhost:8080/api/smoking-tracker/edit/${id}`,
        formData
      );
      navigate("/smoking-tracker");
    } catch (error) {
      setErrors((prevState) => ({
        ...prevState,
        connectionErrorEditById: "There was an error editing the smoking tracker",
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
              {(errors.cigarettesPerDay || errors.maxCigarettesPerDay) && (
                <div className="d-flex justify-content-center align-items-center error-container">
                  {errors.cigarettesPerDay && (
                    <div className="p-2 error">{errors.cigarettesPerDay}</div>
                  )}
                  {errors.maxCigarettesPerDay && (
                    <div className="p-2 error">{errors.maxCigarettesPerDay}</div>
                  )}
                </div>
              )}
              <form onSubmit={handleSubmit} className="input-form-container">
                <div className="input-group">
                  <label htmlFor="cigarettesPerDay" className="label-for-form">
                    Number of cigarettes per day:
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
                      max="30"
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="maxCigarettesPerDay" className="label-for-form">
                    Set a smoking limit per day:
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
                      max="30"
                    />
                  </div>
                </div>
                <div className="position-button">
                  <button id="add-form-button" type="submit">
                    <span>Edit Smoking Tracker</span>
                  </button>
                </div>
              </form>
            </StyledGrid>
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

export default EditSmokingTracker;
