import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import { ADD_USER } from '../../utils/mutations';

const styles = {
  contactFrame: {
    backgroundColor: '#ffffff6b',
    borderRadius: '15px',
    padding: '30px',
    marginTop: '20px',
    width: '100%',
    maxWidth: '600px'
  }
};

function Signup(props) {
  
  const [formState, setFormState] = useState({
    email: '', 
    password: ''
  });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
      const mutationResponse = await addUser({
        variables: {
          firstname: formState.firstname,
          lastname: formState.lastname,
          email: formState.email,
          password: formState.password,
        },
      });
    console.log(mutationResponse);
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const {name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  

  return (
    <Box
      sx={{marginTop: '10rem'}}
      noValidate
      autoComplete="off"
    >
        <form 
          onSubmit={handleFormSubmit}
          className='loginForm'
          style={styles.contactFrame}
          >
          <Stack spacing={2}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
             Account Creation!
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
              id="outlined-required"
              label="Email"
              name='email'
              onChange={handleChange}

            />
            <TextField
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
              endIcon={<SendIcon />}>
                Make My Account!
            </Button>
          </Stack>
        </form>
    </Box>
  );
}

export default Signup;
