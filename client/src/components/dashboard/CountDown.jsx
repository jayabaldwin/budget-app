import React from "react";
import { QUERY_USER_CATEGORIES } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import dayjs from 'dayjs'

export default function Countdown() {
    // How many days left in the budget week
    const currentDayOfWeek = dayjs().day();
    const daysLeftInWeek = 7 - currentDayOfWeek;

    const { data, loading, error } = useQuery(QUERY_USER_CATEGORIES);
    const categories = data?.userBudgetCategories || [];
  
    if (loading) {
      return <div>LOADING... </div>;
    }
  
    if (error) {
      return <div>ERROR {error.message}</div>;
    }
  
    function getSpentAmountPerCategory(transactions) {
      const uniqueCategories = [];
      const amountArr = [];
      transactions.forEach((transaction) => {
        const { category } = transaction;
        if (!uniqueCategories.includes(category)) {
          uniqueCategories.push(category);
          amountArr.push(parseFloat(transaction.totalBudget));
        }
      });
      return amountArr;
    }
  
    function getTotalBudgetPerCategory(transactions) {
      const uniqueCategories = [];
      const amountArr = [];
      transactions.forEach((transaction) => {
        const { category } = transaction;
        if (!uniqueCategories.includes(category)) {
          uniqueCategories.push(category);
          amountArr.push(
            parseFloat(transaction.totalBudget + transaction.remainingAmount)
          );
        }
      });
  
      return amountArr;
    }
  
    const budgetPerCategory = getTotalBudgetPerCategory(categories);
    var totalBudget = budgetPerCategory.reduce((accum,item) => accum + item, 0)
    console.log('Total Budget: ' + totalBudget) 
    
    const spendPerCategory = getSpentAmountPerCategory(categories);
    var totalSpent = spendPerCategory.reduce((accum,item) => accum + item, 0)
    console.log('Total Spent Overall: ' + totalSpent) 

    return (
        <Paper 
        elevation={8}
        sx={{
            background: 'transparent',
            border: '2px solid',
            borderColor: '#ffffff',
            borderRadius: '15px',
            height: '270px'
        }}
        >
            <CardContent sx={{textAlign: 'center'}}>
        <Typography sx={{ fontSize: 16, mb: 4 }} color="text.secondary" gutterBottom>
          Countdown...
        </Typography>
            <Typography variant="h3" gutterBottom>
            ${totalBudget-totalSpent} left
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1.5 }}>
            ${(totalBudget - (totalSpent * 2)) * -1 } spent of ${totalSpent} budget
            </Typography>
        <Typography variant="body1" component="div">
          {daysLeftInWeek} days to go this week
        </Typography>
       
        
      </CardContent>
        </Paper>
    )
}