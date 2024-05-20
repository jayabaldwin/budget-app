import { QUERY_USER_CATEGORIES } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import dayjs from 'dayjs'

export default function Countdown() {
    // How many days left in the budget week
    const currentDayOfWeek = dayjs().day();
    const daysLeftInWeek = 7 - currentDayOfWeek;

    const { data, loading, error, refetch } = useQuery(QUERY_USER_CATEGORIES);
    const categories = data?.userBudgetCategories || [];
  
    if (loading) {
      return (
        <Skeleton variant="rounded" width={400} height={290} />
      )
    }
  
    // Definitely change this
    // An error message should not be presented to the user!!
    if (error) {
      return <div>ERROR {error.message}</div>;
    }

    if(!loading){
      refetch();
    }
  
    function getTotalBudgetPerCategory(categories) {
      const amountArr = [];
      categories.forEach((transaction) => {
        amountArr.push(parseFloat(transaction.budgetAmount));
      });
      return amountArr;
    }
  
    function getSpentAmountPerCategory(transactions) {
      const amountArr = [];
      transactions.forEach((transaction) => {
        amountArr.push(
          parseFloat(transaction.budgetAmount - transaction.remainingAmount)
        );
      });
  
      return amountArr;
    }
  
    const budgetPerCategory = getTotalBudgetPerCategory(categories);
    var totalBudget = budgetPerCategory.reduce((accum,item) => accum + item, 0)
    console.log('Total Budget: ' + totalBudget) 
    
    const spendPerCategory = getSpentAmountPerCategory(categories);
    var totalSpent = parseFloat(spendPerCategory.reduce((accum,item) => accum + item, 0))
   
    console.log('Total Spent Overall: ' + totalSpent) 

    return (
        <Paper 
        elevation={8}
        sx={{
            background: 'transparent',
            border: '2px solid',
            borderColor: '#ffffff',
            borderRadius: '15px',
            height: '290px'
        }}
        >
            <CardContent sx={{textAlign: 'center'}}>
        <Typography sx={{ fontSize: 12, mb: 3 }} color="text.secondary" gutterBottom>
          Countdown...
        </Typography>
            <Typography variant="h3" gutterBottom>
            ${(totalBudget-totalSpent).toLocaleString('en-US')} left
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1.5 }}>
            ${(totalSpent).toLocaleString('ed-US')} spent of ${totalBudget.toLocaleString('en-US')} budget

            </Typography>
        <Typography variant="body1" component="div">
          {daysLeftInWeek} days to go this week
        </Typography>
      </CardContent>
        </Paper>
    )
}