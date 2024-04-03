import React from 'react';
import { Link } from 'react-router-dom';

const ServiceList = ({ services }) => {
  return (
    <div>
      <h2>Services</h2>
      {services.map(service => (
        <div key={service.id}>
          <h3>
            <Link to={`/services/${service.id}`}>{service.name}</Link>
          </h3>
          <p>{service.description}</p>
          <p>Price: {service.price}</p>
          <Link to={`/services/${service.id}/book`}>Book Appointment</Link>
        </div>
      ))}
    </div>
  );
};

export default ServiceList;






