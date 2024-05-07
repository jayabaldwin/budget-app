import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


export default function MoneyInOut({inOutRatio}){


    return (
        <Card
        sx={{
            mt:3,
            p: 3,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            maxWidth: 500,
        }}>
            <Typography varient="h4" gutterBottom>
                Money in vs out this week: {inOutRatio}
            </Typography>
        </Card>
    )
}