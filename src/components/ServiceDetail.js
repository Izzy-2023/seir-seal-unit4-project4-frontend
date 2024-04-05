import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Grid } from '@mui/material';

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
        .then(() => {
            alert('Service updated successfully');
            navigate(`/services/${id}`);
        })
        .catch(error => console.error('Error updating service:', error));
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Edit Service</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={service.name}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            multiline
                            rows={4}
                            value={service.description}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Price"
                            name="price"
                            type="number"
                            value={service.price}
                            onChange={handleChange}
                            required
                            InputProps={{
                                step: 0.01,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">Save Changes</Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default ServiceDetail;








