import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from "react-dom/client";
import NavBar from "./components/Navbar";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router>
    <React.StrictMode>
      <NavBar />
      <App />
    </React.StrictMode>
  </Router>
);