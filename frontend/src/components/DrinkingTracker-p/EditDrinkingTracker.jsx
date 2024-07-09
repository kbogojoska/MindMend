import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import "../../css/DrinkingTracker/DrinkingTracker.css";


function EditDrinkTracker() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    numOfDrinks: "",
    maxDrinks: "",
  });

  const [errors, setErrors] = useState({
    numOfDrinks: "",
    maxDrinks: "",
    connectionErrorEditById: "",
    connectionErrorFindById: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await axios.get(
          `http://localhost:8080/api/drinking-tracker/${id}`
        );
        setFormData({
          numOfDrinks: result.data.numOfDrinks,
          maxDrinks: result.data.maxDrinks,
        });
        setLoading(false);
      } catch (error) {
        setErrors((prevState) => ({
          ...prevState,
          connectionErrorFindById:
            "There was an error accessing the drink tracker",
        }));
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.numOfDrinks || !formData.maxDrinks) {
      setErrors({
        numOfDrinks: !formData.numOfDrinks
          ? "Number of drinks is required!"
          : "",
        maxDrinks: !formData.maxDrinks ? "Setting a drinking limit is required!" : "",
        connectionErrorEditById: "",
        connectionErrorFindById: "",
      });
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `http://localhost:8080/api/drinking-tracker/edit/${id}`,
        formData
      );
      navigate("/drinking-tracker");
    } catch (error) {
      setErrors((prevState) => ({
        ...prevState,
        connectionErrorEditById: "There was an error editing the drink tracker",
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: parseInt(value, 10),
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
                  Number of drinks per day:
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
                  Set a drink limit per day:
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
                  <span>Edit Drink Tracker</span>
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

export default EditDrinkTracker;
