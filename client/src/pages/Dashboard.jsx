import Grid from "@mui/material/Grid";
import { styled } from '@mui/material/styles';
import TransactionForm from '../components/dashboard/TransactionForm.jsx'

// What Reid is adding
import Balance from '../components/dashboard/Balance.jsx';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries.js';
//////////////

const Placeholder = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'center',
    padding: '0.5rem',
    margin: '1rem',
    border: '2px solid',
    borderRadius: '15px'
}));

export default function Dashboard() {
  // get all the user data via useQuery and send it to each item on the grid

  const { loading, data } = useQuery(QUERY_ME);
  
  const balance = data?.me?.finances[0]?.balance;
  const savingsTotal = data?.me?.finances[0]?.savingsTotal;
  const email = data?.me?.email;

  // these are the subdocument arrays from finance of moneyOut that can be used as a prop to each component
  const income = data?.me?.finances[0]?.income;
  const savings = data?.me?.finances[0]?.savings;
  const moneyOut = data?.me?.finances[0]?.moneyOut;

  

  console.log('income: ', income);
  console.log('savings: ', savings);
  console.log('moneyOut: ',moneyOut);
  
  if(loading){
    return(
      <p>Hold on, We're getting your data!</p>
    )
  }

    return (
      <Grid container spacing={2} rowSpacing={2}
        // sx={{mt:10}}
        >
        {/* Row 1 */}
        <Grid container spacing={2}>
          {/* Countdown */}
          <Grid item xs={3}>
            <Placeholder style={{height:"250px"}}>Countdown Element</Placeholder>
          </Grid>
          {/* Metrics */}
          <Grid item flexDirection={'column'} xs={3}>
            <Grid item>
                {/* <Placeholder style={{height:"120px"}}>Balance</Placeholder> */}
                <Balance 
                  balance={balance}
                  savingsTotal = {savingsTotal} 
                  style={{height:"120px"}}/>
            </Grid>
            <Grid item>
                <Placeholder style={{height:"120px"}}>Money In/Out</Placeholder>
            </Grid>
          </Grid>
          {/* Transaction Input */}
          <Grid item xs={6}>
            <TransactionForm email={email}/>
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
  