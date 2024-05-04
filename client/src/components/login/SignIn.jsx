// imports needed for MUI
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send'
import { paperClasses } from '@mui/material';

// the imports needed for apollo and login
import { LOGIN } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { useState } from 'react';
import { useMutation } from '@apollo/client';


export default function SignIn(props) {
  const [formState, setFormState] = useState ({email: '', password: ''});
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState.email);
    console.log(formState.password);

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

  return (
    <Box
    //   component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <form  
            onSubmit={handleFormSubmit}
        >
        <TextField
          required
          id="outlined-required"
          label="Email"
          type="email"
          name='email'
          defaultValue=""
          onChange={handleChange}
        />

        <TextField
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
              Send
        </Button>
        </form>
      </div>
   
    </Box>
  );
}