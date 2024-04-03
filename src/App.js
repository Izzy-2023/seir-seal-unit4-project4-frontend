import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ServiceList from './components/ServiceList';
import ServiceDetail from './components/ServiceDetail';
import AppointmentForm from './components/AppointmentForm';
import ConfirmationPage from './components/ConfirmationPage';

const App = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/services/')
            .then(response => response.json())
            .then(data => setServices(data))
            .catch(error => console.error('Error fetching services:', error));
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<ServiceList services={services} />} />
                <Route path="/services" element={<ServiceList services={services} />} />
                <Route path="/services/:id" element={<ServiceDetail />} />
                <Route path="/services/:id/book" element={<AppointmentForm />} />
                <Route path="/services/:id/confirmation" element={<ConfirmationPage />} />
            </Routes>
        </Router>
    );
};

export default App;


