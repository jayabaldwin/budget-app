// import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

import { useState } from 'react';
// import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';

import { ADD_USER } from '../../utils/mutations';



function Signup(props) {
  
  const [formState, setFormState] = useState({
    email: '', 
    password: ''
  });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // console.log("in the submit");
    // console.log(`${formState.firstname}`);
    // console.log(`${formState.lastname}`);
    // console.log(`${formState.email}`);
    // console.log(`${formState.password}`);
    // this is the line that the error is pointing to.
    
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
      // component="form"
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
            label="First Name"
            // defaultValue="First Name"
            name='firstname'
            onChange={handleChange}

          />
          <TextField
            required
            id="outlined-required"
            label="Last Name"
            // defaultValue="Last Name"
            name='lastname'
            onChange={handleChange}

          />
          <TextField
            required
            id="outlined-required"
            label="Email"
            // defaultValue="Email"
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
              Send
          </Button>
        </form>
      </div>
      
      
    </Box>
  );
}

export default Signup;
