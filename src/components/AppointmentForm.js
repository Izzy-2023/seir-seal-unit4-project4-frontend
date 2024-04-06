import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Grid, Card, CardContent, Typography, Container } from '@mui/material';

const AppointmentForm = () => {
    const navigate = useNavigate();
    const { id } = useParams(); 
    const [service, setService] = useState(null); 
    const [appointmentDate, setAppointmentDate] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchServiceDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8000/services/${id}/`);
                if (!response.ok) {
                    throw new Error('Service details could not be fetched.');
                }
                const data = await response.json();
                setService(data); 
            } catch (error) {
                console.error('Error fetching service details:', error);
            }
        };

        fetchServiceDetails();
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const bookAppointmentUrl = `http://localhost:8000/services/${id}/book/`; 

        // Adjusting keys to match Django model fields (snake_case)
        const appointmentDetails = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            appointment_date: appointmentDate, // Ensure this is in ISO format if needed
        };

        fetch(bookAppointmentUrl, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(appointmentDetails),
        })
        .then(response => {
            if (!response.ok) {
                // If there's an error, parse the JSON for detailed error messages
                return response.json().then(data => {
                    throw new Error('Failed to book the appointment: ' + JSON.stringify(data));
                });
            }
            return response.json();
        })
        .then(data => {
            console.log('Appointment booked successfully:', data);
            alert('Appointment booked successfully!');
            navigate(`/`); 
        })
        .catch(error => {
            console.error('Error booking the appointment:', error);
            alert(error.message);
        });
    };

    return (
        <Container maxWidth="sm">
            <Card sx={{ mt: 4 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>Book an Appointment</Typography>
                    {service && (
                        <>
                            <Typography variant="h6">{service.name}</Typography>
                            <Typography color="textSecondary">{service.description}</Typography>
                            <Typography color="textSecondary" gutterBottom>Price: ${service.price}</Typography>
                        </>
                    )}
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField fullWidth label="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Appointment Date" type="datetime-local" InputLabelProps={{ shrink: true }} value={appointmentDate} onChange={e => setAppointmentDate(e.target.value)} required />
                            </Grid>
                        </Grid>
                        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
                            Book Appointment
                        </Button>
                    </form>
                </CardContent>
                <Button variant="outlined" onClick={() => navigate('/')} sx={{ m: 2 }}>
                    Go Back
                </Button>
            </Card>
        </Container>
    );
};

export default AppointmentForm;
