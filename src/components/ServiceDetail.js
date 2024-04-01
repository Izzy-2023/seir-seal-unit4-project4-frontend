import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/services/${id}/`)
      .then(response => response.json())
      .then(data => setService(data))
      .catch(error => console.error('Error fetching service:', error));
  }, [id]);

  return (
    <div>
      {service ? (
        <div>
          <h2>{service.name}</h2>
          <p>{service.description}</p>
          <p>Price: {service.price}</p>
          <p>Duration: {service.duration}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ServiceDetail;
