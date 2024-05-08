// import * as React from 'react';
import ReactCardFlip from 'react-card-flip';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';

export default function Balance({balance, savingsTotal}) {
   
    const [ isFlipped, setIsFlipped ] = useState(false);

    const handleClick = () => {
        setIsFlipped(!isFlipped);

    };

    return (
        // <Paper elevation={8}>
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <Paper elevation={8}
                sx={{ width: '100%', maxWidth: 500 }} 
                onClick={handleClick}
            >
                <CardContent sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Typography variant="h6" gutterBottom>
                        Balance: ${balance}
                    </Typography>  
                </CardContent>
            </Paper>

            <Paper 
                sx={{ width: '100%', maxWidth: 500 }} 
                onClick={handleClick}
            >
                <CardContent sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Typography variant="h6" gutterBottom>
                        Savings: ${savingsTotal}
                    </Typography>  
                </CardContent>
            </Paper>
        </ReactCardFlip>
        // </Paper>
    );
}