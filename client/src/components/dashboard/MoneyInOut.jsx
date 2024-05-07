import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


export default function MoneyInOut({inOutRatio}){


    return (
        <Card>
            <p>inOutRatio: {inOutRatio}</p>
        </Card>
    )
}