import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Typography from '@mui/material/Typography';
import {useNavigate} from "react-router-dom";


const drawerWidth = 270;

const items = [
    { label: 'Donnees de base', elements: ['Departement', 'Filiere', 'Module', 'Salle','Semmestre']},
    { label: 'Planification', elements: 'Planification'},
    { label: 'Supervision', elements: 'Supervision'},
    { label: 'Home Page', elements: 'HomePage'}];

interface KeyIndexedStructure {
    [key: string]: {label: string, contents: { label: string, route: string }[]}; // Define the structure with keys of type string and values of type string[]
}

// const menuContents: KeyIndexedStructure = {
//     "1": ['Données de base', ['Departement', 'Filière', 'Module', 'Salle','Semestre']],
//     "2": ['Planification', ['Enseignant', 'Ordonnancement', 'Présence', 'Cahier de texte']],
//     "3": ['Supervision', ['Validation', 'Gestion des droits', 'Attestations', 'Gestion des utilisateurs']]
// };

const menuContents: KeyIndexedStructure = {
    "1": {
        label: 'Données de base',
        contents: [
            {label: 'Departement', route:'departement'},
            {label: 'Filière', route: 'filiere'},
            {label: 'Module', route: 'module'},
            {label:'Salle', route: 'salle'},
            {label: 'Semestre', route: 'semestre'}
        ]
    },
    "2": {
        label: 'Planification',
        contents: [
            { label: 'Enseignant', route: 'enseignant' },
            { label: 'Ordonnancement', route: 'ordonnancement' },
            { label: 'Présence', route: 'presence' },
            { label: 'Cahier de texte', route: 'cahier-de-texte' }
        ]
    },
    "3": {
        label: 'Supervision',
        contents: [
            { label: 'Validation', route: 'validation' },
            { label: 'Gestion des droits', route: 'gestion-des-droits' },
            { label: 'Attestations', route: 'attestations' },
            { label: 'Gestion des utilisateurs', route: 'gestion-des-utilisateurs' }
        ]
    }
};

export default function ClippedDrawer(props: any) {

    const navigate = useNavigate();
    const handleNavigate = (path) => {
        console.log(path)
        navigate('/'+path);
    };
    return (
        <Box sx={{ display: 'flex' }} position="relative">
            <CssBaseline />
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                }}
            >
                <Toolbar />
                <Divider/>
                <Toolbar>
                    <Typography
                        textAlign="center"
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            // display: {xs: 'none', md: 'flex'},
                            fontFamily: 'monospace',
                            fontWeight: 900,
                            // letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}>{menuContents[props.id].label}</Typography>
                </Toolbar>
                <Divider/>
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {menuContents[props.id].contents.map((text) => (
                            <ListItem key={text.label} >
                                <ListItemButton onClick={() => handleNavigate(text.route)}>
                                    <ListItemIcon>
                                        <MailIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={text.label} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </Box>
    );
}