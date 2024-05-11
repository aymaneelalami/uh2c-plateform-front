import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import AppsIcon from '@mui/icons-material/Apps';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SchoolIcon from '@mui/icons-material/School';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClippedDrawer from "./ResponsiveSideMenu.tsx";
import {Button} from "@mui/material";

const pages = [
    { label: 'Données de base', route: 'DonneesDeBase'},
    { label: 'Planification', route: 'Planification'},
    { label: 'Supervision', route: 'Supervision'}
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

//

const menuContents = [
    { id: "1", label: 'Données de base', route: 'DonneesDeBase'},
    { id: "2", label: 'Planification', route: 'Planification'},
    { id: "3", label: 'Supervision', route: 'Supervision'}
];

function ResponsiveAppBar() {

    const navigate = useNavigate();

    const [selectedItem, setSelectedItem] = useState('Services');


    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);


    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleNavigate = (path: string) => {
        console.log(path)
        navigate('/'+path);
        handleCloseNavMenu();
    };

    const handleMenuItemClick = (item) => {
        console.log(item.page);
        setSelectedItem(item.page);
        handleCloseNavMenu();
    };

    // Function to generate button style based on selection
    const getButtonStyle = (itemName) => ({
        // Example conditional styling: change color if selected
        color: selectedItem === itemName.page ? 'secondary' : 'inherit',
    });

    //
    const [contentId, setContentId] = React.useState("0");

    const handleClick = (id: string) => {
        setContentId(id)
    };

    return (
        <>
            <AppBar position="relative" style={{backgroundColor: '#000'}}
                    sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
                <Container maxWidth="false">
                    <Toolbar disableGutters>

                        <SchoolIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            //onClick={() => handleClick("0")}
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 900,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                //cursor: 'pointer',
                            }}
                        >
                            UH2 Plateform
                        </Typography>

                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <AppsIcon/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: {xs: 'block', md: 'none'},
                                }}
                            >
                                {/*{pages.map((page) => (*/}
                                {/*    <MenuItem key={page.route} onClick={() => handleNavigate(page.route)}>*/}
                                {/*        <Typography textAlign="center">{page.label}</Typography>*/}
                                {/*    </MenuItem>*/}
                                {/*))}*/}
                                {menuContents.map((menuContent) => (
                                    <MenuItem key={menuContent.label} onClick={() => handleClick(menuContent.id)}>
                                        <Typography textAlign="center">{menuContent.label}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <SchoolIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            //onClick={() => handleClick("0")}
                            sx={{
                                mr: 2,
                                display: {xs: 'flex', md: 'none'},
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                // cursor: 'pointer',
                            }}
                        >
                            UH2 Plateform
                        </Typography>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <AppsIcon/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: {xs: 'none', md: 'block'},
                                }}
                            >
                                {/*{pages.map((page) => (*/}
                                {/*    <MenuItem key={page.route} onClick={() => handleNavigate(page.route)}>*/}
                                {/*        <Typography textAlign="center">{page.label}</Typography>*/}
                                {/*    </MenuItem>*/}
                                {/*))}*/}
                                {menuContents.map((menuContent) => (
                                    <MenuItem key={menuContent.label} onClick={() => handleClick(menuContent.id)}>
                                        <Typography textAlign="center">{menuContent.label}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                            {/*{pages.map((page) => (*/}
                            {/*  <Button*/}
                            {/*    color="secondary"*/}
                            {/*    key={page.route}*/}
                            {/*    onClick={() => handleNavigate(page.route)}*/}
                            {/*    //onClick={() => handleMenuItemClick({page})}*/}
                            {/*    style={getButtonStyle('Services')}*/}
                            {/*    sx={{ my: 2, ml: 4, color: 'white', display: 'block' }}*/}
                            {/*  >*/}
                            {/*    {page.label}*/}
                            {/*  </Button>*/}
                            {/*))}*/}
                        </Box>
                        <Box sx={{flexGrow: 0}}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                    </Toolbar>

                </Container>
            </AppBar>

            {contentId != '0' && <ClippedDrawer id={contentId}/>}

        </>
    );
}

export default ResponsiveAppBar;