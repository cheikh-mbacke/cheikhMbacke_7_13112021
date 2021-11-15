import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import LanguageIcon from '@mui/icons-material/Language';
import AccountMenu from '../accountMenu/AccountMenu'
import {Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import './NavBar.css'

export default function NavBar() {

  const [toggle, setToggle] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);


  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Mon compte</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {toggle ? 
      <Box>
        <MenuItem>
          <IconButton size="large" aria-label="show 4 new mails" color="inherit">
            <LoginIcon />
          </IconButton>
            <Link to="Login" className="links">
                Connexion
            </Link>
        </MenuItem>
        <MenuItem>
          <IconButton size="large" aria-label="show 4 new mails" color="inherit">
            <AppRegistrationIcon />
          </IconButton>
            <Link to="Logout" className="links">
                Inscription
            </Link>
          
      </MenuItem>
      </Box>
      :
      <div>
        <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem  sx={{bgColor: 'primary.main'}}>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem >
        
        <AccountMenu />

        <p>Profil</p>
      </MenuItem>
      </div>
      }
    </Menu>
  );
  //sx={{background: '#fff'}}> 
  return (
    <Box sx={{ flexGrow: 1}} >
      <AppBar position="static" sx={{background: '#fff'}} >
        <Toolbar>
        <LanguageIcon sx={{color: 'primary.main' }}/>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: {xs: '1em', sm: "0"}, color: 'primary.main' }}
          >
            <Link to="/" className="links">
                Groupomania
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', sm: 'flex'}}}>
              
            {toggle ?
            <div>
        
                <Link to="Login" className="links">
                  <Button variant="outlined" sx={{mr: "1em"}} >
                    Se connecter
                  </Button>
                </Link>
             
                <Link to="Logout" className="links">
                  <Button variant="contained">
                    S'inscrire
                  </Button>
                </Link>
              
            </div>
            :
              <div>
                <IconButton size="large" aria-label="show 4 new mails" sx={{color:'primary.main'}}>
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              sx={{color:'primary.main'}}
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <AccountMenu />
              </div>
            }
            
          </Box>
          <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
              sx={{color:'primary.main'}}
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

