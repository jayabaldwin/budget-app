import * as React from 'react';
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
            <Card sx={{ width: '100%', maxWidth: 500 }} onClick={handleClick}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        {isFlipped ? `Savings: ${updateSavings}` : `Balance: ${updatedBalance}`}
                    </Typography>  
                </CardContent>
            </Card>
    );
}