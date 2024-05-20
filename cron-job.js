var cron = require("node-cron");
const { User, Finance } = require("./models");

console.log("cron job has successfully started!");

cron.schedule("0 0 * * 1", function () {
  console.log("running a budget reset at midnight every monday for all users");
  resetWeeklyBudgetTotals();
});

// TEST ME HERE:

// cron.schedule("* * * * *", function () {
//   console.log(
//     "running a task every minute - you can turn me off once you see me"
//   );
// });

// TODO: NOT TESTED - NEED A JEST TEST FOR THIS USING MOCK

async function resetWeeklyBudgetTotals() {
  try {
    const users = await User.findAll();
    users.forEach(async (user) => {
      const finance = await Finance.findByPk(user.finances[0]._id);
      const weeklyBudgets = finance.budgetCategories;
      // go through all the category budgets and reset remainingAmt to full budgetAmount
      weeklyBudgets.forEach((wb) => {
        wb.remainingAmount = wb.budgetAmount;
      });
    });
  } catch (err) {
    console.log(err.message);
  }
}
