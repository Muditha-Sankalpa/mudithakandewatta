import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CvUploadForm = () => {
  const [cvFile, setCvFile] = useState(null);
  const [status, setStatus] = useState('');
  const [cvUrl, setCvUrl] = useState('');

  useEffect(() => {
    fetchCurrentCv();
  }, []);

  const fetchCurrentCv = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/admin/cv`);
      setCvUrl(res.data.cvUrl); // Adjust this according to your API response shape
    } catch (err) {
      console.error('Failed to fetch current CV');
    }
  };

  const handleFileChange = (e) => {
    setCvFile(e.target.files[0]);
    setStatus('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cvFile) {
      setStatus('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('cvFile', cvFile);

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/admin/cv-upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setStatus('CV uploaded successfully!');
      setCvFile(null);
      fetchCurrentCv();
      e.target.reset();
    } catch (err) {
      setStatus('Upload failed. Please try again.');
    }
  };

  return (
    <div className="container my-4" style={{ maxWidth: '500px' }}>
      <h3 className="mb-3">Upload CV</h3>
      {status && (
        <div className={`alert ${status.includes('successfully') ? 'alert-success' : 'alert-danger'}`} role="alert">
          {status}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Upload CV
        </button>
      </form>

      {cvUrl && (
        <div className="mt-4">
  <h5>Current CV</h5>
  <a
    href={`${process.env.REACT_APP_API_BASE_URL}${cvUrl}`}
    target="_blank"
    rel="noopener noreferrer"
    className="btn btn-outline-secondary"
  >
    View CV
  </a>

  <div className="mt-2">
    <iframe
      src={`${process.env.REACT_APP_API_BASE_URL}${cvUrl}`}
      width="100%"
      height="500px"
      title="Current CV"
      style={{ border: '1px solid #ccc' }}
    ></iframe>
  </div>
</div>

      )}
    </div>
  );
};

export default CvUploadForm;
