import { gql } from 'apollo-boost';

export const MESSAGE_QUERY = gql`
  query MESSAGE_QUERY {
    myself {
      id
      role
      accountStatus
      username
    }
    getMessageRecipients {
      id
      username
      firstName
      lastName
    }
  }
`;

export const SEND_MESSAGE_MUTATION = gql`
  mutation SEND_MESSAGE_MUTATION(
    $to: [String!]!
    $subject: String
    $htmlText: String!
  ) {
    sendMessage(to: $to, subject: $subject, htmlText: $htmlText) {
      message
    }
  }
`;
