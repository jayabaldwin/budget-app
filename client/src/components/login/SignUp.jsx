import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function Notification({ message, handleClose }) {
  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
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

function Signup(props) {
  const [formState, setFormState] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [addUser, { error }] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (formState.password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long');
      setOpenSnackbar(true);
      return;
    }

    try {
      const mutationResponse = await addUser({
        variables: {
          firstname: formState.firstname,
          lastname: formState.lastname,
          email: formState.email,
          password: formState.password,
        },
      });
      const token = mutationResponse.data.addUser.token;
      Auth.login(token);
    } catch (error) {
      setErrorMessage('Invalid sign up credentials');
      setOpenSnackbar(true);
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
      sx={{ marginTop: '10rem' }}
      noValidate
      autoComplete="off"
    >
      <form
        onSubmit={handleFormSubmit}
        className='loginForm'
      >
        <Stack spacing={2}>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: 'flex-start' }}>
            Account Creation.
          </Typography>
          <TextField
            required
            id="outlined-required"
            label="First Name"
            name='firstname'
            onChange={handleChange}
          />
          <TextField
            required
            id="outlined-required"
            label="Last Name"
            name='lastname'
            onChange={handleChange}
          />
          <TextField
            required
            error={formState.email.length > 5 && !isValidEmail(formState.email)}
            id="outlined-required"
            label="Email"
            name='email'
            onChange={handleChange}
          />
          <TextField
            error={formState.password.length > 0 && formState.password.length < 8}
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="Password"
            name='password'
            onChange={handleChange}
          />
          <Button
            variant="contained"
            type="submit"
            endIcon={<SendIcon />}
          >
            Make My Account!
          </Button>
        </Stack>
      </form>
      {openSnackbar && <Notification message={errorMessage} handleClose={handleCloseSnackbar} />}
    </Box>
  );
}

export default Signup;

