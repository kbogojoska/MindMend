import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import "../../css/SocialSphere/SocialSphere.css";

function AddSocialSphere() {
  // const[data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    connectionErrorAdd: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:8080/api/social-sphere/add");
      navigate("/social-sphere");
    } catch (error) {
      setErrors((prevState) => ({
        ...prevState,
        connectionErrorAdd: "There was an error creating the social sphere",
      }));
    } finally {
      setLoading(false);
    }
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
              <form onSubmit={handleSubmit} className="d-flex justify-content-center align-items-center">
                {/* input for user will be addded when authentication is covered */}
                <button id="add-form-button" type="submit" className="mt-4 mb-4">
                  <span>Add Social Sphere</span>
                </button>
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

export default AddSocialSphere;
