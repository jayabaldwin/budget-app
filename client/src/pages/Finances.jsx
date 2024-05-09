import { useState } from 'react';
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
import { useMutation, useQuery } from '@apollo/client';

import {
  QUERY_USER_CATEGORIES,
} from '../utils/queries.js';

import { 
    ADD_CATEGORY,
      } from '../utils/mutations.js';

import Auth from '../utils/auth.js';


export default function Finances() {

  const menuItems = [
    { value: "Home" },
    { value: "Utilities" },
    { value: "Transport" },
    { value: "Groceries" },
    { value: "Eating Out" },
    { value: "Shopping" },
    { value: "Entertainment" },
    { value: "Health" },
    { value: "Education" },
    { value: "Travel" },
    { value: "Business" },
    { value: "Miscellaneous" }
  ];
  

  const [formState, setFormState] = useState({
    budgetAmount: '',
    categoryName: '',
  })
  const {error: catError, data: catData, refetch} = useQuery(QUERY_USER_CATEGORIES);
    // console.log('catData is: ', catData?.userBudgetCategories.category);

  const [addBudget, { error: budgetError, data: budgetData }] = useMutation(ADD_CATEGORY); 

  const handleChange = (event) => {

    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

      console.log(formState);
      try {

        await addBudget({
          variables: {
            ...formState,
            budgetAmount: parseFloat(formState.budgetAmount),
          },
        });
        setFormState(prevState => ({
          ...prevState,
          budgetAmount: '',
        }));
        refetch();

      } catch (error) {
        console.error(error);
      }
  };

  return (
    <form>
      <Paper 
      sx={{ p: 2 }} elevation={8}>
        <Typography variant='h5'>Add {formState.type}</Typography>
        <Grid container spacing={2} alignItems="center">

          <Grid item xs={12}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={3}>
                <FormControl fullWidth>
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
                  <Select
                    labelId="budget-category-label"
                    id="budget-category"
                    name='categoryName'
                    value={formState.categoryName}
                    label="Budget Category"
                    onChange={handleChange}
                    >
                    {menuItems
                        .filter(item => !catData || !catData.userBudgetCategories.some(catItem => catItem.category === item.value))
                        .map(item => (
                          <MenuItem key={item.value} value={item.value}>{item.value}</MenuItem>
                    ))}

                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
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
    </form>
  );
}