import { AppBar, Box, Button, Container, CssBaseline, IconButton, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import FullFeaturedTable from '../../components/FullFeaturedTable';
import MenuIcon from '@mui/icons-material/Menu';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from 'react-router-dom';
import EntityFormWithFields from '../../forms/EntityFormWithFields';

const NewEntity : React.FC = () => {
  
  const [selectedEntity, setSelectedEntity] = useState(null);

  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    console.log(path)
    navigate('/Builder/'+path);
    //handleCloseNavMenu();
  };

  const fixedAppBarHeight = 68;

  function saveEntity(): void {
    throw new Error('Function not implemented.');
  }

    return ( 
        <>

            <CssBaseline />

            <AppBar position="static" style={{ marginTop: fixedAppBarHeight }}>
              <Toolbar variant="dense" style={{ justifyContent: 'space-between' }}>
                <Typography variant="subtitle1" noWrap component="div">
                  Builder - New entity
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
                  startIcon={<SaveIcon />} // Use startIcon for leading icon, endIcon for trailing icon
                  onClick={() => saveEntity()}
                >
                  Save
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
                  startIcon={<MenuIcon />} // Use startIcon for leading icon, endIcon for trailing icon
                  onClick={() => handleNavigate("")}
                >
                  Go to Entities
                </Button>
                </Box>
              </Toolbar>
            </AppBar>


            <Container maxWidth="xl" sx={{ mt: '20px' }}>
              <EntityFormWithFields entity={selectedEntity}  />
            </Container>

        </>
    );
};

export default NewEntity;