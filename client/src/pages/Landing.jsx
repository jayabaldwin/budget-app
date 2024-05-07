import SignIn from "../components/login/SignIn";
import SignUp from '../components/login/SignUp';
import auth from '../utils/auth'
import Dashboard from "./Dashboard";
import LayoutNav from '../components/layout/LayoutNav'
import Card from '@mui/material/Card';
import { Box } from '@mui/system';


export default function Landing() {

    const isLoggedIn = auth.loggedIn()

    return (
      <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="80vh"
      >
          {isLoggedIn ? (
              <>
                  <LayoutNav />
                  <Box mt={10}>
                    <Dashboard />
                  </Box>
              </>
          ) : (
              <Card>
                  <SignIn />
                  <SignUp />
              </Card>
          )}
      </Box>
      );
    }

 
