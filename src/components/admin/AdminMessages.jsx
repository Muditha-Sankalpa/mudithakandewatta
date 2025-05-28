import React, { useEffect, useState } from 'react';

function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/api/messages`)
      .then(res => res.json())
      .then(data => {
        const msgsWithStatus = data.map(msg => ({
          ...msg,
          status: msg.status || 'new',
        }));
        setMessages(msgsWithStatus);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    try {
        await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/messages/${id}`, {
        method: 'DELETE',
        });

        setMessages(prev => prev.filter(msg => msg._id !== id));
    } catch (err) {
        alert('Failed to delete the message. Please try again.');
    }
    };

  const handleStatusChange = async (id, newStatus) => {
  try {
    await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/messages/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });

    // Update local state only if backend update succeeds
    setMessages(prev =>
      prev.map(msg =>
        msg._id === id ? { ...msg, status: newStatus } : msg
      )
    );
  } catch (err) {
    alert('Failed to update status. Please try again.');
  }
};


  if (loading) return <p className="text-center my-5">Loading messages...</p>;

  if (messages.length === 0) return <p className="text-center my-5">No messages found.</p>;

  const getRowClass = (status) => {
    switch (status) {
      case 'new':
        return 'table-success';
      case 'read':
        return 'table-danger';
      case 'responded':
        return 'table-light';
      default:
        return '';
    }
  };

  return (
    <div className="container my-5">
  <h2 className="container mb-4">Messages</h2>
<div className="table-responsive">
    <table className="table table-bordered align-middle text-center">
      <thead className="table-secondary">
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Message</th>
          <th>Received At</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {messages.map(msg => (
          <tr key={msg._id} className={getRowClass(msg.status)}>
            <td>{msg.name}</td>
            <td>{msg.email}</td>
            <td>{msg.message}</td>
            <td>{new Date(msg.createdAt).toLocaleString()}</td>
            <td>
              <select
                className="form-select form-select-sm"
                value={msg.status}
                onChange={e => handleStatusChange(msg._id, e.target.value)}
              >
                <option value="new">New</option>
                <option value="read">Read</option>
                <option value="responded">Responded</option>
              </select>
            </td>
            <td>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(msg._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
}

export default AdminMessages;
