import React from "react";
import "../../css/HeaderFooter/Footer.css";

function Footer() {
  const date = new Date();
  return (
    <footer className="footer-component py-3 mt-4">
      <div className="container text-center">
        <div className="copyright-text">
          <p className="mb-0">
            © {date.getFullYear()} MindMend. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
