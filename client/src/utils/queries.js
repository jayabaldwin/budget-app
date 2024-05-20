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
  query UserBudgetCategories {
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

export const QUERY_CATEGORIES = gql`
  query UserCategories {
    userCategories {
      _id
      categoryName
      remainingAmount
      budgetAmount
    }
  }
`;

// combine two queries together!
export const QUERY_COMBINED = gql`
  {
    userBudgetCategories {
      amount
      description
      date
      category
      _id
      remainingAmount
      totalBudget
    }
    userCategories {
      _id
      categoryName
      remainingAmount
      budgetAmount
    }
  }
`;
