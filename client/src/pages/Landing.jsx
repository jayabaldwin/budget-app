import SignIn from "../components/login/SignIn";
// import SignUp from '../components/login/SignUp';
import auth from '../utils/auth'
import Dashboard from "./Dashboard";
import LayoutNav from '../components/layout/LayoutNav'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Logo from '../assets/logo/florin-logo.png'
// import Card from '@mui/material/Card';


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

    return (
        <Grid container>
            {isLoggedIn ? (
                <>
                <LayoutNav />
                <Box mt={10}>
                  <Dashboard />
                </Box>
            </>
            ) : (
            <>
            <Grid item xs={12} md={7}>
                <img src={Logo} alt="Logo" style={styles.logo} />
            </Grid>
            <Grid item xs={12} md={5}
                sx={{backgroundColor: 'black', height: '100vh', paddingLeft: '5rem', paddingRight: '5rem'}}>
                <SignIn />
            </Grid>
            </>
            )}
        </Grid>
    )
}
        
    //   <Box
    //       display="flex"
    //       justifyContent="center"
    //       alignItems="center"
    //       minHeight="80vh"
    //   >
        //   {isLoggedIn ? (
            //   <>
            //       <LayoutNav />
            //       <Box mt={10}>
            //         <Dashboard />
            //       </Box>
            //   </>
    //       ) : (
    //           <Card>
    //               <SignIn />
    //               <SignUp />
    //           </Card>
    //       )}
    //   </Box>
    //   );
    // }

 
