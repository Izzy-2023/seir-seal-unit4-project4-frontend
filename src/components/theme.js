// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1c8dd4', // Custom color
    },
    secondary: {
      main: '#19857b', // Custom color
    },
    error: {
      main: '#ff1744', // Custom color
    },
    background: {
      default: '#ceeded', // Custom color
    },
  },
  // You can also customize typography, breakpoints, and more here
});

export default theme;
