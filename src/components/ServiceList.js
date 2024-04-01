import React, { useState, useEffect } from 'react';

const ServiceList = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/services/')
      .then(response => response.json())
      .then(data => setServices(data))
      .catch(error => console.error('Error fetching services:', error));
  }, []);

  return (
    <div>
      <h2>Services</h2>
      {services.map(service => (
        <div key={service.id}>
          <h3>{service.name}</h3>
          <p>{service.description}</p>
          <p>Price: {service.price}</p>
          <p>Duration: {service.duration}</p>
        </div>
      ))}
    </div>
  );
};

export default ServiceList;
