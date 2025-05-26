// src/components/admin/ProjectsList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link,useNavigate  } from 'react-router-dom';

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/projects');
        setProjects(res.data);
      } catch (err) {
        setError('Failed to fetch projects.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/projects/${id}`);
      setProjects(projects.filter(project => project._id !== id));
    } catch (err) {
      alert('Failed to delete project.');
    }
  };

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Projects List</h2>
        <Link to="/admin/projects/add" className="btn btn-primary">
          + Add New Project
        </Link>
      </div>
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <div className="row">
          {projects.map((project) => (
            <div key={project._id} className="col-md-6 mb-4">
              <div className="card h-100">
                {project.image && (
                  <img
                    src={`http://localhost:5000/uploads/${project.image}`} // Adjust path as needed
                    className="card-img-top"
                    alt={project.title}
                    style={{ maxHeight: '200px', objectFit: 'cover' }}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{project.title}</h5>
                  <p className="card-text flex-grow-1">
                    {project.description.length > 100
                      ? project.description.substring(0, 100) + '...'
                      : project.description}
                  </p>
                  <p>
                    <strong>Technologies:</strong>{' '}
                    {Array.isArray(project.technologies)
                      ? project.technologies.join(', ')
                      : project.technologies}
                  </p>
                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <div>
                        <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-sm me-2"
                        >
                        GitHub
                        </a>
                        {project.liveDemoLink && (
                        <a
                            href={project.liveDemoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-success btn-sm"
                        >
                            Live Demo
                        </a>
                        )}
                    </div>
                    <div className="d-flex flex-column gap-2">
                        <button
                        className="btn btn-warning btn-sm"
                        onClick={() => navigate(`/admin/edit-project/${project._id}`)}
                        >
                        Edit
                        </button>
                        <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(project._id)}
                        >
                        Delete
                        </button>
                    </div>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsList;
