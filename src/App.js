import "./App.css";
import React from "react";
import { Routes, Route, BrowserRouter as Router} from "react-router-dom";
import Terms from "./components/Terms";
import Home from "./components/Home";
import Privacy from "./components/Privacy";



function App() {
  return (  
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/terms" element ={<Terms />}/>
        <Route path="/privacy" element ={<Privacy />}/>
        <Route path="{NotFpund}" status={404}/>
      </Routes>
    </Router>

  );
}

export default App;
