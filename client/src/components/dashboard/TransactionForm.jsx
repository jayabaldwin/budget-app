// import React from 'react'
import Paper from '@mui/material/Paper';
// import { styled } from '@mui/material/styles';
// import { Grid } from '@mui/material';
import DatePicker from '../../utils/DatePicker.jsx'
import Stack from '@mui/material/Stack';

// const Form = styled('div')(() => ({
//     display: 'flex',
//     justifyContent: 'flex-start',
    // padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    // ...theme.mixins.toolbar,
//   }));  

export default function TransactionForm(){
    return (
        <Paper>
            <Stack>
             <DatePicker />


            </Stack>
        </Paper>
    )
}