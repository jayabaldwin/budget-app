import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import LayoutNav from "./components/layout/LayoutNav.jsx";
import Landing from "./pages/Landing.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Finances from "./pages/Finances.jsx";
import History from "./pages/History.jsx";
import Profile from "./pages/Profile.jsx";
import Settings from "./pages/Settings.jsx";
import NoMatch from "./pages/NoMatch.jsx";

function App() {
  return (
    <>
      <Router>
       <CssBaseline/>
        <Routes>
          <Route index element={<Landing />} />
       
          <Route path="home" element={<LayoutNav />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="finance" element={<Finances />} />
            <Route path="history" element={<History />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

// import './App.css'
// import LayoutNav from './components/layout/LayoutNav.jsx'
// import CssBaseline from '@mui/material/CssBaseline';

// function App() {
//   return (
//     <>
//     {/* <ThemeProvider theme={theme}> */}
//       <CssBaseline />
//       <main>
//         <LayoutNav />
//       </main>
//     {/* </ThemeProvider> */}
//     </>
//   );
// }

// export default App;
