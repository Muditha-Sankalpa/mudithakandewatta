import React, { useState } from 'react';
import axios from 'axios';

const CvUploadForm = () => {
  const [cvFile, setCvFile] = useState(null);
  const [status, setStatus] = useState('');

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
      const res = await axios.post('http://localhost:5000/api/admin/cv-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setStatus('CV uploaded successfully!');
      setCvFile(null);
      e.target.reset(); // Reset file input
    } catch (err) {
      setStatus('Upload failed. Please try again.');
    }
  };

  return (
    <div className="container my-4" style={{ maxWidth: '400px' }}>
      <h3 className="mb-3">Upload CV</h3>
      {status && (
        <div
          className={`alert ${status.includes('successfully') ? 'alert-success' : 'alert-danger'}`}
          role="alert"
        >
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
    </div>
  );
};

export default CvUploadForm;
