import React from 'react';
import { useParams } from 'react-router-dom';

const ConfirmationPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Appointment Confirmed</h2>
      {/* Display confirmation details */}
    </div>
  );
};

export default ConfirmationPage;
