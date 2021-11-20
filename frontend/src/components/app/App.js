import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from '../pages/login/Login'
import Logout from '../pages/logout/Logout'
import Navs from '../navBar/NavBar'
import Error404 from '../pages/error404/Error404'
import Home from '../pages/home/Home'
import Box from '@mui/material/Box';
import CreateAPost from '../createAPost/CreateAPost';
import DisplayPost from '../displayPost/DisplayPost'
import Membre from '../membre/Membre'
function App() {

  return (
    <div className="App">     
        
        <BrowserRouter>
          <Box>
            <Navs />
          </Box>
          <Routes> 
            <Route path="/" element={<Login />} />
            <Route path="Login" element={<Login />} /> 
            <Route path="/:userId" element={<Home />} />
            <Route path="Logout" element={<Logout />} />
            <Route path="CreateAPost" element={<CreateAPost />} />
            <Route path="DisplayPost" element={<DisplayPost />} />
            <Route path="Membre" element={<Membre />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </BrowserRouter>
        
    </div>
  );
}

export default App;
