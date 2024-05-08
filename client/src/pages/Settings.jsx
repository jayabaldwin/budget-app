import { useState } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import DatePicker from '../utils/DatePicker.jsx';
import Grid from '@mui/material/Grid';
import dayjs from "dayjs";
import { useMutation } from '@apollo/client';

import { 
    ADD_CATEGORY,
      } from '../utils/mutations.js';

export default function Settings() {

  const [formState, setFormState] = useState({
    budgetAmount: '',
    categoryName: '',
  })
  
  const [addBudget, { error, data }] = useMutation(ADD_CATEGORY);


  const handleChange = (event) => {

    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

      // console.log(formState);
      try {

        await addBudget({
          variables: {
            ...formState,
            budgetAmount: parseFloat(formState.budgetAmount),
          },
        });
      } catch (error) {
        console.error(error);
      }
  };

  return (
    <form>
        <Container sx={{alignContent: 'center'}}>
            <Paper sx={{ p: 4, borderRadius: '15px' }} elevation={8}>
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
        <Typography variant='h5'>Add {formState.type}</Typography>
        <Grid container spacing={2} alignItems="center">

          <Grid item xs={12}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={3}>
                <FormControl fullWidth>


                    {/* ESSENTIAL PART */}
                  <InputLabel htmlFor="outlined-amount">Amount</InputLabel>
                  <OutlinedInput
                    required
                    id="outlined-amount"
                    label='amount'
                    name='budgetAmount'
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    value={formState.budgetAmount}
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={4}>
                <FormControl fullWidth>




                  <InputLabel id="budget-category-label">Budget Category</InputLabel>
                  {/* ESSENTIAL PARTS */}
                  <Select
                    labelId="budget-category-label"
                    id="budget-category"
                    name='categoryName'
                    value={formState.categoryName}
                    label="Budget Category"
                    onChange={handleChange}
                  >
                    <MenuItem value={"Home"}>Home</MenuItem>
                    <MenuItem value={"Utilities"}>Utilities</MenuItem>
                    <MenuItem value={"Transport"}>Transport</MenuItem>
                    <MenuItem value={"Groceries"}>Groceries</MenuItem>
                    <MenuItem value={"Eating Out"}>Eating Out</MenuItem>
                    <MenuItem value={"Shopping"}>Shopping</MenuItem>
                    <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
                    <MenuItem value={"Health"}>Health</MenuItem>
                    <MenuItem value={"Education"}>Education</MenuItem>
                    <MenuItem value={"Travel"}>Travel</MenuItem>
                    <MenuItem value={"Business"}>Business</MenuItem>
                    <MenuItem value={"Miscellaneous"}>Miscellaneous</MenuItem>
                  </Select>
                </FormControl>
              
              
              
              
              
              
              
              
              </Grid>
              <Grid item xs={2}>
            

            {/* ESSENTIAL PARTS */}
                <Button 
                    variant="contained" 
                    onClick={handleSubmit}
                    type='submit' 
                    fullWidth endIcon={<SendIcon />}>
                  Add
                </Button>



              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
    </form>
  );
}