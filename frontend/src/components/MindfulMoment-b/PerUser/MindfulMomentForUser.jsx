import React, { useState, useEffect, useCallback } from "react";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { FaPenToSquare } from "react-icons/fa6";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import "../../../css/MindfulMoment/MindfulMoment.css";
import MindfulMomentItem from "../MindfulMomentItem";

function MindfulMomentForUser({ user, setUser }) {
  const [axiosData, setAxiosData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    connectionErrorLoadingData: "",
  });
  const navigate = useNavigate();

  const loadMindfulMoment = useCallback(async () => {
    setLoading(true);
    try {
      const result = await axios.get(
        `http://localhost:8080/api/mindful-moment/user/${user.userId}`
      );
      setAxiosData(result.data);
      console.log(result.data);
    } catch (error) {
      setErrors((prevState) => ({
        ...prevState,
        connectionErrorLoadingData:
          "There was an error loading the mindful moment",
      }));
    } finally {
      setLoading(false);
    }
  }, [user.userId]);

  useEffect(() => {
    loadMindfulMoment();
  }, [loadMindfulMoment]);

  const handleEdit = (id) => {
    navigate(`/mindful-moment/edit/${id}`);
  };

  return (
    <div>
      <div className="fade-in-title">
        <h1 className="text-center">Mindful Moment</h1>
        <p className="text-center">Track your work time and stress level here.</p>
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
        axiosData &&
        axiosData.id && (
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
                  md={5}
                  lg={3}
                  p={2}
                  sx={{
                    boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
                    margin: "7px 7px 20px 7px",
                    borderRadius: "20px",
                    minWidth: "250px",
                  }}
                >
                  <MindfulMomentItem
                    user={axiosData}
                    startOfWorkShift={axiosData.startOfWorkShift}
                    endOfWorkShift={axiosData.endOfWorkShift}
                    stressLevel={axiosData.stressLevel}
                  />
                  <div id="edit-delete-container">
                    <div
                      className="edit-delete-btn"
                      onClick={() => handleEdit(axiosData.id)}
                    >
                      <span className="crud-button-text unselectable">
                        <FaPenToSquare size={18} className="unselectable" />
                      </span>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )
      )}
    </div>
  );
}

export default MindfulMomentForUser;
