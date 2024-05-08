import { useState } from 'react'
import SignIn from "../components/login/SignIn";
import SignUp from '../components/login/SignUp';
import auth from '../utils/auth'
import Grid from '@mui/material/Grid';
import Logo from '../assets/logo/florin-logo.png'

// Adjust for responsivity
const styles = {
    logo: {
      width: '100%',
      maxWidth: '700px',
      height: 'auto',
      marginTop: '10rem',
      marginLeft: '7rem'
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
            <Grid item xs={12} md={7}>
                <img src={Logo} alt="Logo" style={styles.logo} />
            </Grid>
            <Grid item xs={12} md={5}
                sx={{backgroundColor: 'black', height: '100vh', paddingLeft: '5rem', paddingRight: '5rem'}}>
                 {isSignUpMode ? <SignUp /> : <SignIn />}
                    <button onClick={handleToggleMode}>
                    {isSignUpMode ? 'Already have an account? Sign In' : 'New User? Sign Up'}
                </button>
                </Grid>
            </>
            )}
        </Grid>
    )
}
