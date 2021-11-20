import React from 'react'
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';


export default function CreateAPost() {
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
          <BottomNavigationAction label="Profil" icon={<PersonIcon  />} />
          <BottomNavigationAction label="Paramètres" icon={<SettingsIcon />} />

        </BottomNavigation>
      </Paper>
      {value === 0 && "Profil"}
      {value === 1 && "Paramètres"}
    </Box>
  );
}

