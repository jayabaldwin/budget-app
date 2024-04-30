const { gql } = require('apollo-server-express')

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
        balance: Int!
        income: Int
        savings: Int
        moneyOut: [MoneyOut]
    }

    type MoneyOut {
        _id: ID
        amount: Int!
        description: String!
        date: Date
        category: [String]!
    }
# graphQL basically knows these belong in the category: [] array
    enum CategoryEnum {
        Home
        Utilities
        Transport
        Groceries
        EatingOut
        Shopping
        Entertainment
        Health
        Education
        Travel
        Business
        Miscellaneous
    }

    type Auth {
        token: String
        user: User
    }

    type Query {
        users: [User]
        user(email:String!): User
    }

    type Mutation {
        addUser(firstname: String!, lastname: String!, email: String!, password: String!): Auth
    }

    scalar Date
`;

module.exports = typeDefs;