// src/components/admin/AddProjectForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AddProjectForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    githubLink: '',
    liveDemoLink: '',
    image: null,
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('technologies', JSON.stringify(formData.technologies.split(',').map(t => t.trim())));
    data.append('githubLink', formData.githubLink);
    data.append('liveDemoLink', formData.liveDemoLink);
    data.append('image', formData.image);

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/projects`, data);
      setStatus('Project added successfully!');
      setFormData({
        title: '',
        description: '',
        technologies: '',
        githubLink: '',
        liveDemoLink: '',
        image: null,
      });
      // reset file input manually
      document.getElementById('imageInput').value = null;
    } catch (err) {
      setStatus('Error adding project.');
    }
  };

  return (
    <div className="container my-5" style={{ maxWidth: '600px' }}>
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Add New Project</h2>
          {status && (
            <div className={`alert ${status.includes('successfully') ? 'alert-success' : 'alert-danger'}`} role="alert">
              {status}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Project Title</label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-control"
                placeholder="Enter project title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">Project Description</label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                placeholder="Enter project description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="technologies" className="form-label">Technologies (comma-separated)</label>
              <input
                type="text"
                id="technologies"
                name="technologies"
                className="form-control"
                placeholder="React, Node.js, MongoDB"
                value={formData.technologies}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="githubLink" className="form-label">GitHub Link</label>
              <input
                type="url"
                id="githubLink"
                name="githubLink"
                className="form-control"
                placeholder="https://github.com/username/project"
                value={formData.githubLink}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="liveDemoLink" className="form-label">Live Demo Link (optional)</label>
              <input
                type="url"
                id="liveDemoLink"
                name="liveDemoLink"
                className="form-control"
                placeholder="https://example.com/demo"
                value={formData.liveDemoLink}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="imageInput" className="form-label">Project Image</label>
              <input
                type="file"
                id="imageInput"
                name="image"
                className="form-control"
                accept="image/*"
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Add Project
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProjectForm;
