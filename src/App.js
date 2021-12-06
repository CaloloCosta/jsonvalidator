import "./App.css";
import React from "react";
import { Routes, Route, BrowserRouter as Router} from "react-router-dom";
import Terms from "./components/Terms";
import Home from "./components/Home";
import Privacy from "./components/Privacy";



function App() {
  return (  
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/terms" element ={<Terms />}/>
        <Route path="/privacy" element ={<Privacy />}/>
      </Routes>
    </Router>

  );
}

export default App;
