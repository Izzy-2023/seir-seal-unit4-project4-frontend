import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ServiceDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [service, setService] = useState({ name: '', description: '', price: '' });

    useEffect(() => {
        fetch(`http://localhost:8000/services/${id}/`)
            .then(response => response.json())
            .then(data => setService(data))
            .catch(error => console.error('Error fetching service:', error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setService(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8000/services/${id}/`, {
            method: 'PUT', // or 'PATCH'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(service),
        })
        .then(response => response.json())
        .then(data => {
            alert('Service updated successfully');
            navigate(`/services/${id}`);
        })
        .catch(error => console.error('Error updating service:', error));
    };

    return (
        <div>
            <h2>Edit Service</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={service.name} onChange={handleChange} required />
                </label>
                <label>
                    Description:
                    <textarea name="description" value={service.description} onChange={handleChange} required />
                </label>
                <label>
                    Price:
                    <input type="number" name="price" value={service.price} onChange={handleChange} required step="0.01" />
                </label>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default ServiceDetail;







