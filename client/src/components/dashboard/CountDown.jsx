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

    const { data, loading, error, refetch } = useQuery(QUERY_USER_CATEGORIES);
    const all = data?.userBudgetCategories
    // console.log(all)

    if (loading) {
        return <div>LOADING... </div>;
      }
    
    if (error) {
        return <div>ERROR {error.message}</div>;
    }
    
    // Use state or use map/reduce method?

  
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
            $197 left
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1.5 }}>
            $133 spend of $330 budget
            </Typography>
        <Typography variant="body1" component="div">
          {daysLeftInWeek} days to go this week
        </Typography>
       
        
      </CardContent>
        </Paper>
    )
}