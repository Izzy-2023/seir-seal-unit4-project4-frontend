import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Grid, Card, CardContent, Typography } from '@mui/material';

const AppointmentForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [appointmentDate, setAppointmentDate] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Assuming appointment creation logic here
        alert('Appointment created successfully!');
        navigate(`/services/${id}`);
    };

    return (
        <Card sx={{ p: 2, margin: 'auto', maxWidth: 500 }}>
            <CardContent>
                <Typography variant="h6">Book an Appointment</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="First Name"
                                value={firstName}
                                onChange={e => setFirstName(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Last Name"
                                value={lastName}
                                onChange={e => setLastName(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Appointment Date"
                                type="datetime-local"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={appointmentDate}
                                onChange={e => setAppointmentDate(e.target.value)}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Book Appointment
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    );
};

export default AppointmentForm;


