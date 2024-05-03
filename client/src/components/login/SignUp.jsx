import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';


export default function FormPropsTextFields() {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="First Name"
        />
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Last Name"
        />
        <TextField
          required
          id="outlined-required"
          label="email"
          defaultValue="Email"
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="Password"
        />
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="Comfirm Password"
        />
        <Button variant="contained" endIcon={<SendIcon />}>
            Send
        </Button>
      </div>
      
      
    </Box>
  );
}
