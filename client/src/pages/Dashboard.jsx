import { Grid } from "@mui/material";
import TransactionForm from '../components/dashboard/TransactionForm.jsx'

export default function Dashboard() {
    return (
      <Grid container spacing={2}>
        {/* Row 1 */}
        <Grid container spacing={2} alignItems="stretch">
          {/* Section: Balance half */}
          <Grid item xs={6}>
            {/* Countdown */}
            <Grid item style={{ height: "100%" }}>
              {/* Countdown component */}
              <TransactionForm />
            </Grid>
          </Grid>
  
          {/* Expense transactions */}
          <Grid item xs={6}>
            <TransactionForm />
          </Grid>
        </Grid>
  
        {/* Row 2 */}
        <Grid container spacing={2}>
          {/* Spend by category */}
          <Grid item xs={8}>
            <TransactionForm />
          </Grid>
          {/* Cash flow */}
          <Grid item xs={4}>
            <TransactionForm />
          </Grid>
        </Grid>
      </Grid>
    );
  }
  