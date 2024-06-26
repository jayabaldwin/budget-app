import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box'
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
import SpendGraph from './SpendGraph.jsx';
import { useMutation, useQuery } from '@apollo/client'; 

import {
  QUERY_USER_CATEGORIES,
} from '../../utils/queries.js';

import { 
  ADD_SAVINGS,
  ADD_MONEY_OUT,
  ADD_INCOME,
  UPDATE_CATEGORY_BUDGET,
      } from '../../utils/mutations.js';

import Auth from '../../utils/auth.js';
import Finances from '../../pages/Finances.jsx';

export default function TransactionForm( { refetch, budgetCategorie } ) {

  // const {data: meData, loading: meLoading, error:meError} = useQuery(QUERY_ME);
  // console.log('meData: ', meData);

  const { data, loading, error, refetch:refetchCat } = useQuery(QUERY_USER_CATEGORIES, {
    fetchPolicy: "no-cache"
  });
  const categories = data?.userBudgetCategories || [];
  // console.log('transforms ', categories);


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
  const [updateCategoryBudget, {error: catBudgerror, data: catBudgData}] = useMutation(UPDATE_CATEGORY_BUDGET);

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
    if (formState.type === "Expense") {
      console.log(formState);
      try {
        // these three are pretty simple, essentially just sends the variables and runs the mutations
        await addToMoneyOut({
          variables: {
            ...formState,
            amount: parseFloat(formState.amount),
            category: formState.category,
          },
        });
        setFormState({
          type: 'Expense',
          description: '',
          amount: '',
          category: '',
          date: dayjs().format("MM/DD/YYYY"),
        });

        refetch();
        refetchCat();
        // add the update_category_budget here
        await updateCategoryBudget({
          variables: {
            ...formState,
            amount: parseFloat(formState.amount),
            category: formState.category,
            // budgetAmount: meData?.finances[0]?.budgetCategories?.budgetAmount
          }
        });

        refetch();
        refetchCat();

      } catch (error) {
        console.error(error);
      }
    } else if (formState.type === "Income") {
      console.log("do the income mutaiton");
      try {
        await addIncome({
          variables: {
            ...formState,
            amount: parseFloat(formState.amount),
          },
        });
        setFormState({
          type: 'Expense',
          description: '',
          amount: '',
          category: '',
          date: dayjs().format("MM/DD/YYYY"),
        });

        refetch();
      } catch (error) {
        console.error(error);
      }
    } else if (formState.type === "Savings") {
      try {
        await addSavings({
          variables: {
            ...formState,
            amount: parseFloat(formState.amount),
          },
        });
        setFormState({
          type: 'Expense',
          description: '',
          amount: '',
          category: '',
          date: dayjs().format("MM/DD/YYYY"),
        });

        refetch();
        // Auth.login(data.addSavings.token);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Grid container>
    <form>
      <Paper 
      sx={{ p: 4, borderRadius: '15px' }} elevation={8}>
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
              <Grid item xs={12} sm={9}>
                <TextField
                  required
                  label="Description"
                  name='description'
                  value={formState.description}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={3}>
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
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth disabled={formState.type !== 'Expense'}>
                  <InputLabel id="budget-category-label">Category</InputLabel>
                  <Select
                    labelId="budget-category-label"
                    id="budget-category"
                    name='category'
                    value={formState.category}
                    label="Budget Category"
                    onChange={handleChange}

                  >
                    {budgetCategorie.map((catName, index) => (
                    <MenuItem 
                        key={index} 
                        value={catName.categoryName}>
                          {catName.categoryName}
                      </MenuItem>
                    ))}

                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={5}>
                <DatePicker
                   setFormState={setFormState}
                   formState={formState}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
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
      <Box mt={4}>
        {" "}
        <SpendGraph 
          categories={categories}
          
        />
      </Box>
  
      </form>
    </Grid>
  );
}