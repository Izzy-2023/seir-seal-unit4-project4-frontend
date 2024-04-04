import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ServiceList = () => {
    const [services, setServices] = useState([]);
    const [newService, setNewService] = useState({ name: '', description: '', price: '' });
    let navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8000/services/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch services');
                }
                return response.json();
            })
            .then(data => setServices(data))
            .catch(error => console.error('Error fetching data: ', error));
    }, []);

    const handleViewEditClick = (serviceId) => {
        navigate(`/services/${serviceId}`);
    };

    const handleBookAppointmentClick = (serviceId) => {
        navigate(`/services/${serviceId}/book`);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewService(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8000/services/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newService),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to create service');
            }
            return response.json();
        })
        .then(data => {
            setServices([...services, data]);
            setNewService({ name: '', description: '', price: '' }); // Reset form
        })
        .catch(error => console.error('Error creating service:', error));
    };

    return (
        <div>
            <h2>Services</h2>
            <ul>
                {services.map(service => (
                    <li key={service.id}>
                        <strong>{service.name}</strong> - {service.description} - ${service.price}
                        <button onClick={() => handleViewEditClick(service.id)}>View/Edit</button>
                        <button onClick={() => handleBookAppointmentClick(service.id)}>Book Appointment</button>
                    </li>
                ))}
            </ul>
            <h3>Add New Service</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={newService.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                />
                <input
                    type="text"
                    name="description"
                    value={newService.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                />
                <input
                    type="number"
                    name="price"
                    value={newService.price}
                    onChange={handleChange}
                    placeholder="Price"
                    required
                />
                <button type="submit">Add Service</button>
            </form>
        </div>
    );
};

export default ServiceList;

