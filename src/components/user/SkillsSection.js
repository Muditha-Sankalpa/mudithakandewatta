import React, { useState } from "react";
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJsSquare, FaGitAlt, FaJava, FaPython, FaPhp, FaDatabase, FaLinux, FaGithub, FaEnvelope, FaPhone } from 'react-icons/fa';
import { SiC, SiCplusplus, SiMongodb, SiMysql, SiOracle, SiPostman, SiFigma, SiCanva, SiAdobephotoshop, SiAdobelightroom, SiAdobeacrobatreader, SiMicrosoftsqlserver, SiApachetomcat, SiApache, SiMicrosoftoffice, SiNumpy, SiBootstrap, SiExpress, SiLinux } from 'react-icons/si';

const categorizedSkills = {
  Programming: [
    { name: 'C', icon: <SiC size={36} color="#A8B9CC" /> },
    { name: 'C++', icon: <SiCplusplus size={36} color="#00599C" /> },
    { name: 'Java', icon: <FaJava size={36} color="#5382a1" /> },
    { name: 'JavaScript', icon: <FaJsSquare size={36} color="#F7DF1E" /> },
    { name: 'Python', icon: <FaPython size={36} color="#3776AB" /> },
    { name: 'PHP', icon: <FaPhp size={36} color="#8892BE" /> }
  ],
  Frontend: [
    { name: 'React', icon: <FaReact size={36} color="#61DBFB" /> },
    { name: 'HTML5', icon: <FaHtml5 size={36} color="#E34F26" /> },
    { name: 'CSS3', icon: <FaCss3Alt size={36} color="#1572B6" /> },
    { name: 'Bootstrap', icon: <SiBootstrap size={36} color="#7952B3" /> }
  ],
  Backend: [
    { name: 'Node.js', icon: <FaNodeJs size={36} color="#3C873A" /> },
    { name: 'Express.js', icon: <SiExpress size={36} color="#000" /> },
    { name: 'Apache', icon: <SiApache size={36} color="#D22128" /> },
    { name: 'Apache Tomcat', icon: <SiApachetomcat size={36} color="#F8DC75" /> }
  ],
  Database: [
    { name: 'MongoDB', icon: <SiMongodb size={36} color="#47A248" /> },
    { name: 'MySQL', icon: <SiMysql size={36} color="#4479A1" /> },
    { name: 'Oracle', icon: <SiOracle size={36} color="#F80000" /> },
    { name: 'MS SQL Server', icon: <FaDatabase  size={36} color="#CC2927" /> }
  ],
  Tools: [
    { name: 'Git', icon: <FaGitAlt size={36} color="#F05032" /> },
    { name: 'GitHub', icon: <FaGithub size={36} color="white" /> },
    { name: 'Postman', icon: <SiPostman size={36} color="#FF6C37" /> },
    { name: 'Linux Terminal', icon: <SiLinux size={36} color="#FCC624" /> },
    { name: 'MS Office', icon: <FaDatabase  size={36} color="#D83B01" /> },
    { name: 'LibreOffice Calc', icon: <FaDatabase  size={36} color="#18A303" /> }
  ],
  Design: [
    { name: 'Canva', icon: <SiCanva size={36} color="#00C4CC" /> },
    { name: 'Figma', icon: <SiFigma size={36} color="#F24E1E" /> },
    { name: 'Adobe Photoshop', icon: <SiAdobephotoshop size={36} color="#31A8FF" /> },
    { name: 'Adobe Lightroom', icon: <SiAdobelightroom size={36} color="#31A8FF" /> },
    { name: 'Adobe Acrobat Reader', icon: <SiAdobeacrobatreader size={36} color="#FF0000" /> }
  ],
  Libraries: [
    { name: 'NumPy', icon: <SiNumpy size={36} color="#013243" /> }
  ]
};


const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAll, setShowAll] = useState(false);

  const allSkills = Object.values(categorizedSkills).flat();

  const displayedSkills =
    activeCategory === 'All'
      ? allSkills
      : categorizedSkills[activeCategory] || [];

  const limitedSkills = showAll ? displayedSkills : displayedSkills.slice(0, 6);

  return (
    <section id="skills" className="section">
      <h2>Skills</h2>

      <div className="category-filters">
        <button onClick={() => setActiveCategory('All')} className={activeCategory === 'All' ? 'active' : ''}>All</button>
        {Object.keys(categorizedSkills).map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)} className={activeCategory === cat ? 'active' : ''}>
            {cat}
          </button>
        ))}
      </div>

      <div className="skills-gallery">
        {limitedSkills.map((skill, index) => (
          <div key={`${skill.name}-${index}`} className="skill-card">
            <div className="skill-icon">{skill.icon}</div>
            <p className="skill-name">{skill.name}</p>
          </div>
        ))}
      </div>

      {displayedSkills.length > 6 && (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button onClick={() => setShowAll(prev => !prev)} className="btn btn-primary btn-sm">
            {showAll ? 'View Less' : 'View More'}
          </button>
        </div>
      )}

      <style>{`
        .skills-gallery {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: 1rem;
        justify-items: center;
        padding: 0 1rem;
        }

        .skill-card {
        background-color: #00264d;
        border: 1px solid gold;
        border-radius: 8px;
        padding: 0.75rem;
        text-align: center;
        width: 100px;
        height: 120px;
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: transform 0.3s;
        }

        .skill-card:hover {
        transform: scale(1.05);
        }

        .skill-icon {
        margin-bottom: 0.3rem;
        }

        .skill-icon svg {
        width: 32px;
        height: 32px;
        }

        .skill-name {
        font-size: 0.8rem;
        color: white;
        margin-top: auto;
        }

        .category-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
          margin-bottom: 1.5rem;
        }
        .category-filters button {
          padding: 0.5rem 1rem;
          background-color: transparent;
          border: 1px solid gold;
          color: gold;
          font-weight: 600;
          cursor: pointer;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }
        .category-filters button:hover,
        .category-filters button.active {
          background-color: gold;
          color: #001f3f;
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;
