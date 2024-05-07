import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Balance({balance, savingsTotal}) {
    
    const [ updatedBalance, setUpdatedBalance ] = useState(balance);
    const [ updateSavings, setUpdatedSavings ] = useState(savingsTotal);

    useEffect(() => {
        setUpdatedBalance(balance);
        setUpdatedSavings(savingsTotal);
    }, [balance, savingsTotal]);

    return (
        <Box sx={{ width: '100%', maxWidth: 500 }}>
            <Typography variant="h6" gutterBottom>
                Balance: ${balance} <br/>
                Savings: ${savingsTotal}
            </Typography>  
        </Box>
    );
}