// src/components/Header.js

import React from 'react';
import { Typography, Container, Box } from '@mui/material';

const Header = () => {
    return (
        <Box 
          sx={{ 
              backgroundColor: '#1976d2', 
              color: 'white', 
              py: 3, 
              textAlign: 'center' // Add this line to center text
          }}
        >
            <Container maxWidth="lg">
                <Typography variant="h4" component="h1" gutterBottom>
                   Welcome to Izzy Tech Consulting
                </Typography>
                <Typography variant="subtitle">
                    Navigate the Future with Confidence
                </Typography>
            </Container>
        </Box>
    );
};

export default Header;

