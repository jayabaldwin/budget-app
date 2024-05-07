// import React from 'react';
import { useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { QUERY_ME } from '../../utils/queries';
import { useQuery } from '@apollo/client';

// This data needs to be based on a weekly budget

// WeeklyBudgetAmount = remainData + spentData
// ARRAY: Total spent for the category
const spentData = [2400];
// ARRAY: Total remaining
const remainData = [4000];

// userBudgetCategories to populate
const xLabels = [
  'Home'
];

export default function SpendGraph() {
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
