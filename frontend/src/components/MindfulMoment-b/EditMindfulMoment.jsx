import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import "../../css/MindfulMoment/MindfulMoment.css";

function EditMindfulMoment() {
  const [formData, setFormData] = useState({
    startOfWorkShift: "",
    endOfWorkShift: "",
    stressLevel: "",
  });
  const [errors, setErrors] = useState({
    connectionErrorEditById: "",
    connectionErrorFindById: "",
    startOfWorkShift: "",
    endOfWorkShift: "",
    stressLevel: "",
    stressLevelFromZeroToFour: ""
  });

  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await axios.get(
          `http://localhost:8080/api/mindful-moment/${id}`
        );
        setFormData(result.data);
        setLoading(false);
      } catch (error) {
        setErrors((prevState) => ({
          ...prevState,
          connectionErrorFindById:
            "There was an error accessing the mindful moment",
        }));
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.startOfWorkShift ||
      !formData.endOfWorkShift ||
      !formData.stressLevel ||
      (parseInt(formData.stressLevel) < 0 || parseInt(formData.stressLevel) > 4)
    ) {
      setErrors({
        startOfWorkShift: !formData.startOfWorkShift
          ? "Start of shift time is required!"
          : "",
        endOfWorkShift: !formData.endOfWorkShift
          ? "End of shift time is required!"
          : "",
        stressLevel: !formData.stressLevel ? "Stress level is required!" : "",
        stressLevelFromZeroToFour: parseInt(formData.stressLevel) < 0 || parseInt(formData.stressLevel) > 4 ? "Stress level needs to be from 0 to 4!" : ""
      });
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `http://localhost:8080/api/mindful-moment/edit/${id}`,
        formData
      );
      navigate("/mindful-moment");
    } catch (error) {
      setErrors((prevState) => ({
        ...prevState,
        connectionErrorEditById:
          "There was an error editing the mindful moment",
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
              {(errors.startOfWorkShift ||
                errors.endOfWorkShift ||
                errors.stressLevel ||
                errors.stressLevelFromZeroToFour) && (
                <div className="d-flex justify-content-center align-items-center error-container">
                  {errors.startOfWorkShift && (
                    <div className="p-2 error">{errors.startOfWorkShift}</div>
                  )}
                  {errors.endOfWorkShift && (
                    <div className="p-2 error">{errors.endOfWorkShift}</div>
                  )}
                  {errors.stressLevel && (
                    <div className="p-2 error">{errors.stressLevel}</div>
                  )}
                  {errors.stressLevelFromZeroToFour && (
                    <div className="p-2 error">{errors.stressLevelFromZeroToFour}</div>
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
                    <span>Edit Mindful Moment</span>
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

export default EditMindfulMoment;
