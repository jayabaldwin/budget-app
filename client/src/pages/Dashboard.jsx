import { Grid } from "@mui/material";
import { styled } from '@mui/material/styles';
// import TransactionForm from '../components/dashboard/TransactionForm.jsx'

const Placeholder = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'center',
    padding: '0.5rem',
    margin: '1rem',
    border: '2px solid',
    borderRadius: '15px'
}));

export default function Dashboard() {
    return (
      <Grid container spacing={2} rowSpacing={2}>
        {/* Row 1 */}
        <Grid container spacing={2}>
          {/* Countdown */}
          <Grid item xs={3}>
            <Placeholder style={{height:"250px"}}>Countdown Element</Placeholder>
          </Grid>
          {/* Metrics */}
          <Grid item flexDirection={'column'} xs={3}>
            <Grid item>
                <Placeholder style={{height:"120px"}}>Balance</Placeholder>
            </Grid>
            <Grid item>
                <Placeholder style={{height:"120px"}}>Money In/Out</Placeholder>
            </Grid>
          </Grid>
          {/* Transaction Input */}
          <Grid item xs={6}>
            {/* <TransactionForm /> */}
            <Placeholder style={{height:"250px"}}>Transaction Form</Placeholder>
          </Grid>
        </Grid>

        {/* Row 2 */}
        <Grid container spacing={2}>
          {/* Spend by category */}
          <Grid item xs={8}>
            <Placeholder style={{height:"250px"}}>Spend by Category</Placeholder>
          </Grid>
          {/* Cash flow */}
          <Grid item xs={4}>
            <Placeholder style={{height:"250px"}}>Cash Flow</Placeholder>
          </Grid>
        </Grid>
      </Grid>
    );
  }
  