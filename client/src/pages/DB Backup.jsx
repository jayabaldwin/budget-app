// Original dashboard backup

// import Grid from "@mui/material/Grid";
// import TransactionForm from '../components/dashboard/TransactionForm.jsx'
// import Balance from '../components/dashboard/Balance.jsx';
// import MoneyInOut from "../components/dashboard/MoneyInOut.jsx";
// import Countdown from "../components/dashboard/CountDown.jsx";
// import SpendGraph from "../components/dashboard/SpendGraph.jsx";
// import CashFlowGraph from "../components/dashboard/CashFlowGraph.jsx";
// import Box from '@mui/material/Box'
// import dayjs from "dayjs";

// import { useQuery } from '@apollo/client';
// import { QUERY_ME } from '../utils/queries.js';

// export default function Dashboard() {
//   const { loading, data, refetch } = useQuery(QUERY_ME);

  
//   const balance = data?.me?.finances[0]?.balance;
//   const savingsTotal = data?.me?.finances[0]?.savingsTotal;
//   const email = data?.me?.email;
  
//   const budgetCategorie = data?.me?.finances[0]?.budgetCategories;

//   // these are the subdocument arrays from finance of moneyOut that can be used as a prop to each component
//   const income = data?.me?.finances[0]?.income;
//   const savings = data?.me?.finances[0]?.savings;
//   const moneyOut = data?.me?.finances[0]?.moneyOut;

//   let moneyOutThisWeek;
//   let moneyInThisWeek;
//   let totalIncomeThisWeek;
//   let inOutRatio;
//   let totalMoneyOutThisWeek;

//   // if these arn't in this if statment, it'll cause issues cause it'll try to run the filter of the array before it's loaded/defined
//   if(!loading && email){
//     const oneWeekAgo = dayjs().subtract(1, 'week');
//     // this is to get how much money has been spent for the past week
//      moneyOutThisWeek = moneyOut.filter((transaction) => {
//       const transactionDate = dayjs(transaction.date);
//       return transactionDate.isAfter(oneWeekAgo);
//     })
//     console.log(moneyOutThisWeek);
//     totalMoneyOutThisWeek = moneyOutThisWeek.reduce((total, transaction) => total + transaction.amount, 0 );
//     console.log('total money out this week: ', totalMoneyOutThisWeek)
//     ///////////////////////////////////////////////////////////

//     // this is to calculate how much has been spent in the past week
//      moneyInThisWeek = income.filter((transaction) => {
//       const incomeAddDate = dayjs(transaction.date);
//       return incomeAddDate.isAfter(oneWeekAgo);
//     })
//     console.log(moneyInThisWeek);

//     totalIncomeThisWeek = moneyInThisWeek.reduce((total, transaction) => total + transaction.amount, 0);
//     console.log('total income: ', totalIncomeThisWeek);
//     //////////////////////////////////////////////////////////////////

//     // gets how much was put in vs taken out
//     inOutRatio = totalIncomeThisWeek - totalMoneyOutThisWeek;
//     console.log('inOutRatio: ', inOutRatio);
//     refetch();
//   }

//   if(loading){
//     return(
//       <p>Hold on, We're getting your data!</p>
//     )
//   }
  
//     return (
//       <Grid container sx={{marginTop: '1rem', marginRight: '1rem'}} 

// >
//           <Grid item xs={6}>
//             {/* refetch is sent to be able to get an updated balance amount when the database changes */}
//             <TransactionForm budgetCategorie={budgetCategorie} email={email} refetch={refetch}/>
//           </Grid>
//         {/* Row 1 */}
//         <Grid container spacing={2}>
//           {/* Countdown */}
//           <Grid item xs={3}>
//             <Countdown 
//               />
//             {/* <Placeholder style={{height:"250px"}}>Countdown Element</Placeholder> */}
//           </Grid>
//           {/* Metrics */}
//           <Grid item flexDirection={'column'} xs={3}>
//             <Grid item>
//                 {/* <Placeholder style={{height:"120px"}}>Balance</Placeholder> */}
//                 <Balance 
//                   balance={balance}
//                   savingsTotal={savingsTotal} 
//                   style={{height:"120px"}}/>
//             </Grid>
//             <Grid item>
//                 <MoneyInOut 
//                 sx={{
//                   height:"120px"}}
//                 inOutRatio={inOutRatio}
//                 totalMoneyOutThisWeek={totalMoneyOutThisWeek}
//                 totalIncomeThisWeek={totalIncomeThisWeek}
//                 >
//                   Money In/Out</MoneyInOut>
//             </Grid>
//           </Grid>
          
//         </Grid>

//         {/* Row 2 */}
//         <Grid container spacing={2}>
//           {/* Spend by category */}
//           <Grid item xs={8}>
//             {/* <Placeholder style={{height:"250px"}}>Spend by Category</Placeholder> */}
//             {/* <SpendGraph /> */}
//           </Grid>
//           {/* Cash flow */}
//           <Grid item xs={4}>
//           {/* <Box sx={{display: "flex", flexDirection: "flex-start"}}>
//         {" "}
//             <SpendGraph 
              
//             />
//           </Box> */}
//           </Grid>
//         </Grid>
//       </Grid>
//     );
//   }
  