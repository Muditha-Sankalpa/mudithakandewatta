import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import ProjectsList from './components/admin/ProjectsList';
import AddProjectForm from './components/admin/AddProjectForm';
import EditProjectForm from './components/admin/EditProjectForm';
import CvUploadForm from './components/admin/CvUploadForm';
import PortfolioPage from './components/user/PortfolioPage'
import ParticlesBackground from "./components/ParticlesBackground";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ParticlesBackground />
              <PortfolioPage />
            </>
          }
        />
        <Route path="/admin/projects" element={<ProjectsList />} />
        <Route path="/admin/projects/add" element={<AddProjectForm />} />
        <Route path="/admin/edit-project/:id" element={<EditProjectForm />} />
        <Route path="/admin/cv-upload" element={<CvUploadForm />} />

      </Routes>
    </Router>
  );
}

export default App;
