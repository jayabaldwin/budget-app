import { Grid, Typography } from "@mui/material";
import TransactionForm from '../components/dashboard/TransactionForm.jsx'

export default function Dashboard() {
    return (
        <Grid>
         <Typography variant={"h1"}>Hello</Typography>
         <TransactionForm />
        </Grid>
    )
}