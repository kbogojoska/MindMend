import React, { useState, useEffect, useCallback } from "react";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { FaPenToSquare } from "react-icons/fa6";
import SmokingTrackerItem from "../SmokingTrackerItem";
import "../../../css/BodyElementsFade.css";
import "../../../css/SmokingTracker/SmokingTracker.css";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

function SmokingTrackerForUser({ user, setUser }) {
  const [axiosData, setAxiosData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    connectionErrorLoadingData: "",
  });
  const navigate = useNavigate();

  const loadSmokingTracker = useCallback(async () => {
    setLoading(true);
    try {
      const result = await axios.get(
        `http://localhost:8080/api/smoking-tracker/user/${user.userId}`
      );
      console.log("htfu: " + result.data);
      setAxiosData(result.data);
    } catch (error) {
      setErrors((prevState) => ({
        ...prevState,
        connectionErrorLoadingData:
          "There was an error loading the smoking tracker",
      }));
    } finally {
      setLoading(false);
    }
  }, [user.userId]);

  useEffect(() => {
    loadSmokingTracker();
  }, [loadSmokingTracker]);

  const handleEdit = (id) => {
    navigate(`/smoking-tracker/edit/${id}`);
  };

  return (
    <div>
      <div className="fade-in-title">
        <h1 className="text-center">Smoking Tracker</h1>
        <p className="text-center">Track your smoking habits here.</p>
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
                <SmokingTrackerItem
                  user={axiosData}
                  cigarettesPerDay={axiosData.cigarettesPerDay}
                  maxCigarettesPerDay={axiosData.maxCigarettesPerDay}
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

export default SmokingTrackerForUser;