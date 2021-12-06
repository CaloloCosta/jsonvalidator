import React from "react";
import {Link } from "react-router-dom";

export default function Footer() {
  return (
      <footer class="footer">
        <div>
          <p>
            © 2021 <Link to="/">jsonvalidator.io</Link> <Link to="/terms">Terms And Conditions</Link> |{" "}
            <Link to="/privacy">Privacy Policy</Link>
          </p>
        </div>
      </footer>
  );
}
