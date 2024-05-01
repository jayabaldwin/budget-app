import { Outlet } from 'react-router-dom';
// import { ThemeProvider } from '@mui/material/styles';
// import theme from './theme/theme.js'
import './App.css'
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  return (
    <>
    {/* <ThemeProvider theme={theme}> */}
      <CssBaseline />
      <main>
        <Outlet />
      </main>
    {/* </ThemeProvider> */}
    </>
  );
}

export default App;
