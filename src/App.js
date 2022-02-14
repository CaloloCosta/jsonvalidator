import "./App.css";
import React from "react";
import { Routes, Route, BrowserRouter as Router} from "react-router-dom";
import Terms from "./components/Terms";
import Home from "./components/Home";
import Privacy from "./components/Privacy";
import NotFound from "./components/NotFound";



function App() {
  return (  
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="" element={<Home />}/>
        <Route path="/terms" element ={<Terms />}/>
        <Route path="/privacy-policy" element ={<Privacy />}/>
        <Route path="*" element ={<NotFound />}/>
      </Routes>
    </Router>

  );
}

export default App;
