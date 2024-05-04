import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation Mutation(
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


