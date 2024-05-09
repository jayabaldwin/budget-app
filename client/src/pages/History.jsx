import React from 'react';
import Grid from "@mui/material/Grid";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CircularProgress from '@mui/material/CircularProgress';
import { FixedSizeList } from 'react-window';
import Box from '@mui/material/Box';

import dayjs from 'dayjs';

import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries.js';


function moneyOutRow(props) {
const { index, style } = props;
const { loading, data } = useQuery(QUERY_ME);

const moneyOut = data?.me?.finances[0]?.moneyOut;
const sortedMoneyOut = moneyOut && [...moneyOut].sort((a, b) => new Date(b.date) - new Date(a.date));
const item = sortedMoneyOut && sortedMoneyOut[index];


return (
    <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton>
            <ListItemText >
            {item && (
                <div key={index}>
                <Typography>
                    Amount: ${item.amount}
                    <br/>
                    Description: {item.description}
                    <br/>
                    Category: {item.category}
                    <br/>
                    On: {dayjs(item.date).format('MM/DD/YYYY')}
                </Typography>
                </div>
            )}
            </ListItemText>
        </ListItemButton>
    </ListItem>
    );
  }
function incomeRow(props) {
const { index, style } = props;
const { loading, data } = useQuery(QUERY_ME);

const income = data?.me?.finances[0]?.income;
const sortedIncome = income && [...income].sort((a, b) => new Date(b.date) - new Date(a.date));
const item = sortedIncome && sortedIncome[index];


return (
    <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton>
            <ListItemText >
            {item && (
                <div key={index}>
                <Typography>
                    Amount: ${item.amount}
                    <br/>
                    Description: {item.description}
                    <br/>
                    On: {dayjs(item.date).format('MM/DD/YYYY')}
                </Typography>
                </div>
            )}
            </ListItemText>
        </ListItemButton>
    </ListItem>
);
}
function savingsRow(props) {
    const { index, style } = props;
    const { loading, data } = useQuery(QUERY_ME);
  
    const savings = data?.me?.finances[0]?.savings;
    const sortedSavings = savings && [...savings].sort((a, b) => new Date(b.date) - new Date(a.date));
    const item = sortedSavings && sortedSavings[index];
    
    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton>
          <ListItemText >
            {item && (
              <div key={index}>
                <Typography sx={{ m:0 }}>
                  Amount: ${item.amount}
                  <br/>
                  Description: {item.description}
                  <br/>
                  On: {dayjs(item.date).format('MM/DD/YYYY')}
                </Typography>
              </div>
            )}
          </ListItemText>
        </ListItemButton>
      </ListItem>
    );
  }
  
export default function History() {
    const { loading, data } = useQuery(QUERY_ME);

    if(loading){
      return <CircularProgress color="primary" />
    }

    const moneyOut = data?.me?.finances[0]?.moneyOut;
    const income = data?.me?.finances[0]?.income;

    return (
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row'},
          justifyContent: 'space-around', 
          alignItems: 'center',
          p: 2,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 1
        }}>
          <Box sx={{ width: {xs: '90%', m: '30vw'}, height: 600, m: 1, p: 2, bgcolor: 'grey.40', borderRadius: 2, boxShadow: 1 }}>
            <Typography sx={{ textAlign: 'left', fontWeight: 'bold', mb: 2 }}>Expenses</Typography>
            <FixedSizeList
              height={500}
              width={'100%'}
              itemSize={120}
              itemCount={moneyOut ? moneyOut.length : 0}
              overscanCount={5}
            >
              {moneyOutRow}
            </FixedSizeList>
          </Box>
          <Box sx={{ width: {xs: '90%', m: '30vw'}, height: 600, m: 1, p: 2, bgcolor: 'grey.40', borderRadius: 2, boxShadow: 1 }}>
            <Typography sx={{ textAlign: 'left', fontWeight: 'bold', mb: 2 }}>Income</Typography>
            <FixedSizeList
              height={500}
              width={'100%'}
              itemSize={100}
              itemCount={income ? income.length : 0}
              overscanCount={5}
            >
              {incomeRow}
            </FixedSizeList>
          </Box>
          <Box sx={{ width: {xs: '90%', m: '30vw'}, height: 600, m: 1, p: 2, bgcolor: 'grey.40', borderRadius: 2, boxShadow: 1 }}>
            <Typography sx={{ textAlign: 'left', fontWeight: 'bold', mb: 2 }}>Savings</Typography>
            <FixedSizeList
              height={500}
              width={'100%'}
              itemSize={100}
              itemCount={moneyOut ? moneyOut.length : 0}
              overscanCount={5}
            >
              {savingsRow}
            </FixedSizeList>
          </Box>
        </Box>
      );
}
