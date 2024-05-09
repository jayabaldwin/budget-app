import { BarChart } from '@mui/x-charts/BarChart';

export default function SpendGraph({categories}) {
  function getTotalBudgetPerCategory(transactions) {
    const uniqueCategories = [];
    const amountArr = [];
    transactions.forEach((transaction) => {
      const { category } = transaction;
      if (!uniqueCategories.includes(category)) {
        uniqueCategories.push(category);
        amountArr.push(parseFloat(transaction.totalBudget));
      }
    });
    return amountArr;
  }

  function getSpentAmountPerCategory(transactions) {
    const uniqueCategories = [];
    const amountArr = [];
    transactions.forEach((transaction) => {
      const { category } = transaction;
      if (!uniqueCategories.includes(category)) {
        uniqueCategories.push(category);
        amountArr.push(
          parseFloat(transaction.totalBudget - transaction.remainingAmount)
        );
      }
    });

    return amountArr;
  }

  const pData = getTotalBudgetPerCategory(categories);
  const uData = getSpentAmountPerCategory(categories);
  
  const xLabels = [
    ...new Set(categories.map((transaction) => transaction.category)),
  ];

  return (
    <>
      {categories && (
        <BarChart
          width={800}
          height={400}
          series={[
            { data: pData, label: "Total Budget", id: "uvId", stack: "total" },
            { data: uData, label: "Spent", id: "pvId"},
          ]}
          xAxis={[{ data: xLabels, scaleType: "band" }]}
        />
      )}
    </>
  );
}
