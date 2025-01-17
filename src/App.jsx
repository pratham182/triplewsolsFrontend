import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserSubmissionForm from "./pages/UserSubmissionForm";
import AdminDashboard from "./pages/AdminDashboard";

import "./index.css"; 
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="container mx-auto p-6">
        <nav className="mb-6">
          <ul className="flex gap-4">
            <li>
              <Link to="/" className="text-blue-500 hover:underline">
                User Submission Form
              </Link>
            </li>
            <li>
              <Link to="/admin" className="text-blue-500 hover:underline">
                Admin Dashboard
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<UserSubmissionForm />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
