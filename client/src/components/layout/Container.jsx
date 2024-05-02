import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../../pages/Dashboard.jsx'
import Finances from '../../pages/Finances.jsx'
import History from '../../pages/History.jsx'
import Profile from '../../pages/Profile.jsx'
import Settings from '../../pages/Settings.jsx'
import NoMatch from '../../pages/NoMatch.jsx';


export default function Container() {
 return (
    <Router>
        <div>
          <StoreProvider>
            
            <Routes>
              <Route 
                path="/Dashboard" 
                element={<Dashboard />} 
              />
              <Route 
                path="/Finances" 
                element={<Finances />} 
              />
              <Route 
                path="/History" 
                element={<History />} 
              />
              <Route 
                path="/Profile" 
                element={<Profile />} 
              />
              <Route 
                path="/Settings" 
                element={<Settings />} 
              />
              <Route 
                path="*" 
                element={<NoMatch />} 
              />

            </Routes>
          </StoreProvider>
        </div>
      </Router>
 )
}