// import * as React from 'react';
import ReactCardFlip from 'react-card-flip';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import PaidIcon from '@mui/icons-material/Paid';

export default function Balance({balance, savingsTotal}) {
   
    const [ isFlipped, setIsFlipped ] = useState(false);

    const handleClick = () => {
        setIsFlipped(!isFlipped);

    };

    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <Paper elevation={8}
                sx={{ width: '100%', maxWidth: 500 }} 
                onClick={handleClick}
            >
                <CardContent sx={{
                    display: 'flex',}}>
                    <Typography variant="h5" sx={{flexGrow: 1}} gutterBottom>
                        Balance
                    </Typography>  
                    <PaidIcon fontSize='large' />
                </CardContent>
                    <Typography variant='h4' sx={{pl: '16px', pr: '16px', pb: '8px'}} gutterBottom>
                        ${balance}
                    </Typography>    
            </Paper>
            <Paper elevation={8}
                sx={{ width: '100%', maxWidth: 500 }} 
                onClick={handleClick}
            >
                <CardContent sx={{
                    display: 'flex',}}>
                    <Typography variant="h5" sx={{flexGrow: 1}} gutterBottom>
                        Savings
                    </Typography>  
                    <PaidIcon fontSize='large' />
                </CardContent>
                    <Typography variant='h4' sx={{pl: '16px', pr: '16px', pb: '8px'}} gutterBottom>
                        ${savingsTotal}
                    </Typography>    
            </Paper>
        </ReactCardFlip>
    );
}