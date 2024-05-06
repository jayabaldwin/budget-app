import * as React from 'react';
import ReactCardFlip from 'react-card-flip';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ClickAwayListener from '@mui/material/ClickAwayListener';

export default function Balance({balance, savingsTotal}) {
    
    const [ updatedBalance, setUpdatedBalance ] = useState(balance);
    const [ updateSavings, setUpdatedSavings ] = useState(savingsTotal);
    const [ isFlipped, setIsFlipped ] = useState(false);

    useEffect(() => {
        setUpdatedBalance(balance);
        setUpdatedSavings(savingsTotal);
    }, [balance, savingsTotal]);

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <Card 
                sx={{ width: '100%', maxWidth: 500 }} 
                onClick={handleClick}
            >
                <CardContent sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Typography variant="h6" gutterBottom>
                        Balance: {updatedBalance}
                    </Typography>  
                </CardContent>
            </Card>
            <Card 
                sx={{ width: '100%', maxWidth: 500 }} 
                onClick={handleClick}
            >
                <CardContent sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Typography variant="h6" gutterBottom>
                        Savings: {updateSavings}
                    </Typography>  
                </CardContent>
            </Card>
        </ReactCardFlip>
    );
}