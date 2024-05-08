// import * as React from 'react';
import ReactCardFlip from 'react-card-flip';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SavingsIcon from '@mui/icons-material/Savings';

export default function Balance({balance, savingsTotal}) {
   
    const [ isFlipped, setIsFlipped ] = useState(false);

    const handleClick = () => {
        setIsFlipped(!isFlipped);

    };

    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <Paper elevation={8}
                sx={{ width: '100%', maxWidth: 500, borderRadius: '15px' }} 
                onClick={handleClick}
            >
                <CardContent sx={{
                    display: 'flex',}}>
                    <Typography variant="h5" sx={{flexGrow: 1}} gutterBottom>
                        Balance
                    </Typography>  
                    <AccountBalanceIcon fontSize='large' />
                </CardContent>
                    <Typography variant='h4' sx={{pl: '16px', pr: '16px', pb: '8px'}} gutterBottom>
                        ${balance.toFixed(2) || 0}                    
                    </Typography>    
            </Paper>
            <Paper elevation={8}
                sx={{ width: '100%', maxWidth: 500, borderRadius: '15px' }} 
                onClick={handleClick}
            >
                <CardContent sx={{
                    display: 'flex',}}>
                    <Typography variant="h5" sx={{flexGrow: 1}} gutterBottom>
                        Savings
                    </Typography>  
                    <SavingsIcon fontSize='large' />
                </CardContent>
                    <Typography variant='h4' sx={{pl: '16px', pr: '16px', pb: '8px'}} gutterBottom>
                        ${savingsTotal.toFixed(2 || 0)}
                    </Typography>    
            </Paper>
        </ReactCardFlip>
    );
}