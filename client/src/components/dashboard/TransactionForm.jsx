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
  ADD_SAVINGS 
      } from '../../utils/mutations.js';

import Auth from '../../utils/auth.js';


export default function TransactionForm({email}) {

  // console.log('email is ', email);

  const [formState, setFormState] = useState({
    email: '',
    type: 'Expense',
    description: '',
    amount: 0,
    budgetCategory: '',
    date: new Date(),
  })
  console.log(formState);
  const [addSavings, { error, data }] = useMutation(ADD_SAVINGS);

  // sets up the logged in email. it's needed for the credentials to add to savings
  useEffect(() => {
    setFormState((prevState) => ({
      ...prevState,
      email: email,
    }));
  }, [email]);

  const handleChange = (event) => {

    const { name, value } = event.target;
    const newValue = name === 'amount' ? parseFloat(value) : value;

    setFormState({
      ...formState,
      [name]: newValue 
    });
  };

  // make the add savings mutation first

  const handleSubmit = async (event) => {

    // Need to get the user

    event.preventDefault();
    console.log(formState.type);
    console.log(formState.description);
    console.log(formState.amount);
    console.log(formState.budgetCategory);
    console.log(formState.date);

    if(formState.type === 'Expense'){
      console.log('Do the expense mutation');




    } else if(formState.type === 'Income'){
      console.log('do the income mutaiton');



    } // this could just be an 'else{} but i can read it better if i make it an 'else if'
      else if(formState.type === 'Savings'){
        // console.log('do the savings mutation')
        // console.log('formState is ', formState);
        // let sendToSavings = formState;
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
      <Paper component="form" sx={{ p: 2 }}>
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
                    name='budgetCategory'
                    value={formState.budgetCategory}
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





  // Make the addSavings mutation first




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
