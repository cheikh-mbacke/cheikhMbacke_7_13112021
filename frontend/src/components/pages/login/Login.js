/* React components */
import {useState, useEffect} from 'react'

/* customized components */
import DecoColumn from './logDecoCol.jpg'
import './Login.css'
import Home from '../home/Home';
import NavBar from '../../navigation/NavBar'
/* Material UI Components */
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import CircularProgress from '@mui/material/CircularProgress';

/* Material UI Icons */
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import CloseIcon from '@mui/icons-material/Close';



export default function Login() {

    /* Declarations */
    const [values, setValues] = useState({
      email: '',
      password: '',
      showPassword: false,
    })
    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    }
    const handleClickShowPassword = () => {
      setValues({
        ...values,
        showPassword: !values.showPassword,
      })
    }
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    }
    const [open, setOpen] = useState(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const [submit, setSubmit] = useState(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const [userCredential, setUserCredential] = useState({})
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    //eslint-disable-next-line react-hooks/exhaustive-deps
    const [items, setItems] = useState([]);

    

    
    /* Retreive credential datas from the API*/
    useEffect(() => {
      if(submit){
        fetch("http://localhost:3001/api/auth/login", {
            method: "POST",
            headers: {
            Accept: 'application/json',
            "Content-Type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({...userCredential})
        })
        .then(res => res.json())
        .then(
          (result) => {
            setTimeout(() =>{
              setOpen(true)
              setIsLoaded(false);
            }, 2000)
            
            setItems([result]);
            setSubmit(false)
          },
          (error) => {
            setTimeout(() =>{
              setOpen(true)
              setIsLoaded(false);
            }, 2000)
            setError(error);
            setSubmit(false)
          }
        )
      }
    }, [submit])

    if(items.length > 0 && items[0].error === undefined){
        return(
           <Home idUser={items[0].userId} token={items[0].token}/>
        )
    }

        return(         
            <Box className="loginContainer">
                <Box id="imgCol" >
                    <img src={DecoColumn} style={{maxWidth: "100%"}} alt="décoration de la page login"/>
                </Box>
                <Container className="formContainer">
                    <h1>Connexion</h1>      
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const user = {
                                email: e.target.elements.email.value,
                                password: e.target.elements.password.value
                            }
                            setIsLoaded(true)
                            setUserCredential(user)
                            setSubmit(true)
                            setError(null)}
                        }>
                            <Box sx={{mb: 2}}>
                                <FormControl sx={{width: '30ch'}} variant="filled">
                                    <InputLabel htmlFor="email">Email</InputLabel>
                                    <FilledInput
                                        required
                                        autoFocus
                                        name="email"
                                        id="email"
                                        type="text"
                                        value={values.email}
                                        onChange={handleChange('email')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <EmailRoundedIcon />
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </Box>
                            <Box sx={{mb: 2}}>
                                <FormControl sx={{width: '30ch' }} variant="filled">
                                    <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                                    <FilledInput
                                        required
                                        name="password"
                                        id="filled-adornment-password"
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        onChange={handleChange('password')}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                            >
                                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </Box>
                            <Box>
                                <Button type="submit" variant="contained" sx={{width: '32ch', mb: 2}} size="large" disabled={open} endIcon={<SendRoundedIcon/>}>
                                    Se connecter
                                </Button>
                                <Box sx={{width: "30ch"}} id="Collapses">
                                    <Collapse in={open}>
                                        <Alert
                                            variant="outlined"
                                            severity="error"
                                            action={
                                                <IconButton
                                                    aria-label="close"
                                                    color="inherit"
                                                    size="small"
                                                    onClick={() => setOpen(false)}
                                                >
                                                    <CloseIcon fontSize="inherit" />
                                                </IconButton>
                                            }
                                            sx={{ mb: 2, overflowWrap: 'anywhere' }}
                                        >
                                           
                                           {error !== null && "Erreur : " + error.message }
                                           {items.length > 0 && items[0].token }
                                           {items.length > 0 && items[0].error }
    
                                        </Alert>
                                    </Collapse>
                                    <Box>
                                        <Collapse sx={{textAlign: 'center', width: '30ch', mt:1}} in={isLoaded}>
                                            <CircularProgress />
                                         </Collapse >
                                    </Box>
                                </Box>
                            </Box>
                        </form>
                </Container>
            </Box>
            )
    
    
}
  