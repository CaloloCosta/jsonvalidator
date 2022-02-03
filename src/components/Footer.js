import React from "react";
import {Link } from "react-router-dom";

export default function Footer() {
  return (
      <footer class="footer">
        <div>
          <p>© 2021 - 2022 <Link to="/">JSONverify</Link></p>
          <p>
            <Link to="/terms">Terms And Conditions</Link> |{" "}
            <Link to="/privacy-policy">Privacy Policy</Link>
          </p>
        </div>
      </footer>
  );
}
