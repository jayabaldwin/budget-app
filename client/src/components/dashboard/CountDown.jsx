import React from "react";
import { QUERY_USER_CATEGORIES } from '../../utils/queries';
import { useQuery } from '@apollo/client';
import dayjs from 'dayjs'


export default function Countdown() {
    const { data, loading, error, refetch } = useQuery(QUERY_USER_CATEGORIES);
    const allBudgetCategories = data?.userBudgetCategories[0]
    console.log(allBudgetCategories)
    // const remainingToSpend = data?.userBudgetCategories?.remainingAmount
    // console.log(remainingToSpend)
    // const daysLeft = day
}