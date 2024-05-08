import ReactCardFlip from 'react-card-flip';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Paper from '@mui/material/Paper';
import PaidIcon from '@mui/icons-material/Paid';
import PaymentsIcon from '@mui/icons-material/Payments';


export default function MoneyInOut({inOutRatio, totalIncomeThisWeek, totalMoneyOutThisWeek}){
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
                    <div style={{flexGrow: 1}}>
                    <Typography variant="h5">
                        Money In
                    </Typography> 
                    <Typography variant="subtitle2" gutterBottom>
                        Past 7 days
                    </Typography>   
                    </div>
                    <PaidIcon fontSize='large' />
                </CardContent>
                    <Typography variant='h4' sx={{pl: '16px', pr: '16px', pb: '8px'}} gutterBottom>
                        ${totalIncomeThisWeek}
                    </Typography>    
            </Paper>
            <Paper elevation={8}
                sx={{ width: '100%', maxWidth: 500, borderRadius: '15px' }} 
                onClick={handleClick}
            >
                <CardContent sx={{
                    display: 'flex',}}>
                    <div style={{flexGrow: 1}}>
                    <Typography variant="h5">
                        Money Out
                    </Typography> 
                    <Typography variant="subtitle2" gutterBottom>
                        Past 7 days
                    </Typography>   
                    </div>
                    <PaidIcon fontSize='large' />
                </CardContent>
                    <Typography variant='h4' sx={{pl: '16px', pr: '16px', pb: '8px'}} gutterBottom>
                        ${totalMoneyOutThisWeek}
                    </Typography>    
            </Paper>
        </ReactCardFlip>
    );
}
