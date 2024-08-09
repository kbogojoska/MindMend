import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

function LogOut({ isLogged, setLogged }) {
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({
    connectionError: "",
    userError: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        setLoading(true);
        setErrors((prevState) => ({
          ...prevState,
          connectionError: "",
          userError: ""
        }));

        if (isLogged) {
          await axios.post("http://localhost:8080/api/auth/logout");
        } else {
          setErrors((prevState) => ({
            ...prevState,
            userError: "No user is logged in",
          }));
        }
        setLogged(false);

        navigate("/login");
      } catch (error) {
        console.error("Error during logout:", error);
        setErrors((prevState) => ({
          ...prevState,
          connectionError: "An error has occurred during logout",
        }));
      } finally {
        setLoading(false);
      }
    };
    logoutUser();
  }, [navigate, setLogged, isLogged]);

  return (
    <>
      {loading ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress />
          </div>
        </>
      ) : (
        <>
          {errors.connectionError || errors.userError ? (
            <div>
              <div className="d-flex justify-content-center align-items-center error-container">
                <div className="p-2 error">
                  {errors.connectionError &&
                    <div>
                      {errors.connectionError}
                    </div>
                  }
                  {errors.userError &&
                    <div>
                      {errors.userError}
                    </div>
                  }
                </div>
              </div>
              <div className="d-flex justify-content-end me-5">
                <button
                  className="submit-buttons text-white px-3 py-1 mt-4 me-5 rounded-pill"
                  disabled={loading}
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Back to Home
                </button>
              </div>
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
}

export default LogOut;
