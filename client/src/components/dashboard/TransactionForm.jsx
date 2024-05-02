// import React from 'react'
import Card from '@mui/material/Card';
import { styled, useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';

const Form = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    // ...theme.mixins.toolbar,
  }));  

export default function TransactionForm() {
    return (
        <Card>
          <Grid container flexDirection={'column'}>
            <Grid item>
            <h1>Hello</h1>
            </Grid>
            <Grid item>
            <h1>Hello</h1>
            </Grid>
          
         


          </Grid>  
        </Card>
    )
}