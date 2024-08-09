import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import "../../css/MindfulMoment/MindfulMoment.css";

function AddMindfulMoment() {
  const [formData, setFormData] = useState({
    startOfWorkShift: "",
    endOfWorkShift: "",
    stressLevel: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    connectionErrorEditById: "",
    connectionErrorFindById: "",
    startOfWorkShift: "",
    endOfWorkShift: "",
    stressLevel: "",
    stressLevelFromZeroToFour: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.startOfWorkShift ||
      !formData.endOfWorkShift ||
      !formData.stressLevel ||
      parseInt(formData.stressLevel) < 0 ||
      parseInt(formData.stressLevel) > 4
    ) {
      setErrors({
        startOfWorkShift: !formData.startOfWorkShift
          ? "Start of shift time is required!"
          : "",
        endOfWorkShift: !formData.endOfWorkShift
          ? "End of shift time is required!"
          : "",
        stressLevel: !formData.stressLevel ? "Stress level is required!" : "",
        stressLevelFromZeroToFour:
          parseInt(formData.stressLevel) < 0 ||
          parseInt(formData.stressLevel) > 4
            ? "Stress level needs to be from 0 to 4!"
            : "",
      });
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        "http://localhost:8080/api/mindful-moment/add",
        formData
      );
      navigate("/mindful-moment");
    } catch (error) {
      setErrors((prevState) => ({
        ...prevState,
        connectionErrorAdd: "There was an error creating the mindful moment",
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
              {(errors.startOfWorkShift ||
                errors.endOfWorkShift ||
                errors.stressLevel ||
                errors.stressLevelFromZeroToFour) && (
                <div className="flex flex-col items-center mt-5">
                  {errors.startOfWorkShift && (
                    <Alert severity="error" className="mb-2">
                      {errors.startOfWorkShift}
                    </Alert>
                  )}
                  {errors.endOfWorkShift && (
                    <Alert severity="error" className="mb-2">
                      {errors.endOfWorkShift}
                    </Alert>
                  )}
                  {errors.stressLevel && (
                    <Alert severity="error" className="mb-2">
                      {errors.stressLevel}
                    </Alert>
                  )}
                  {errors.stressLevelFromZeroToFour && (
                    <Alert severity="error" className="mb-2">
                      {errors.stressLevelFromZeroToFour}
                    </Alert>
                  )}
                </div>
              )}
              <form onSubmit={handleSubmit} className="input-form-container">
                <div className="input-group">
                  <label htmlFor="startOfWorkShift" className="label-for-form">
                    Start of work shift:
                  </label>
                  <div>
                    <input
                      className="input-spaces"
                      type="time"
                      id="startOfWorkShift"
                      name="startOfWorkShift"
                      value={formData.startOfWorkShift}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="endOfWorkShift" className="label-for-form">
                    End of work shift:
                  </label>
                  <div>
                    <input
                      className="input-spaces"
                      type="time"
                      id="endOfWorkShift"
                      name="endOfWorkShift"
                      value={formData.endOfWorkShift}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="input-group">
                  <label htmlFor="stressLevel" className="label-for-form">
                    Stress level (from 0 to 4):
                  </label>
                  <div>
                    <input
                      className="input-spaces"
                      type="number"
                      id="stressLevel"
                      name="stressLevel"
                      value={formData.stressLevel}
                      onChange={handleChange}
                      step="0.1"
                      min="0"
                      max="4"
                    />
                  </div>
                </div>
                <div className="position-button">
                  <button id="add-form-button" type="submit">
                    <span>Add Mindful Moment</span>
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

export default AddMindfulMoment;
