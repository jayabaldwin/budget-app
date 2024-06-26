import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query Me {
    me {
      _id
      email
      firstname
      initials
      lastname
      finances {
        _id
        balance
        savingsTotal
        income {
          _id
          amount
          description
          date
        }
        savings {
          _id
          amount
          description
          date
        }
        moneyOut {
          _id
          amount
          description
          date
          category
        }
        budgetCategories {
          _id
          categoryName
          remainingAmount
          budgetAmount
        }
      }
    }
  }
`;

export const QUERY_USER_CATEGORIES = gql`
  query UserCategories {
    userBudgetCategories {
      amount
      description
      date
      category
      _id
      remainingAmount
      totalBudget
    }
  }
`;
