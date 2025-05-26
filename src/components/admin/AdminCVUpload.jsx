// src/components/user/AdminCVUpload.jsx
import React, { useState } from 'react';

const AdminCVUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setMessage('');
    setError('');
    const selected = e.target.files[0];
    if (selected && selected.type === 'application/pdf') {
      setFile(selected);
    } else {
      setError('Please select a PDF file.');
      setFile(null);
    }
  };

  const handleUpload = async () => {
    setMessage('');
    setError('');
    if (!file) {
      setError('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('cv', file);

    try {
      const res = await fetch('/api/admin/upload-cv', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');

      setMessage('CV uploaded successfully!');
      setFile(null);
      document.getElementById('cv-input').value = ''; // reset input
    } catch (err) {
      setError('Upload failed. Try again.');
    }
  };

  return (
    <div className="admin-cv-upload">
      <h2>Upload CV</h2>
      <input
        id="cv-input"
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
      />
      <button onClick={handleUpload} className="btn" disabled={!file}>
        Upload
      </button>
      {message && <p className="message success">{message}</p>}
      {error && <p className="message error">{error}</p>}

      <style>{`
        .admin-cv-upload {
          background-color: #001f3f;
          padding: 2rem;
          border-radius: 8px;
          max-width: 400px;
          margin: 2rem auto;
          color: white;
          text-align: center;
          box-shadow: 0 0 10px gold;
        }

        input[type="file"] {
          margin: 1rem 0;
          color: gold;
        }

        .btn {
          background-color: gold;
          color: #001f3f;
          padding: 0.6rem 1.2rem;
          border: none;
          border-radius: 4px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
          margin-top: 1rem;
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn:hover:not(:disabled) {
          background-color: #c9a100;
          color: white;
        }

        .message {
          margin-top: 1rem;
          font-weight: 600;
        }
        .success {
          color: #00ff00;
        }
        .error {
          color: #ff4d4d;
        }
      `}</style>
    </div>
  );
};

export default AdminCVUpload;
