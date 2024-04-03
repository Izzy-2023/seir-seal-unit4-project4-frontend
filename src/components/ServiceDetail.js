import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ServiceDetail = () => {
    const { id } = useParams();
    const [service, setService] = useState(null);
    const [appointment, setAppointment] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8000/services/${id}/`)
            .then(response => response.json())
            .then(data => setService(data))
            .catch(error => console.error('Error fetching service:', error));

        fetch(`http://localhost:8000/services/${id}/appointment/`)
            .then(response => response.json())
            .then(data => setAppointment(data))
            .catch(error => console.error('Error fetching appointment:', error));
    }, [id]);

    return (
        <div>
            {service ? (
                <div>
                    <h2>{service.name}</h2>
                    <p>{service.description}</p>
                    <p>Price: {service.price}</p>
                </div>
            ) : (
                <p>Loading service...</p>
            )}
            {appointment ? (
                <div>
                    <h3>Appointment Details</h3>
                    <p>Date: {appointment.appointment_date}</p>
                    <p>Status: {appointment.status}</p>
                </div>
            ) : (
                <p>Loading appointment...</p>
            )}
        </div>
    );
};

export default ServiceDetail;




