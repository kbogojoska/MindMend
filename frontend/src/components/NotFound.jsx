import React from "react";
import "../css/BodyElementsFade.css"
import "../css/NotFound.css"

function NotFound() {
  return (
    <div className="fade-in-content not-found-container">
      <h2 className="text-center">Page Not Found</h2>
      <p className="text-center">The page you are looking for does not exist.</p>
    </div>
  );
}

export default NotFound;