import './App.css';
import Container from '@mui/material/Container';
import Loader from '../loader/Loader';
import NavBar from '../navBar/NavBar';
import { useState } from 'react';

function App() {

  const [toggle, setToggle] = useState(false);

  setTimeout(() => {
    setToggle(true)
  }, 1000)
  return (
    <div className="App">
      
        {toggle ? <NavBar /> : <Container sx={{pt:2}}><Loader /></Container>}
     
    </div>
  );
}

export default App;
