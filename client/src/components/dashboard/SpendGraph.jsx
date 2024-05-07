// import React from 'react';
import { useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
// Different query now
import { QUERY_ME } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import dayjs from "dayjs";

// This data needs to be based on a weekly budget

// WeeklyBudgetAmount = remainData + spentData
// ARRAY: Total spent for the category
const spentData = [2400];
// ARRAY: Total remaining
const remainData = [4000];

// User: categoryName to populate
const xLabels = [
  'Home'
];

export default function SpendGraph() {
  
  const {data, loading, error} = useQuery(QUERY_ME)

  if (loading) {
    return <div>LOADING... </div>
  }

  console.log("me", data);
  return (
    <BarChart
      width={500}
      height={300}
      series={[
        { data: spentData, label: 'Spent', id: 'spentId', stack: 'total' },
        { data: remainData, label: 'Remaining', id: 'remainId', stack: 'total' },
      ]}
      xAxis={[{ data: xLabels, scaleType: 'band' }]}
    />
  );
}
