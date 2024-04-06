// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './components/theme'; // Assuming you have a theme.js for your MUI theme
import ServiceList from './components/ServiceList';
import ServiceDetail from './components/ServiceDetail';
import AppointmentForm from './components/AppointmentForm';
import ConfirmationPage from './components/ConfirmationPage';
import Header from './components/Header'; // Import the Header component

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Header /> {/* Place the Header component here */}
                <Routes>
                    <Route path="/" element={<ServiceList />} />
                    <Route path="/services" element={<ServiceList />} />
                    <Route path="/services/:id" element={<ServiceDetail />} />
                    <Route path="/services/:id/book" element={<AppointmentForm />} />
                    <Route path="/services/:id/confirmation" element={<ConfirmationPage />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;


