import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AppointmentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [date, setDate] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/services/${id}/book/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date, firstName, lastName, email }),
      });
      if (!response.ok) {
        throw new Error('Failed to book appointment');
      }
      navigate(`/services/${id}/confirmation`, { replace: true });
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Date:
        <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
      </label>
      <label>
        First Name:
        <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required />
      </label>
      <label>
        Last Name:
        <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </label>
      <button type="submit">Book Appointment</button>
    </form>
  );
};

export default AppointmentForm;
