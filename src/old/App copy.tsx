import React, { useState } from 'react';
import { CssBaseline, Box, Drawer, List, ListItem, ListItemText, Divider, Toolbar, AppBar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import EntityFormWithFields from './forms/EntityFormWithFields'; // Adjust the path based on your file structure

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { styled } from '@mui/material/styles';
import CollapsibleList from './CollapsibleList';
import ResponsiveAppBar from './layouts/ResponsiveAppBar';

const drawerWidth = 240;

function App() {
  const [selectedEntity, setSelectedEntity] = useState(null);

  const [entities, setEntities] = useState([
    { id: '1', name: 'Account', key: 'account', domain: 'Finance', fields: [ { name: "w", key: "ww", type: "Integer" } ] },
    { id: '2', name: 'Employee', key: 'employee', domain: 'HR', fields: [] }
    // Add more entities as needed
  ]);
  
  const groupEntitiesByDomain = (entities: any[]) => {
    return entities.reduce((acc, entity) => {
      acc[entity.domain] = acc[entity.domain] || [];
      acc[entity.domain].push(entity);
      return acc;
    }, {});
  };
  
  const entitiesGroupedByDomain = groupEntitiesByDomain(entities);

  const handleEntitySelect = (entity) => {
      setSelectedEntity(entity);
      // Additional actions, e.g., navigate to a detail view or open a modal
  };


  return (
    <>

    <ResponsiveAppBar />


    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} enableColorOnDark>
        <Toolbar variant="dense">
          <Typography variant="h6" noWrap component="div">
            Builder
          </Typography>
        </Toolbar>
      </AppBar>

      {/* <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ overflow: 'auto', width: 240 }}>

          <CollapsibleList entitiesGroupedByDomain={entitiesGroupedByDomain} handleEntitySelect={handleEntitySelect} />
            

          </Box>
        </Box>

      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <EntityFormWithFields entity={selectedEntity}  />
      </Box> */}
      
    </Box>
    </>
  );
}

export default App;
