// src/components/admin/EditProjectForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditProjectForm = () => {
  const { id } = useParams(); // project id from route param
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    githubLink: '',
    liveDemoLink: '',
    image: null,
  });

  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentImageUrl, setCurrentImageUrl] = useState('');
  const [newImagePreview, setNewImagePreview] = useState(null);


  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/projects/${id}`);
        const project = res.data;
        setCurrentImageUrl(project.image ? `${process.env.REACT_APP_API_BASE_URL}/uploads/${project.image}` : '');

        setFormData({
          title: project.title || '',
          description: project.description || '',
          technologies: Array.isArray(project.technologies)
            ? project.technologies.join(', ')
            : project.technologies || '',
          githubLink: project.githubLink || '',
          liveDemoLink: project.liveDemoLink || '',
          image: null, // new image will be uploaded optionally
        });
      } catch (err) {
        setStatus('Failed to load project data.');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleChange = (e) => {
  const { name, value, files } = e.target;
    if (name === 'image') {
        const file = files[0];
        setFormData({ ...formData, image: file });
        if (file) {
        setNewImagePreview(URL.createObjectURL(file));
        } else {
        setNewImagePreview(null);
        }
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
    data.append(
      'technologies',
      JSON.stringify(formData.technologies.split(',').map((t) => t.trim()))
    );
    data.append('githubLink', formData.githubLink);
    data.append('liveDemoLink', formData.liveDemoLink);

    // Append image only if a new one was selected
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/projects/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setStatus('Project updated successfully!');
      // Optionally navigate back to projects list after update
      setTimeout(() => navigate('/admin/projects'), 1500);
    } catch (err) {
      setStatus('Error updating project.');
    }
  };

  if (loading) return <p>Loading project data...</p>;

  return (
    <div className="container my-5" style={{ maxWidth: '600px' }}>
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Edit Project</h2>
          {status && (
            <div
              className={`alert ${
                status.includes('successfully') ? 'alert-success' : 'alert-danger'
              }`}
              role="alert"
            >
              {status}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Project Title
              </label>
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
              <label htmlFor="description" className="form-label">
                Project Description
              </label>
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
              <label htmlFor="technologies" className="form-label">
                Technologies (comma-separated)
              </label>
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
              <label htmlFor="githubLink" className="form-label">
                GitHub Link
              </label>
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
              <label htmlFor="liveDemoLink" className="form-label">
                Live Demo Link (optional)
              </label>
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
              <label htmlFor="imageInput" className="form-label">
                Project Image (leave blank to keep current)
              </label>
              {currentImageUrl && !newImagePreview && (
                <div className="mb-3 text-center">
                    <img
                    src={currentImageUrl}
                    alt="Current Project"
                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                    className="img-fluid rounded"
                    />
                    <p className="text-muted mt-2">Current Image</p>
                    <button
                    type="button"
                    className="btn btn-outline-danger btn-sm mt-2"
                    onClick={() => {
                        setCurrentImageUrl('');
                        setFormData({ ...formData, image: null });
                    }}
                    >
                    Remove Image
                    </button>
                </div>
                )}
                {newImagePreview && (
                <div className="mb-3 text-center">
                    <img
                    src={newImagePreview}
                    alt="New Preview"
                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                    className="img-fluid rounded"
                    />
                    <p className="text-muted mt-2">New Image Preview</p>
                </div>
                )}

              <input
                type="file"
                id="imageInput"
                name="image"
                className="form-control"
                accept="image/*"
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Update Project
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProjectForm;
