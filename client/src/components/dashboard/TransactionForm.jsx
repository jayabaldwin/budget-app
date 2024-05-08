import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import DatePicker from '../../utils/DatePicker.jsx';
import Grid from '@mui/material/Grid';
import dayjs from "dayjs";
import { useMutation, useQuery } from '@apollo/client';

import {
  QUERY_ME,
} from '../../utils/queries.js';

import { 
  ADD_SAVINGS,
  ADD_MONEY_OUT,
  ADD_INCOME,
      } from '../../utils/mutations.js';

import Auth from '../../utils/auth.js';

function userBudgetCategories(props) {
  const { loading, data } = useQuery(QUERY_ME);
  const catNames = data?.me?.finance[0]?.budgetCategories;

  return (
    catNames.map((catName, index) => (
      <MenuItem 
        key={index} 
        value={{index}}>
          {catName}
      </MenuItem>
    ))
  );
}

export default function TransactionForm({refetch}) {

  const [formState, setFormState] = useState({
    type: 'Expense',
    description: '',
    amount: '',
    category: '',
    date: dayjs().format("MM/DD/YYYY"),
  })

  
  const [addSavings, { error: savingsError, data: savingsData }] = useMutation(ADD_SAVINGS);
  const [addToMoneyOut, { error: moneyOutError, data: moneyOutData }] = useMutation(ADD_MONEY_OUT);
  const [addIncome, {error: incomeError, data: incomeData}] = useMutation(ADD_INCOME);

  const handleChange = (event) => {

    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value 
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Used to send the expenses to the database
    if(formState.type === 'Expense'){
      console.log(formState);
      try {
        // these three are pretty simple, essentially just sends the variables and runs the mutations 
        await addToMoneyOut({
          variables: {
            ...formState,
            amount: parseFloat(formState.amount),
          },
        });
        // this is here to get the updated balance and savings amount from the database
        refetch();
      } catch (error) {
        console.error(error);
      }

    } else if(formState.type === 'Income'){
      console.log('do the income mutaiton');
      try {
        await addIncome({
          variables: {
            ...formState,
            amount: parseFloat(formState.amount),
          },
        }); 
        refetch();
      } catch (error) {
        console.error(error);
      }
    }

      else if(formState.type === 'Savings'){
        try {
          await addSavings({
            variables: { 
              ...formState,
              amount: parseFloat(formState.amount),
            },
          });
          refetch();
          // Auth.login(data.addSavings.token);
        } catch (error) {
          console.error(error);
        }
    }
  };

  return (
    <form>
      <Paper 
      sx={{ p: 2 }} elevation={8}>
        <Typography variant='h5'>Add {formState.type}</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <FormControl>
              <RadioGroup 
                row 
                value={formState.type} 
                onChange={handleChange} 
                name='type'
              >
                  <FormControlLabel 
                      value="Expense" 
                      control={<Radio />} 
                      label="Expense" />
                  <FormControlLabel 
                      value="Income" 
                      control={<Radio />} 
                      label="Income" />
                  <FormControlLabel 
                      value="Savings" 
                      control={<Radio />} 
                      label="Savings" />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={9}>
                <TextField
                  required
                  label="Description"
                  name='description'
                  value={formState.description}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>

              <Grid item xs={3}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="outlined-amount">Amount</InputLabel>
                  <OutlinedInput
                    required
                    id="outlined-amount"
                    label='amount'
                    name='amount'
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    value={formState.amount}
                    onChange={handleChange}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={4}>
                <FormControl fullWidth disabled={formState.type !== 'Expense'}>
                  <InputLabel id="budget-category-label">Budget Category</InputLabel>
                  <Select
                    labelId="budget-category-label"
                    id="budget-category"
                    name='category'
                    value={formState.category}
                    label="Budget Category"
                    onChange={handleChange}

                  >
                    {userBudgetCategories()}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={5}>
                <DatePicker
                   setFormState={setFormState}
                   formState={formState}
                />
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