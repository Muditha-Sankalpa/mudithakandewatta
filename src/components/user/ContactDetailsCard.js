import React from "react";
import { FaEnvelope, FaPhone, FaGithub } from "react-icons/fa";

const ContactDetailsCard = () => {
  return (
    <div className="contact-card" style={{ textAlign: 'center', marginTop: '2rem' }}>
  <h3 style={{ color: 'gold' }}>Contact Info</h3>
  <p><FaEnvelope style={{ marginRight: '8px' }} /> mudithasankalpa3@gmail.com</p>
  <p><FaPhone style={{ marginRight: '8px' }} /> +94 70 201 1367</p>
  <p><FaGithub style={{ marginRight: '8px' }} /> <a href="https://github.com/Muditha-Sankalpa" target="_blank" rel="noopener noreferrer" style={{ color: 'gold' }}>GitHub</a></p>
</div>

  );
};

export default ContactDetailsCard;
