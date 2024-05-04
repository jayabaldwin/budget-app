import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation addUser(
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
  mutation addSavings(
    $email: String
    $amount: Int! 
    $description: String!
    $date: Date
    ) {
      addSavings(
        email: $email
        amount: $amount 
        description: $description
        date: $date
      ) {
        balance
        savingsTotal
      }
  }
`;


