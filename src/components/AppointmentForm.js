import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AppointmentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Service ID from URL params.
  const [appointmentDate, setAppointmentDate] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [serviceDetails, setServiceDetails] = useState(null); // State to hold fetched service details.

  useEffect(() => {
    // Function to fetch service details based on the provided service ID.
    const fetchServiceDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/services/${id}/`);
        if (!response.ok) {
          throw new Error('Service details could not be fetched.');
        }
        const data = await response.json();
        setServiceDetails(data);
      } catch (error) {
        console.error('Error fetching service details:', error);
      }
    };

    fetchServiceDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/services/${id}/book/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          appointment_date: appointmentDate, // Ensure this is in the correct format.
        }),
      });

      if (!response.ok) {
        // Optionally handle errors more specifically based on response status or body.
        throw new Error('Failed to book appointment.');
      }

      alert('Appointment booked successfully!');
      navigate(`/services/${id}/confirmation`, { replace: true });
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Error booking appointment. Please try again.');
    }
  };

  return (
    <div>
      {serviceDetails && (
        <div>
          <h2>Booking for: {serviceDetails.name}</h2>
          <p>Description: {serviceDetails.description}</p>
          <p>Price: ${serviceDetails.price}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </label>
        <br />
        <label>
          Appointment Date:
          <input type="datetime-local" value={appointmentDate} onChange={e => setAppointmentDate(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
};

export default AppointmentForm;
