import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ServiceList from './components/ServiceList';
import ServiceDetail from './components/ServiceDetail';
import AppointmentForm from './components/AppointmentForm';
import ConfirmationPage from './components/ConfirmationPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ServiceList />} />
                <Route path="/services" element={<ServiceList />} />
                <Route path="/services/:id" element={<ServiceDetail />} />
                <Route path="/services/:id/book" element={<AppointmentForm />} />
                <Route path="/services/:id/confirmation" element={<ConfirmationPage />} />
            </Routes>
        </Router>
    );
};

export default App;



