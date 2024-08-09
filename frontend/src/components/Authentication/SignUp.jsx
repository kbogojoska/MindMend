import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa6";
import Alert from "@mui/material/Alert";
import "../../css/Authentication/SignUp.css";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    badRequestError: "",
    connectionError: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const uppercase = /[A-Z]/;
    const number = /[0-9]/;
    const symbol = /[!@#$%^&*(),.?":{}|<>]/;
    return (
      password.length >= 6 &&
      uppercase.test(password) &&
      number.test(password) &&
      symbol.test(password)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrors = {
      username: !formData.username ? "Username is required!" : "",
      email: !formData.email ? "Email is required!" : "",
      password: !formData.password ? "Password is required!" : "",
    };

    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = "Email is not valid!";
    }

    if (formData.password && !validatePassword(formData.password)) {
      newErrors.password =
        "Password must be at least 6 characters and include at least one uppercase letter, one number, and one symbol!";
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    setLoading(true);
    try {
      console.log(formData);
      await axios.post("http://localhost:8080/api/auth/signup", formData);
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log(error.response);
        setErrors((prevState) => ({
          ...prevState,
          badRequestError: error.response.data,
        }));
        console.log(errors.badRequestError);
      } else {
        setErrors((prevState) => ({
          ...prevState,
          connectionError: "There was an error signing up",
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
      email: "",
      password: "",
      confirmPassword: "",
    });
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
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
                backgroundColor: "white",
                margin: "16px",
                padding: "16px",
              }}
            >
              <div className="container-auth">
                <div className="header-auth">
                  <div className="text-auth">Sign Up</div>
                  <div className="underline-auth"></div>
                </div>

                {(errors.badRequestError ||
                  errors.username ||
                  errors.email ||
                  errors.password) && (
                  <div className="flex flex-col items-center mt-4">
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
                    {errors.email && (
                      <Alert severity="error" className="mb-2">
                        {errors.email}
                      </Alert>
                    )}
                    {errors.password && (
                      <Alert severity="error" className="mb-2">
                        {errors.password}
                      </Alert>
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
                      <FaEnvelope className="mr-4 ml-2 fav-sign text-secondary" />
                      <input
                        type="email"
                        placeholder="Email"
                        spellCheck="false"
                        autoComplete="off"
                        name="email"
                        value={formData.email}
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
                    <div className="input">
                      <FaLock className="mr-4 ml-2 fav-sign text-secondary" />
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        spellCheck="false"
                        autoComplete="off"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {loading ? (
                    <CircularProgress size={24} />
                  ) : (
                    <div className="flex justify-center my-5 submit-container gap-5">
                      <button
                        className="submit-buttons text-white rounded-pill"
                        type="submit"
                        disabled={loading}
                      >
                        Sign Up
                      </button>
                      <button
                        className="submit-buttons rounded-pill gray"
                        type="button"
                        onClick={() => navigate("/login")}
                      >
                        Log In
                      </button>
                    </div>
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
                  navigate("/signup");
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

export default SignUp;
