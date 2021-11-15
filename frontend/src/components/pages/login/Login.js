import DisplayLoadingContent from '../../displayLoadingContent/DisplayLoadingContent';
import LoadMainContent from '../../loadContents/LoadMainContent'
import Container from '@mui/material/Container';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import DecoColumn from './logDecoCol.jpg'
import './Login.css'
import CircularProgress from '@mui/material/CircularProgress';
export default function Login() {
    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false,
      });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmitting = () => {
        setLoading(true) 
        setTimeout(() => {
            setLoading(false)
            setOpen(true)
        }, 2000)
    }

    return (

         <DisplayLoadingContent loadingContent={< LoadMainContent/>}>
             <Box className="loginContainer">

                <Box id="imgCol" >
                    <img src={DecoColumn} style={{maxWidth: "100%"}} alt="décoration de la page login"/>
                </Box>

             <Container className="formContainer">
                <h1>Connexion</h1>      
                <form>
                <Box sx={{mb: 2}}>
                    <FormControl sx={{width: '30ch'}} variant="filled">
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <FilledInput
                            
                            autoFocus
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
                    <Button variant="contained" sx={{width: '32ch', mb: 2}} size="large" disabled={open} onClick={() => handleSubmitting() }endIcon={<SendRoundedIcon/>}>
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
                        sx={{ mb: 2 }}
                        >
                            Mot de passe incorrect !
                        </Alert>
                    </Collapse>
                    <Box>
                        <Collapse sx={{textAlign: 'center', width: '30ch', mt:1}} in={loading}>
                            <CircularProgress />
                        </Collapse >
                    </Box>
                    </Box>
                    
                </Box>

                </form>
             </Container>
             </Box>
         </DisplayLoadingContent>
    )
}
