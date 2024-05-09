import Grid from "@mui/material/Grid";
import TransactionForm from '../components/dashboard/TransactionForm.jsx'
import Balance from '../components/dashboard/Balance.jsx';
import MoneyInOut from "../components/dashboard/MoneyInOut.jsx";
import Countdown from "../components/dashboard/CountDown.jsx";
import dayjs from "dayjs";
import CircularProgress from '@mui/material/CircularProgress';

import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries.js';
import { useMediaQuery } from "@mui/material";

export default function Dashboard() {
  const { loading, data, refetch } = useQuery(QUERY_ME);

  
  const balance = data?.me?.finances[0]?.balance;
  const savingsTotal = data?.me?.finances[0]?.savingsTotal;
  const email = data?.me?.email;
  
  const budgetCategorie = data?.me?.finances[0]?.budgetCategories;

  // these are the subdocument arrays from finance of moneyOut that can be used as a prop to each component
  const income = data?.me?.finances[0]?.income;
  const savings = data?.me?.finances[0]?.savings;
  const moneyOut = data?.me?.finances[0]?.moneyOut;

  let moneyOutThisWeek;
  let moneyInThisWeek;
  let totalIncomeThisWeek;
  let inOutRatio;
  let totalMoneyOutThisWeek;

  // Media queries
  const isMobile = useMediaQuery('(max-width:700px)');
  const isTablet = useMediaQuery('(max-width:900px)');

  // if these arn't in this if statment, it'll cause issues cause it'll try to run the filter of the array before it's loaded/defined
  if(!loading && email){
    const oneWeekAgo = dayjs().subtract(1, 'week');
    // this is to get how much money has been spent for the past week
     moneyOutThisWeek = moneyOut.filter((transaction) => {
      const transactionDate = dayjs(transaction.date);
      return transactionDate.isAfter(oneWeekAgo);
    })
    console.log(moneyOutThisWeek);
    totalMoneyOutThisWeek = moneyOutThisWeek.reduce((total, transaction) => total + transaction.amount, 0 );
    console.log('total money out this week: ', totalMoneyOutThisWeek)

    // this is to calculate how much has been spent in the past week
     moneyInThisWeek = income.filter((transaction) => {
      const incomeAddDate = dayjs(transaction.date);
      return incomeAddDate.isAfter(oneWeekAgo);
    })
    console.log(moneyInThisWeek);

    totalIncomeThisWeek = moneyInThisWeek.reduce((total, transaction) => total + transaction.amount, 0);
    console.log('total income: ', totalIncomeThisWeek);

    // gets how much was put in vs taken out
    inOutRatio = totalIncomeThisWeek - totalMoneyOutThisWeek;
    console.log('inOutRatio: ', inOutRatio);
    refetch();
  }

  if(loading){
    return <CircularProgress color="primary" />
  }


  
    return (
      <>
      {isMobile ? (
      <Grid container sx={{marginTop: '1rem', marginRight: '1rem'}} spacing={2}>
        <Grid item xs={12}>
          <Grid item sx={{mb: 4}}>
            <Countdown />
          </Grid>
          {/* Metrics */}
          {/* <Grid item sx={{display: 'flex'}} xs={12}> */}

            <Grid item>
                <Balance 
                  balance={balance}
                  savingsTotal={savingsTotal} 
                  style={{height:"120px"}}/>
            </Grid>
            
            <Grid item>
                <MoneyInOut 
                sx={{
                  height:"120px"}}
                inOutRatio={inOutRatio}
                totalMoneyOutThisWeek={totalMoneyOutThisWeek}
                totalIncomeThisWeek={totalIncomeThisWeek}/>
            </Grid>
  
          {/* </Grid> */}
        </Grid>

        <Grid item xs={12}>
            <TransactionForm budgetCategorie={budgetCategorie} email={email} refetch={refetch}/>
        </Grid>
      </Grid>
    ) : isTablet ? (
      <Grid container sx={{marginTop: '1rem', marginRight: '1rem'}}>


        <Grid container spacing={4}>
          <Grid item xs={6} sx={{mb: 4}}>
            <Countdown />
          </Grid>

          {/* Metrics */}
          <Grid item sx={{display: 'flex', flexDirection: 'column'}} xs={6}>
            <Grid item>
                <Balance 
                  balance={balance}
                  savingsTotal={savingsTotal} 
                  style={{height:"120px"}}/>
            </Grid>
            
            <Grid item>
                <MoneyInOut 
                sx={{
                  height:"120px"}}
                inOutRatio={inOutRatio}
                totalMoneyOutThisWeek={totalMoneyOutThisWeek}
                totalIncomeThisWeek={totalIncomeThisWeek}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
            <TransactionForm budgetCategorie={budgetCategorie} email={email} refetch={refetch}/>
        </Grid>
      </Grid> ) : (
        <Grid container sx={{marginRight: '1rem'}} spacing={6}>
        {/* <Grid container spacing={4}> */}
          

          {/* Metrics */}
          <Grid item sx={{display: 'flex', flexDirection: 'column'}} xs={4}>
            <Grid item sx={{mb: 6}}>
              <Countdown />
            </Grid>

            <Grid item sx={{mb: 2}}>
                <Balance 
                  balance={balance}
                  savingsTotal={savingsTotal} 
                  style={{height:"120px"}}/>
            </Grid>
            
            <Grid item>
                <MoneyInOut 
                sx={{
                  height:"120px"}}
                inOutRatio={inOutRatio}
                totalMoneyOutThisWeek={totalMoneyOutThisWeek}
                totalIncomeThisWeek={totalIncomeThisWeek}/>
            </Grid>
          {/* </Grid> */}
        </Grid>
        <Grid item xs={8}>
            <TransactionForm budgetCategorie={budgetCategorie} email={email} refetch={refetch}/>
        </Grid>
      </Grid>)}
      </>
    )}
  