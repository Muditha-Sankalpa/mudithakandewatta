import React, { useState } from 'react';
import AdminMessages from './AdminMessages';
import ProjectsList from './ProjectsList';
import CvUploadForm from './CvUploadForm';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('projects');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'projects':
        return (
          <div className="small p-3">
            <ProjectsList />
          </div>
        );

      case 'messages':
        return (
          <div className="small p-3">
            <AdminMessages />
          </div>
        );

      case 'addcv':
        return (
          <div className="small p-3">
            <CvUploadForm />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container my-4 fs-6">
      <div className="d-flex justify-content-between align-items-center mt-5 mb-3">
        <h2 className="mb-0">Welcome, Muditha!</h2>
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
      </div>

      <ul className="nav nav-tabs nav-fill small">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'messages' ? 'active' : ''}`}
            onClick={() => setActiveTab('messages')}
          >
            Messages
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'addcv' ? 'active' : ''}`}
            onClick={() => setActiveTab('addcv')}
          >
            Add CV
          </button>
        </li>
      </ul>

      <div className="border rounded mt-3" style={{ minHeight: '400px' }}>
        {renderContent()}
      </div>
    </div>
  );
}

export default AdminDashboard;
