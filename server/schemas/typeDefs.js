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
    setWeeklyAmount: Int!
  }

  type Finance {
    _id: ID
    balance: Float
    savingsTotal: Int
    income: [Income]
    savings: [Savings]
    moneyOut: [MoneyOut]
    budget: [UserBudgetCategories]
  }

  type Income {
    _id: ID
    amount: Float!
    description: String
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
    category: Category!
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
  }

  type Mutation {
    addUser(
      firstname: String!
      lastname: String!
      email: String!
      password: String!
    ): Auth

    login(email: String!, password: String!): Auth

    addBalance(email: String!, balance: Float!): Finance

    addIncome(
      email: String!
      amount: Float!
      description: String
      date: Date
    ): Finance

    addSavings(
      email: String
      amount: Float!
      description: String!
      date: Date
    ): Finance

    addMoneyOut(
      email: String!
      amount: Float!
      description: String!
      date: Date
      category: String!
    ): Finance
  }

  scalar Date
`;

module.exports = typeDefs;
