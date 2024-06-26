const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    firstname: String!
    lastname: String!
    initials: String
    email: String!
    finances: [Finance]
  }

  type UserBudgetCategories {
    _id: ID
    categoryName: String!
    remainingAmount: Float
    budgetAmount: Float
  }

  type Finance {
    _id: ID
    balance: Float
    savingsTotal: Float
    income: [Income]
    savings: [Savings]
    moneyOut: [MoneyOut]
    budgetCategories: [UserBudgetCategories]
  }

  type Income {
    _id: ID
    amount: Float!
    description: String!
    date: Date
  }

  type Savings {
    _id: ID
    amount: Float!
    description: String!
    date: Date
  }

  type MoneyOut {
    _id: ID
    amount: Float!
    description: String!
    date: Date
    category: String!
  }

  type SortedCategories {
    amount: Float!
    description: String
    date: Date
    category: String!
    _id: ID
    totalBudget: Float
    remainingAmount: Float
  }

  type Category {
    _id: ID
    budgetName: String!
  }

  type Auth {
    token: String
    user: User
  }

  type Query {
    users: [User]
    user(email: String!): User
    me: User
    categories: [Category]
    userBudgetCategories: [SortedCategories]
  }

  type Mutation {
    addUser(
      firstname: String!
      lastname: String!
      email: String!
      password: String!
    ): Auth

    login(email: String!, password: String!): Auth

    addBalance(balance: Float!): Finance

    addIncome(amount: Float!, description: String, date: Date): Finance

    addSavings(amount: Float!, description: String!, date: Date): Finance

    addMoneyOut(
      amount: Float!
      description: String!
      date: Date
      category: String!
    ): Finance

    addCategory(categoryName: String!, budgetAmount: Float!): Finance

    updateCategoryBudget(category: String!, amount: Float!): Finance

    deleteTransaction(transaction_id: ID!, type: String!): Finance
  }

  scalar Date
`;

module.exports = typeDefs;
