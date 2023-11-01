import { gql } from '@apollo/client';
// Query_User - with goals and tasks 
// query_Goals(with tasks?)
// QUERY_TASKS

export const QUERY_ALL_USER = gql`
  {
    user {
      _id
      firstName
      lastName
      goals {
        _id
        title
        description
        completionDate
        createdAt
        completed
        tasks {
          _id
          title
          description
          completionDate
          priority
          completed
        }
      }
    }
  }
`;

export const QUERY_TASKS = gql`
  {
    tasks {
      _id
      title
      description
      completionDate
      priority
      completed
    }
  }
`;

export const QUERY_GOALS = gql`
  {
    goals {
      _id
      title
      description
      completionDate
      createdAt
      completed
      tasks {
        _id
        title
        description
        completionDate
        priority
        completed
      }
    }
  }
`;

export const QUERY_USER = gql`
  
`