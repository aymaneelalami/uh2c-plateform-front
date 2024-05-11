
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ResponsiveAppBar from './layouts/ResponsiveAppBar';
import ServicesPage from './pages/services/ServicesPage';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme  } from '@mui/material/styles';
import NewEntity from './pages/builder/NewEntity';
import { Provider } from 'react-redux';
import compstore from './redux/Store';
import Domain from './pages/domains/Domain';
import Departement from './pages/Departement';
import HomePage from "./pages/HomePage.tsx";
import MODULE from "./pages/Module.tsx";
import Box from '@mui/material/Box';


function App() {

  const theme = createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: {
            root: {
                fontSize: '0.875rem',
            },
        },
      },
    },
  });

  return (
    <>

    <Provider store={compstore}>

        <ThemeProvider theme={theme}>

            <CssBaseline />

            <ResponsiveAppBar />
            <Box style={{ height: '50%', width: '70%', marginLeft:'0%', marginRight: '20%'}}>
            <Routes>
                <Route path="/departement" element={<Departement />} />
                <Route path="/filiere" element={<ServicesPage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/module" element={<MODULE />} />
                <Route path="/builder/newEntity" element={<NewEntity />} />
                <Route path="/builder/domains" element={<Domain />} />
            </Routes>
            </Box>
        </ThemeProvider>
    </Provider>

    </>
  );
}

export default App;
