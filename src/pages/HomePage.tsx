//import React from 'react';
import { Box, Button, Typography } from "@mui/material";
//import HomeAppBar from "./HomeAppBar";
function HomePage() {

    return (

            <Box display="flex" justifyContent="center" alignItems="center" height="100vh" /*style={{ backgroundColor: '#7f7f80'}}*/>
                <p>
                    <Typography variant="h3" gutterBottom>

                        Bienvenue sur ma page d'accueil !

                    </Typography>

                    <Typography variant="subtitle1" gutterBottom>

                        Ici, vous pouvez trouver des informations sur moi -_-

                    </Typography>

                    <Button variant="contained" color="primary"  style={{ marginRight: '10px', width: '400px', height: '70px' }}>sign up</Button>

                    <Button variant="contained" color="secondary" style={{ marginRight: '10px', width: '400px', height: '70px' }}>login</Button>

                </p>
            </Box>




    );
}

export default HomePage;