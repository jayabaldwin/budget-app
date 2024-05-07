// imports needed for MUI
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send'
import Typography from '@mui/material/Typography';
import { paperClasses } from '@mui/material';

// the imports needed for apollo and login
import { LOGIN } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import Stack from '@mui/material/Stack';



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
      sx={{'& .MuiTextField-root': { 
        m: 1, 
        width: '25ch', 
      },}}
      noValidate
      autoComplete="off" >
      <div>
        <form  
            onSubmit={handleFormSubmit}>
          <Stack spacing={2}>
          <Typography
            variant="h6" 
            component="div" 
            sx={{ flexGrow: 1, textAlign: 'center' }}>
             Login!
          </Typography>
            <TextField
              required
              id="outlined-required"
              label="Email"
              type="email"
              name='email'
              defaultValue=""
              onChange={handleChange}
            />
              {/* autoComplete="off" */}
            
     
         {/* <form  
            onSubmit={handleFormSubmit}
            style={{display: 'flex', flexDirection: 'column'}}
        > */}
        {/* <TextField
          required
          id="outlined-required"
          label="Email"
          type="email"
          name='email'
          defaultValue=""
          onChange={handleChange}
        /> */}

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
                  Login!
            </Button>
          </Stack>
        </form>
      </div> 

{/* //         />
//         <Button 
//             variant="contained"
//             type="submit" 
//             endIcon={<SendIcon />}>
//               Send
//         </Button>
//         </form>    */}
    </Box>
  );
}
