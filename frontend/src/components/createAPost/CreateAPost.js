import React from 'react'
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import PostAddIcon from '@mui/icons-material/PostAdd';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import PostText from './PostText'
import PostVideo from './PostVideo'
import PostLink from './PostLink'


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
          <BottomNavigationAction label="Post" icon={<PostAddIcon />} />
          <BottomNavigationAction label="Images & Vidéo" icon={<CropOriginalIcon />} />
          <BottomNavigationAction label="Lien" icon={<InsertLinkIcon />} />

        </BottomNavigation>
      </Paper>
      {value === 0 && <PostText />}
      {value === 1 && <PostVideo />}
      {value === 2 && <PostLink />}
    </Box>
  );
}

