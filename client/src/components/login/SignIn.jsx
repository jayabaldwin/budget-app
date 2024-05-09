import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../utils/mutations';
import Auth from '../../utils/auth';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send'
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function Notification({ message, handleClose }) {
  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Snackbar
    open={true}
    autoHideDuration={3000}
    onClose={handleClose}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
  >
    <SnackbarContent
      message={message}
      action={action}
      style={{ backgroundColor: '#673ab7', color: '#ffffff' }} // Change the background color here
    />
  </Snackbar>
  );
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default function SignIn(props) {
  const [formState, setFormState] = useState ({email: '', password: ''});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (formState.password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long');
      setOpenSnackbar(true);
      return;
    }

    try {
      const mutationResponse = await login({
          variables:{
            email: formState.email,
            password: formState.password,
          }
        });
        const token = mutationResponse.data.login.token;
        Auth.login(token);
        console.log(token);      
    } catch (error) {
      setErrorMessage('Invalid login credentials');
      setOpenSnackbar(true);
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{marginTop: '10rem'}}
      noValidate
      autoComplete="off" >
      <div>
        <form
            onSubmit={handleFormSubmit}>
          <Stack spacing={2}>
          <Typography
            variant="h4" 
            component="div" 
            sx={{ flexGrow: 1, textAlign: 'flex-start' }}>
             Login.
          </Typography>
            <TextField
              required
              error={formState.email.length > 5 && !isValidEmail(formState.email)}
              id="outlined-required"
              label="Email"
              type="email"
              name='email'
              defaultValue=""
              onChange={handleChange}
            />
            <TextField
              error={formState.password.length > 0 && formState.password.length < 8}
              id="outlined-password-input"
              label="Password"
              type="password"
              name='password'
              autoComplete="current-password"
              onChange={handleChange}

            />
            <Button 
                variant="contained"
                type="submit" 
                endIcon={<SendIcon />}>
                  Login!
            </Button>
          </Stack>
        </form>
      </div>
      {openSnackbar && <Notification message={errorMessage} handleClose={handleCloseSnackbar} />}
    </Box>
  );
}
