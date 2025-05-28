import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SkillsSection from './SkillsSection';
import ContactDetailsCard from './ContactDetailsCard';

const PortfolioPage = () => {
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [projectsError, setProjectsError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/projects`);
        setProjects(res.data.reverse());
      } catch (error) {
        setProjectsError('Failed to load projects.');
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchProjects();
  }, []);

const handleSubmit = async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value,
  };

  try {
    await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/messages`, data);
    alert('Thank you for contacting me! I will get back to you soon.');
    form.reset();
  } catch (error) {
    alert('Failed to send message. Please try again later.');
  }
};

  return (
    <>
      <main className="container">
        {/* About Me Section */}
        <section id="about" className="section">
          <h2>About Me</h2>
          <div className="about-content">
            <img
              src="/IMG_3800.PNG"
              alt="Muditha Kandewatta"
              className="about-image"
            />
            <div className="about-text">
              <p>
                Hello! I'm <strong>Muditha Kandewatta</strong>, a passionate full-stack developer specializing
                in MERN stack applications. I love crafting interactive and visually appealing web experiences.
              </p>
              <p>
                With a strong foundation in full-stack development and data analysis, I thrive at the intersection 
                of technology and problem-solving. I specialize in building modern web applications using the MERN 
                stack. Beyond academics, I value teamwork, continuous learning, and creating impactful digital 
                experiences. My goal is to innovate and contribute to meaningful projects that make a real-world
                 difference.
              </p>
            </div>
          </div>
        </section>

        {/* Download CV Section */}
        <section id="download-cv" className="section">
        <h2>Download CV</h2>
        <div className="contact-card" style={{ textAlign: 'center' }}>
            <p>You can download my latest CV here:</p>
            <a
            href={`${process.env.REACT_APP_API_BASE_URL}/uploads/cv/Muditha_Kandewatta_CV.pdf`}
            download
            className="btn btn-primary btn-lg"
            >
            Download CV
            </a>
        </div>
        </section>


        {/* Skills Section */}
        <SkillsSection />


        {/* Projects Section */}
        <section id="projects" className="section">
          <h2>Projects</h2>
          {loadingProjects ? (
            <p>Loading projects...</p>
          ) : projectsError ? (
            <p className="text-danger">{projectsError}</p>
          ) : projects.length === 0 ? (
            <p>No projects found.</p>
          ) : (
            <Swiper
              modules={[Navigation, Pagination, A11y]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              loop={true}
              style={{ paddingBottom: '40px' }}
            >
              {projects.map((project) => (
                <SwiperSlide key={project._id}>
                  <div className="project-card">
                    {project.image && (
                      <img
                        src={`${process.env.REACT_APP_API_BASE_URL}/uploads/${project.image}`}
                        alt={project.title}
                        className="project-image"
                      />
                    )}
                    <div className="project-content">
                      <h3>{project.title}</h3>
                      <p>
                        {project.description.length > 120
                          ? project.description.substring(0, 120) + '...'
                          : project.description}
                      </p>
                    
                        <div className="tech-badges">
                        {Array.isArray(project.technologies)
                            ? project.technologies.map((tech, index) => (
                                <span key={index} className="tech-pill">
                                {tech}
                                </span>
                            ))
                            : (
                                <span className="tech-pill">{project.technologies}</span>
                            )}
                        </div>
                      <div className="project-links">
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary btn-sm"
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
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </section>

        {/* Contact Section */}
        <section id="contact" className="section">
        <h2>Contact</h2>
        <div className="contact-card">
            <p>Feel free to reach out to me by filling the form below:</p>
            <form onSubmit={handleSubmit} className="contact-form">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required placeholder="Your name" />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required placeholder="you@example.com" />

            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows="5" required placeholder="Your message"></textarea>

            <button type="submit" className="btn btn-primary btn-lg">
                Send Message
            </button>
            </form>
        </div>
        </section>

        <section id="contact">
        <ContactDetailsCard />
      </section>
      <p>&copy; 2025 Muditha Kandewatta. All rights reserved.</p>
      </main>

      <style>{`
          main.container {
          max-width: 900px;
          margin: 3rem auto;
          padding: 0 1rem;
          color: white;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        section.section {
          margin-bottom: 4rem;
        }

        section h2 {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          text-align: center;
          color: gold;
          text-shadow: 0 0 3px rgba(255, 215, 0, 0.8);
        }

        /* About Me */
        .about-content {
          display: flex;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
          justify-content: center;
          text-align: left;
          font-size: 0.9rem;
        }
        .about-image {
          width: 180px;
          height: 180px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid gold;
          box-shadow: 0 0 12px 3px rgba(255, 215, 0, 0.6);
        }
        .about-text {
          max-width: 600px;
          line-height: 1.6;
          color: #f5f5dc; /* beige for softer text */
        }

        /* Download CV */
        #download-cv p {
          text-align: center;
          font-size: 0.9rem;
          margin-bottom: 1rem;
          color: #eee;
        }
        .btn-lg {
          padding: 0.75rem 1.5rem;
          font-size: 0.9rem;
          font-weight: 700;
          display: block;
          margin: 0 auto;
          width: max-content;
        }

        /* Skills */
        .skills-list {
          list-style: none;
          padding: 0;
          max-width: 600px;
          margin: 0 auto;
          columns: 2;
          column-gap: 3rem;
          font-size: 0.5rem;
        }
        .skills-list li {
          margin-bottom: 0.8rem;
          position: relative;
          padding-left: 1.4rem;
        }
        .skills-list li::before {
          content: "★";
          position: absolute;
          left: 0;
          color: gold;
          font-size: 0.5rem;
          line-height: 1;
        }

        /* Project Section Styles (existing) */
        .project-card {
          background: rgba(0, 0, 0, 0.65);
          border: 2px solid gold;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 0 12px 3px rgba(255, 215, 0, 0.5);
          display: flex;
          flex-direction: column;
          max-width: 80%;
          margin: 8px auto;
        }

        .tech-badges {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-top: 0.3rem;
            }

            .tech-pill {
            background-color: rgba(255, 215, 0, 0.1);
            color: gold;
            border: 1px solid gold;
            padding: 0.3rem 0.7rem;
            border-radius: 999px;
            font-size: 0.85rem;
            font-weight: 600;
            user-select: none;
            white-space: nowrap;
            }

        .project-image {
          width: 100%;
          height: 320px;
          object-fit: cover;
          border-bottom: 2px solid gold;
          transition: transform 0.4s ease, opacity 0.4s ease;
        }

        .project-card:hover .project-image {
          transform: scale(1.05); /* Slight zoom */
          opacity: 0.95;
        }

        .project-content {
          padding: 1rem 1.2rem;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          flex-grow: 1;
        }

        .project-content h3 {
          margin: 0;
          color: gold;
          font-weight: 400;
          text-shadow: 0 0 6px rgba(255, 215, 0, 0.7);
        }

        .project-content p {
          margin: 0;
          line-height: 1.4;
          font-size: 0.9rem;
        }

        .project-links {
          margin-top: auto;
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        /* Buttons */
        .btn {
          padding: 0.5rem 1rem;
          font-weight: 600;
          border-radius: 5px;
          text-decoration: none;
          cursor: pointer;
          border: none;
          display: inline-block;
          transition: background-color 0.3s ease;
          user-select: none;
        }

        .btn-primary {
          background-color: gold;
          color: #001f3f;
        }
        .btn-primary:hover {
          background-color: #c9a100;
          color: white;
        }
        .btn-success {
          background-color: #28a745;
          color: white;
        }
        .btn-success:hover {
          background-color: #218838;
        }

        .btn-sm {
          font-size: 0.9rem;
          padding: 0.4rem 0.8rem;
        }

        /* Swiper navigation buttons */
        .swiper-button-prev,
        .swiper-button-next {
          color: gold;
          filter: drop-shadow(0 0 4px rgba(255,215,0,0.7));
        }

        .swiper-pagination-bullet {
          background: gold;
          opacity: 0.8;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          box-shadow: 0 0 8px 2px gold;
        }

        /* Contact Form */
        .contact-card {
            background: rgba(255, 215, 0, 0.07);
            border: 2px solid gold;
            border-radius: 12px;
            padding: 2rem;
            box-shadow: 0 0 15px 3px rgba(255, 215, 0, 0.3);
            margin: 1rem auto;
            max-width: 700px;
        }
        .contact-form {
          max-width: 600px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          font-size: 0.9rem;
        }
        .contact-form label {
          font-weight: 600;
          color: gold;
        }
        .contact-form input,
        .contact-form textarea {
          padding: 0.6rem 1rem;
          border-radius: 5px;
          border: none;
          font-size: 0.9rem;
          font-family: inherit;
          resize: vertical;
        }
        .contact-form input:focus,
        .contact-form textarea:focus {
          outline: 2px solid gold;
          background-color: #f9f5d7;
          color: #001f3f;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .about-content {
            flex-direction: column;
            text-align: center;
          }
          .skills-list {
            columns: 1;
          }
          .btn-lg {
            width: max-content;
            margin: 0 auto;
          }

        }
        @media (max-width: 600px) {
          .project-image {
            height: 180px;
          }
          section h2 {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </>
  );
};

export default PortfolioPage;
