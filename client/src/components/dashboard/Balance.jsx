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
                sx={{ width: '100%', borderRadius: '15px' }} 
                onClick={handleClick}
            >
                <CardContent sx={{
                    display: 'flex',}}>
                    <div style={{flexGrow: 1}}>
                    <Typography variant="h5">
                        Balance
                    </Typography> 
                    <Typography variant="subtitle2" gutterBottom>
                        Current
                    </Typography>   
                    </div>
                    <AccountBalanceIcon fontSize='large' />
                </CardContent>
                    <Typography variant='h4' sx={{pl: '16px', pr: '16px', pb: '8px'}} gutterBottom>
                        ${balance.toLocaleString('en-US') || 0}                    
                    </Typography>    
            </Paper>
            <Paper elevation={8}
                sx={{ width: '100%', borderRadius: '15px' }} 
                onClick={handleClick}
            >
                <CardContent sx={{
                    display: 'flex',}}>
                    <div style={{flexGrow: 1}}>
                    <Typography variant="h5">
                        Savings
                    </Typography> 
                    <Typography variant="subtitle2" gutterBottom>
                        Current
                    </Typography>   
                    </div>
                    <SavingsIcon fontSize='large' />
                </CardContent>
                    <Typography variant='h4' sx={{pl: '16px', pr: '16px', pb: '8px'}} gutterBottom>
                      ${savingsTotal.toLocaleString('en-US') || 0}
                    </Typography>    
            </Paper>
        </ReactCardFlip>
    );
}