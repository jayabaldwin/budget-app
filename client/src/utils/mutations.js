import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation AddUser(
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstname: $firstname
      lastname: $lastname
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        firstname
        lastname
        initials
        email
      }
    }
  }
`;

export const ADD_SAVINGS = gql`
  mutation AddSavings($amount: Float!, $description: String!, $date: Date) {
    addSavings(amount: $amount, description: $description, date: $date) {
      savings {
        amount
        date
        description
      }
      balance
      savingsTotal
    }
  }
`;

export const ADD_MONEY_OUT = gql`
  mutation AddMoneyOut(
    $amount: Float!
    $description: String!
    $category: String!
    $date: Date
  ) {
    addMoneyOut(
      amount: $amount
      description: $description
      category: $category
      date: $date
    ) {
      moneyOut {
        amount
        category
        date
        description
      }
    }
  }
`;

export const ADD_INCOME = gql`
  mutation AddIncome($amount: Float!, $date: Date, $description: String) {
    addIncome(amount: $amount, date: $date, description: $description) {
      income {
        _id
        amount
        date
        description
      }
    }
  }
`;

export const ADD_BALANCE = gql`
  mutation AddBalance($balance: Float!) {
    addBalance(balance: $balance) {
      finances {
        _id
        balance
      }
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation AddCategory($categoryName: String!, $budgetAmount: Float!) {
    addCategory(categoryName: $categoryName, budgetAmount: $budgetAmount) {
      _id
    }
  }
`;

export const UPDATE_CATEGORY_BUDGET = gql`
  mutation UpdateCategoryBudget($category: String!, $amount: Float!) {
    updateCategoryBudget(category: $category, amount: $amount) {
      budgetCategories {
        categoryName
        remainingAmount
        budgetAmount
      }
    }
  }
`;

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($transactionId: ID!, $type: String!) {
    deleteTransaction(transaction_id: $transactionId, type: $type) {
      _id
    }
  }
`;
