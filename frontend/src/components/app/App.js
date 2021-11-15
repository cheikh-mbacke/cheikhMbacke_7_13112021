import './App.css';
import DisplayLoadingContent from '../displayLoadingContent/DisplayLoadingContent';
import LoadNavBarContent from '../loadContents/LoadNavBarContent'
import NavBar from '../navBar/NavBar';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from '../pages/login/Login'
import Logout from '../pages/logout/Logout'
import Error404 from '../pages/error404/Error404'
import Home from '../pages/home/Home'

function App() {

  
  return (
    <div className="App">     
        
        <BrowserRouter>
        <DisplayLoadingContent loadingContent={<LoadNavBarContent />}>
          <NavBar /> 
        </DisplayLoadingContent>
          <Routes>
          <Route path="/" element={<Home />} />
            <Route path="Login" element={<Login />} />
            <Route path="Logout" element={<Logout />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </BrowserRouter>
        
    </div>
  );
}

export default App;
