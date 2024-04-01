import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const AppointmentForm = () => {
  const { id } = useParams();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send appointment booking request to Django backend
    fetch(`http://localhost:8000/services/${id}/book/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
