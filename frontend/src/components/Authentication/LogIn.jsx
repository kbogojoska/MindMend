import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { FaUser, FaLock } from "react-icons/fa6";
import Alert from "@mui/material/Alert";
import "../../css/Authentication/SignUp.css";

function LogIn({ setLogged, setIsAdmin, user, setUser }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    badRequestError: "",
    connectionError: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {
      username: !formData.username ? "Username is required!" : "",
      password: !formData.password ? "Password is required!" : "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", formData, {
        withCredentials: true,
      });
      console.log(response.data.role);
      if (response.data.role === "ROLE_USER") {
        setUser({userId: response.data.id, username: response.data.username});
        setIsAdmin(false);
      } else if (response.data.role === "ROLE_ADMIN") {
        setIsAdmin(true);
      }
      setLogged(true);

      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 400) {
        setErrors((prevState) => ({
          ...prevState,
          badRequestError: error.response.data,
        }));
      } else if (error.response && error.response.status === 401) {
        setErrors((prevState) => ({
          ...prevState,
          badRequestError: "Username or password is incorrect",
        }));
      } else {
        setErrors((prevState) => ({
          ...prevState,
          connectionError: "There was an error logging in",
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    setErrors({
      badRequestError: "",
      connectionError: "",
      username: "",
      password: "",
    });
    setFormData({
      username: "",
      password: "",
    });
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
      {!errors.connectionError ? (
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
              sm={9}
              md={7}
              lg={5}
              sx={{
                boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
                borderRadius: "20px",
                padding: "16px",
                backgroundColor: "white",
                margin: "16px",
              }}
            >
              <div className="container-auth">
                <div className="header-auth">
                  <div className="text-auth">Log In</div>
                  <div className="underline-auth"></div>
                </div>
                {(errors.badRequestError ||
                  errors.email ||
                  errors.password) && (
                  <div className="flex flex-col items-center mt-5">
                    {errors.badRequestError && (
                      <Alert severity="error" className="mb-2">
                        {errors.badRequestError}
                      </Alert>
                    )}
                    {errors.username && (
                      <Alert severity="error" className="mb-2">
                        {errors.username}
                      </Alert>
                    )}
                    {errors.password && (
                      <Alert severity="error">{errors.password}</Alert>
                    )}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="inputs mx-3">
                    <div className="input">
                      <FaUser className="mr-4 ml-2 fav-sign text-secondary" />
                      <input
                        type="text"
                        placeholder="Username"
                        spellCheck="false"
                        autoComplete="off"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="input">
                      <FaLock className="mr-4 ml-2 fav-sign text-secondary" />
                      <input
                        type="password"
                        placeholder="Password"
                        spellCheck="false"
                        autoComplete="off"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {loading ? (
                    <CircularProgress size={24} />
                  ) : (
                    <>
                      <div className="flex justify-center my-5 submit-container gap-5">
                        <button
                          className="submit-buttons rounded-pill gray"
                          type="button"
                          disabled={loading}
                          onClick={() => {
                            navigate("/signup");
                          }}
                        >
                          Sign Up
                        </button>
                        <button
                          className="submit-buttons text-white rounded-pill"
                          type="submit"
                          disabled={loading}
                          onClick={() => {
                            navigate("/login");
                          }}
                        >
                          Log In
                        </button>
                      </div>
                    </>
                  )}
                </form>
              </div>
            </Grid>
          )}
        </Grid>
      ) : (
        errors.connectionError && (
          <div>
            <div className="d-flex justify-content-center align-items-center error-container">
              <div className="p-2 error">{errors.connectionError}</div>
            </div>
            <div className="d-flex justify-content-end me-5">
              <button
                className="submit-buttons text-white px-3 py-1 mt-4 me-5 rounded-pill"
                disabled={loading}
                onClick={() => {
                  navigate("/login");
                  refresh();
                }}
              >
                Back
              </button>
            </div>
          </div>
        )
      )}
    </>
  );
}

export default LogIn;
