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

export default function TransactionForm() {
  const [type, setType] = useState('Expense');




  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [budgetCategory, setBudgetCategory] = useState('');
  const [date, setDate] = useState(new Date());

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleBudgetCategoryChange = (event) => {
    setBudgetCategory(event.target.value);
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleSubmit = () => {
    // Handle form submission
  };

  return (
    <Paper component="form" sx={{ p: 2 }}>
      <Typography variant='h5'>Add {type}</Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <FormControl>
            <RadioGroup row value={type} onChange={handleTypeChange}>
              <FormControlLabel value="Expense" control={<Radio />} label="Expense" />
              <FormControlLabel value="Income" control={<Radio />} label="Income" />
              <FormControlLabel value="Savings" control={<Radio />} label="Savings" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={9}>
              <TextField
                required
                label="Description"
                value={description}
                onChange={handleDescriptionChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel htmlFor="outlined-amount">Amount</InputLabel>
                <OutlinedInput
                  required
                  id="outlined-amount"
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  value={amount}
                  onChange={handleAmountChange}
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
                  value={budgetCategory}
                  label="Budget Category"
                  onChange={handleBudgetCategoryChange}
                >
                  <MenuItem value={"Home"}>Home</MenuItem>
                  <MenuItem value={"Utilities"}>Utilities</MenuItem>
                  <MenuItem value={"Transport"}>Transport</MenuItem>
                  <MenuItem value={"Groceries"}>Groceries</MenuItem>
                  <MenuItem value={"Eating Out"}>Eating Out</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={5}>
              <DatePicker
                label="Date"
                value={date}
                onChange={handleDateChange}
              />
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" onClick={handleSubmit} fullWidth endIcon={<SendIcon />}>
                Add
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
