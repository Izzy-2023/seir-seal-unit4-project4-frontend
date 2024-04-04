import React from 'react';
import { useLocation } from 'react-router-dom';

const ConfirmationPage = () => {
  const location = useLocation();
  const { serviceDetails, bookingDetails } = location.state || {};

  return (
    <div>
      <h2>Appointment Confirmed</h2>
      {serviceDetails && bookingDetails && (
        <>
          <p><strong>Service:</strong> {serviceDetails.name}</p>
          <p><strong>Description:</strong> {serviceDetails.description}</p>
          <p><strong>Price:</strong> ${serviceDetails.price}</p>
          <p><strong>First Name:</strong> {bookingDetails.firstName}</p>
          <p><strong>Last Name:</strong> {bookingDetails.lastName}</p>
          <p><strong>Email:</strong> {bookingDetails.email}</p>
          <p><strong>Appointment Date:</strong> {bookingDetails.appointmentDate}</p>
        </>
      )}
    </div>
  );
};

export default ConfirmationPage;

