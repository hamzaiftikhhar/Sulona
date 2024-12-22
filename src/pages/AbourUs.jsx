import React, { useState, useEffect } from 'react';
import Footer from '../component/Footer/Footer';
import './AboutUs.css';

const CountUpNumber = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        setCount(Math.min(Math.floor(end * progress), end));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <>{count}</>;
};


const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
    <div className="about-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to SOLUNA</h1>
          <p className="hero-subtitle">
            Crafting comfort and style for every step of your journey.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="story-section">
        <div className="story-grid">
          <div className="story-content">
            <h2>Our Story</h2>
            <p>
              Founded in 2020, SOLUNA was born from a passion for combining contemporary design with exceptional comfort. We believe that great footwear should not only look stunning but also provide the perfect foundation for your daily adventures.
            </p>
            <p>
              Our commitment to quality and innovation has made us a trusted name in footwear, serving customers who appreciate both style and substance.
            </p>
          </div>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">
                {isVisible && <CountUpNumber end={10000} />}
                {isVisible && '+'}
              </div>
              <p className="stat-label">Happy Customers</p>
            </div>
            <div className="stat-item">
              <div className="stat-number">
                {isVisible && <CountUpNumber end={500} />}
                {isVisible && '+'}
              </div>
              <p className="stat-label">Products</p>
            </div>
            <div className="stat-item">
              <div className="stat-number">
                {isVisible && <CountUpNumber end={50} />}
                {isVisible && '+'}
              </div>
              <p className="stat-label">Brands</p>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <p className="stat-label">Support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="values-section">
        <div className="values-container">
          <h2 className="values-title">Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Quality First</h3>
              <p>
                We carefully curate our collection to ensure every pair meets our high standards for materials and craftsmanship.
              </p>
            </div>
            <div className="value-card">
              <h3>Customer Focus</h3>
              <p>
                Your satisfaction is our priority. We're committed to providing exceptional service and support at every step.
              </p>
            </div>
            <div className="value-card">
              <h3>Sustainability</h3>
              <p>
                We're dedicated to reducing our environmental impact through responsible sourcing and eco-friendly practices.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="team-section">
        <h2 className="team-title">Meet Our Team</h2>
        <div className="team-grid">
          {[
            {
              name: 'Sarah Johnson',
              role: 'Founder & CEO',
              image: 'images/commentor-item3.jpg'
            },
            {
              name: 'Michael Chen',
              role: 'Head of Design',
              image: 'images/commentor-item1.jpg'
            },
            {
              name: 'Emma Davis',
              role: 'Customer Experience',
              image: 'images/commentor-item2.jpg'
            }
          ].map((member, index) => (
            <div key={index} className="team-member">
              <img src={member.image} alt={member.name} />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="contact-section">
        <div className="contact-container">
          <h2 className="contact-title">Get in Touch</h2>
          <p className="contact-description">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
          <div className="contact-info">
            <p><span>Email:</span> contact@soluna.com</p>
            <p><span>Phone:</span> +1 (555) 123-4567</p>
            <p><span>Address:</span> 123 Fashion Street, Style City, ST 12345</p>
          </div>
        </div>
      </div>
    </div>
    
    <Footer/>
    </>

  );
};

export default AboutUs;