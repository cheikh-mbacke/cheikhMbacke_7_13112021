import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import Login from '../pages/login/Login'
import Home from '../pages/home/Home'
import Logout from '../pages/logout/Logout'
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';


export default function NavBar() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef(null);

  //sx={{ position: 'fixed', top: 0, left: 0, right: 0 }}

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <CssBaseline />
      <Paper  elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
              console.log(newValue);

            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Connexion" icon={<LoginIcon />} />
          <BottomNavigationAction label="Inscription" icon={<LogoutIcon />} />
        </BottomNavigation>
      </Paper>
      {value === 0 && <Login />}
      {value === 1 && <Logout />}
    </Box>
  );
}

