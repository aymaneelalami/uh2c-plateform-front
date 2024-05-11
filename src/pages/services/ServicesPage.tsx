import { AppBar, CssBaseline, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';

const ServicesPage : React.FC = () => {

  const fixedAppBarHeight = 68;

    return ( 
      <>
      <CssBaseline />
      <AppBar position="static" style={{ marginTop: fixedAppBarHeight }}>
      <Toolbar variant="dense">
        <Typography variant="subtitle1" noWrap component="div">
          Services - APIs
        </Typography>
         {/* IconButton with an icon aligned to the right */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={() => { console.log('IconButton clicked'); }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      </AppBar>
      </>
    );
};

export default ServicesPage;