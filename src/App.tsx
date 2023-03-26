import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// import logo from './logo.svg';
import './App.css';
import WeatherPage from './pages/WeatherPage';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <main>
        <WeatherPage />
      </main>
    </ThemeProvider>
  );
}

export default App;

