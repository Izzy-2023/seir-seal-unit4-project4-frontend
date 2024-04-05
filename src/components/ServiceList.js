import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion, AccordionSummary, AccordionDetails, Button, Card, CardActions, CardContent, Grid, TextField, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ServiceList = () => {
    const [services, setServices] = useState([]);
    const [newService, setNewService] = useState({ name: '', description: '', price: '' });
    let navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8000/services/`)
            .then(response => response.json())
            .then(data => {
                console.log("Services fetched:", data); // For debugging
                setServices(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewService({ ...newService, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`http://localhost:8000/services/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newService),
        })
        .then(response => response.json())
        .then(data => {
            setServices([...services, data]);
            setNewService({ name: '', description: '', price: '' }); // Reset form fields
        })
        .catch(error => console.error('Error adding new service:', error));
    };

    const handleViewEditClick = (serviceId) => {
        navigate(`/services/${serviceId}`);
    };

    const handleBookAppointmentClick = (serviceId) => {
        navigate(`/services/${serviceId}/book`);
    };

    return (
        <>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Add New Service</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Name"
                            name="name"
                            value={newService.name}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Description"
                            name="description"
                            value={newService.description}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Price"
                            name="price"
                            type="number"
                            value={newService.price}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <Button type="submit" variant="contained" color="primary">
                            Add Service
                        </Button>
                    </form>
                </AccordionDetails>
            </Accordion>
            <Grid container spacing={2}>
                {services.map(service => (
                    <Grid item xs={12} sm={6} md={4} key={service.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {service.name}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    ${service.price}
                                </Typography>
                                <Typography variant="body2">
                                    {service.description}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => handleViewEditClick(service.id)}>View/Edit</Button>
                                <Button size="small" onClick={() => handleBookAppointmentClick(service.id)}>Book Appointment</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default ServiceList;



