import { gql } from '@apollo/client';


export const QUERY_ME = gql`
query Me {
    me {
      firstname
      lastname
      initials
      email
      finances {
        balance
        savingsTotal
        income {
          amount
          description
          date
        }
        savings {
          amount
          description
          date
        }
        moneyOut {
          description
          date
          category
        }
      }
    }
  }
`;