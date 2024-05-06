import SignIn from "../components/login/SignIn";
import SignUp from '../components/login/SignUp';
import auth from '../utils/auth'
import Dashboard from "./Dashboard";
import LayoutNav from '../components/layout/LayoutNav'

// : display forms  
export default function Landing() {

    const isLoggedIn = auth.loggedIn()

    return (
        <div>
          {isLoggedIn ? (
            <>
              <LayoutNav />
              <Dashboard />
            </>
          ) : (
            <>
                <SignIn />
                <SignUp />
            </>
          )}
        </div>
      );
    }

 
