import Grid from "@mui/material/Grid";
import { styled } from '@mui/material/styles';
import TransactionForm from '../components/dashboard/TransactionForm.jsx'
import SpendGraph from "../components/dashboard/SpendGraph.jsx";
import CashFlowGraph from "../components/dashboard/CashFlowGraph.jsx";
import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'

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
  console.log('moneyOut: ', moneyOut);
  
  if(loading){
    return(
      // <p>Hold on, We're getting your data!</p>
      <Stack spacing={1}>
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton variant="text" sx={{ fontSize: '1rem' }} />

      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={210} height={60} />
      <Skeleton variant="rounded" width={210} height={60} />
    </Stack>
    )
  }

    return (
      <Grid container spacing={2} rowSpacing={2}
        // sx={{mt:10}}
        >
        {/* Row 1 */}
        <Grid container spacing={2}>
          {/* Countdown */}
          <Grid item xs={6} md={3}>
            <Placeholder style={{height:"250px"}}>Countdown Element</Placeholder>
          </Grid>
          {/* Metrics */}
          <Grid item flexDirection={'column'} xs={6} md={3}>
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
          <Grid item xs={12} md={6}>
            <TransactionForm email={email}/>
          </Grid>
        </Grid>

        {/* Row 2 */}
        <Grid container spacing={2}>
          {/* Spend by category */}
          <Grid item xs={12} md={8}>
            {/* <Placeholder style={{height:"250px"}}>Spend by Category</Placeholder> */}
            <SpendGraph />
          </Grid>
          {/* Cash flow */}
          <Grid item xs={12} md={4}>
            {/* <Placeholder style={{height:"250px"}}>Cash Flow</Placeholder> */}
            <CashFlowGraph/>
          </Grid>
        </Grid>
      </Grid>
    );
  }
  