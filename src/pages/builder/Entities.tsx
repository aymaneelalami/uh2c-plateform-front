import { AppBar, Box, Button, Container, CssBaseline, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';
import FullFeaturedTable from '../../components/FullFeaturedTable';
import { useNavigate } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';

const Entities : React.FC = () => {

  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    console.log(path)
    navigate('/Builder/'+path);
    //handleCloseNavMenu();
  };

  const fixedAppBarHeight = 68;

    // // Your columns and rows
    // const columns = [
    //   { id: 'name', label: 'Name', minWidth: 170, isSortable: true },
    //   { id: 'age', label: 'Age', minWidth: 100, align: 'right', isSortable: true },
    //   { id: 'job', label: 'Job Title', minWidth: 170, isSortable: true },
    // ];

    // const rows = [
    //   { name: 'Alice', age: 32, job: 'Engineer' },
    //   { name: 'Bob', age: 45, job: 'Designer' },
    //   { name: 'Charlie', age: 37, job: 'Manager' },
    //   // Add more data as needed
    // ];

    return ( 
        <>

            <CssBaseline />

            <AppBar position="static" style={{ marginTop: fixedAppBarHeight }}>
              <Toolbar variant="dense" style={{ justifyContent: 'space-between' }}>
                <Typography variant="subtitle1" noWrap component="div">
                  Builder - Entities
                </Typography>
                <Box>
                  <Button
                    variant="outlined"
                    sx={{
                      //backgroundColor: '#1769aa', // Set the button's background color to black
                      color: 'white', // Set the text color to white for contrast
                      '&:hover': {
                        backgroundColor: '#2196f3', // Optional: Change on hover
                      },
                    }}
                    startIcon={<MenuIcon />} // Use startIcon for leading icon, endIcon for trailing icon
                    onClick={() => handleNavigate("domains")}
                  >
                    Go to domains
                  </Button>
                  <Button
                  variant="outlined"
                  sx={{
                    //backgroundColor: '#1769aa', // Set the button's background color to black
                    color: 'white', // Set the text color to white for contrast
                    '&:hover': {
                      backgroundColor: '#2196f3', // Optional: Change on hover
                    },
                  }}
                  startIcon={<AddIcon />} // Use startIcon for leading icon, endIcon for trailing icon
                  onClick={() => handleNavigate("newEntity")}
                >
                  New entity
                </Button>
                </Box>
              </Toolbar>
            </AppBar>

{/* 
            <Container maxWidth="xl" sx={{ mt: '20px' }}>
              <FullFeaturedTable columns={columns} rows={rows} />
            </Container> */}

        </>
    );
};

export default Entities;