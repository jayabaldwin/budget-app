import { useState } from 'react';
import { useEffect } from 'react';
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


import { useMutation } from '@apollo/client';

import { 
  ADD_SAVINGS,
  ADD_MONEY_OUT,
  ADD_INCOME,
      } from '../../utils/mutations.js';

import Auth from '../../utils/auth.js';


export default function TransactionForm({email}) {

  // console.log('email is ', email);

  // this is state i'm using to get the data from form.
  const [formState, setFormState] = useState({
    email: '',
    type: 'Expense',
    description: '',
    // amount was a bit tricky, it kept showing up as a String and later in the code I had to convert it to an Int
    amount: 0,
    // I changed this from 'budgetCategory' to category to keep it up with model
    category: '',
    date: new Date(),
  })
  
  // error and data had to be set as 'error: savingsError' and 'data: savingsData' cause just 'error' and 'data' was causing an issue cause it was a variable being used a couple times
  const [addSavings, { error: savingsError, data: savingsData }] = useMutation(ADD_SAVINGS);
  const [addToMoneyOut, { error: moneyOutError, data: moneyOutData }] = useMutation(ADD_MONEY_OUT);
  const [addIncome, {error: incomeError, data: incomeData}] = useMutation(ADD_INCOME);

  // sets up the logged in email. it's needed for the credentials to add to savings
  // this is needed to make sure we can get email and use it/send it to the formState
  useEffect(() => {
    setFormState((prevState) => ({
      ...prevState,
      email: email,
    }));
  }, [email]);

  const handleChange = (event) => {

    const { name, value } = event.target;
    // this is where we are converting the value for amount from a string to an Int. 
    const newValue = name === 'amount' ? parseFloat(value) : value;
    // where that new amount, as an int, is being put into the formState 
    setFormState({
      ...formState,
      [name]: newValue 
    });
  };


  const handleSubmit = async (event) => {
    // if we remove this, the balance updates when the form is submitted. if we leave it, it doesn't
    // basically, without this, the whole page reloads when we submit the transaction form
    event.preventDefault();

    // Used to send the expenses to the database
    if(formState.type === 'Expense'){
      console.log('Do the expense mutation');
      console.log(formState);
      try {
        // these three are pretty simple, essentially just sends the variables and runs the mutations 
        const sendToMoneyOut = await addToMoneyOut({
          variables: {
            ...formState
          },
        });
        
      } catch (error) {
        console.error(error);
      }

    } else if(formState.type === 'Income'){
      console.log('do the income mutaiton');
      try {
        const sendAddIncome = await addIncome({
          variables: {
            ...formState
          }
        });
        
      } catch (error) {
        console.error(error);
      }
    } // this could just be an 'else{} but i can read it better if i make it an 'else if'
      else if(formState.type === 'Savings'){
        try {
          const sendToSavings = await addSavings({
            variables: { 
              ...formState 
            },
          });
          // Auth.login(data.addSavings.token);
        } catch (error) {
          console.error(error);
        }
    }
  };


  return (
    <form>
      <Paper 
      // component="form" 
      sx={{ p: 2 }}>
        <Typography variant='h5'>Add {formState.type}</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <FormControl>
              <RadioGroup 
                row value={formState.type} 
                onChange={handleChange} 
                name='type'
                // value={formState.type} 
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
                    // name='amount'
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
              <Grid item xs={5}>
                <DatePicker
                  label="Date"
                  name="date"
                  value={formState.date}
                  onChange={handleChange}
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




// these chunk of code was what was here earlier but I consolidated it to essentially all be in a single formState variable


  // const [type, setType] = useState('Expense');
  // const [description, setDescription] = useState('');
  // const [amount, setAmount] = useState('');
  // const [budgetCategory, setBudgetCategory] = useState('');
  // const [date, setDate] = useState(new Date());

  // const handleTypeChange = (event) => {
  //   setType(event.target.value);
  //   console.log(type)
  // };

  // const handleDescriptionChange = (event) => {
  //   setDescription(event.target.value);
  //   console.log(description)
  // };

  // const handleAmountChange = (event) => {
  //   setAmount(event.target.value);
  //   console.log(amount)
  // };

  // const handleBudgetCategoryChange = (event) => {
  //   setBudgetCategory(event.target.value);
  //   console.log(budgetCategory)
  // };

  // const handleDateChange = (date) => {
  //   setDate(date);
  //   console.log(date)
  // };
