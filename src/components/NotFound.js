import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="App">
      <div className="Container">
        <div className="row">
          <div className="result">
            <h1>Page not found.</h1>
            <p>
              Go back to <Link to="/">JSONverify.com</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
