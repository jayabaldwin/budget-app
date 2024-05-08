// import React from 'react';
import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { QUERY_USER_CATEGORIES } from '../../utils/queries';
import { useQuery } from '@apollo/client';

export default function SpendGraph() {
  const { data, loading, error } = useQuery(QUERY_USER_CATEGORIES);
  const categories = data?.userBudgetCategories || [];

  if (loading) {
    return <div>LOADING... </div>;
  }

  if (error) {
    return <div>ERROR {error.message}</div>;
  }

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
          parseFloat(transaction.totalBudget + transaction.remainingAmount)
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
      {data && (
        <BarChart
          width={500}
          height={400}
          series={[
            { data: uData, label: "Total Budget", id: "uvId", stack: "total" },
            { data: pData, label: "Spent", id: "pvId"},
          ]}
          xAxis={[{ data: xLabels, scaleType: "band" }]}
        />
      )}
    </>
  );
}
