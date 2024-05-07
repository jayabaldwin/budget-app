import Grid from "@mui/material/Grid";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

import dayjs from 'dayjs';

import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries.js';


export default function History() {
    const { loading, data } = useQuery(QUERY_ME);

    const income = data?.me?.finances[0]?.income;
    const savings = data?.me?.finances[0]?.savings;
    const moneyOut = data?.me?.finances[0]?.moneyOut;

    // console.log('income: ', income);
    // console.log('savings: ', savings);
    // console.log('moneyOut: ',moneyOut);

    if(loading){
        return(
            <p>getting your history!</p>
        )
    }

    return(
        <Grid container spacing={2} rowSpacing={2}>
            <Grid item xs={3}>
                <List>
                    <Typography varient='h1'>
                        Money Out 
                    </Typography>
                        {moneyOut && [...moneyOut].reverse().map((item, index) => (
                            <ListItem key={index}>
                                <Typography varient='h1'>
                                    Amount: ${item.amount}
                                    <br/>
                                    Description: {item.description}
                                    <br/>
                                    On: {item.date}
                                </Typography>
                            </ListItem>
                        ))}
                </List>
            </Grid>
            <Grid item xs={3}>
                <List>
                    <Typography varient='h1'>
                        Income
                    </Typography>
                        {income && [...income].reverse().map((item, index) => (
                            <ListItem key={index}>
                                <Typography varient='h1'>
                                    amount: ${item.amount}
                                    <br/>
                                    Description: {item.description}
                                    <br/>
                                    On: {item.date}
                                </Typography>
                            </ListItem>
                        ))}
                </List>
            </Grid>
            <Grid item xs={3}>
                <List>
                    <Typography varient='h1'>
                        Money Out 
                    </Typography>
                        {savings && [...savings].reverse().map((item, index) => (
                            <ListItem key={index}>
                                <Typography varient='h1'>
                                    Amount: ${item.amount}
                                    <br/>
                                    Description: {item.description}
                                    <br/>
                                    On: {item.date}
                                </Typography>
                            </ListItem>
                        ))}
                </List>
            </Grid>
        </Grid>
    );
}