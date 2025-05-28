import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProjectsList from './components/admin/ProjectsList';
import AddProjectForm from './components/admin/AddProjectForm';
import EditProjectForm from './components/admin/EditProjectForm';
import CvUploadForm from './components/admin/CvUploadForm';
import PortfolioPage from './components/user/PortfolioPage';
import ParticlesBackground from "./components/ParticlesBackground";
import AdminMessage from './components/admin/AdminMessages';
import AdminDashboard from './components/admin/AdminDashboard';
import LoginPage from './components/admin/LoginPage';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// PrivateRoute component to protect admin routes
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  return token ? children : <Navigate to="/admin/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public user-facing route */}
        <Route
          path="/"
          element={
            <>
              <ParticlesBackground />
              <PortfolioPage />
            </>
          }
        />

        {/* Admin login (public) */}
        <Route
          path="/admin/login"
          element={
            localStorage.getItem('adminToken') ? (
              <Navigate to="/admin/dashboard" replace />
            ) : (
              <LoginPage />
            )
          }
        />
        {/* Protected admin routes */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/projects"
          element={
            <PrivateRoute>
              <ProjectsList />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/messages"
          element={
            <PrivateRoute>
              <AdminMessage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/projects/add"
          element={
            <PrivateRoute>
              <AddProjectForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/edit-project/:id"
          element={
            <PrivateRoute>
              <EditProjectForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/cv-upload"
          element={
            <PrivateRoute>
              <CvUploadForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
