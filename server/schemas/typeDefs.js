const { gql } = require("apollo-server-express");

const typeDefs = gql`
  
  type User {
    _id: ID
    firstname: String!
    lastname: String!
    initials: String
    email: String!
    password: String
    finances: [Finance]
  }

  type Finance {
    _id: ID
    balance: Int
    savingsTotal: Int
    income: [Income]
    savings: [Savings]
    moneyOut: [MoneyOut]
  }

  type Income {
    _id: ID
    amount: Int!
    description: String
    date: Date
  }

  type Savings {
    _id: ID
    amount: Int!
    description: String!
    date: Date
  }

  type MoneyOut {
    _id: ID
    amount: Int!
    description: String!
    date: Date
    category: String!
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

    login(
      email: String!
      password: String!
    ): Auth


    addBalance (
      email: String!
      balance: Int!
    ): Finance

    addIncome (
      email: String!
      amount: Int!
      description: String
      date: Date
    ): Finance

    addSavings (
      email: String
      amount: Int!
      description: String!
      date: Date
    ): Finance


    addMoneyOut (
      email: String!
      amount: Int!
      description: String!
      date: Date
      category: String!
    ): Finance
}

  scalar Date
`;

module.exports = typeDefs;
