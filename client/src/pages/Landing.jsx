import { useState } from 'react'
import SignIn from "../components/login/SignIn";
import SignUp from '../components/login/SignUp';
import auth from '../utils/auth'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Logo from '../assets/logo/florin-logo.png'
import { padding } from '@mui/system';

// Adjust for responsivity
const styles = {
    logo: {
      width: 'auto',
      maxWidth: '100%', 
      height: 'auto',
      padding: '30px',
    },
  }

export default function Landing() {

    const isLoggedIn = auth.loggedIn()
    const [isSignUpMode, setIsSignUpMode] = useState(true);

    const handleToggleMode = () => {
        setIsSignUpMode(!isSignUpMode)
    };

    return (
        <Grid container>
            {isLoggedIn ? (
                window.location.assign("/home")
            ) : (
            <>
            <Grid item sx={{display: 'flex', alignItems: 'center'}} sm={12} md={7}>
                <img src={Logo} alt="Logo" style={styles.logo} />
            </Grid>
            <Grid item sm={12} md={5}
                sx={{backgroundColor: 'black', height: '100vh', paddingLeft: '5rem', paddingRight: '5rem'}}>
                 {isSignUpMode ? <SignUp /> : <SignIn />}
                    <Button onClick={handleToggleMode} 
                    sx={{background: 'transparent', color: '#ffffff'}}>
                    {isSignUpMode ? 'Already have an account? Sign In' : 'New User? Sign Up'}
                </Button>
                </Grid>
            </>
            )}
        </Grid>
    )
}
