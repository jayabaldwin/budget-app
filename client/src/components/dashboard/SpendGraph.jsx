import { BarChart } from "@mui/x-charts/BarChart";

export default function SpendGraph({ categories }) {
  function getTotalBudgetPerCategory(categories) {
    const amountArr = [];
    categories.forEach((transaction) => {
      amountArr.push(parseFloat(transaction.budgetAmount));
    });
    return amountArr;
  }

  function getSpentAmountPerCategory(transactions) {
    const amountArr = [];
    transactions.forEach((transaction) => {
      amountArr.push(
        parseFloat(transaction.budgetAmount - transaction.remainingAmount)
      );
    });

    return amountArr;
  }

  const pData = getTotalBudgetPerCategory(categories);
  const uData = getSpentAmountPerCategory(categories);

  const xLabels = [
    ...new Set(categories.map((transaction) => transaction.categoryName)),
  ];

  return (
    <>
      {categories && (
        <BarChart
          width={1000}
          height={400}
          series={[
            { data: pData, label: "Total Budget", id: "uvId", stack: "total" },
            { data: uData, label: "Spent", id: "pvId" },
          ]}
          xAxis={[{ data: xLabels, scaleType: "band" }]}
        />
      )}
    </>
  );
}